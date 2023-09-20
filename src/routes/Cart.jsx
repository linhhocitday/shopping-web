import React from "react";
import { useShoppingCartContext } from "../hooks/useShoppingCartContext";

const Cart = () => {
  const { items, handleChangeQuantity, removeItem, clearAllItems, cartTotal } =
    useShoppingCartContext();

  return (
    <main>
      <ul>
        {items.map((item) => (
          <li key={item.product.key}>
            <h2>{item.product.title}</h2>
            <div>{item.product.price * item.quantity}</div>
            <div>
              <button
                onClick={() => handleChangeQuantity("minus", item.product.id)}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => handleChangeQuantity("plus", item.product.id)}
              >
                +
              </button>
            </div>

            <button onClick={() => removeItem(item.product.id)}>
              Remove item
            </button>
          </li>
        ))}
      </ul>

      <div>Total: {cartTotal}</div>
      <button onClick={clearAllItems}>Clear all</button>
    </main>
  );
};

export default Cart;
