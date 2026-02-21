"use client"
import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { useSession } from 'next-auth/react'
import { fetchuser, fetchpayments, initiate } from '@/actions/useractions'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Bounce } from 'react-toastify'
import { useRouter } from 'next/navigation'

/* ── Shared glass input style ── */
const GlassInput = ({ type = "text", name, value, onChange, placeholder, prefix }) => {
    const [focused, setFocused] = useState(false)
    return (
        <div className="relative">
            {prefix && (
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400/60 text-sm select-none">{prefix}</span>
            )}
            <input
                type={type}
                name={name}
                value={value || ""}
                onChange={onChange}
                placeholder={placeholder}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className={`w-full px-4 py-3 ${prefix ? "pl-8" : ""} rounded-xl text-sm text-white placeholder-purple-300/30 outline-none transition-all duration-200`}
                style={{
                    background: focused ? "rgba(255,255,255,0.09)" : "rgba(255,255,255,0.05)",
                    border: focused ? "1px solid rgba(167,139,250,0.55)" : "1px solid rgba(139,92,246,0.28)",
                    backdropFilter: "blur(8px)",
                }}
            />
        </div>
    )
}

/* ── Glass card wrapper ── */
const GlassCard = ({ children, className = "" }) => (
    <div
        className={`rounded-2xl p-6 ${className}`}
        style={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(139,92,246,0.28)",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.04) inset, 0 8px 40px rgba(139,92,246,0.18), 0 2px 8px rgba(0,0,0,0.6)",
        }}
    >
        {children}
    </div>
)

const PaymentPage = ({ username }) => {
    const [paymentform, setPaymentform] = useState({ name: "", message: "", amount: "" })
    const [currentUser, setcurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => { getData() }, [])

    useEffect(() => {
        if (searchParams.get("paymentdone") == "true") {
            toast('🍵 Thanks for your donation!', {
                position: "top-right", autoClose: 5000, theme: "dark", transition: Bounce,
            })
        }
        router.push(`/${username}`)
    }, [])

    const handleChange = (e) => setPaymentform({ ...paymentform, [e.target.name]: e.target.value })

    const getData = async () => {
        let u = await fetchuser(username)
        setcurrentUser(u)
        let dbpayments = await fetchpayments(username)
        setPayments(dbpayments)
    }

    const pay = async (amount) => {
        let a = await initiate(amount, username, paymentform)
        let orderId = a.id
        var options = {
            "key": currentUser.razorpayid,
            "amount": amount,
            "currency": "INR",
            "name": "Get Me A Chai",
            "description": "Support a creator",
            "image": "https://example.com/your_logo",
            "order_id": orderId,
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { "name": "Supporter", "email": "supporter@example.com", "contact": "9000090000" },
            "notes": { "address": "Get Me A Chai" },
            "theme": { "color": "#7c3aed" }
        }
        var rzp1 = new Razorpay(options)
        rzp1.open()
    }

    const totalRaised = payments.reduce((a, b) => a + b.amount, 0)

    return (
        <>
            <ToastContainer theme="dark" />
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />

            <div
                className="relative w-full text-white min-h-screen overflow-hidden"
                style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(88,28,135,0.35) 0%, rgba(5,3,15,1) 65%)" }}
            >
                {/* Glow blobs */}
                <div className="absolute top-0 left-[-100px] w-[500px] h-[500px] rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(139,92,246,0.22) 0%, transparent 70%)", filter: "blur(70px)", animation: "pulseBlob 8s ease-in-out infinite alternate" }} />
                <div className="absolute top-[30%] right-[-80px] w-[360px] h-[360px] rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)", filter: "blur(60px)", animation: "pulseBlob 10s ease-in-out infinite alternate-reverse" }} />

                {/* ── Cover Image ── */}
                <div className="relative w-full h-[220px] md:h-[280px] overflow-hidden">
                    <img
                        className="object-cover w-full h-full"
                        src={currentUser.coverpic || "https://c10.patreonusercontent.com/4/patreon-media/p/campaign/484266/452118f06a784bcaf891b6756bc414b5/2.jpg?token-time=2145916800&token-hash=925828de35532dce2af6d57361732e4d"}
                        alt="Cover"
                    />
                    {/* Gradient fade at bottom */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(5,3,15,0.95)]" />

                    {/* Top shimmer bar */}
                    <div className="absolute top-0 left-0 right-0 h-1"
                        style={{ background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.6), transparent)" }} />
                </div>

                {/* ── Profile identity strip ── */}
                <div className="relative px-6 md:px-16 -mt-16 pb-6 flex flex-col md:flex-row md:items-end gap-5">
                    {/* Avatar */}
                    <div className="shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden"
                        style={{
                            border: "3px solid rgba(139,92,246,0.6)",
                            boxShadow: "0 0 0 4px rgba(5,3,15,1), 0 0 28px rgba(139,92,246,0.5)",
                        }}>
                        <img className="w-full h-full object-cover" src={currentUser.profilepic || "/avatar.gif"} alt="Profile" />
                    </div>

                    {/* Name + stats */}
                    <div className="flex-1 flex flex-col gap-1 pb-1">
                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight"
                                style={{ background: "linear-gradient(135deg,#e0d7ff,#c4b5fd,#818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                                @{username}
                            </h1>
                            {/* Account type badge */}
                            {currentUser.accounttype === "creator" ? (
                                <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full"
                                    style={{ background: "linear-gradient(135deg,rgba(124,58,237,0.35),rgba(79,70,229,0.25))", border: "1px solid rgba(167,139,250,0.55)", color: "#c4b5fd" }}>
                                    🎨 Creator
                                </span>
                            ) : (
                                <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full"
                                    style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.45)", color: "#86efac" }}>
                                    ☕ Supporter
                                </span>
                            )}
                            {currentUser.email && (
                                <a href={`mailto:${currentUser.email}`}
                                    className="flex items-center gap-1.5 text-xs font-medium text-purple-300 px-4 py-1.5 rounded-full transition-all duration-200 hover:scale-[1.03]"
                                    style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.4)" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                    </svg>
                                    Contact
                                </a>
                            )}
                        </div>
                        <p className="text-purple-300/60 text-sm">Let&apos;s help {username} get a chai! ☕</p>

                        {/* Stats chips */}
                        <div className="flex flex-wrap gap-3 mt-2">
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-purple-200"
                                style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.35)" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 text-purple-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                                {payments.length} Supporters
                            </div>
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-green-300"
                                style={{ background: "rgba(34,197,94,0.10)", border: "1px solid rgba(34,197,94,0.30)" }}>
                                <span className="text-green-400">₹</span>
                                {totalRaised.toLocaleString()} raised
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Bio Section ── */}
                {currentUser.bio && (
                    <div className="px-6 md:px-16 mb-2 mt-2">
                        <div
                            className="w-full rounded-2xl px-6 py-4"
                            style={{
                                background: "rgba(255,255,255,0.04)",
                                backdropFilter: "blur(16px)",
                                WebkitBackdropFilter: "blur(16px)",
                                border: "1px solid rgba(139,92,246,0.25)",
                                boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                            }}
                        >
                            <p className="text-xs font-semibold uppercase tracking-widest text-purple-400/60 mb-2 flex items-center gap-1.5">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                                About
                            </p>
                            <p className="text-white/80 text-sm leading-relaxed">{currentUser.bio}</p>
                        </div>
                    </div>
                )}

                {/* ── Main content grid ── */}
                <div className="flex flex-col md:flex-row gap-6 px-6 md:px-16 pb-20 mt-4">

                    {/* ── Top Supporters ── */}
                    <GlassCard className="w-full md:w-1/2">
                        <h2 className="text-lg font-bold mb-5 flex items-center gap-2 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-pink-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                            Top Supporters
                        </h2>

                        {/* Shimmer line */}
                        <div className="w-full h-px mb-5" style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.35), transparent)" }} />

                        <ul className="flex flex-col gap-3 max-h-[420px] overflow-y-auto pr-1" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(139,92,246,0.3) transparent" }}>
                            {payments.length === 0 && (
                                <li className="text-center py-10 text-purple-300/40 text-sm italic">
                                    No supporters yet. Be the first! ☕
                                </li>
                            )}
                            {payments.map((p, i) => (
                                <li key={i}
                                    className="flex gap-3 items-center px-4 py-3 rounded-xl transition-all duration-200 hover:scale-[1.01]"
                                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(139,92,246,0.2)" }}>
                                    {/* Rank badge for top 3 */}
                                    <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-bold text-sm"
                                        style={{
                                            background: i === 0 ? "linear-gradient(135deg,#f59e0b,#d97706)" : i === 1 ? "linear-gradient(135deg,#9ca3af,#6b7280)" : i === 2 ? "linear-gradient(135deg,#92400e,#78350f)" : "rgba(139,92,246,0.25)",
                                            color: i < 3 ? "#fff" : "#c4b5fd",
                                            boxShadow: i === 0 ? "0 0 14px rgba(245,158,11,0.5)" : "none",
                                        }}>
                                        {i < 3 ? ["🥇", "🥈", "🥉"][i] : `#${i + 1}`}
                                    </div>
                                    <div className="flex flex-col min-w-0 flex-1">
                                        <span className="font-semibold text-sm text-white truncate">{p.name}</span>
                                        {p.message && <span className="text-xs text-purple-300/50 truncate">{p.message}</span>}
                                    </div>
                                    <div className="font-bold text-green-400 text-sm shrink-0">+₹{p.amount}</div>
                                </li>
                            ))}
                        </ul>
                    </GlassCard>

                    {/* ── Make a Payment ── */}
                    <GlassCard className="w-full md:w-1/2 md:sticky md:top-24 h-fit">
                        <h2 className="text-lg font-bold mb-5 flex items-center gap-2 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-purple-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                            </svg>
                            Support {username}
                        </h2>

                        {/* Shimmer line */}
                        <div className="w-full h-px mb-5" style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.35), transparent)" }} />

                        <div className="flex flex-col gap-4">
                            <GlassInput name="name" value={paymentform.name} onChange={handleChange} placeholder="Your name" />
                            <GlassInput name="message" value={paymentform.message} onChange={handleChange} placeholder="Say something nice… ✨" />
                            <GlassInput type="number" name="amount" value={paymentform.amount} onChange={handleChange} placeholder="Amount" prefix="₹" />

                            {/* Quick-pay chips */}
                            <div className="flex gap-2 flex-wrap">
                                {[10, 20, 50, 100].map(amt => (
                                    <button key={amt} onClick={() => pay(amt * 100)}
                                        className="px-4 py-1.5 rounded-full text-sm font-semibold text-purple-200 transition-all duration-200 hover:scale-[1.05] active:scale-[0.97]"
                                        style={{ background: "rgba(139,92,246,0.18)", border: "1px solid rgba(139,92,246,0.38)" }}>
                                        ₹{amt}
                                    </button>
                                ))}
                            </div>

                            {/* Pay button */}
                            <button
                                onClick={() => pay(Number(paymentform.amount) * 100)}
                                disabled={!paymentform.name || !paymentform.message || !paymentform.amount}
                                className="w-full py-3 rounded-full text-white text-sm font-bold tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 mt-1"
                                style={{
                                    background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
                                    boxShadow: "0 4px 24px rgba(124,58,237,0.5)",
                                    border: "1px solid rgba(167,139,250,0.4)",
                                }}
                                onMouseEnter={e => { if (!e.currentTarget.disabled) e.currentTarget.style.boxShadow = "0 6px 32px rgba(124,58,237,0.75)" }}
                                onMouseLeave={e => e.currentTarget.style.boxShadow = "0 4px 24px rgba(124,58,237,0.5)"}
                            >
                                ☕ Pay ₹{paymentform.amount || 0}
                            </button>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </>
    )
}

export default PaymentPage