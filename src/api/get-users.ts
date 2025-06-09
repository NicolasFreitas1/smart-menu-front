import { DataWithPagination } from "@/domain/interfaces/data-with-pagination";
import { User } from "@/domain/user";
import { api } from "@/lib/axios";

interface GetUserRequest {
  page?: number;
  per_page?: number;
}

export async function getUsers({ page, per_page }: GetUserRequest) {
  const { data } = await api.get<DataWithPagination<User>>("/users", {
    params: {
      page,
      per_page,
    },
  });

  return data;
}
