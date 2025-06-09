import { api } from "@/lib/axios";

interface DeleteDishRequest {
  dishId: string;
}

export async function deleteDish({ dishId }: DeleteDishRequest) {
  await api.delete(`/dishes/${dishId}`);
}
