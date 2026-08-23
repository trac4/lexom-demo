import SignUpForm from "../Components/SignUpForm"
/* IMPORTANT: NEVER CALL THIS FILE ANYTHING BUT PAGE.JSX, THIS APP WILL CRASH OTHERWISE
 * CALLL THE FOLDER HOUSING THIS FILE THE NAME OF THE ROUTE, NEXTJS WILL SHOW THIS PAGE UPON ENTERING IT */
import { onSignUp } from "../actions/actions"

 function SignUpPage () {
  return (
    <SignUpForm/>
  )
}

export default SignUpPage