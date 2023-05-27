"use client"

import { fetcher } from "@/utils/fetchMessages ";
import useSWR from "swr";
import MessageComponent from "./MessageComponent";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { clientPusher } from "@/utils/pusher ";
import { Message, MessageListsProps } from "../../../types";

export default function MessagesLists({serverMessages}: MessageListsProps) {

  const {data: messages, mutate, error } = useSWR(`/api/getMessages`,fetcher)
  //console.log(messages);
  const {data: session} = useSession()
  //console.log(session);
  //console.log(serverMessages);
  

  useEffect(()=>{
   const channel = clientPusher.subscribe('messages')
   channel.bind('new-messages',async(data: Message)=>{
    if(messages?.find((message)=> message.id===data.id)) return;
    if(!messages) mutate(fetcher)
    else{
    mutate(fetcher,{
      optimisticData:[data,...messages!],
      rollbackOnError:true,
    })
  }
   })
   return(()=>{
    channel.unbind_all()
    channel.unsubscribe()
   })
   
  },[messages,mutate])

  return (
    <div className="min-h-screen py-4 md:py-6 flex flex-col space-y-5 px-4 md:px-24 ">
        {
          (messages || serverMessages).map((message:Message) => (
            <MessageComponent key={message?.id} messages={message} session={session}  />
          ))
        }
    </div>
  )
}
