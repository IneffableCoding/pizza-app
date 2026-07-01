import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Cart } from "./pages/Cart/Cart";
import { Layout } from "./layout/Layout/Layout.tsx";
import { AuthLayout } from "./layout/Auth/AuthLayout";
import { Product } from "./pages/Product/Product";
import axios from "axios";
import { PREFIX } from "./helpers/API";
import { Error as ErrorPage } from "./pages/Error/Error";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { RequireAuth } from "./helpers/RequireAuth";
import { Provider } from "react-redux";
import { store } from './store/store.ts';

const Menu = lazy(() => import("./pages/Menu/Menu"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<>Загрузка...</>}>
            <Menu />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/product/:id",
        element: <Product />,
        errorElement: <>Ошибка</>,
        loader: async ({ params }) => {
          const { data } = await axios.get(`${PREFIX}/products/${params.id}`);
          return data;
        },
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
