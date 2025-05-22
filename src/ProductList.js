import { useState, useEffect } from "react";
import ProductBox from "./ProductBox";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/restapi/productCRUD.php")
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
    <>
      {products.map((product) => (
        <ProductBox product={product} />
      ))}
    </>
  );
}
