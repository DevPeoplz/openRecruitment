import React, { useEffect, useState } from 'react'
import { Button } from '../UI/Button'
import { PhoneField, SelectField, TextField } from '../UI/Fields'
import Link from 'next/link'
import BackgroundIllustration from '../layout/BackgroundIlustration'
import { gql, useMutation } from '@apollo/client'
import Alert from '@/components/alert'
import { signIn } from 'next-auth/react'

const SIGNUP_MUTATION = gql`
  mutation createUserAndCompany($data: UserSignUpInput!) {
    signUpUser(data: $data) {
      id
      email
      companies {
        id
      }
    }
  }
`

const SignUpForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [companyName, setCompanyName] = useState('')

  const [signup, { data, error }] = useMutation(SIGNUP_MUTATION)

  useEffect(() => {
    if (error) {
      Alert({ type: 'error', message: error.message })
    }

    if (data) {
      console.log('success')
      signIn('credentials', { email, password })
    }
  }, [error, data, email, password])

  return (
    <div className="px-4">
      <BackgroundIllustration
        width="900"
        height="900"
        className="hidden absolute -top-7 left-1/2 -z-10 h-[788px] -translate-x-1/2 stroke-gray-300 [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)] sm:-top-9 sm:h-auto sm:block"
      />
      <h1 className="text-2xl font-semibold text-gray-900">Create a company account</h1>
      <p className="text-gray-600 mt-2">
        Does your company already has account? &nbsp;
        <Link href="/login" className="text-cyan-600 hover:underline">
          Log in
        </Link>
      </p>

      <form
        className="bg-white md:p-8 px-4 py-8 rounded-3xl my-4"
        onSubmit={async (e) => {
          e.preventDefault()

          await signup({
            variables: {
              data: {
                name: name,
                email: email,
                companyName: companyName,
              },
            },
          })
        }}
      >
        <div className="grid grid-cols-2 gap-6 mb-4">
          <TextField
            className="col-span-full"
            label="Company name"
            id="company"
            name="company"
            type="text"
            autoComplete="company"
            required
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <TextField
            label="First name"
            id="first_name"
            name="first_name"
            type="text"
            autoComplete="given-name"
            required
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Last name"
            id="last_name"
            name="last_name"
            type="text"
            autoComplete="family-name"
            required
          />
          <TextField
            className="col-span-full"
            label="Email address"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <PhoneField
            className="col-span-full"
            label="Phone number"
            id="phone"
            name="phone"
            autoComplete="tel"
            required
          />
          <TextField
            className="col-span-full"
            label="Password"
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <SelectField
            className="col-span-full"
            label="How did you hear about us?"
            id="referral-source"
            name="referral_source"
            options={[
              { value: 'google', label: 'Google' },
              { value: 'friend', label: 'Friend' },
              { value: 'other', label: 'Other' },
            ]}
          ></SelectField>
        </div>
        <Button type="submit" color="primary" className="mt-8 w-full">
          Start your free trial
        </Button>
      </form>
    </div>
  )
}

export default SignUpForm
