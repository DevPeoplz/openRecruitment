import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'

const baseStyles = {
  solid:
    'inline-flex justify-center rounded-lg py-2 px-3 text-sm font-semibold outline-2 outline-offset-2 transition-colors cursor-pointer text-center border border-2 border-primary-500',
  outline:
    'inline-flex justify-center rounded-lg border border-2 py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-sm outline-2 outline-offset-2 transition-colors text-center font-bold',
}

const sizeStyles = {
  small: 'w-24',
  medium: 'w-32',
  large: 'w-40',
  full: 'w-full',
}

const variantStyles = {
  solid: {
    primary:
      'bg-primary-500 text-white  active:before:bg-transparent hover:before:bg-white/10 active:bg-cyan-600 active:text-white/80 before:transition-colors',
    white:
      'bg-white text-cyan-900 hover:bg-white/90 active:bg-white/90 active:text-cyan-900/70',
    gray: 'bg-gray-800 text-white hover:bg-gray-900 active:bg-gray-800 active:text-white/80',
  },
  outline: {
    primary:
      'border-primary-400 text-primary-400 hover:border-primary-500 active:bg-primary-600 active:text-primary-600',
    gray: 'border-gray-300 text-gray-700 hover:border-gray-400 active:bg-gray-100 active:text-gray-700/80',
  },
}

interface ButtonProps {
  variant?: 'solid' | 'outline'
  color?: 'primary' | 'white' | 'gray'
  className?: string
  href?: string
  size?: 'small' | 'medium' | 'large' | 'full'
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

export const Button = ({
  variant = 'solid',
  color = 'primary',
  size = 'medium',
  className,
  href,
  children,
  ...props
}: ButtonProps) => {
  const mergedClassName = clsx(
    baseStyles[variant],
    (variantStyles[variant] as { [key: string]: string })[color],
    sizeStyles[size],
    className
  )

  return href ? (
    <Link href={href}>
      <button className={mergedClassName} {...props}>
        {children}
      </button>
    </Link>
  ) : (
    <button className={mergedClassName} {...props}>
      {children}
    </button>
  )
}
