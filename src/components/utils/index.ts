import React, { ReactNode } from 'react'

// eslint-disable-next-line @typescript-eslint/ban-types
export function extractType(node: ReactNode): Function | string {
  return (node as unknown as React.ReactElement).type
}

export function extractDisplayName(type: React.FunctionComponent): string {
  return type.displayName || type.name || 'Unknown'
}

export const getChildrenOnDisplayName = (children: ReactNode, displayName: string) => {
  return React.Children.map(children, (child) => {
    if (typeof child === displayName) return child

    const type = extractType(child)
    const childDisplayName =
      typeof type === 'function'
        ? extractDisplayName(type as unknown as React.FunctionComponent)
        : ''

    return childDisplayName === displayName ? child : null
  })
}

export const getLocalStorageKey = (email: string | null | undefined, menu: string, key: string) =>
  btoa(`${email ?? ''}//${menu ?? ''}//${key ?? ''}`)
