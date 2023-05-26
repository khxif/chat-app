import Login from "@/components/auth/Login ";
import MessageInput from "@/components/message/MessageInput ";
import MessagesLists from "@/components/message/MessagesLists ";
import { getServerSession } from "next-auth";

export default async function Home() {
  const res = await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000' }/api/getMessages `)
  const data = await res.json()
  //console.log(data.messages);
  
  const session = await getServerSession()
  return (
      <main>
        {
          session?(
            <>
              <MessagesLists serverMessages={data.messages} />
              <MessageInput />
            </>
          ):(
            <Login />
          )
        }
      </main>
  )
}
