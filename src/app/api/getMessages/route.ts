import redis from "@/utils/redis ";
import { NextResponse } from "next/server";
import { Message } from "../../../../types";

export async function GET(req: Request) {
    const res = await redis.hvals('messages')
    const messages: Message[] = res.map( message => JSON.parse(message) ).sort((a,b) => b.created_at-a.created_at )

    //console.log(messages);
    
     return NextResponse.json({messages},{status:200})
}