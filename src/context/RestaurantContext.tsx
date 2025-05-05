import { getRestaurantById } from "@/api/get-restaurant-by-id";
import { Restaurant } from "@/domain/restaurant";
import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

interface RestaurantContextProps {
  restaurant?: Restaurant;
  restaurantId?: string;
  isLoading: boolean;
}

const RestaurantContext = createContext<RestaurantContextProps>({
  restaurant: undefined,
  isLoading: true,
});

export function useRestaurant() {
  return useContext(RestaurantContext);
}

export function RestaurantProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      if (!restaurantId) return;

      setIsLoading(true);
      const { restaurant: fetchedRestaurant } = await getRestaurantById({
        restaurantId,
      });

      if (!fetchedRestaurant) {
        toast.error("Restaurante não encontrado");
      } else {
        setRestaurant(fetchedRestaurant);
      }

      setIsLoading(false);
    }

    fetch();
  }, [restaurantId]);

  return (
    <RestaurantContext.Provider value={{ restaurant, isLoading, restaurantId }}>
      {children}
    </RestaurantContext.Provider>
  );
}
