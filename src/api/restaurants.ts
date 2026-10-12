import { apiRequest } from './client'
import type { RestaurantPage } from './types'

type GetRestaurantsInput = {
  token: string
  cityId?: number
  page?: number
}

export async function getRestaurants({
  token,
  cityId = 118,
  page = 1,
}: GetRestaurantsInput): Promise<RestaurantPage> {
  const search = new URLSearchParams({
    city_id: String(cityId),
    page_no: String(page),
  })

  const data = await apiRequest<RestaurantPage>(
    `/v1/m/restaurant?${search.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return {
    results: (Array.isArray(data.results) ? data.results : []).map(
      (restaurant) => ({
        restaurant_id: String(restaurant.restaurant_id ?? ''),
        restaurant_name: restaurant.restaurant_name?.trim() || 'Restaurant',
        address_complete:
          restaurant.address_complete?.trim().toLowerCase() === 'null'
            ? ''
            : restaurant.address_complete?.trim() || '',
        logo: restaurant.logo?.trim() || '',
      }),
    ),
    meta: {
      total_pages: Number(data.meta?.total_pages) || 1,
      total_count: Number(data.meta?.total_count) || 0,
    },
  }
}
