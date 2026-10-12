import { ApiError, apiRequest } from './client'
import type {
  LoginRequest,
  LoginResult,
  RegisterRequest,
  UserLocation,
} from './types'

type RawLoginUser = {
  user_id?: string | number
  user_name?: string
  user_gender?: string
  user_email?: string
  dial_code?: string
  user_mobile?: string
  member_since?: string
  email_verified?: boolean
  mobile_verified?: boolean
  user_source?: string
  user_image?: string
  first_order?: boolean
  refer_code?: string
  last_known_location?: UserLocation[]
  is_b2b?: boolean
  token?: string
  is_new_user?: boolean
}

const FORM_HEADERS = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
}

function formBody(values: Record<string, string>) {
  return new URLSearchParams(values)
}

export function requestOtp({
  phone,
  dial_code = '+91',
}: RegisterRequest) {
  return apiRequest<string>('/v1/pwa/user/register', {
    method: 'POST',
    headers: FORM_HEADERS,
    body: formBody({ phone, dial_code }),
  })
}

export async function loginWithOtp({
  phone,
  otp,
  dial_code = '+91',
}: LoginRequest): Promise<LoginResult> {
  const data = await apiRequest<RawLoginUser>('/v1/pwa/user/login', {
    method: 'POST',
    headers: FORM_HEADERS,
    body: formBody({ phone, otp, dial_code }),
  })

  if (!data.token) {
    throw new ApiError('Login succeeded without an authentication token.')
  }

  const locations = Array.isArray(data.last_known_location)
    ? data.last_known_location
    : []
  const defaultLocation =
    locations.find((location) => location.is_default) ?? locations[0] ?? null

  return {
    token: data.token,
    user: {
      user_id: String(data.user_id ?? ''),
      user_name: data.user_name?.trim() || 'Karan',
      user_gender: data.user_gender,
      user_email: data.user_email,
      dial_code: data.dial_code || dial_code,
      user_mobile: data.user_mobile || phone,
      member_since: data.member_since,
      email_verified: data.email_verified,
      mobile_verified: data.mobile_verified,
      user_source: data.user_source,
      user_image: data.user_image,
      first_order: data.first_order,
      refer_code: data.refer_code,
      is_b2b: data.is_b2b,
      is_new_user: data.is_new_user,
      default_location: defaultLocation,
    },
  }
}
