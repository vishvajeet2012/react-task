import type { RestaurantPage, UserProfile } from '../api/types'

export const DEMO_PHONE = '123456'
export const DEMO_OTP = '123456'
export const DEMO_TOKEN = 'fastor-local-demo-token'

export const DEMO_USER: UserProfile = {
  user_id: 'demo-user',
  user_name: 'Karan',
  dial_code: '+91',
  user_mobile: DEMO_PHONE,
  mobile_verified: true,
  user_source: 'DEMO',
  is_new_user: false,
  default_location: {
    id: 118,
    address: 'Model Town, New Delhi',
    city_name: 'New Delhi',
    is_default: true,
  },
}

export const DEMO_RESTAURANTS: RestaurantPage = {
  results: [
    {
      restaurant_id: '75',
      restaurant_name: 'VYB',
      address_complete: 'Model Town, New Delhi',
      logo: '/fastor/shake.png',
    },
    {
      restaurant_id: '74',
      restaurant_name: 'Mother India',
      address_complete: 'Hudson Lane, New Delhi',
      logo: '/fastor/burger.png',
    },
    {
      restaurant_id: '73',
      restaurant_name: 'Sushi House',
      address_complete: 'Kamla Nagar, New Delhi',
      logo: '/fastor/best-sushi.png',
    },
    {
      restaurant_id: '72',
      restaurant_name: 'Pizza Junction',
      address_complete: 'Civil Lines, New Delhi',
      logo: '/fastor/shake-2.png',
    },
  ],
  meta: {
    total_pages: 1,
    total_count: 4,
  },
}

export function isDemoPhone(phone: string) {
  return phone === DEMO_PHONE
}

export function isDemoToken(token: string | null) {
  return token === DEMO_TOKEN
}
