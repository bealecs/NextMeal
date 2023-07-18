"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import "../globalStyles.css";
import SignInStyles from "../modular_css/SignIn.module.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn("credentials", {
      username: email,
      password: password,
      callbackUrl: "http://localhost:3000",
      redirect: true,
    })
  };

  return (
    <section className={SignInStyles.container}>
      <Link href="/" className={SignInStyles.back}>← Back to home</Link>
      <div className={SignInStyles.formDiv}>
        <h3>Sign in below</h3>
        <form onSubmit={handleSubmit} className={SignInStyles.form}>
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
          <button type="submit">Sign In</button>
        </form>
        <div className={SignInStyles.alternate}>
          <p>
            Do not have an account yet?
            <Link href="/signup">Sign up now</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
