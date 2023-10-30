import React, { ReactNode } from 'react'
import { getChildrenOnDisplayName } from '@/components/utils'
import clsx from 'clsx'

type PanelProps = {
  children?: ReactNode
  className?: string
}

type PanelComponentsType = {
  Header: typeof PanelHeader
  Body: typeof PanelBody
}

export const Panel: React.FC<PanelProps> & PanelComponentsType = (props: PanelProps) => {
  const { children, className } = props
  const panelHeading = getChildrenOnDisplayName(children, 'Panel.Header')
  const panelBody = getChildrenOnDisplayName(children, 'Panel.Body')
  return (
    <div className={className}>
      {panelHeading}
      {panelBody}
    </div>
  )
}

const PanelHeader: React.FC<{ children?: ReactNode; as?: string }> = ({ children, as = 'h3' }) => {
  return (
    <h3 className="rounded-t bg-gray-300 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
      {children}
    </h3>
  )
}

const PanelBody: React.FC<{ children?: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return <div className={clsx('rounded-b border p-2', className)}>{children}</div>
}

PanelHeader.displayName = 'Panel.Header'
PanelBody.displayName = 'Panel.Body'
Panel.Header = PanelHeader
Panel.Body = PanelBody
