import React from "react";
import { useAppContext } from "../hooks/useAppContext";
import { Link } from "react-router-dom";

const ProductList = () => {
  const { product } = useAppContext();

  const { handleAddItem } = useShoppingCartContext();

  return (
    <main>
      <h1>Product List</h1>

      <div>
        {product.map((product) => (
          <Link key={product.id} to={`${product.id}`}>
            <div>
              <img src={product.thumbnail} alt={product.title} />

              <h2>{product.title}</h2>
              <p>Price: {product.price}</p>

              <button>Add to cart</button>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default ProductList;
