import { Message } from "../../types";

export const fetcher = async() => {

  const res = await fetch(`https://chat-app-khxif.vercel.app/api/getMessages`);
  const message = await res.json()
  const messages: Message[] = message.messages

  //console.log(messages);
  
  return messages;
  
}