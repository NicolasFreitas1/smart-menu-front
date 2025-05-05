import { useRestaurant } from "@/context/RestaurantContext";
import { useNavigate } from "react-router-dom";

interface CartResumeProps {
  totalItems: number;
  totalPrice: number;
}

export function CartResume({ totalItems, totalPrice }: CartResumeProps) {
  const { restaurantId } = useRestaurant();

  const navigate = useNavigate();

  return (
    <div className="bg-green-100 text-green-900 p-4 rounded-md w-full max-w-sm text-sm shadow flex justify-between items-center">
      <div>
        <p>
          <strong>{totalItems}</strong> item{totalItems > 1 && "s"} no carrinho
        </p>
        <p className="text-xs text-muted-foreground">
          Total:{" "}
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(totalPrice)}
        </p>
      </div>
      <button
        onClick={() => navigate(`/${restaurantId}/cart`)}
        className="text-sm font-semibold underline text-green-800"
      >
        Ver carrinho
      </button>
    </div>
  );
}
