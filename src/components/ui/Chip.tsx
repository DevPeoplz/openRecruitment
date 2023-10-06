import React from 'react'

interface Props {
  children: React.ReactNode
  className?: string
}

const Chip: React.FC<Props> = ({ children, className }) => {
  return (
    <div
      className={`${className} hidden items-center rounded-lg bg-gray-100 px-2 text-sm text-gray-800 sm:inline-flex`}
    >
      {children}
    </div>
  )
}

export default Chip
