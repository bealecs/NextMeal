"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import "../globalStyles.css";
import SignUpStyles from "../modular_css/SignUp.module.css";
import Link from "next/link";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/user", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      await signIn("credentials", {
        username: email,
        password: password,
        callbackUrl: "/",
        redirect: true,
      });
    } else {
      alert("The email you entered is already associated with another account..");
    }
  };

  return (
    <section className={SignUpStyles.container}>
      <Link href="/" className={SignUpStyles.back}>
        ← Back to home
      </Link>
      <div className={SignUpStyles.formDiv}>
        <h3>Create your account</h3>
        <form onSubmit={handleSubmit} className={SignUpStyles.form}>
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
              minLength={6}
              required
            />
          </label>
          <button type="submit">Sign Up</button>
        </form>
        <div className={SignUpStyles.alternate}>
          <p>Already have an account?</p>
          <Link className={SignUpStyles.signin} href="/signin">Sign in now</Link>
        </div>
      </div>
    </section>
  );
}
