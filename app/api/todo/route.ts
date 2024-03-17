import db from "@/lib/db"
import { NextResponse } from "next/server"


export async function POST(req: Request) {
    const { id, content } = await req.json()

    const result = await db.todo.create({
        data:{
            id,
            content,
        }
    })
    if(!result) return  NextResponse.json({message: "error", status: 500})
    return NextResponse.json({message: "ok", status:200, data: result})
}

export async function GET(req: Request) {
    const result = await db.todo.findMany()
    return Response.json({message: "ok", status: 200, data: result})
}