import axios from "axios";

import SignInForm from "./SignInForm";
import ProductList from "./ProductList";
import { useState } from "react";

export default function App() {
  return (
    <div>
      <SignInForm />
      <ProductList />
      <InsertProduct />
    </div>
  );
}

function InsertProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);
  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }
  function handlePriceChange(e) {
    setPrice(e.target.value);
  }

  function handleImageChange(e) {
    const files = Array.from(e.target.files);
    setImages(files);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      // 1. Upload all images to Cloudinary
      const uploadedUrls = await Promise.all(
        images.map(async (image) => {
          const formData = new FormData();
          formData.append("file", image);
          formData.append("upload_preset", "Cloudinary Test"); // replace
          formData.append("cloud_name", "dcf6uwi8b"); // replace

          const res = await axios.post(
            "https://api.cloudinary.com/v1_1/dcf6uwi8b/image/upload", // replace
            formData
          );

          return res.data.secure_url;
        })
      );

      if (!name || !description || !price || !uploadedUrls) {
        alert("Please fill all the fields");
        return;
      }

      const productData = {
        name,
        description,
        price,
        photoArr: uploadedUrls,
      };

      await axios.post(
        "http://localhost:8080/restapi/productCRUD.php",
        productData
      );
      alert("Product uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
    }

    setName("");
    setDescription("");
    setPrice(0);
    setImages([]);
  }
  return (
    <div className="insertProductForm">
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="name">Product Name:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={handleNameChange}
                />
              </td>
            </tr>

            <tr>
              <td>
                <label htmlFor="description">Product Description:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="description"
                  id="description"
                  onChange={handleDescriptionChange}
                />
              </td>
            </tr>

            <tr>
              <td>
                <label htmlFor="price">Product Price:</label>
              </td>
              <td>
                <input
                  type="number"
                  name="price"
                  id="price"
                  onChange={handlePriceChange}
                />
              </td>
            </tr>

            <tr>
              <td>
                <label htmlFor="photo">Product Image:</label>
              </td>
              <td>
                <input
                  type="file"
                  name="photo"
                  multiple
                  id="photo"
                  onChange={handleImageChange}
                />
              </td>
            </tr>

            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                <button type="submit">Submit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}
