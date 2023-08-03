import React from 'react'
import Layout from '@/components/layout/Layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { ApolloProvider } from '@apollo/client'
import client from '@/apollo-client'
console.log(process.env.NEXTAUTH_SECRET, process.env.NEXTAUTH_URL)

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  console.log(process.env.NEXTAUTH_SECRET, process.env.NEXTAUTH_URL)

  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </ApolloProvider>
  )
}
