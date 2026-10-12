import { Link, useNavigate } from '@tanstack/react-router'
import type { UserLocation } from '../../api/types'
import { useAuthStore } from '../../store/use-auth-store'

function cleanLocationPart(value: string | undefined) {
  const normalized = value?.trim()
  return normalized && normalized.toLowerCase() !== 'null' ? normalized : ''
}

function getLocationLabel(location: UserLocation | null | undefined) {
  const city = cleanLocationPart(location?.city_name)
  const address = cleanLocationPart(location?.address)

  return city || address || 'Model Town, New Delhi'
}

type DesktopNavbarProps = {
  locationLabel?: string
  onCallClick?: () => void
  onWalletClick?: () => void
  showBackNav?: boolean
  showOnTablet?: boolean
}

export function DesktopNavbar({
  locationLabel,
  onCallClick,
  onWalletClick,
  showBackNav = false,
  showOnTablet = false,
}: DesktopNavbarProps) {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  const displayLocation =
    locationLabel ?? getLocationLabel(user?.default_location)
  const userName = user?.user_name?.trim() || user?.user_mobile || 'Guest'

  const handleLogout = () => {
    logout()
    void navigate({ to: '/' })
  }

  return (
    <div
      data-desktop-header
      className={`hidden w-full border-b border-border-strong bg-background ${
        showOnTablet ? 'md:block' : 'lg:block'
      }`}
    >
      <nav
        className="mx-auto flex w-full min-w-0 max-w-dashboard flex-wrap items-center justify-between gap-lg px-xl py-lg lg:px-xxl"
        aria-label="Desktop navigation bar"
      >
        <div className="flex min-w-0 items-center gap-lg">
          <Link
            to="/dashboard"
            className="flex items-center gap-md rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Fastor Home"
          >
            <img
              src="/pwa-512.svg"
              alt="Fastor Logo"
              className="h-10 w-10 rounded-sm object-contain shadow-sm transition-transform hover:scale-105"
              draggable={false}
            />
            <span className="font-spartan text-xl font-bold tracking-tight text-brown">
              FASTOR
            </span>
          </Link>

          <div className="h-6 w-px bg-border-strong" aria-hidden="true" />

          <div className="flex min-w-0 items-center gap-sm rounded-lg bg-background-card px-md py-sm">
            <svg
              className="h-4 w-4 shrink-0 text-orange"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <div className="flex flex-col">
              <span className="font-inter text-caption font-medium uppercase tracking-wider text-text-secondary">
                Current Location
              </span>
              <span className="max-w-[180px] truncate font-inter text-xs font-bold leading-tight text-brown">
                {displayLocation}
              </span>
            </div>
          </div>
        </div>

        {showBackNav ? (
          <div className="flex items-center gap-sm">
            <Link
              to="/dashboard"
              className="flex items-center gap-xs rounded-full border border-border-strong bg-background-card px-md py-xs font-mulish text-xs font-bold text-text transition-colors hover:border-orange hover:text-orange focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <img src="/back.svg" alt="" className="h-3.5 w-3.5" />
              <span>Back to Menu</span>
            </Link>
          </div>
        ) : (
          <div className="order-last flex w-full items-center gap-xl border-t border-border-strong pt-md" aria-label="Desktop menu">
            <a
              href="/dashboard#best-seller"
              className="rounded-xs px-xs py-xs font-mulish text-sm font-semibold text-text-secondary transition-colors hover:text-orange focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Best Sellers
            </a>
            <a
              href="/dashboard#popular-items"
              className="rounded-xs px-xs py-xs font-mulish text-sm font-semibold text-text-secondary transition-colors hover:text-orange focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Popular Items
            </a>
            <a
              href="/dashboard#restaurants"
              className="rounded-xs px-xs py-xs font-mulish text-sm font-semibold text-text-secondary transition-colors hover:text-orange focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Restaurants
            </a>
          </div>
        )}

        <div className="flex items-center gap-md">
          <div className="flex items-center gap-xs rounded-full border border-border-strong bg-background-card py-xs pl-xs pr-md">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange font-spartan text-xs font-bold text-text-inverse">
              {userName.charAt(0).toUpperCase()}
            </span>
            <span className="hidden max-w-huge truncate font-inter text-xs font-bold text-brown lg:block">
              {userName}
            </span>
          </div>

          <div className="flex items-center gap-xs">
            <button
              type="button"
              onClick={onCallClick}
              className="h-10 w-10 overflow-hidden rounded-sm transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Call support"
              title="Call support"
            >
              <img
                src="/fastor/call-button.png"
                alt=""
                className="h-full w-full object-cover"
                draggable={false}
              />
            </button>
            <button
              type="button"
              onClick={onWalletClick}
              className="h-10 w-10 overflow-hidden rounded-sm transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Open wallet"
              title="Open wallet"
            >
              <img
                src="/fastor/wallet-button.png"
                alt=""
                className="h-full w-full object-cover"
                draggable={false}
              />
            </button>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex h-9 items-center gap-xs rounded-sm border border-border px-sm font-mulish text-xs font-bold text-text-secondary transition-colors hover:border-danger hover:bg-danger-bg-light hover:text-danger focus:outline-none focus:ring-2 focus:ring-danger"
            title="Sign out of Fastor"
            aria-label="Sign out of Fastor"
          >
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="hidden lg:inline">Logout</span>
          </button>
        </div>
      </nav>
    </div>
  )
}
