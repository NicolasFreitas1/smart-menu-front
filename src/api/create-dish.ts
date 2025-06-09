import { api } from "@/lib/axios";

interface CreateDishProps {
  name: string;
  description: string;
  price: number;
  restaurantId: string;
  categories: string[];
}

export async function createDish({
  categories,
  description,
  name,
  price,
  restaurantId,
}: CreateDishProps) {
  await api.post("/dishes", {
    categories,
    description,
    name,
    price,
    restaurantId,
  });
}
