import { db } from "@/dbConfig/dbCong";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server"; // req and res must be imported for a nextjs application IF using typescript
import jwt from 'jsonwebtoken'

db();

export async function GET(req) {

    const token = req.cookies.get('token').value
    console.log(token)
    const {id} = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(id).select('-password')
    console.log(user)
    return NextResponse.json(user, {status: 200})
    
}