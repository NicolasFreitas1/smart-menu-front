import { User } from "@/domain/user";
import { api } from "../lib/axios";

export interface SignInBody {
  email: string;
  password: string;
}

export interface SignInResponse {
  access_token: string;
  user: User;
}

export async function signIn({ email, password }: SignInBody) {
  const { data } = await api.post<SignInResponse>("/sessions", {
    email,
    password,
  });

  console.log(data);

  return data;
}
