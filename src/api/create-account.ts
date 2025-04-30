import { api } from "../lib/axios";

export interface CreateAccountBody {
  name: string;
  email: string;
  password: string;
}

export async function createAccount({
  email,
  password,
  name,
}: CreateAccountBody) {
  await api.post("/accounts", {
    email,
    password,
    name,
  });
}
