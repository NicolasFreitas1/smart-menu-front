import { Dish } from "@/domain/dish"
import { api } from "@/lib/axios"



export async function getDishes(): Promise<Dish[]> {
    const { data } = await api.get(`/dishes`)

    return data.dishes as Dish[]

}