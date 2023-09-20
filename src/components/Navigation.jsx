import React from "react";
import { NavLink } from "react-router-dom";
import { useShoppingCartContext } from "../hooks/useShoppingCartContext";

const Navigation = () => {
  const { itemNumber } = useShoppingCartContext();

  return (
    <nav>
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"/about"}>About</NavLink>
      <NavLink to={"/products"}>Products</NavLink>
      <NavLink to={"/cart"}>Cart({itemNumber})</NavLink>
    </nav>
  );
};

export default Navigation;
