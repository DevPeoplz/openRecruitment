import React, { useState } from 'react'
import { Button } from '../UI/Button'
import { TextField } from '../UI/fields'
import Link from 'next/link'
import BackgroundIllustration from '../layout/BackgroundIlustration'
import { signIn } from 'next-auth/react'
import { InferGetServerSidePropsType } from 'next'
import { getServerSideProps } from '@/pages/login'
import { useRouter } from 'next/router'
import Alert from '@/components/alert'

const LoginForm = ({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const callbackUrl = (router.query?.callbackUrl as string) ?? '/dashboard'

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    if (result?.error) {
      await Alert({ type: 'error', message: result.error })
    } else {
      await router.push(callbackUrl)
    }
  }

  return (
    <div className="flex w-screen flex-col items-center">
      <BackgroundIllustration className="absolute -top-7 left-1/2 -z-10 hidden h-[788px] -translate-x-1/2 stroke-gray-300 [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)] sm:-top-9 sm:block sm:h-auto" />
      <h1 className="text-center text-2xl font-semibold text-gray-900">Sign in to your account</h1>
      <p className="mt-2 text-gray-600 ">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="text-cyan-600 hover:underline">
          Sign up here
        </Link>
      </p>

      <form
        className="my-4 w-11/12 rounded-3xl bg-white px-4 py-8 sm:w-64"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="mb-4 w-full space-y-6">
          <TextField
            label="Email address"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
          <TextField
            label="Password"
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>
        <Link href="/forgot-password" className="text-cyan-600 hover:underline">
          Forgot your password?
        </Link>

        <Button type="submit" color="primary" size="full">
          Sign in to account
        </Button>

        {Object.values(providers).filter((provider) => provider.id !== 'credentials').length >=
          1 && (
          <span className="mt-1 flex items-center justify-center space-x-2 text-sm">
            <span className="h-px w-14 bg-gray-400"></span>
            <span className="font-normal text-gray-500">or login with</span>
            <span className="h-px w-14 bg-gray-400"></span>
          </span>
        )}

        {Object.values(providers)
          .filter((provider) => provider.id !== 'credentials')
          .map((provider) => (
            <div key={provider.name}>
              <Button
                onClick={() => signIn(provider.id)}
                color="white"
                size="full"
                className="mt-1"
              >
                Sign in with {provider.name}
              </Button>
            </div>
          ))}
      </form>
    </div>
  )
}

export default LoginForm
