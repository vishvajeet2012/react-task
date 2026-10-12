export type ApiStatus = 'Success' | 'Failed'

export type ApiEnvelope<T> = {
  status: ApiStatus | string
  status_code: number
  data?: T
  error_message?: string
  error?: unknown
}

export type RegisterRequest = {
  phone: string
  dial_code?: string
}

export type LoginRequest = {
  phone: string
  otp: string
  dial_code?: string
}

export type UserLocation = {
  id?: number
  address?: string
  pincode?: string
  city_name?: string
  is_default?: boolean
}

export type UserProfile = {
  user_id: string
  user_name: string
  user_gender?: string
  user_email?: string
  dial_code: string
  user_mobile: string
  member_since?: string
  email_verified?: boolean
  mobile_verified?: boolean
  user_source?: string
  user_image?: string
  first_order?: boolean
  refer_code?: string
  is_b2b?: boolean
  is_new_user?: boolean
  default_location: UserLocation | null
}

export type LoginResult = {
  token: string
  user: UserProfile
}

export type Restaurant = {
  restaurant_id: string
  restaurant_name: string
  address_complete: string
  logo: string
}

export type RestaurantPage = {
  results: Restaurant[]
  meta: {
    total_pages: number
    total_count: number
  }
}
