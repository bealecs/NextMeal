"use client";
import { useState } from "react";
import { signIn } from 'next-auth/react'

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({ email, password, name}),
      headers: { 'Content-Type': 'application/json' },
    })
    if (res.ok) {
      await signIn('credentials', {
        email,
        password,
        callbackUrl: 'http://localhost:3000',
        redirect: true,
      })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  )
}
