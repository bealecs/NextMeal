"use client"
import { useState } from "react";

export const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

  const submitHandler = async () => {
    await fetch("http://localhost:3000/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });
  };

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" value={name} onChange={(e) => handleNameChange(e)} />
      <label htmlFor="email">Email</label>
      <input type="email" id="email" value={email} onChange={(e) => handleEmailChange(e)} />
      <label htmlFor="password">Password</label>
      <input id="password" type="password" value={password} onChange={(e) => handlePasswordChange(e)}/>
      <button>Sign Up</button>
    </form>
  );
};
