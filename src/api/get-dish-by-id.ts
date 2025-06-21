import { Dish } from "@/domain/dish";
import { api } from "@/lib/axios";

interface GetDishByIdRequest {
  dishId: string;
}

interface GetDishByIdResponse {
  dish: Dish;
}

export async function getDishById({
  dishId,
}: GetDishByIdRequest): Promise<Dish> {
  const { data } = await api.get<GetDishByIdResponse>(`/dishes/${dishId}`);
  return data.dish;
}
