import React from 'react'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/fields'

const JoinNewsletter = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <form className="flex w-full justify-center gap-2 md:w-auto" onSubmit={handleSubmit}>
      <TextField
        id="email-newsletter"
        type="email"
        aria-label="Email address"
        placeholder="Email address"
        autoComplete="email"
        required
        className="w-60 min-w-0 shrink"
      />
      <Button color="primary" size="large">
        Join newsletter
      </Button>
    </form>
  )
}

export default JoinNewsletter
