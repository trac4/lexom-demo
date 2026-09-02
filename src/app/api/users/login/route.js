import { db } from "@/dbConfig/dbCong";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server"; // req and res must be imported for a nextjs application IF using typescript
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

db()

export async function POST(req, res) {
    try {
        const reqBody = await req.json() //in next js, incoming requests are always asynchronous
        const password = reqBody.password
        const emailOrUser = reqBody['e-or-u']
        console.log(emailOrUser, password)
        

        //find user
        let user = await User.findOne({email: emailOrUser})
        if(!user) {
            user = await User.findOne({username: emailOrUser})
        }

        if(!user) {
            return NextResponse.json({message: "Incorrect email or username", success:false}, {status:404})
        }

    

        //verify password
        const isPassword = await bcrypt.compare(password, user.password)
        if (!isPassword){
            return NextResponse.json({error: 'Incorrect password'}, {status: 403})
        }

        //will record the user's login to UTC time, .toLocaleDateString() is required to show this in user's time zone
        user.lastLogIn = new Date().toISOString()
        await user.save() //saves doc without using findOneAndUpdate

        console.log(user)
        // console.log(process.env.JWT_SECRET)

        // return NextResponse.json({message: "correct email or username", success:true}, {status:200})
        
        //create token data
        const tokenData = {
            id:user._id,
            username: user.username,
            email: user.email,
        }

        const token = jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn: '1d'})
        const response = NextResponse.json({message: 'login successful', success: true}, {status: 200})

        //response being a NextResponse type means it has access to the cookies property
        response.cookies.set('token', token, {httpOnly: true})

        return response
        

    } catch (error) {
        console.log(error)
        return NextResponse.json({error: error.message}, {status: 500})
    }
}
