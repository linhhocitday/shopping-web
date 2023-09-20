import React from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext";
import { useShoppingCartContext } from "../hooks/useShoppingCartContext";

const ProductDetail = () => {
  const { productId } = useParams();

  const { findProductById } = useAppContext();

  const { handleAddItem } = useShoppingCartContext();

  const product = findProductById(productId);

  const addItemToCart = () => {
    handleAddItem({ id: product.id, quantity: 1 });
  };

  return (
    <main>
      <h1>Product Detail</h1>
      <div>Detail product: {productId}</div>

      <div>
        <h2>{product.title}</h2>

        <img src={product.thumbnail} alt={product.title} />
        <h3>Brand: {product.brand}</h3>
        <p>Price: {product.price}</p>

        <p>{product.description}</p>

        <button onClick={addItemToCart}>Add to cart</button>
      </div>
    </main>
  );
};

export default ProductDetail;
