import { db } from "@/dbConfig/dbCong";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server"; // req and res must be imported for a nextjs
import Prompt from "@/model/promptModel";

db();

export async function POST(req, res) {
  console.log(req);
  const questionforDB = {
    prompt: "Type into the box a word that is at least 6 letters long",
    minLength: 6,
    beginningWith: [],
    endingWith: [],
    requiredPartOfSpeech: [],
    acceptedWords: [],
  };

  try {
    const question = await Prompt.create(questionforDB)
    return NextResponse.json({questionfromDB: question}, {status:201})
  } catch (error) {
    console.log(error)
    return NextResponse.json({error: error.message}, {status:500})
  }
}