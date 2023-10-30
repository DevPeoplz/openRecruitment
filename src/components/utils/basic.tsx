import React, { ReactNode } from 'react'

export const childrenRenderer = (displayName: string) => {
  const render = ({ children }: { children: ReactNode }) => {
    return <>{children}</>
  }

  render.displayName = displayName

  return render
}
