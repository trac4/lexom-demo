import { NextResponse } from "next/server"
import { db } from "@/dbConfig/dbCong"
import Leaderboard from "@/model/leaderboardModel"
import jwt from 'jsonwebtoken'

db();

export async function POST(req) {
   const token = req.cookies.get("token").value;
   console.log(token);
   const { id } = jwt.verify(token, process.env.JWT_SECRET);
   const reqBody = await req.json();
   const { score } = reqBody;

   try {
    const submission = await Leaderboard.create({
        score,
        submitted_userId: id
    })

    console.log(submission)

    return NextResponse.json(submission, {status:201})
   } catch (error) {
    console.log(error);
    return NextResponse({error: 'something went wrong'}, {status: 500})
   }

   
   return NextResponse.json("hi");    
}