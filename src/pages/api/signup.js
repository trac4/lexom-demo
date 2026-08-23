import { db } from "@/dbConfig/dbCong";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server"; // req and res must be imported for a nextjs application IF using typescript
import bcrypt from 'bcrypt'

db()

export async function POST(req, res) {
    try {
        return res.status(200).json('hi')
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
        console.log(error)
        return res.status(400).json({err: 'error'})
    }
}