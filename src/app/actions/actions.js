'use server'
import { revalidatePath } from "next/cache"
import { db } from "@/dbConfig/dbCong"
import bcrypt from 'bcrypt'
import User from "@/model/userModel";
import { signUpSchema } from "@/zodConfig/zodSchema"
import { object } from "zod";

//may go unused
export async function onSignUp(formData) {
    //talking to database
    // await db();
    // // console.log(formData)
    // const user = {
    //   username: formData.get('username'),
    //   email: formData.get('email'),
    //   password: formData.get('password')
    // }
    // const {username, email, password} = user
    
    
    // try {
    //   let salt = await bcrypt.genSalt();
    //   const hashedPassword = await bcrypt.hash(password, salt);

    //   const newUser = await User.create({
    //     username,
    //     email,
    //     password: hashedPassword,
    //   });

    //   console.log(newUser);
    // } catch (error) {
    //   console.log(error);
    //   // toast.error(error.message)
    // }
    // finally {
    //   // setLoading(false)
    // }
  }

export async function onSignUp2( formData) {
    //talking to database
    // await db();
    console.log(formData.get('username'))
  //   const result = signUpSchema.safeParse(Object.fromEntries(formData))
  //   if (!result.success) {
  //   return {
  //     errors: result.error.flatten().fieldErrors
  //   };
  // }
  //   console.log(result)
  //   // console.log(formData)
  //   // const {username, email, password} = user
  //   return 6
    
    // try {
    //   let salt = await bcrypt.genSalt();
    //   const hashedPassword = await bcrypt.hash(password, salt);

    //   const newUser = await User.create({
    //     username,
    //     email,
    //     password: hashedPassword,
    //   });

    //   console.log(newUser);
    // } catch (error) {
    //   console.log(error);
    //   // toast.error(error.message)
    // }
    // finally {
    //   // setLoading(false)
    // }
  }