import { NextResponse } from "next/server"
import { db } from "@/dbConfig/dbCong"
import Leaderboard from "@/model/leaderboardModel"
import User from "@/model/userModel"
import jwt from 'jsonwebtoken'
import { determineLongestWord } from "@/app/utils/determineLongestWord"

db();

export async function POST(req) {
   const token = req.cookies.get("token").value;
   console.log(token);
   const { id } = jwt.verify(token, process.env.JWT_SECRET);
   const reqBody = await req.json();
   const { score, longestWord: word } = reqBody;

   try {
   //part 1: updating the longest word a user has ever submitted, if applicable
   const user = await User.findById(id)
   let oldLongest = user.longestWord

   user.longestWord = determineLongestWord(oldLongest, word)
   await user.save()

   //part 2: creating (or updating) a new submission to the leaderboard
   let submission = await Leaderboard.findOne({submitted_userId: id})
   if (!submission) {
     submission = await Leaderboard.create({
        score,
        submitted_userId: id,
        submitted_date: new Date().toISOString()
    })
   } else {
      let oldScore = submission.score
      if (oldScore < score) {
         submission.score = score
         submission.submitted_date = new Date().toISOString()
         await submission.save()
      }
      
   }

    console.log(submission)

    return NextResponse.json(submission, {status:200})
   } catch (error) {
    console.log(error);
    return NextResponse({error: 'something went wrong'}, {status: 500})
   }    
}

export async function GET(req) {
   let user_id = null // initially set to null so that even if user is not logged in, this variable is still sent. Will be important for setting up leaderboard page highlighting
   
   const token = req.cookies.get("token")?.value;
   // console.log(token);
   
   if(token) {
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      user_id = id
   }

   const leaderboard = await Leaderboard.find().populate({path: 'submitted_userId', select: 'username'}).sort({score: -1, submitted_date: -1})
   console.log(leaderboard)
   
   return NextResponse.json({user_id, leaderboard}, {status:200})

}