'use client'; //converts this component to be a front end component

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; //allows for the changing of routes
import axios from "axios";
import toast from "react-hot-toast";


/* IMPORTANT: NEVER CALL THIS FILE ANYTHING BUT PAGE.JSX, THIS APP WILL CRASH OTHERWISE
 * CALLL THE FOLDER HOUSING THIS FILE THE NAME OF THE ROUTE, NEXTJS WILL SHOW THIS PAGE UPON ENTERING IT */

export default function SignUpPage () {
  const router = useRouter()
  const userInit = {
    email: '',
    username: '',
    password: ''
  }

  const [user, setUser] = useState(userInit)
  const canSignIn = (user.email.length>0 && user.username.length>0 && user.password.length>=6)
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState('')

  const handleSignIn = (e) => {
    const {target: {name, value}} = e;
    setUser(prev => ({
      ...prev, 
      [name]: value}))

  }

  const onSignUp = async(e) => {
    //talking to database
    console.log(user)
    e.preventDefault()
    try {
      setLoading(true)
      const res = await axios.post('/api/users/signup', user)
      // const res = await fetch('/api/users/signup', {
      //   method: 'POST',
      //   body: user
      // })
      console.log(res.data)
      router.push('/')
    } catch (error) {
      const {message} = error
      let code = Number(message.match(/\d/g).join('')) //parses number from message
      console.log(code)
      if (code === 400) setShowError('That email has been already used. Please use a different one') 
      else if (code === 401) setShowError('That email has been already used. Please use a different one') 
      else if (code === 418) setShowError('Please enter a valid email') 
    }
    finally {
      setLoading(false)
    }
  }

  
  return (
    <form className="auth" onSubmit={onSignUp}>
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
      {showError && <p>{showError}</p>}
      <div>
        <button onClick={onSignUp} disabled={!canSignIn || loading} className="">
          Register
        </button>
      </div>
      <Link href="/login">Already have an account? Log in here</Link>
    </form>
  );
}