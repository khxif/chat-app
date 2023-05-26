import { serverPusher } from "@/utils/pusher "
import redis from "@/utils/redis "
import { NextResponse } from "next/server"

export async function POST(req: Request) {

    const {message} = await req.json()
    const newMessage = {
        ...message,
        created_at: Date.now()
    }
    await redis.hset('messages',newMessage.id,JSON.stringify(newMessage))
    serverPusher.trigger('messages','new-messages',newMessage)

    return NextResponse.json({message:newMessage},{status:200})
}