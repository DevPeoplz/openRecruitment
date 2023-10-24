import React, { useEffect } from 'react'
import { LinkIcon } from '@heroicons/react/24/solid'
import { Tooltip } from 'react-tooltip'
import Swal from 'sweetalert2'

const CopyLinkToClipboard = ({ url }: { url: string }) => {
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
    <div
      data-tooltip-id="tooltip-copy-link"
      className={`m-0.5 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-black text-white`}
      onClick={handleClick}
    >
      <LinkIcon className="h-5 w-5 text-black" />
      <Tooltip
        place="bottom"
        id="tooltip-copy-link"
        className="z-50"
        variant={copied ? 'success' : 'dark'}
      >
        <span className="text-xs ">{copied ? 'Copied!!' : 'Copy to Clipboard'}</span>
      </Tooltip>
    </div>
  )
}

export default CopyLinkToClipboard
