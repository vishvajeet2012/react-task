import type { ReactNode } from 'react'

type AuthShellProps = {
  children: ReactNode
  step: 1 | 2
}

const desktopCopy = {
  1: {
    eyebrow: 'Create your account',
    title: 'Your next favourite starts here.',
    description:
      'Discover nearby restaurants and keep your favourite food just a tap away.',
  },
  2: {
    eyebrow: 'Secure verification',
    title: 'One last step, then you’re in.',
    description:
      'Verify your mobile number to continue to your Fastor account.',
  },
} as const

export function AuthShell({ children, step }: AuthShellProps) {
  const copy = desktopCopy[step]

  return (
    <main className="min-h-svh bg-background md:bg-background-subtle">
      <section className="min-h-svh bg-background md:flex md:items-center md:justify-center md:bg-background-subtle md:p-xl lg:p-xxl">
        <div className="mx-auto min-h-svh w-full max-w-auth bg-background md:grid md:min-h-0 md:max-w-auth-shell md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:overflow-hidden md:rounded-xl md:border md:border-border-strong md:shadow-xl">
          <aside className="relative hidden overflow-hidden border-r border-primary-100 bg-primary-50 md:flex md:flex-col md:gap-xl md:p-xl lg:gap-xxl lg:p-xxxl">
            <div className="flex items-center gap-md">
              <img
                src="/pwa-512.svg"
                alt="Fastor logo"
                className="h-10 w-10 object-contain"
                draggable={false}
              />
              <span className="font-spartan text-xl font-bold tracking-tight text-brown">
                FASTOR
              </span>
            </div>

            <div>
              <p className="font-mulish text-xs font-semibold uppercase tracking-button text-orange">
                {copy.eyebrow}
              </p>
              <h2 className="mt-md font-spartan text-3xl font-bold text-brown">
                {copy.title}
              </h2>
              <p className="mt-md font-mulish text-sm leading-subtitle text-text-secondary">
                {copy.description}
              </p>
            </div>

            <div className="overflow-hidden rounded-xl bg-primary-100 p-sm">
              <img
                src="/fastor/pizza.png"
                alt="Pizza with basil"
                className="aspect-[3/2] w-full rounded-lg object-cover"
                draggable={false}
              />
            </div>

            <div className="mt-auto flex items-center gap-sm border-t border-primary-100 pt-xl font-mulish text-xs font-semibold text-text-secondary">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                className="h-xl w-xl shrink-0 text-orange"
                aria-hidden="true"
              >
                <path d="m12 3 8 3v6c0 4-4 7-8 9-4-2-8-5-8-9V6l8-3Z" strokeLinejoin="round" />
                <path d="m8 12 3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Secure mobile verification
            </div>
          </aside>

          <div className="min-h-svh w-full bg-background md:flex md:min-h-0 md:flex-col md:px-xl md:py-xxl lg:p-xxxl">
            <div
              className="hidden items-center gap-md md:flex"
              aria-label={`Step ${step} of 2`}
            >
              <AuthStep number={1} label="Mobile number" currentStep={step} />
              <span className="h-px min-w-xs flex-1 bg-border-strong" aria-hidden="true" />
              <AuthStep number={2} label="Verify OTP" currentStep={step} />
            </div>
            <div className="md:flex md:flex-1 md:items-center md:py-xxl">
              {children}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function AuthStep({
  number,
  label,
  currentStep,
}: {
  number: 1 | 2
  label: string
  currentStep: 1 | 2
}) {
  const isActive = number <= currentStep

  return (
    <div
      className="flex items-center gap-sm"
      aria-current={number === currentStep ? 'step' : undefined}
    >
      <span
        className={`flex h-xxl w-xxl shrink-0 items-center justify-center rounded-full font-mulish text-xs font-bold ${isActive ? 'bg-orange text-text-inverse' : 'bg-background-element text-text-muted'}`}
      >
        {number}
      </span>
      <span
        className={`whitespace-nowrap font-mulish text-xs font-semibold ${isActive ? 'text-brown' : 'text-text-muted'}`}
      >
        {label}
      </span>
    </div>
  )
}
