import { useCart } from "@/context/CartContext";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { useRestaurant } from "@/context/RestaurantContext";

interface DishItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
}

export function DishItem({ id, description, name, price }: DishItemProps) {
  const { restaurantId } = useRestaurant();
  const { cartItems, addToCart, removeFromCart } = useCart();

  const cartItem = cartItems.find((item) => item.id === id);

  function handleAdd() {
    addToCart({
      id,
      name,
      description,
      price,
      restaurantId: restaurantId ?? "",
    });
  }

  function handleRemove() {
    removeFromCart(id);
  }

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="break-words">
        <p>
          <strong>Prato: </strong>
          {name}
        </p>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap">
          <strong>Descrição: </strong>
          {description}
        </p>

        <p>
          <b>Preço: </b>
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(price)}
        </p>

        <div className="flex flex-col items-center justify-center mt-6 space-y-2">
          {!cartItem ? (
            <Button
              className="bg-green-600 hover:bg-green-700 font-bold"
              onClick={handleAdd}
            >
              Selecionar
            </Button>
          ) : (
            <div className="flex items-center gap-4">
              <Button onClick={handleRemove} variant="outline">
                -
              </Button>
              <span>{cartItem.quantity}</span>
              <Button onClick={handleAdd} variant="outline">
                +
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
