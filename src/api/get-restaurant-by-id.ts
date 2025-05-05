import { Restaurant } from "@/domain/restaurant"
import { api } from "@/lib/axios"

export interface GetRestaurantParams {
    restaurantId: string
}

export interface GetRestaurantResponse {
    restaurant: Restaurant
}

export async function getRestaurantById({ restaurantId }: GetRestaurantParams) {
    const { data } = await api.get<GetRestaurantResponse>(`/restaurants/${restaurantId}`)

    return data

}