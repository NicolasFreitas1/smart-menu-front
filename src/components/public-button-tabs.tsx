import { useRestaurant } from "@/context/RestaurantContext";
import {
  BotMessageSquare,
  Home,
  Lightbulb,
  ShoppingCart,
  Utensils,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "./ui/button";

export function PublicButtonTabs() {
  const { pathname } = useLocation();
  const { restaurantId } = useRestaurant();

  if (!restaurantId) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 md:hidden border-t flex justify-around items-center h-14">
      {/* Home */}
      <NavLink
        to={`/${restaurantId}/home`}
        className={
          pathname === `/${restaurantId}/home`
            ? "font-bold"
            : "text-muted-foreground"
        }
      >
        <Button variant="ghost">
          <Home />
        </Button>
      </NavLink>

      {/* Menu */}
      <NavLink
        to={`/${restaurantId}/menu`}
        className={
          pathname === `/${restaurantId}/menu`
            ? "font-bold"
            : "text-muted-foreground"
        }
      >
        <Button variant="ghost">
          <Utensils />
        </Button>
      </NavLink>

      {/* Assistente IA - botão destacado flutuante */}
      <div className="relative -top-6">
        <NavLink
          to={`/${restaurantId}/assistant`}
          className={
            pathname === `/${restaurantId}/assistant`
              ? "font-bold"
              : "text-muted-foreground"
          }
        >
          <Button
            className="w-14 h-14 rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700"
            variant="default"
          >
            <BotMessageSquare className="w-6 h-6" />
          </Button>
        </NavLink>
      </div>

      {/* Surpreenda-me */}
      <NavLink
        to={`/${restaurantId}/surprise-me`}
        className={
          pathname === `/${restaurantId}/surprise-me`
            ? "font-bold"
            : "text-muted-foreground"
        }
      >
        <Button variant="ghost">
          <Lightbulb />
        </Button>
      </NavLink>

      {/* Carrinho */}
      <NavLink
        to={`/${restaurantId}/cart`}
        className={
          pathname === `/${restaurantId}/cart`
            ? "font-bold"
            : "text-muted-foreground"
        }
      >
        <Button variant="ghost">
          <ShoppingCart />
        </Button>
      </NavLink>
    </nav>
  );
}
