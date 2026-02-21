import { NextResponse } from "next/server";
import connectDb from "@/db/connectDb";
import User from "@/models/User";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const q = searchParams.get("q")?.trim();

        if (!q || q.length < 1) {
            return NextResponse.json({ users: [] });
        }

        await connectDb();

        const regex = new RegExp(q, "i");
        const users = await User.find({
            $or: [{ username: regex }, { name: regex }],
        })
            .select("username name profilepic")
            .limit(8)
            .lean();

        return NextResponse.json({ users });
    } catch (error) {
        console.error("Search error:", error);
        return NextResponse.json({ users: [], error: "Search failed" }, { status: 500 });
    }
}
