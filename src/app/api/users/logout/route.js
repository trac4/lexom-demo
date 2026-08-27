import { NextResponse } from 'next/server'


export async function GET() {
    try {
        //cookie is emptied and is set to expire immediately
        const response = NextResponse.json('logout successful', {status: 200})
        response.cookies.set('token','', {httpOnly:true, expires: new Date(0)})
        return response;

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}