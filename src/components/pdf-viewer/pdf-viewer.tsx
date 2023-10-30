'use client'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import {
  ArrowTopRightOnSquareIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/20/solid'
import { Document, Page, pdfjs } from 'react-pdf'
import clsx from 'clsx'
import { getChildrenOnDisplayName } from '@/components/utils'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString()

export type PDFViewerProps = {
  file?: string | null
  children?: ReactNode
}

export type PDFViewerComponentsProps = {
  ToolbarItem: typeof ToolbarItem
}

function PDFViewer(props: PDFViewerProps) {
  const parentWidthRef = useRef<HTMLDivElement>(null)
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1) // start on first page
  const [loading, setLoading] = useState(true)
  const [pageWidth, setPageWidth] = useState(0)
  const [error, setError] = useState(false)
  const [isRenderPdf, setIsRenderPdf] = useState(false)

  const toolbarItems = getChildrenOnDisplayName(props.children, 'PDFViewer.ToolbarItem')

  function onDocumentLoadSuccess({ numPages: nextNumPages }: { numPages: number }) {
    setNumPages(nextNumPages)
    setError(false)
  }

  function onDocumentLoadError() {
    setError(true)
  }

  function onPageLoadSuccess() {
    setPageWidth(parentWidthRef?.current?.offsetWidth ?? 390)
    setLoading(false)
    setError(false)
  }

  const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
    standardFontDataUrl: 'standard_fonts/',
  }

  useEffect(() => {
    setTimeout(() => {
      setIsRenderPdf(true)
    }, 500)
  }, [])

  return (
    <div
      className={
        'relative flex h-auto max-h-[350px] w-full flex-wrap overflow-y-auto overflow-x-hidden border border-gray-200'
      }
    >
      <Nav
        pageNumber={pageNumber}
        numPages={numPages}
        setPageNumber={setPageNumber}
        link={props.file}
        toolbarItems={toolbarItems}
      />
      {error && (
        <div className={'text-center'}>
          <p>Error while loading the file!</p>
        </div>
      )}
      <div
        hidden={loading}
        className={clsx(error ? 'hidden' : '', 'relative flex w-full items-center')}
      >
        <div ref={parentWidthRef} className="flex h-auto w-full justify-center">
          {isRenderPdf && (
            <Document
              file={props.file}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              onError={onDocumentLoadError}
              options={options}
              renderMode="canvas"
              className=""
            >
              <Page
                className=""
                key={pageNumber}
                pageNumber={pageNumber}
                renderAnnotationLayer={false}
                renderTextLayer={false}
                onLoadSuccess={onPageLoadSuccess}
                onRenderError={() => setLoading(false)}
                width={Math.max(pageWidth * 0.9, 350)}
              />
            </Document>
          )}
        </div>
      </div>
    </div>
  )
}

function Nav({
  pageNumber,
  numPages,
  setPageNumber,
  link,
  toolbarItems,
}: {
  pageNumber: number
  numPages: number
  setPageNumber: React.Dispatch<React.SetStateAction<number>>
  link?: string | null
  toolbarItems?: ReactNode[] | null
}) {
  function goToNextPage() {
    setPageNumber((prevPageNumber) => prevPageNumber + 1)
  }

  function goToPreviousPage() {
    setPageNumber((prevPageNumber) => prevPageNumber - 1)
  }

  return (
    <nav className="sticky left-0 top-0 z-20 w-full bg-black">
      <div className="mx-auto px-1 sm:px-2">
        <div className="relative flex h-12 items-center justify-between">
          <div className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white">
            <span>{pageNumber}</span>
            <span className="text-gray-400"> / {numPages}</span>
          </div>
          <div className={`flex w-auto items-center justify-between`}>
            {toolbarItems?.map((toolbarItem, index) => (
              <button
                key={index}
                className="mr-2 h-full cursor-pointer rounded-md bg-gray-900 p-2 text-gray-400 hover:text-gray-50 focus:z-20"
              >
                {toolbarItem}
              </button>
            ))}
            <a
              target="_blank"
              href={link ?? undefined}
              className="mr-2 h-full cursor-pointer rounded-md bg-gray-900 p-2 text-gray-400 hover:text-gray-50 focus:z-20"
              rel="noreferrer"
            >
              <span className="sr-only">Next</span>
              <ArrowTopRightOnSquareIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            <div className={`flex w-auto items-center justify-between rounded-md bg-gray-900 px-2`}>
              <button
                onClick={goToPreviousPage}
                disabled={pageNumber <= 1}
                className="relative h-full cursor-pointer p-2 text-gray-400 hover:text-gray-50 focus:z-20"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                onClick={goToNextPage}
                disabled={pageNumber >= numPages}
                className="relative h-full cursor-pointer p-2 text-gray-400 hover:text-gray-50 focus:z-20"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export function ToolbarItem({ children }: { children: ReactNode }) {
  return <>{children}</>
}

ToolbarItem.displayName = 'PDFViewer.ToolbarItem'
PDFViewer.ToolbarItem = ToolbarItem

export default PDFViewer
