import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from '@tanstack/react-router'
import { RootLayout } from '../components/layout/root-layout'
import { DashboardPage } from '../pages/dashboard'
import { OtpPage } from '../pages/otp'
import { ProductPage } from '../pages/product'
import { SignUpPage } from '../pages/sign-up'
import { useAuthStore } from '../store/use-auth-store'

const rootRoute = createRootRoute({
  component: RootLayout,
})

const signUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: SignUpPage,
})

const otpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/otp',
  component: OtpPage,
})

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  beforeLoad: () => {
    if (!useAuthStore.getState().token) {
      throw redirect({ to: '/' })
    }
  },
  component: DashboardPage,
})

const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/product',
  beforeLoad: () => {
    if (!useAuthStore.getState().token) {
      throw redirect({ to: '/' })
    }
  },
  component: ProductPage,
})

const routeTree = rootRoute.addChildren([
  signUpRoute,
  otpRoute,
  dashboardRoute,
  productRoute,
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
