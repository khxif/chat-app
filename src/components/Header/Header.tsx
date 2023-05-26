import Image from "next/image"
import Logo from '../../../public/logo.png'
import Button from "./Button"
import { getServerSession } from "next-auth"
import { JSXElementConstructor, ReactElement } from "react"

export default async function Header() {
  const session = await getServerSession()
  const user = session?.user
  //console.log(user);
  
  
  return (
      <header className="flex items-center sticky top-0 px-2.5
      py-6 md:p-10 md:px-14 text-center shadow-md w-full z-50 bg-white">
        {
          !user ? (
            <nav className="flex flex-col mx-auto space-y-4">
              <div className="flex items-center space-x-2">
                <Image
                src={Logo}
                alt="logo"
                width={40}
                height={10}
                />
                <p className="text-blue-400 text-lg">
                  Welcome to Chat.io!
                </p>
              </div>
              <Button session={session} />
            </nav>
          ):(
            <nav className="flex flex-row items-center 
            justify-between w-full">
              <div className="flex items-center space-x-2 md:space-x-4">
                <Image
                src={user?.image!}
                alt="profile-pic"
                width={65}
                height={10}
                className="rounded-full"
                />
                <div className="flex flex-col items-center 
                text-center space-y-0.5">
                  <h3 className="text-blue-600">Loggined as:</h3>
                  <p className="font-bold">{user?.name}</p>
                </div>
              </div>
              <div className="">
                <Button session={session} />
              </div>
            </nav>
          )
        }
      </header>
  )
}
