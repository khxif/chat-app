import Image from "next/image";
import { MesssageComponentProps } from "../../../types";
import TimeAgo from 'react-timeago'

export default function MessageComponent({messages,session}:MesssageComponentProps) {

  const isUser = session?.user?.email === messages.email

  return (
    <div className={`flex items-center ${isUser && 'ml-auto  flex-row-reverse'}`}>

      <div className="flex items-center">
      <div className={`flex-shrink-0 ${isUser && 'order-2'}`}>

        <Image 
        src={messages?.image}
        alt={messages?.userName || 'profile picture'}
        width={50}
        height={10}
        className="rounded-full "
        priority
        />

      </div>
      <div className="flex flex-col ">

        <p className={isUser?'text-[0.65rem] text-blue-400': 'text-[0.65rem] text-red-400'}>
          {messages?.userName}
        </p>
        <span className={isUser? 'bg-blue-400  p-2 rounded-md text-right text-white': 'bg-red-400 p-2 rounded-md text-white text-left'}>
          {messages.message}
        </span>

      </div>
      </div>
      <div className={`flex flex-col justify-between ${isUser?'mr-1':'ml-1'}`}>

        <p className="h-8">{'      '}</p>
        <p className="text-gray-400 text-[0.65rem] bottom-0 ">
          <TimeAgo date={new Date(messages.created_at)} />
        </p>
        
      </div>
    </div>
  )
}
