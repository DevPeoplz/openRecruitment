import React from 'react'
import { Button } from './UI/Button'
import { TextField } from './UI/Fields'

const JoinNewsletter = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <form
      className="flex w-full justify-center md:w-auto gap-2"
      onSubmit={handleSubmit}
    >
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
