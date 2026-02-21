"use client"
import React, { use } from 'react'
import { SessionProvider } from 'next-auth/react'

export default function SessionWrapper({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}


 