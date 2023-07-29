"use client";
import React, { ReactNode } from "react";
import { SessionProvider, getSession } from "next-auth/react";
import { Session } from "next-auth";

interface Props {
  children: ReactNode;
}

const Provider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

Provider.getInitialProps = async (context) => {
  const { ctx } = context;
  const session = await getSession(ctx);

  return {
    session,
  };
};

export default Provider;
