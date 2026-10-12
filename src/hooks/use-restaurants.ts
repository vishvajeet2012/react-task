import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getRestaurants } from '../api/restaurants'
import { useAuthStore } from '../store/use-auth-store'

export function useRestaurantsQuery(cityId = 118, page = 1) {
  const token = useAuthStore((state) => state.token)

  return useQuery({
    queryKey: ['restaurants', token, cityId, page],
    queryFn: () =>
      getRestaurants({
        token: token ?? '',
        cityId,
        page,
      }),
    enabled: Boolean(token),
    placeholderData: keepPreviousData,
  })
}
