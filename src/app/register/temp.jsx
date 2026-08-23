
import Link from "next/link";
import React from "react";
import { redirect } from "next/navigation"; //allows for the changing of routes
import axios from "axios";
import toast from "react-hot-toast";


/* IMPORTANT: NEVER CALL THIS FILE ANYTHING BUT PAGE.JSX, THIS APP WILL CRASH OTHERWISE
 * CALLL THE FOLDER HOUSING THIS FILE THE NAME OF THE ROUTE, NEXTJS WILL SHOW THIS PAGE UPON ENTERING IT */

export default function SignUpPage () {
  // const router = useRouter()

  // const [user, setUser] = useState(userInit)
  // const canSignIn = (user.email.length>0 && user.username.length>0 && user.email.includes('@')&& user.password.length>5)
  // const [loading, setLoading] = useState(false);

  // const handleSignIn = (e) => {
  //   const {target: {name, value}} = e;
  //   setUser(prev => ({
  //     ...prev, 
  //     [name]: value}))

  // }

  const onSignUp = async(formData) => {
    //talking to database
    'use server'
    // console.log(formData)
    const user = {
      username: formData.get('username'),
      email: formData.get('username'),
      password: formData.get('username')
    }
    console.log(user)
    try {
      // setLoading(true)
      // const res = await axios.post('/api/users/signup', user)
      // const res = await fetch('/api/users/signup', {
      //   method: 'POST',
      //   body: user
      // })
      console.log(await res.json())
      // redirect('/')
    } catch (error) {
      console.log(error);
      // toast.error(error.message)
    }
    finally {
      // setLoading(false)
    }
  }

  
  return (
    <form className="auth" action={onSignUp}>
      <h2>Sign Up</h2>
      <label htmlFor="username">Username</label>{" "}
      <input
        id="username"
        className=""
        type="text"
        name="username"
        required
      ></input>
      <label htmlFor="email">Email</label>{" "}
      <input
        id="email"
        className=""
        type="email"
        name="email"
        required
      ></input>
      <label htmlFor="password">Password (6 characters min.)</label>{" "}
      <input
        id="password"
        className=""
        type="password"
        name="password"
        required
      ></input>
      <div>
        <button className="">
          Register
        </button>
      </div>
      <Link href="/login">Already have an account? Log in here</Link>
    </form>
  );
}