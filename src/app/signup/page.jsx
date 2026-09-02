'use client'; //converts this component to be a front end component

import Link from "next/link";
import React, { useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState('')
  const [invalid_username, setInvalid_userName] = useState(false); // variable placed as a state to allow for proper checking
  
  //check to see if invalid characters were submitted and prevent a user from registeration if so (including telling them why). Placed in useEffect to prevent errors
  useEffect(()=> {
    if (user.username.match(/[^(A-Z)(a-z)(0-9)_]/g) !== null) {
    setInvalid_userName(true)
    setShowError('Username can only contain alphanumeric characters or underscores.')
  } else {
    setInvalid_userName(false)
    setShowError('')
  }
  }, [user])

  const canSignIn = (user.email.length>0 && user.username.length>0 && user.password.length>=6 && invalid_username === false)

  console.log(invalid_username)
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
      {showError && <p className="improper-auth">{showError}</p>}
      <div>
        <button onClick={onSignUp} disabled={!canSignIn || loading} className="">
          Register
        </button>
      </div>
      <Link href="/login">Already have an account? Log in here</Link>
    </form>
  );
}