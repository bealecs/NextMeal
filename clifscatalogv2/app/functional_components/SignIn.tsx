"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

export const SignIn = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    console.log(session.user)
    return (
      <div style={{ display: "flex" }}>
        <p>{session.user.name}</p>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  }
  return (
    <div>
      <button onClick={() => signIn()}>Sign Up/In</button>
    </div>
  );
};
