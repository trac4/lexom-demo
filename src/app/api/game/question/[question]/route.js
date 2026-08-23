import { db } from "@/dbConfig/dbCong";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server"; // req and res must be imported for a nextjs 
import Prompt from "@/model/promptModel";

db();

export async function GET(req, {params}){
    let {question} = await params
    question = Number(question)
    try {
    //getting a single question (called prompt) via destructuring and filtering
    const [prompt] = await Prompt.find()
    .skip((question - 1))
    .limit(1)
    console.log(prompt)
    return NextResponse.json(prompt)
    
    } catch (error) {
    console.log(error)
    return NextResponse.json({error: error.message}, {status:500})
    }
}