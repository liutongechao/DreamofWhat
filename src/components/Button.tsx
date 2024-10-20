import Link from 'next/link'
import clsx from 'clsx'

type ButtonProps = {
  invert?: boolean
  disabled?: boolean
} & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
)

export function Button({
  invert = false,
  disabled = false,
  className,
  children,
  ...props
}: ButtonProps) {
  className = clsx(
    className,
    'inline-flex rounded-full px-4 py-1.5 text-sm font-semibold transition',
    invert
      ? 'bg-white text-neutral-950 hover:bg-neutral-200'
      : 'bg-neutral-950 text-white hover:bg-neutral-800',
    disabled && 'opacity-50 cursor-not-allowed hover:bg-neutral-950', // Styles when disabled
  )

  let inner = <span className="relative top-px">{children}</span>

  if (typeof props.href === 'undefined') {
    return (
      <button className={className} disabled={disabled} {...props}>
        {inner}
      </button>
    )
  }

  if (disabled) {
    // If disabled, just render a span without link functionality
    return <span className={className}>{inner}</span>
  }

  return (
    <Link className={className} {...props}>
      {inner}
    </Link>
  )
}
