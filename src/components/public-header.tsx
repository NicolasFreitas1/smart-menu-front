import { Link, useLocation } from "react-router-dom";
import { ModeToggle } from "./theme/mode-toggle";
import { useRestaurant } from "@/context/RestaurantContext";

export function PublicHeader() {
  const { pathname } = useLocation();
  const { restaurantId } = useRestaurant();

  if (!restaurantId) return null;

  return (
    <nav className="hidden md:flex justify-between border-b border-solid px-8 py-4">
      {/* ESQUERDA */}
      <div className="flex items-center gap-10">
        <Link
          to={`/${restaurantId}/home`}
          className={
            pathname === `/${restaurantId}/home`
              ? "font-bold "
              : "text-muted-foreground"
          }
        >
          Home
        </Link>
        <Link
          to={`/${restaurantId}/menu`}
          className={
            pathname === `/${restaurantId}/menu`
              ? "font-bold "
              : "text-muted-foreground"
          }
        >
          Cardápio
        </Link>
        <Link
          to={`/${restaurantId}/assistant`}
          className={
            pathname === `/${restaurantId}/assistant`
              ? "font-bold "
              : "text-muted-foreground"
          }
        >
          Assistente de Sugestão
        </Link>
        <Link
          to={`/${restaurantId}/surprise-me`}
          className={
            pathname === `/${restaurantId}/surprise-me`
              ? "font-bold "
              : "text-muted-foreground"
          }
        >
          Surpreenda-me
        </Link>
        <Link
          to={`/${restaurantId}/cart`}
          className={
            pathname === `/${restaurantId}/cart`
              ? "font-bold "
              : "text-muted-foreground"
          }
        >
          Carrinho
        </Link>
      </div>
      {/* DIREITA */}
      <div className="flex items-center gap-2 justify-center w-max-[250px] p-1 ">
        {/* <AccountMenu /> */}
        <ModeToggle />
      </div>
    </nav>
  );
}
