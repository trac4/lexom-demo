import { db } from "@/dbConfig/dbCong";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server"; // req and res must be imported for a nextjs application IF using typescript
import bcrypt from 'bcrypt'

db()

export async function POST(req, res) {
    try {
        const reqBody = await req.json() //in next js, incoming requests are always asynchronous
        const {username, email, password} = reqBody
        console.log(reqBody)

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = await User.create({
            username,
            email,
            password:hashedPassword
        })

        console.log(newUser)
        return NextResponse.json({message: "New User created successully", success:true, newUser}, {status: 201})

    } catch (error) {
        //a way to bypass issues from using server actions, may change this in the future
        let status;
        const dupe = error.keyValue? Object.entries(error.keyValue).flat()[0] : undefined
        status = (dupe === 'email')? 400 : 401
        console.log ('status is now ' ,status)
        const emailErrors = error.errors?.email?.message
        if (emailErrors) status = 418
        return NextResponse.json({message: "there was an error", success:false}, {status})
    }
}