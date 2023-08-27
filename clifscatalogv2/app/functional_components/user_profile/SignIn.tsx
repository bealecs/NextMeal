"use client";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import React from "react";

interface Props {
  session: Session;
}
//potentially make this conditionally render whether there is a session or not via props and if so render the user's favorites dashboard
export const SignIn = (props: Props) => {

  if (props.session && props.session.user) {
    
    return (
      <div style={{ display: "flex" }}>
        <p>{props.session.user.name}</p>
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
