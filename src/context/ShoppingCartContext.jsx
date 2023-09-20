import { createContext, useReducer, useState, useEffect } from "react";
import { useAppContext } from "../hooks/useAppContext";

export const ShoppingCartContext = createContext();

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      let existed = state.cartItem.find((item) => item.id == action.payload.id);

      if (existed) {
        let newItem = state.cartItem.map((item) => {
          if (item.id == action.payload.id) {
            return {
              ...item,
              quantity: item.quantity + action.payload.quantity,
            };
          }

          return item;
        });

        return { ...state, cartItem: newItem };
      } else {
        let newItem = {
          id: action.payload.id,
          quantity: action.payload.quantity,
        };

        return { ...state, cartItem: [...state.cartItem, newItem] };
      }
    }

    // case "GET_TOTAL": {
    //   return { ...state, totalMoney: action.payload };
    // }

    case "CHANGE_QUANTITY": {
      const newItem = state.cartItem.map((item) => {
        if (item.id == action.payload.id) {
          if (action.payload.sign == "minus") {
            if (item.quantity == 1) {
              return item;
            }

            let newQuantity = item.quantity - 1;
            return { ...item, quantity: newQuantity };
          } else if (action.payload.sign == "plus") {
            let newQuantity = item.quantity + 1;
            return { ...item, quantity: newQuantity };
          }
        }

        return item;
      });

      return { ...state, cartItem: newItem };
    }

    case "REMOVE_ITEM": {
      let newCart = state.cartItem.filter(
        (item) => item.id != action.payload.id
      );

      return { ...state, cartItem: newCart };
    }

    case "CLEAR_ALL": {
      return { ...state, cartItem: action.payload };
    }
  }
};

const initialState = {
  cartItem: [],
  totalMoney: 0,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const { findProductById } = useAppContext();

  // useEffect(() => {
  //   let cartTotal = cartItem.reduce(
  //     (total, item) => total + item.number * item.price,
  //     0
  //   );

  //   if (cartItem) {
  //     dispatch({ type: "GET_TOTAL", payload: cartTotal });
  //   }
  // }, [cartItem]);

  const handleChangeQuantity = (sign, id) => {
    dispatch({ type: "CHANGE_QUANTITY", payload: { sign: sign, id: id } });
  };

  const removeItem = (id) => {
    if (confirm("Are you sure you want to remove this item?")) {
      dispatch({ type: "REMOVE_ITEM", payload: { id: id } });
    } else {
      return cartItem;
    }
  };

  const clearAllItems = () => {
    if (confirm("Are you sure you want to delete all items in your cart?")) {
      dispatch({ type: "CLEAR_ALL", payload: [] });
    } else {
      return cartItem;
    }
  };

  const handleAddItem = ({ id, quantity }) => {
    dispatch({ type: "ADD_ITEM", payload: { id: id, quantity: quantity } });
  };

  const itemNumber = state.cartItem.length;

  const items = state.cartItem.map((item) => ({
    product: findProductById(item.id),
    quantity: item.quantity,
  }));

  const cartTotal = items.reduce(
    (total, item) => total + item.quantity * item.product.price,
    0
  );

  return (
    <ShoppingCartContext.Provider
      value={{
        ...state,
        handleChangeQuantity,
        removeItem,
        clearAllItems,
        handleAddItem,
        itemNumber,
        items,
        cartTotal,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
