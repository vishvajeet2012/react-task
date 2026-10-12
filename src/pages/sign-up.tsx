import { useNavigate } from '@tanstack/react-router'
import { useState, type FormEvent } from 'react'
import { AuthShell } from '../components/auth/auth-shell'
import { PrimaryButton } from '../components/auth/primary-button'
import { useRequestOtpMutation } from '../hooks/use-auth'
import { useAuthStore } from '../store/use-auth-store'

export function SignUpPage() {
  const navigate = useNavigate()
  const storedPhone = useAuthStore((state) => state.phone)
  const [digits, setDigits] = useState(storedPhone)
  const [validationError, setValidationError] = useState<string | null>(null)
  const requestOtpMutation = useRequestOtpMutation()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (digits.length !== 10) {
      setValidationError('Please enter a valid 10-digit mobile number')
      return
    }

    setValidationError(null)

    requestOtpMutation.mutate(
      { phone: digits, dial_code: '+91' },
      {
        onSuccess: () => {
          void navigate({ to: '/otp' })
        },
      },
    )
  }

  const activeError =
    validationError || requestOtpMutation.error?.message || null

  return (
    <AuthShell step={1}>
      <form
        onSubmit={handleSubmit}
        className="safe-area-screen mx-auto flex min-h-svh w-full max-w-auth flex-col bg-background md:min-h-0 md:max-w-none md:py-0"
        noValidate
      >
        <div className="flex-1 px-xl md:flex-none md:px-0">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="mt-lg block h-6 w-6 rounded-xs focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 md:hidden"
            aria-label="Back"
          >
            <img src="/back.svg" alt="" className="h-6 w-6" />
          </button>

          <h1 className="mt-lg font-mulish text-2xl font-bold text-text md:mt-0 md:text-3xl">
            Sign Up to Fastor
          </h1>
          <p className="mt-sm font-mulish text-sm leading-subtitle text-text-secondary">
            Let us know your mobile number and we will send you an OTP for verification.
          </p>

          <label className="sr-only md:not-sr-only md:mb-sm md:mt-xxl md:block md:font-mulish md:text-xs md:font-semibold md:text-text" htmlFor="mobile-number">
            Mobile number
          </label>
          <div className="mt-xxl flex h-12 items-center gap-md rounded-sm border border-border bg-input px-xl transition-colors md:mt-0 md:h-14 md:rounded-md md:border-border-strong md:bg-background-card md:px-lg md:focus-within:border-orange md:focus-within:ring-2 md:focus-within:ring-orange/10">
            <span className="font-mulish text-base font-bold text-text">+91</span>
            <span className="h-[13px] w-[1.5px] shrink-0 bg-accent" aria-hidden="true" />
            <span className="font-mulish text-base text-text" aria-hidden="true">
              -
            </span>
            <input
              id="mobile-number"
              value={digits}
              onChange={(event) => {
                setDigits(event.target.value.replace(/\D/g, '').slice(0, 10))
                if (validationError) {
                  setValidationError(null)
                }
                if (requestOtpMutation.error) {
                  requestOtpMutation.reset()
                }
              }}
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="tel-national"
              autoFocus
              maxLength={10}
              placeholder="00000"
              className="min-w-0 flex-1 border-0 bg-transparent p-0 font-mulish text-base font-medium tracking-input text-text caret-transparent outline-none placeholder:text-placeholder md:caret-orange"
            />
          </div>

          {activeError && (
            <div
              className="mt-md rounded-sm border border-danger bg-danger-bg-light px-md py-sm"
              role="alert"
            >
              <p className="font-mulish text-xs font-medium text-danger">
                {activeError}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-sm px-xl pb-xl md:mt-xl md:space-y-lg md:px-0 md:pb-0">
          <PrimaryButton
            label="Get OTP"
            loading={requestOtpMutation.isPending}
            loadingLabel="Sending OTP"
            disabled={digits.length === 0 || requestOtpMutation.isPending}
            className="md:h-14"
          />
          <p className="text-center font-mulish text-caption text-text-secondary md:text-xs">
            By clicking, I accept the{' '}
            <a href="#terms" className="font-medium text-text hover:underline">
              Terms &amp; Conditions
            </a>{' '}
            and{' '}
            <a href="#privacy" className="font-medium text-text hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </form>
    </AuthShell>
  )
}
