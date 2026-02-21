import React from 'react'
import PaymentPage from '@/components/PaymentPage'
import { notFound } from "next/navigation"
import connectDb from '@/db/connectDb'
import User from '@/models/User'
const Username = async ({ params }) => {
  const unwrappedParams = await params;

  // If the username is not present in the database, show a 404 page
  const checkUser = async () => {
    await connectDb()
    let u = await User.findOne({ username: unwrappedParams.username })
    if (!u) {
      return notFound()
    }
  }
  await checkUser()



  return (
    <>
      <PaymentPage username={unwrappedParams.username} />
    </>
  )
}

export default Username

export async function generateMetadata({ params }) {
  const unwrappedParams = await params;
  return {
    title: `Support ${unwrappedParams.username} - Get Me A Chai`,
  }
}