import SignUpForm from '@/components/forms/SignUpForm'
import React from 'react'
import { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

const SignUpPage: React.FC = () => {
  return <SignUpForm />
}

export default SignUpPage

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (session) {
    return { redirect: { destination: '/dashboard' } }
  }

  return { props: {} }
}