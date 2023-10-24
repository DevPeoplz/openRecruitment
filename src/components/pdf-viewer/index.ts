import {
  PDFViewerComponentsProps,
  PDFViewerProps,
  ToolbarItem,
} from '@/components/pdf-viewer/pdf-viewer'
import React from 'react'
import dynamic from 'next/dynamic'

export type PDFViewerNoSSRComponentsProps = {
  ToolbarItem?: typeof ToolbarItem
}

const PDFViewer: PDFViewerNoSSRComponentsProps & React.ComponentType<PDFViewerProps> = dynamic(
  () => import('@/components/pdf-viewer/pdf-viewer'),
  {
    ssr: false,
  }
)

PDFViewer.ToolbarItem = dynamic(
  () => import('@/components/pdf-viewer/pdf-viewer').then((mod) => mod.ToolbarItem),
  {
    ssr: false,
  }
) as typeof ToolbarItem

PDFViewer.ToolbarItem.displayName = 'PDFViewer.ToolbarItem'

export default PDFViewer as PDFViewerComponentsProps & React.ComponentType<PDFViewerProps>
