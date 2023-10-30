import React from 'react'
import Image from 'next/image'
import clsx from 'clsx'

interface Props {
  src?: string | null
  name?: string | null
  className?: string
  size?: 'small' | 'medium' | 'large'
}

const Avatar: React.FC<Props> = ({ src, name, className, size = 'medium' }) => {
  const altName = name || 'avatar'
  const sizeClass = size === 'small' ? 'h-8 w-8' : size === 'medium' ? 'h-12 w-12' : 'h-16 w-16'

  return src ? (
    <Image
      src={src}
      alt={altName}
      width={100}
      height={100}
      className={clsx(className, sizeClass, 'rounded-full border border-black object-cover')}
    />
  ) : (
    <div
      className={`${className} m-0.5 flex h-10 w-10 items-center justify-center rounded-full border border-black bg-primary-500 text-white`}
    >
      <p>{altName?.charAt(0)}</p>
    </div>
  )
}

export default Avatar
