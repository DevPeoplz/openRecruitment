import React from 'react'
import { Button } from '../UI/Button'
import { TextField } from '../UI/fields'
import Link from 'next/link'
import BackgroundIllustration from '../layout/BackgroundIlustration'

const ForgotPasswordForm = () => {
  return (
    <>
      <BackgroundIllustration
        width="900"
        height="900"
        className="absolute -top-7 left-1/2 -z-10 hidden h-[788px] -translate-x-1/2 stroke-gray-300 [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)] sm:-top-9 sm:block sm:h-auto"
      />
      <h1 className="text-2xl font-semibold text-gray-900">Forgot your password?</h1>
      <p className="mt-2 text-gray-600">No worries, we&apos;ll send you a recovery link.</p>

      <form className="my-4 rounded-3xl bg-white px-4 py-8 md:p-8">
        <div className="mb-4 space-y-6">
          <TextField
            label="Email address"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </div>
        <Button type="submit" color="primary" size="full">
          Send recovery link
        </Button>
        <Link href="/login" className="mt-2 block w-full text-center text-cyan-600 hover:underline">
          Go back to log in
        </Link>
      </form>
    </>
  )
}

export default ForgotPasswordForm
