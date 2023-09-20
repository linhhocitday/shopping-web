import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./routes/Home";
import About from "./routes/About";
import Cart from "./routes/Cart";
import ProductList from "./routes/ProductList";
import ProductDetail from "./routes/ProductDetail";
import Root from "./routes/Root";
import { AppContext, AppProvider } from "./context/AppContext";
import { CartProvider } from "./context/ShoppingCartContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "cart", element: <Cart /> },
      { path: "products", element: <ProductList /> },
      { path: "products/:productId", element: <ProductDetail /> },
    ],
  },
]);

const App = () => {
  return (
    <>
      <AppProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </AppProvider>
    </>
  );
};

export default App;
