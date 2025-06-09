import { Dish } from "@/domain/dish";
import { api } from "@/lib/axios";

interface GetRandomDishFromRestaurantRequest {
  restaurantId: string;
  category: string
}

interface GetRandomDishFromRestaurantResponse {
  dish: Dish
}

export async function getRandomDishFromRestaurant({
  restaurantId,
  category,
}: GetRandomDishFromRestaurantRequest) {
  const { data } = await api.get<GetRandomDishFromRestaurantResponse>(
    `/dishes/random/${restaurantId}`,
    {
      params: {
        category,
      },
    }
  );

  return data;
}
