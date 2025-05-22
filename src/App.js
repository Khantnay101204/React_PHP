import axios from "axios";

import { useEffect, useState } from "react";
import SignInForm from "./SignInForm";

// const products = [
//   {
//     id: 1,
//     name: "Pizzas",
//     description: "Alot of pizzas",
//     price: 69,
//     photoArr: [
//       "focaccia.jpg",
//       "funghi.jpg",
//       "margherita.jpg",
//       "prosciutto.jpg",
//       "salamino.jpg",
//       "spinaci.jpg",
//     ],
//   },
// ];

export default function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/restapi/productlist")
      .then((response) => response.json())
      .then((data) => {
        // Parse photoArr for each product
        const updatedData = data.map((product) => ({
          ...product,
          photoArr: JSON.parse(product.photoArr),
        }));
        setProducts(updatedData);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);
  return (
    <div>
      <SignInForm />
      <ProductList products={products} />
    </div>
  );
}

function ProductList({ products }) {
  return (
    <>
      {products.map((product) => (
        <ProductBox product={product} />
      ))}
    </>
  );
}

function ProductBox({ product }) {
  return (
    <div className="productList">
      <img src={`pizzas/${product.photoArr[0]}`} alt="pizzs" />
      <p>{product.name}</p>
      <p>{product.description}</p>
      <p>{product.price}</p>
    </div>
  );
}
