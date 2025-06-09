import { Category } from "@/domain/category";
import { api } from "@/lib/axios";

export async function getCategories() {
  const { data } = await api.get<Category[]>("/categories");

  return data;
}
