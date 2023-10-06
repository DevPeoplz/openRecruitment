import dynamic from 'next/dynamic'
import React, { ReactNode } from 'react'

const NoSSR: React.FC<{ children?: ReactNode }> = ({ children }) => (
  <React.Fragment>{children}</React.Fragment>
)

export default dynamic(() => Promise.resolve(NoSSR), {
  ssr: false,
})
