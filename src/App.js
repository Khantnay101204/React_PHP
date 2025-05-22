import axios from "axios";

import { useState } from "react";

export default function App() {
  return (
    <div>
      <SignInForm />
      <span></span>
    </div>
  );
}

function SignInForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [re_password, setRePassword] = useState("");
  const passwordCorrect = password === re_password;
  function handleRePasswordChange(event) {
    setRePassword(event.target.value);
  }

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!username.trim() || !password.trim()) {
      return;
    }
    if (!passwordCorrect) {
      alert("Passwords do not match.");
      return;
    }

    const userInput = { username, password };

    axios
      .post("http://localhost:8080/restapi/signin.php", userInput)
      .then((response) => {
        if (response.data.status === 1) {
          alert("User registered successfully.");
        } else {
          alert(response.data.message); // e.g., "Username already exists."
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while connecting to the server.");
      });
  }

  return (
    <div className="sign-in-form">
      <form>
        <label>
          Username:
          <input type="text" name="username" onChange={handleUsernameChange} />
        </label>
        <label>
          Password:
          <input
            className={passwordCorrect ? "" : "pwIncorrect"}
            type="password"
            name="password"
            onChange={handlePasswordChange}
          />
        </label>
        <label>
          Confirm Password:
          <input
            className={passwordCorrect ? "" : "pwIncorrect"}
            type="password"
            name="re_password"
            onChange={handleRePasswordChange}
          />
        </label>
        <button type="submit" onClick={handleSubmit}>
          Sign In
        </button>
      </form>
    </div>
  );
}
