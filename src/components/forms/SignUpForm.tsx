import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { SIGNUP_MUTATION, UserSignUpInput } from '@/graphql-operations/mutations/signup-candidate'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/fields'
import Alert from '@/components/alert'
import ErrorHandler from '@/types/errorHandler'
import { v4 as uuidv4 } from 'uuid'

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState<UserSignUpInput>({
    name: '',
    email: '',
    password: '',
    companyName: `Personal_${uuidv4()}`,
  })

  const [signup, { loading, error }] = useMutation(SIGNUP_MUTATION)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let result
    try {
      result = await ErrorHandler.catchAsync(async () => {
        const { data } = await signup({ variables: { data: formData } })
        if (data.signUpUser) {
          await signIn('credentials', {
            email: formData.email,
            password: formData.password,
            callbackUrl: '/dashboard',
          })
        }
      })
      console.log('Full response:', result)
    } catch (error) {
      console.log('Error:', error)
    }

    if (typeof result === 'string') {
      Alert({ type: 'error', message: result })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="name"
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <TextField
        id="email"
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        // required
      />
      <TextField
        id="password"
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Signing up...' : 'Sign Up'}
      </Button>
      {error && <p className="text-red-500">{ErrorHandler.getErrorMessage(error)}</p>}
    </form>
  )
}

export default SignUpForm