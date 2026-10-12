type PrimaryButtonProps = {
  label: string
  disabled?: boolean
  loading?: boolean
  loadingLabel?: string
  type?: 'button' | 'submit'
  onClick?: () => void
  className?: string
}

export function PrimaryButton({
  label,
  disabled = false,
  loading = false,
  loadingLabel = 'Please wait',
  type = 'submit',
  onClick,
  className = '',
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`flex h-12 w-full items-center justify-center rounded-md bg-primary font-mulish text-base font-semibold tracking-button text-primary-foreground transition-opacity active:opacity-90 disabled:cursor-not-allowed disabled:opacity-[0.65] ${className}`}
    >
      {loading ? (
        <span
          className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground/35 border-t-primary-foreground"
          aria-label={loadingLabel}
        />
      ) : (
        label
      )}
    </button>
  )
}
