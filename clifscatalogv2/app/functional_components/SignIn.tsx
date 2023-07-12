"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { SignUp } from "./SignUp";

export const SignIn = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div style={{ display: "flex" }}>
        <p>{session.user.name}</p>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  }
  return (
    <div>
      <button onClick={() => signIn()}>Sign In</button>
      <SignUp />
    </div>
  );
};
