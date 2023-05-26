import Header from '@/components/Header/Header '
import './globals.css'
import { Inter } from 'next/font/google'
import Provider from '@/components/auth/Provider '
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import { LayoutProps } from '../../types'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Chat.io',
  description: 'chat app',
}

export default async function RootLayout({ children}: LayoutProps) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
      </head>
      <body className={inter.className}>
        <Provider session={session}>
           {/* @ts-expect-error Server Component */}
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  )
}
