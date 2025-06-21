import { api } from "@/lib/axios";

interface UpdateDishProps {
  dishId: string;
  name: string;
  description: string;
  price: number;
  restaurantId: string;
  categories: string[];
}

export async function updateDish({
  dishId,
  name,
  description,
  price,
  restaurantId,
  categories,
}: UpdateDishProps) {
  await api.put(`/dishes/${dishId}`, {
    name,
    description,
    price,
    restaurantId,
    categories,
  });
}
