import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getRestaurants } from '../api/restaurants'
import { DEMO_RESTAURANTS, isDemoToken } from '../data/demo'
import { useAuthStore } from '../store/use-auth-store'

export function useRestaurantsQuery(cityId = 118, page = 1) {
  const token = useAuthStore((state) => state.token)

  return useQuery({
    queryKey: [
      'restaurants',
      isDemoToken(token) ? 'demo' : 'live',
      cityId,
      page,
    ],
    queryFn: () => {
      if (isDemoToken(token)) {
        return Promise.resolve(DEMO_RESTAURANTS)
      }

      return getRestaurants({
        token: token ?? '',
        cityId,
        page,
      })
    },
    enabled: Boolean(token),
    placeholderData: keepPreviousData,
  })
}
