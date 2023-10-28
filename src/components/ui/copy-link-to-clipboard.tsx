import React, { useEffect, useId } from 'react'
import { LinkIcon } from '@heroicons/react/24/solid'
import { Tooltip } from 'react-tooltip'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'

const CircleButtonWithTooltip = ({
  as = 'div',
  children,
  onClick,
  tooltipId,
  extraProps,
  className,
}: {
  as?: 'a' | 'div'
  children: React.ReactNode
  onClick?: () => void
  tooltipId: string
  className?: string
  extraProps?: { href?: string; target?: string; rel?: string }
}) => {
  const Wrapper = as
  return (
    <Wrapper
      data-tooltip-id={tooltipId}
      className={clsx(
        `m-0.5 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-gray-200 text-black hover:bg-gray-400 hover:text-white`,
        className
      )}
      onClick={onClick}
      {...extraProps}
    >
      {children}
    </Wrapper>
  )
}

export const CopyLinkToClipboard = ({ url }: { url: string }) => {
  const generatedId = useId()
  const [copied, setCopied] = React.useState(false)
  const handleClick = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
  }

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (copied) {
      timeout = setTimeout(() => {
        setCopied(false)
      }, 1200)
    }
    return () => {
      clearTimeout(timeout)
    }
  }, [copied])

  return (
    <CircleButtonWithTooltip
      tooltipId={`tooltip-copy-link-${generatedId}`}
      onClick={handleClick}
      className={clsx({ '!bg-success !text-white': copied })}
    >
      <LinkIcon className="h-5 w-5" />
      <Tooltip
        place="bottom"
        id={`tooltip-copy-link-${generatedId}`}
        className="z-50"
        variant={copied ? 'success' : 'dark'}
      >
        <span className="text-xs ">{copied ? 'Copied!!' : 'Copy to Clipboard'}</span>
      </Tooltip>
    </CircleButtonWithTooltip>
  )
}

export const OpenNewTabCircleButton = ({ url }: { url: string }) => {
  const generatedId = useId()

  const extraProps = {
    href: url,
    target: '_blank',
    rel: 'noreferrer',
  }

  return (
    <CircleButtonWithTooltip
      as="a"
      tooltipId={`tooltip-candidate-link-${generatedId}`}
      extraProps={extraProps}
    >
      <ArrowTopRightOnSquareIcon className="h-5 w-5" />
      <Tooltip place="bottom" id={`tooltip-candidate-link-${generatedId}`}>
        <span className="text-xs ">{'Open On New Tab'}</span>
      </Tooltip>
    </CircleButtonWithTooltip>
  )
}
