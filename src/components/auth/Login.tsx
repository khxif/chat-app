"use client"

import Image from "next/image"
import Logo from '../../../public/logo.png'
import { signIn } from "next-auth/react"

export default function Login() {
  return (
    <div className="w-full h-[70vh] flex flex-col justify-center items-center px-1">
        <Image
        src={Logo}
        alt="logo"
        width={100}
        height={100}
        />
        <button className="text-3xl text-blue-600 animate-pulse font-serif font-bold"
        onClick={() => signIn('google')}
        >
            Login in to continue
        </button>
    </div>
  )
}
