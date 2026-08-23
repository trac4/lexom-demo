'use client'; //converts this component to be a front end component

import Link from "next/link";
import React, { useState, useActionState } from "react";
import { useRouter } from "next/navigation"; //allows for the changing of routes
// import { onSignUp } from "../actions/actions";
import axios from "axios";
import toast from "react-hot-toast";
import { onSignUp2 } from "../actions/actions";
import { useFormStatus } from "react-dom";


/* IMPORTANT: NEVER CALL THIS FILE ANYTHING BUT PAGE.JSX, THIS APP WILL CRASH OTHERWISE
 * CALLL THE FOLDER HOUSING THIS FILE THE NAME OF THE ROUTE, NEXTJS WILL SHOW THIS PAGE UPON ENTERING IT */

 function SignUpForm () {
  const router = useRouter()
  const userInit = {
    email: '',
    username: '',
    password: ''
  }

  const [user, setUser] = useState(userInit)
  const canSignIn = (user.email.length>0 && user.username.length>0 && user.email.includes('@')&& user.password.length>5)
  const [loading, setLoading] = useState(false);
  const [state, SignUpAction] = useActionState(onSignUp2, 2)

  const handleSignIn = (e) => {
    const {target: {name, value}} = e;
    setUser(prev => ({
      ...prev, 
      [name]: value}))

  }

  
  return (
    <form className="auth" action={SignUpAction} onSubmit={(e => e.preventDefault())}>
      <h2>Sign Up</h2>
      <label htmlFor="username">Username</label>{" "}
      <input
        id="username"
        className=""
        type="text"
        name="username"
        required
        value={user.username}
        onChange={handleSignIn}
      ></input>
      <label htmlFor="email">Email</label>{" "}
      <input
        id="email"
        className=""
        type="email"
        name="email"
        required
        value={user.email}
        onChange={handleSignIn}
      ></input>
      <label htmlFor="password">Password (6 characters min.)</label>{" "}
      <input
        id="password"
        className=""
        type="password"
        name="password"
        required
        value={user.password}
        onChange={handleSignIn}
      ></input>
      <div>
       < SubmitButton/>
      </div>
      <Link href="/login">Already have an account? Log in here</Link>
    </form>
  );
}

export default SignUpForm

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit">
      Sign Up
    </button>
  );
}