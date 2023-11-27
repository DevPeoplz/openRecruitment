import React, { ReactElement, ReactNode, useEffect } from 'react'
import LayoutLanding from '@/components/layout/layout-landing'
import LayoutAuthenticated from '@/components/layout/layout-authenticated'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider, useSession } from 'next-auth/react'
import { ApolloProvider } from '@apollo/client'
import client from '@/lib/apollo-client'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Alert from '@/components/alert'
import { QueryParamProvider } from 'use-query-params'
import NextAdapterPages from 'next-query-params'
import Head from 'next/head'

export type NextPageWithLayout<P = Record<string, never>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
  auth?: ComponentAuth
}

type ComponentAuth = {
  permission?: string
  loading?: ReactElement
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const Layout = Component.auth ? LayoutAuthenticated : LayoutLanding
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>)

  return (
    <>
      <Head>
        <title>Open Recruitment</title>
      </Head>
      <ApolloProvider client={client}>
        <SessionProvider session={session}>
          <QueryParamProvider adapter={NextAdapterPages}>
            {Component.auth ? (
              <Auth options={Component.auth}>{getLayout(<Component {...pageProps} />)}</Auth>
            ) : (
              getLayout(<Component {...pageProps} />)
            )}
          </QueryParamProvider>
        </SessionProvider>
      </ApolloProvider>
    </>
  )
}

function Auth({ children, options }: { children: React.ReactNode; options: ComponentAuth }) {
  const { status, data: session } = useSession({ required: true })
  const router = useRouter()
  const isUser = !!session?.user
  const viewPermission = options?.permission ? session?.user?.userRole === options.permission : true

  useEffect(() => {
    if (status !== 'loading' && !viewPermission) {
      router
        .push(`/dashboard`)
        .then(() => Alert({ type: 'error', message: 'Not enough permissions!' }))
    }
  }, [isUser, router, status, viewPermission])

  if (status === 'loading' || !viewPermission) {
    return options?.loading ? (
      options.loading
    ) : (
      <LayoutAuthenticated>
        <div>Loading...</div>
      </LayoutAuthenticated>
    )
  }

  return <>{children}</>
}
