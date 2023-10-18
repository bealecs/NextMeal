"use client";
import Link from "next/link";
import { useState } from "react";
import "../globalStyles.css";
import ResetPasswordStyles from "../modular_css/ResetPassword.module.css";

export default function ResetPassword() {
  const [userEmail, setUserEmail] = useState("");
  const [formInput, setFormInput] = useState(null);
  const [clickedState, setClickedState] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setClickedState(!clickedState);
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();
    //Leverage either nodemailer or supabase to handle the logic for sending users emails
    //I have to have a legitimate domain first, so for now I am leaving this component out
  };
  return (
    <>
      <Link href={"/"} className={ResetPasswordStyles.back}>
        ← Back to home
      </Link>
      <section className={ResetPasswordStyles.container}>
        <h3>Enter your email below to reset your password</h3>
        {!clickedState ? (
          <form className={ResetPasswordStyles.passwordResetForm}>
            <label htmlFor="passwordReset">Enter your email:</label>
            <input
              id="passwordReset"
              value={formInput}
              onChange={(e) => setFormInput(e.target.value)}
              type="email"
              required
            />
            <button onClick={handleClick}>
              {!clickedState ? "Submit Email" : "Submit OTP"}
            </button>
          </form>
        ) : (
          <form className={ResetPasswordStyles.passwordResetForm}>
            <label htmlFor="passwordReset">Enter your OTP:</label>
            <input
              id="passwordReset"
              value={formInput}
              onChange={(e) => setFormInput(e.target.value)}
              type="number"
              required
            />
            <button onClick={handleClick}>
              {!clickedState ? "Submit Email" : "Submit OTP"}
            </button>
          </form>
        )}
        <p className={ResetPasswordStyles.infoP}>
          An email will be sent with a one-time-code for you to receive. Once
          you have your code, enter it in the box and click Submit OTP.
        </p>
        <span className={ResetPasswordStyles.asteriks}>** </span>
        <p className={ResetPasswordStyles.infoWarning}>
          Please do not leave this page once you have gotten your code. If you
          leave, you will need to re enter your email for a fresh code.
        </p>
      </section>
    </>
  );
}
