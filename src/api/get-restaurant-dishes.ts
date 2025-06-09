import { Dish } from "@/domain/dish";
import { DataWithPagination } from "@/domain/interfaces/data-with-pagination";
import { api } from "@/lib/axios";

interface GetRestaurantDishesRequest {
  restaurantId: string;
  page?: number;
  per_page?: number;
  categoryFilter?: string;
}

export async function getRestaurantDishes({
  restaurantId,
  categoryFilter,
  page,
  per_page,
}: GetRestaurantDishesRequest): Promise<DataWithPagination<Dish>> {
  const { data } = await api.get<DataWithPagination<Dish>>(
    `/dishes/restaurant/${restaurantId}`,
    {
      params: {
        page,
        per_page,
        categoryFilter,
      },
    }
  );

  return data;
}
