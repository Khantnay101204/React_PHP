export default function ProductBox({ product }) {
  return (
    <div className="productList">
      <img src={product.photoArr[0]} alt="pizzs" />
      <p>{product.name}</p>
      <p>{product.description}</p>
      <p>{product.price}</p>
    </div>
  );
}
