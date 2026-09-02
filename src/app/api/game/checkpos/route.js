import { NextRequest, NextResponse } from "next/server"
import thesaurus from "word-thesaurus"




export async function GET(req) {
    console.log(thesaurus.search())
    const searchParams = req.nextUrl.searchParams
    const word = searchParams.get('word')
    const query = searchParams.get('pos')
    console.log(query.split(','))
    console.log(thesaurus.search(word).map(res => thesaurus.posName(res.pos)))

    return NextResponse.json('got it')
}