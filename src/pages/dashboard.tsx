import { useNavigate } from '@tanstack/react-router'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { useEffect, useRef, useState } from 'react'
import type { Restaurant, UserLocation } from '../api/types'
import { DesktopNavbar } from '../components/layout/desktop-navbar'
import { bestSellers, popularItems } from '../data/menu'
import { useRestaurantsQuery } from '../hooks/use-restaurants'
import { useAuthStore } from '../store/use-auth-store'

type ButtonMode = 'on' | 'off'

const initialButtons: Record<
  string,
  { cancel: ButtonMode; track: ButtonMode }
> = {
  shake: { cancel: 'on', track: 'off' },
  burger: { cancel: 'on', track: 'off' },
  'sushi-wave': { cancel: 'off', track: 'off' },
  'shake-2': { cancel: 'off', track: 'off' },
}

const repeatedBestSellers = Array.from({ length: 10 }, (_, copyIndex) =>
  bestSellers.map((item) => ({
    ...item,
    instanceId: `${copyIndex}-${item.id}`,
  })),
).flat()

const promotions = Array.from({ length: 5 }, (_, index) => ({
  id: `promotion-${index}`,
  image: '/fastor/banner.png',
}))

function cleanLocationPart(value: string | undefined) {
  const normalized = value?.trim()
  return normalized && normalized.toLowerCase() !== 'null' ? normalized : ''
}

function getLocationLabel(location: UserLocation | null | undefined) {
  const city = cleanLocationPart(location?.city_name)
  const address = cleanLocationPart(location?.address)

  return city || address || 'Model Town, New Delhi'
}

export function DashboardPage() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const [page, setPage] = useState(1)
  const [buttons, setButtons] = useState(initialButtons)
  const sellerStripRef = useRef<HTMLDivElement>(null)
  const restaurantsQuery = useRestaurantsQuery(118, page)
  const restaurants = restaurantsQuery.data?.results ?? []
  const meta = restaurantsQuery.data?.meta
  const openProduct = () => void navigate({ to: '/product' })

  const scrollSellers = (direction: -1 | 1) => {
    const strip = sellerStripRef.current
    if (strip) {
      strip.scrollBy({
        left: direction * strip.clientWidth * 0.8,
        behavior: 'smooth',
      })
    }
  }

  const toggleButton = (
    itemId: string,
    button: 'cancel' | 'track',
  ) => {
    setButtons((current) => ({
      ...current,
      [itemId]: {
        ...current[itemId],
        [button]: current[itemId][button] === 'on' ? 'off' : 'on',
      },
    }))
  }

  return (
    <main className="min-h-svh bg-background md:bg-background-subtle">
      <DesktopNavbar
        locationLabel={getLocationLabel(user?.default_location)}
        showOnTablet
      />
      <div className="safe-area-top mx-auto min-h-svh w-full max-w-auth bg-background pb-xxl md:min-h-0 md:w-[calc(100%-var(--spacing-xxxl))] md:max-w-dashboard md:bg-transparent md:pb-xl lg:w-[calc(100%-var(--spacing-huge))] lg:pb-xxl">
        <header>
          {/* Mobile Header Bar */}
          <div className="md:hidden">
            <div className="flex h-[60px] flex-col justify-center gap-xs border-b border-border-strong px-[20px]">
              <p className="font-inter text-xs text-text opacity-40">
                Current Locations
              </p>
              <p className="truncate font-inter text-xs font-bold leading-[15px] text-neutral-950">
                {getLocationLabel(user?.default_location)}
              </p>
            </div>

            <div className="flex items-center justify-between px-[20px]">
              <div className="flex h-[60px] w-[174px] items-center rounded-b-[20px] bg-background-card pr-md">
                <p className="truncate font-inter text-lg font-medium text-text opacity-50">
                  {user?.user_name || 'Karan'}
                </p>
              </div>
              <div className="flex gap-[10px]">
                <button
                  type="button"
                  className="h-12 w-12 overflow-hidden rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label="Call support"
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
                  className="h-12 w-12 overflow-hidden rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label="Open wallet"
                >
                  <img
                    src="/fastor/wallet-button.png"
                    alt=""
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                </button>
              </div>
            </div>
          </div>

        </header>

        <div className="hidden md:block md:py-xxl">
          <p className="font-spartan text-3xl font-bold text-brown">
            Good food, close to you.
          </p>
          <p className="mt-xs font-mulish text-sm text-text-secondary">
            Discover your favourites and explore nearby restaurants.
          </p>
        </div>

        <div className="md:grid md:gap-xl">
          <section
            id="best-seller"
            className="relative md:min-w-0 md:scroll-mt-xl md:rounded-xl md:border md:border-border-strong md:bg-background md:p-xl lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-x-xl lg:gap-y-lg"
          >
            <h1 className="mx-[20px] mb-md mt-[18px] font-spartan text-xl font-medium text-brown md:mx-0 md:mb-xl md:mt-0 md:text-2xl md:font-semibold lg:col-start-1 lg:row-start-1 lg:mb-0">
              Best Seller
            </h1>
            <div className="absolute right-xl top-xl hidden items-center gap-sm md:flex lg:static lg:col-start-1 lg:row-start-1 lg:self-start lg:justify-self-end">
              <SellerArrow direction="previous" onClick={() => scrollSellers(-1)} />
              <SellerArrow direction="next" onClick={() => scrollSellers(1)} />
            </div>
            <div ref={sellerStripRef} className="scrollbar-none flex gap-md overflow-x-auto px-[20px] md:gap-lg md:px-0 lg:col-start-1 lg:row-start-2">
              {repeatedBestSellers.map((item) => (
                <button
                  key={item.instanceId}
                  type="button"
                  onClick={openProduct}
                  aria-label={`Open product priced ${item.price}`}
                  className="relative h-[108px] w-[72px] shrink-0 overflow-hidden rounded-[20px] md:h-dashboard-seller-height md:w-dashboard-seller-width md:rounded-xl md:transition-transform md:hover:-translate-y-xxs md:focus-visible:outline-2 md:focus-visible:outline-offset-2 md:focus-visible:outline-orange"
                >
                  <img
                    src={item.image}
                    alt=""
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                  <div className="absolute bottom-md right-0 flex h-lg items-center rounded-l-full bg-orange pl-xs pr-[1px]">
                    <span className="font-spartan text-xs leading-lg text-text-inverse md:px-xs md:text-sm md:leading-lg">
                      {item.price}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <PromotionCarousel onOpenProduct={openProduct} />
          </section>

          <section id="popular-items" className="md:min-w-0 md:scroll-mt-xl md:rounded-xl md:border md:border-border-strong md:bg-background md:p-xl">
            <h2 className="mx-[20px] mb-md mt-[18px] font-spartan text-xl font-medium text-brown md:mx-0 md:mb-xl md:mt-0 md:text-2xl md:font-semibold">
              Popular Items
            </h2>
            <div className="md:grid md:grid-cols-2 md:gap-lg xl:grid-cols-4">
              {popularItems.map((item) => {
                const state = buttons[item.id]

                return (
                  <article
                    key={item.id}
                    className="mb-[18px] flex gap-md px-lg md:mb-0 md:min-w-0 md:rounded-lg md:bg-background-card md:p-md md:transition-shadow md:hover:shadow-sm xl:flex-col xl:p-lg"
                  >
                    <button
                      type="button"
                      onClick={openProduct}
                      aria-label={`Open ${item.name}`}
                      className="h-[108px] w-[72px] shrink-0 overflow-hidden rounded-[20px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 xl:h-dashboard-seller-height xl:w-full xl:rounded-lg"
                    >
                      <img
                        src={item.image}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover"
                        draggable={false}
                      />
                    </button>
                    <div className="min-w-0 flex-1 pt-xxs">
                      <button
                        type="button"
                        onClick={openProduct}
                        className="flex w-full gap-sm text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      >
                        <h3 className="min-w-0 flex-1 font-spartan text-xl font-medium text-brown md:text-lg md:leading-subtitle">
                          {item.name}
                        </h3>
                        <p className="shrink-0 font-spartan text-xl font-medium text-orange md:text-lg md:leading-subtitle">
                          {item.price}
                        </p>
                      </button>
                      <div className="mt-[6px] flex justify-between">
                        <p className="font-spartan text-sm font-light leading-[14px] text-brown md:text-xs md:font-normal md:leading-subtitle md:text-text-secondary">
                          {item.date}
                        </p>
                        <p className="font-spartan text-sm font-light leading-[14px] text-brown md:text-xs md:font-normal md:leading-subtitle md:text-text-secondary">
                          {item.count}
                        </p>
                      </div>
                      <div className="mt-[10px] flex items-center justify-between gap-xs md:flex-wrap md:justify-start md:gap-sm">
                        <OrderButton
                          label="Cancel Order"
                          mode={state.cancel}
                          onClick={() => toggleButton(item.id, 'cancel')}
                        />
                        <OrderButton
                          label="Track Driver"
                          mode={state.track}
                          onClick={() => toggleButton(item.id, 'track')}
                        />
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>
        </div>

        <section
          id="restaurants"
          className="mt-xs border-t border-border-strong pt-xs md:mt-xl md:scroll-mt-xl md:rounded-xl md:border md:bg-background md:p-xl"
          aria-busy={restaurantsQuery.isFetching}
        >
          <div className="mx-[20px] mb-md mt-[18px] flex items-center justify-between md:mx-0 md:mb-xl md:mt-0">
            <div>
              <h2 className="font-spartan text-xl font-medium text-brown md:text-2xl md:font-semibold">
                Restaurants Near You
              </h2>
              <p className="mt-xs font-mulish text-xs text-text-muted md:text-sm md:text-text-secondary">
                Popular places available in your city
              </p>
            </div>
            {restaurantsQuery.isFetching && !restaurantsQuery.isPending && (
              <span className="font-mulish text-xs font-medium text-text-muted">
                Updating…
              </span>
            )}
          </div>

          {restaurantsQuery.isPending && <RestaurantSkeletons />}

          {restaurantsQuery.isError && (
            <div
              className="mx-[20px] rounded-sm border border-danger bg-danger-bg-light p-md md:mx-0"
              role="alert"
            >
              <p className="font-mulish text-xs font-medium text-danger">
                {restaurantsQuery.error.message}
              </p>
              <button
                type="button"
                onClick={() => void restaurantsQuery.refetch()}
                className="mt-sm font-mulish text-sm font-bold text-danger underline"
              >
                Try again
              </button>
            </div>
          )}

          {!restaurantsQuery.isPending &&
            !restaurantsQuery.isError &&
            restaurants.length === 0 && (
              <p className="mx-[20px] rounded-sm bg-background-card p-md font-mulish text-sm text-text-secondary md:mx-0">
                No restaurants found in this area.
              </p>
            )}

          {restaurants.length > 0 && (
            <div className="md:grid md:grid-cols-2 md:gap-lg">
              {restaurants.map((restaurant, index) => (
                <RestaurantCard
                  key={`${restaurant.restaurant_id}-${index}`}
                  restaurant={restaurant}
                  fallbackImage={popularItems[index % popularItems.length].image}
                />
              ))}
            </div>
          )}

          {meta && meta.total_pages > 1 && (
            <nav
              className="mx-[20px] mt-lg flex items-center justify-between gap-sm md:mx-0 md:border-t md:border-border-strong md:pt-lg"
              aria-label="Restaurant pages"
            >
              <button
                type="button"
                disabled={page <= 1 || restaurantsQuery.isFetching}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                className="h-9 rounded-full bg-orange-soft px-lg font-mulish text-sm font-bold text-orange disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-center font-mulish text-xs font-medium text-text-secondary">
                {page} / {meta.total_pages} · {meta.total_count} restaurants
              </span>
              <button
                type="button"
                disabled={page >= meta.total_pages || restaurantsQuery.isFetching}
                onClick={() =>
                  setPage((current) => Math.min(meta.total_pages, current + 1))
                }
                className="h-9 rounded-full bg-orange px-lg font-mulish text-sm font-bold text-text-inverse disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </nav>
          )}
        </section>
      </div>
    </main>
  )
}

function SellerArrow({
  direction,
  onClick,
}: {
  direction: 'previous' | 'next'
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Scroll best sellers ${direction}`}
      className="flex h-xxl w-xxl items-center justify-center rounded-full border border-border-strong text-brown transition-colors hover:border-orange hover:bg-orange-soft hover:text-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-lg w-lg" aria-hidden="true">
        <path
          d={direction === 'previous' ? 'm14 6-6 6 6 6' : 'm10 6 6 6-6 6'}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

function PromotionCarousel({
  onOpenProduct,
}: {
  onOpenProduct: () => void
}) {
  const [selectedIndex, setSelectedIndex] = useState(2)
  const [autoplay] = useState(() =>
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  )
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, startIndex: 2 },
    [autoplay],
  )

  useEffect(() => {
    if (!emblaApi) {
      return
    }

    const updateSelectedIndex = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }

    updateSelectedIndex()
    emblaApi.on('select', updateSelectedIndex)
    emblaApi.on('reInit', updateSelectedIndex)

    return () => {
      emblaApi.off('select', updateSelectedIndex)
      emblaApi.off('reInit', updateSelectedIndex)
    }
  }, [emblaApi])

  return (
    <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
      <div
        ref={emblaRef}
        className="mx-[20px] mt-[22px] h-[128px] touch-pan-y overflow-hidden rounded-[20px] md:mx-0 md:mt-xl md:h-dashboard-promotion-height md:rounded-xl lg:mt-0 lg:aspect-[350/128] lg:h-auto"
      >
        <div className="flex h-full">
          {promotions.map((promotion) => (
            <button
              key={promotion.id}
              type="button"
              onClick={onOpenProduct}
              aria-label="Open promotional product"
              className="relative h-full min-w-0 flex-[0_0_100%]"
            >
              <img
                src={promotion.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-y-0 left-0 flex w-[46%] flex-col items-center justify-center px-md text-center">
                <p className="font-spartan text-[15px] leading-lg text-background-subtle md:text-lg md:leading-subtitle">
                  Experience our
                  <br />
                  delicious new dish
                </p>
                <p className="mt-xxs truncate font-spartan text-[26px] font-bold leading-xl text-background-subtle md:text-3xl md:leading-xxl">
                  30% OFF
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div
        className="mt-[10px] flex justify-center gap-xs"
        aria-label={`Promotion ${selectedIndex + 1} of ${promotions.length}`}
      >
        {promotions.map((promotion, index) => (
          <button
            key={promotion.id}
            type="button"
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Show promotion ${index + 1}`}
            aria-current={index === selectedIndex ? 'true' : undefined}
            className={`h-xs w-[20px] rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
              index === selectedIndex ? 'bg-orange' : 'bg-dot'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

function OrderButton({
  label,
  mode,
  onClick,
}: {
  label: string
  mode: ButtonMode
  onClick: () => void
}) {
  const isOn = mode === 'on'

  return (
    <button
      type="button"
      aria-pressed={isOn}
      onClick={onClick}
      className={`h-[26px] shrink-0 rounded-full px-md font-spartan text-[15px] leading-lg tracking-[-0.075px] transition-colors md:h-xxl md:px-sm md:text-xs ${
        isOn
          ? 'border border-orange bg-orange font-medium text-text-inverse'
          : 'bg-orange-soft font-normal text-orange'
      }`}
    >
      {label}
    </button>
  )
}

function RestaurantCard({
  restaurant,
  fallbackImage,
}: {
  restaurant: Restaurant
  fallbackImage: string
}) {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <article className="mx-[20px] mb-[18px] flex min-h-[108px] gap-md rounded-lg bg-background-card p-md shadow-sm md:mx-0 md:mb-0 md:gap-lg md:p-lg md:shadow-none">
      <img
        src={imageFailed || !restaurant.logo ? fallbackImage : restaurant.logo}
        alt=""
        loading="lazy"
        onError={() => setImageFailed(true)}
        className="h-[108px] w-[72px] shrink-0 rounded-[20px] object-cover md:h-dashboard-restaurant-image md:w-dashboard-restaurant-image md:rounded-lg"
        draggable={false}
      />
      <div className="min-w-0 flex-1 pt-xxs">
        <div className="flex items-start justify-between gap-sm">
          <h3 className="line-clamp-2 min-w-0 flex-1 font-spartan text-xl font-medium text-brown">
            {restaurant.restaurant_name}
          </h3>
          <span className="shrink-0 rounded-full bg-orange-soft px-sm py-xs font-spartan text-xs font-medium text-orange">
            #{restaurant.restaurant_id}
          </span>
        </div>
        <p className="mt-[6px] line-clamp-3 font-spartan text-sm font-light leading-lg text-brown md:font-normal md:leading-subtitle md:text-text-secondary">
          {restaurant.address_complete || 'Address unavailable'}
        </p>
      </div>
    </article>
  )
}

function RestaurantSkeletons() {
  return (
    <div
      className="md:grid md:grid-cols-2 md:gap-lg"
      aria-hidden="true"
    >
      {[0, 1, 2, 3].map((item) => (
        <div
          key={item}
          className="mx-[20px] mb-[18px] flex h-[108px] animate-pulse gap-md rounded-lg bg-background-card p-md md:mx-0 md:mb-0 md:h-auto md:gap-lg md:p-lg"
        >
          <div className="h-[108px] w-[72px] shrink-0 rounded-[20px] bg-background-element md:h-dashboard-restaurant-image md:w-dashboard-restaurant-image md:rounded-lg" />
          <div className="flex-1 pt-xxs">
            <div className="h-xl w-2/3 rounded-xs bg-background-element" />
            <div className="mt-sm h-sm w-full rounded-xs bg-background-element" />
            <div className="mt-sm h-sm w-4/5 rounded-xs bg-background-element" />
          </div>
        </div>
      ))}
    </div>
  )
}
