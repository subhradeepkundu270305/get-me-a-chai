"use server"

import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import connectDb from "@/db/connectDb"
import User from "@/models/User"


export const initiate = async (amount, to_username, paymentform) => {
    await connectDb()
    // fetch the secret of the user who is getting the payment 
    let user = await User.findOne({ username: to_username })
    const secret = user.razorpaysecret

    var instance = new Razorpay({ key_id: user.razorpayid, key_secret: secret })



    let options = {
        amount: Number.parseInt(amount),
        currency: "INR",
    }

    let x = await instance.orders.create(options)

    // create a payment object which shows a pending payment in the database
    await Payment.create({ oid: x.id, amount: amount / 100, to_user: to_username, name: paymentform.name, message: paymentform.message })

    return x

}


export const fetchuser = async (username) => {
    await connectDb()
    let u = await User.findOne({ username: username })
    let user = u.toObject({ flattenObjectIds: true })
    return user
}

export const fetchpayments = async (username) => {
    await connectDb()
    // find all payments sorted by decreasing order of amount and flatten object ids
    let p = await Payment.find({ to_user: username, done: true }).sort({ amount: -1 }).limit(10).lean()
    return p
}

export const updateProfile = async (data, oldusername) => {
    await connectDb()

    // Strip immutable/internal MongoDB fields before updating
    const { _id, __v, createdAt, ...updateData } = data
    updateData.updatedAt = new Date()

    // If the username is being updated, check if username is available
    if (oldusername !== updateData.username) {
        let u = await User.findOne({ username: updateData.username })
        if (u) {
            return { error: "Username already exists" }
        }
        await User.updateOne({ email: updateData.email }, { $set: updateData })
        // Now update all the usernames in the Payments table
        await Payment.updateMany({ to_user: oldusername }, { to_user: updateData.username })
    }
    else {
        await User.updateOne({ email: updateData.email }, { $set: updateData })
    }
}


export const fetchStats = async () => {
    await connectDb()
    const userCount = await User.countDocuments()
    const paymentCount = await Payment.countDocuments({ done: true })
    const totalRaisedAgg = await Payment.aggregate([
        { $match: { done: true } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
    ])
    const totalRaised = totalRaisedAgg[0]?.total || 0
    return { userCount, paymentCount, totalRaised }
}


