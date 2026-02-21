import { NextResponse } from "next/server";
import crypto from "crypto";
import connectDb from "@/db/connectDb";
import Payment from "@/models/Payment";

export async function POST(request) {
    try {
        const body = await request.json();
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return NextResponse.json({ success: false, message: "Missing payment fields" }, { status: 400 });
        }

        // Find the payment in DB to get the user's Razorpay secret for verification
        await connectDb();
        const payment = await Payment.findOne({ oid: razorpay_order_id });

        if (!payment) {
            return NextResponse.json({ success: false, message: "Payment order not found" }, { status: 404 });
        }

        // Fetch the creator's Razorpay secret from the User model
        const User = (await import("@/models/User")).default;
        const user = await User.findOne({ username: payment.to_user });

        if (!user || !user.razorpaysecret) {
            return NextResponse.json({ success: false, message: "Creator not found or missing Razorpay secret" }, { status: 404 });
        }

        // Verify the payment signature
        const generatedSignature = crypto
            .createHmac("sha256", user.razorpaysecret)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            return NextResponse.json({ success: false, message: "Payment verification failed" }, { status: 400 });
        }

        // Mark the payment as done
        await Payment.findOneAndUpdate(
            { oid: razorpay_order_id },
            { done: true, updatedAt: new Date() }
        );

        // Redirect to the creator's page with success param
        const redirectUrl = `${process.env.NEXT_PUBLIC_URL}/${payment.to_user}?paymentdone=true`;
        return NextResponse.redirect(redirectUrl);

    } catch (error) {
        console.error("Razorpay callback error:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}
