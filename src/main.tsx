import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Menu } from "./pages/Menu/Menu";
import { Cart } from "./pages/Cart/Cart";
import { Layout } from './layout/Layout/Layout'
import { Error } from "./pages/Error/Error"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Menu />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
