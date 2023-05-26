'use client'

import { signIn, signOut } from "next-auth/react"
import { ButtonProps } from "../../../types"

export default function Button({session}: ButtonProps) {
  return (
    <div className="">
        {
            session?(
                <button className="button "
                onClick={() => signOut()}
                >
                    Logout
                </button>
            ):(
                <button className="button"
                onClick={() => signIn('google')}
                >
                    Login
                </button>
            )
        }
    </div>
  )
}
