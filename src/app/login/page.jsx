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
    'e-or-u': '',
    password: ''
  }

  const [user, setUser] = useState(userInit)
  const canSignIn = (user['e-or-u'].length>0 && user.password.length>0)
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
      const res = await axios.post('/api/users/login', user)
      console.log('success:', res.data)
      router.push('/')
    } catch (error) {
      console.log(error.message)
      //regEx attempt
      const {message} = error
      let code = Number(message.match(/\d/g).join('')) //parses number from message
      console.log(code)
      if (code === 404) setShowError('Incorrect username or email') 
      else if (code === 403) setShowError('Incorrect username or email') 
    }
    finally {
      setLoading(false)
    }
  }

  
  return (
    <form className="auth" onSubmit={onSignUp}>
      <h2>Log In</h2>
      <label htmlFor="e-or-u">Email or Username</label>{" "}
      <input
        id="e-or-u"
        className=""
        type="text"
        name="e-or-u"
        value={user.email}
        onChange={handleSignIn}
      ></input>
      <label htmlFor="login-password">Password</label>{" "}
      <input
        id="login-password"
        className=""
        type="password"
        name="password"
        value={user.password}
        onChange={handleSignIn}
      ></input>
      {showError && <p>{showError}</p>}
      <div>
        <button onClick={onSignUp} disabled={!canSignIn || loading} className="">
          Log In
        </button>
      </div>
      <Link href="/signup">Create an account here</Link>
    </form>
  );
}