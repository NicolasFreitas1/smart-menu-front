import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./pages/_layout/app";
import { Error } from "./pages/error";
import { AuthLayout } from "./pages/_layout/auth";
import { SignIn } from "./pages/auth/sign-in";
import { SignUp } from "./pages/auth/sign-up";
import { NotFound } from "./pages/not-found";
import { PublicLayout } from "./pages/_layout/public";
import { Home } from "./pages/app/home/home";
import { Menu } from "./pages/app/menu/menu";
import { Cart } from "./pages/app/cart/cart";
import { SurpriseMe } from "./pages/app/surprise-me/surprise-me";
import { Assistant } from "./pages/app/assistant/assistant";
import { AdminLayout } from "./pages/admin/layout/layout";
import { UsersPage } from "./pages/admin/users/users";
import { MenuPage } from "./pages/admin/menu/menu";
import { OrdersPage } from "./pages/admin/orders/orders";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
  },
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/:restaurantId/home",
        element: <Home />,
      },
      {
        path: "/:restaurantId/menu",
        element: <Menu />,
      },
      {
        path: "/:restaurantId/cart",
        element: <Cart />,
      },
      {
        path: "/:restaurantId/surprise-me",
        element: <SurpriseMe />,
      },
      {
        path: "/:restaurantId/assistant",
        element: <Assistant />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "user", element: <UsersPage /> },
      { path: "menu", element: <MenuPage /> },
      { path: "orders", element: <OrdersPage /> },
    ],
  },
]);
