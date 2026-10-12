import { Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { PrimaryButton } from '../components/auth/primary-button'
import { DesktopNavbar } from '../components/layout/desktop-navbar'
import { portions } from '../data/menu'

type PortionId = (typeof portions)[number]['id']

export function ProductPage() {
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(3)
  const [selected, setSelected] = useState<PortionId>('jumbo')

  const handleAddToCart = () => {
    if (window.history.length > 1) {
      window.history.back()
      return
    }

    void navigate({ to: '/dashboard' })
  }

  return (
    <main className="min-h-svh bg-background md:bg-background-subtle">
      <DesktopNavbar showOnTablet />
      <div className="safe-area-screen mx-auto flex h-svh w-full max-w-auth flex-col bg-background md:h-auto md:w-[calc(100%-var(--spacing-xxxl))] md:max-w-dashboard md:bg-transparent md:pb-xl lg:w-[calc(100%-var(--spacing-huge))] lg:pb-xxl">
        {/* Mobile Header with Back Button */}
        <div className="flex h-12 items-center justify-between border-b border-border-strong px-[20px] md:hidden">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="flex h-8 w-8 items-center justify-center rounded-xs focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Back"
          >
            <img src="/back.svg" alt="" className="h-5 w-5" />
          </button>
          <span className="font-spartan text-base font-bold text-brown">
            Product Details
          </span>
          <div className="w-8" aria-hidden="true" />
        </div>

        <div className="hidden items-center gap-md md:mb-lg md:mt-xl md:flex">
          <Link
            to="/dashboard"
            className="flex items-center gap-sm rounded-sm font-mulish text-sm font-semibold text-text-secondary transition-colors hover:text-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
          >
            <img src="/back.svg" alt="" className="h-lg w-lg" />
            Back to Menu
          </Link>
          <span className="h-lg w-px bg-border-strong" aria-hidden="true" />
          <span className="font-mulish text-sm text-brown">Product Details</span>
        </div>

        <div className="scrollbar-none flex-1 overflow-y-auto px-[20px] pb-lg pt-lg md:grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-xl md:overflow-visible md:rounded-xl md:border md:border-border-strong md:bg-background md:p-xl lg:gap-xxl lg:p-xxl">
          <section>
            <img
              src="/fastor/pizza.png"
              alt="Pizza"
              className="mt-sm h-[223px] w-full rounded-[36px] object-cover md:mt-0 md:aspect-square md:h-auto md:rounded-xl lg:aspect-auto lg:h-[520px]"
              draggable={false}
            />
            <div className="mt-md h-px bg-divider md:hidden" />
          </section>

          <section className="md:flex md:flex-col">
            <div className="mt-md flex items-center justify-between md:mt-0">
              <p className="font-spartan text-2xl font-bold leading-[26px] text-orange">
                ₹14.00
              </p>
              <div className="flex items-center gap-[10px]">
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((current) => Math.max(1, current - 1))
                  }
                  className="h-[26px] w-[26px] rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label="Decrease quantity"
                >
                  <img
                    src="/fastor/minus.svg"
                    alt=""
                    className="h-full w-full"
                    draggable={false}
                  />
                </button>
                <span
                  className="min-w-[16px] text-center font-spartan text-2xl font-normal text-brown"
                  aria-live="polite"
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((current) => current + 1)}
                  className="h-[26px] w-[26px] rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label="Increase quantity"
                >
                  <img
                    src="/fastor/plus.svg"
                    alt=""
                    className="h-full w-full"
                    draggable={false}
                  />
                </button>
              </div>
            </div>

            <div className="mt-md h-px bg-divider" />
            <h1 className="mt-[14px] font-spartan text-xl font-medium text-brown">
              Lorem ipsum dolor sit amet
            </h1>
            <p className="mt-[6px] font-spartan text-base font-light leading-[20px] tracking-[-0.48px] text-brown">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore.
            </p>

            <h2 className="mb-md mt-[22px] font-spartan text-xl font-medium text-brown">
              Personal portion
            </h2>
            <div>
              {portions.map((portion) => {
                const isSelected = portion.id === selected

                return (
                  <button
                    key={portion.id}
                    type="button"
                    onClick={() => setSelected(portion.id)}
                    className="mb-lg flex w-full items-center gap-sm text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    aria-pressed={isSelected}
                  >
                    <span className="font-spartan text-sm font-light leading-[14px] text-brown">
                      {portion.label}
                    </span>
                    <span className="mb-xs flex-1 border-b border-dotted border-divider" />
                    <span className="font-spartan text-xs font-light text-brown">
                      {portion.price}
                    </span>
                    <img
                      src={
                        isSelected
                          ? '/fastor/radio-fill.svg'
                          : '/fastor/radio-empty.svg'
                      }
                      alt=""
                      className="h-[15px] w-[15px]"
                      draggable={false}
                    />
                  </button>
                )
              })}
            </div>

            <div className="mt-auto hidden pt-xxl md:block">
              <PrimaryButton
                type="button"
                label="Add to cart"
                onClick={handleAddToCart}
              />
            </div>
          </section>
        </div>

        <footer className="shrink-0 bg-background px-[20px] pb-md pt-xs md:hidden">
          <PrimaryButton
            type="button"
            label="Add to cart"
            onClick={handleAddToCart}
          />
        </footer>
      </div>
    </main>
  )
}
