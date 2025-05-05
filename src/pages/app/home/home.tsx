import { CartResume } from "@/components/cart-resume";
import { useCart } from "@/context/CartContext";
import { useRestaurant } from "@/context/RestaurantContext";
import { BotMessageSquare, Lightbulb, Utensils } from "lucide-react";
import { OptionCard } from "./components/option-card";

export function Home() {
  const { restaurant, isLoading, restaurantId } = useRestaurant();
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  if (isLoading) return <p>Carregando...</p>;

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 space-y-12">
      <h1 className="text-xl font-bold text-center">
        Olá, bem-vindo ao {restaurant?.name}
      </h1>

      <p className="text-sm text-center text-muted-foreground max-w-sm">
        Escolha uma das opções abaixo para começar seu pedido ou explorar o
        cardápio.
      </p>

      <div className="grid grid-cols-1 gap-6 w-full max-w-sm">
        <OptionCard
          title="Surpreenda-me"
          redirectTo={`/${restaurantId}/surprise-me`}
          icon={Lightbulb}
        />
        <OptionCard
          title="Sugestão"
          redirectTo={`/${restaurantId}/assistant`}
          icon={BotMessageSquare}
        />
        <OptionCard
          title="Cardápio"
          redirectTo={`/${restaurantId}/menu`}
          icon={Utensils}
        />
      </div>

      {totalItems > 0 && (
        <CartResume totalItems={totalItems} totalPrice={totalPrice} />
      )}
    </div>
  );
}
