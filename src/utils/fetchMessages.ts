import { Message } from "../../types";

export const fetcher = async() => {

  const res = await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000'}/api/getMessages`);
  const message = await res.json()
  const messages: Message[] = message.messages

  //console.log(messages);
  
  return messages;
  
}