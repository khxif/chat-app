"use client"

import { useSession } from "next-auth/react"
import { v4 as uuid } from 'uuid';
import useSWR from 'swr'
import { FormEvent, useState } from "react"
import { Message } from "../../../types";
import { fetcher } from "@/utils/fetchMessages ";

export default function MessageInput() {

  const {data: messages, mutate, error } = useSWR('/api/getMessages',fetcher)
  //console.log(messages);
  

  const[input,setInput] = useState('') 
  const {data: session} = useSession()

  const id = uuid()
  

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!input) return;

    const messageToSend = input;
    setInput('')

    const message: Message = {
      id,
      message:messageToSend,
      userName: session?.user?.name!,
      email: session?.user?.email!,
      image: session?.user?.image!,
      created_at: Date.now(),
    }
    
    const uploadMessageToUpstash = async() => {
      const res = await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000'}/api/addMessages`,{
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({message})
      })
      const data = await res.json()
      const newMessage = data.message;

      return[newMessage,...messages!]
    }

    await mutate(uploadMessageToUpstash,{
      optimisticData:[message,...messages!],
      rollbackOnError:true,
    })

  }

  return (
      <footer className="sticky bottom-0 max-w-screen py-6 px-4
       md:px-12 bg-white z-50 border-t-[.5px] overflow-hidden">

        <form className="flex space-x-2"
        onSubmit={handleSubmit}
        >

        <input type="text"
        placeholder="Enter your message here...."
        className="flex-1 border border-gray-300 px-1 py-3
        outline-blue-600 md:px-4"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />
        <button className="button px-2 md:px-4 py-2 border-xs 
        disabled:bg-blue-300 bg-blue-600 
        disabled:cursor-not-allowed"
        disabled={!input}
        >
          Send
        </button>
        
        </form>

      </footer>
  )
}
