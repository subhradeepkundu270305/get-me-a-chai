"use client"
import React, { useEffect } from 'react'
import { useSession, signIn } from "next-auth/react"
import { useRouter } from 'next/navigation'

const Login = () => {
    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (session) {
            router.push("/dashboard")
        }
    }, [session, router])

    return (
        <div
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            style={{
                backgroundImage: "url('/glass.gif')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px]" />

            {/* Glow blobs */}
            <div className="absolute top-[-80px] left-[-80px] w-[360px] h-[360px] rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 70%)", filter: "blur(56px)", animation: "pulseBlob 6s ease-in-out infinite alternate" }} />
            <div className="absolute bottom-[-60px] right-[-60px] w-[300px] h-[300px] rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(59,130,246,0.28) 0%, transparent 70%)", filter: "blur(48px)", animation: "pulseBlob 8s ease-in-out infinite alternate-reverse" }} />

            {/* Glassmorphic card */}
            <div
                className="relative z-10 w-full max-w-md mx-4 rounded-3xl px-5 py-8 sm:px-10 sm:py-12 flex flex-col items-center gap-5 sm:gap-6"
                style={{
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(28px)",
                    WebkitBackdropFilter: "blur(28px)",
                    border: "1px solid rgba(139,92,246,0.35)",
                    boxShadow: "0 0 0 1px rgba(255,255,255,0.06) inset, 0 8px 48px rgba(139,92,246,0.3), 0 2px 12px rgba(0,0,0,0.7)",
                }}
            >
                {/* Top shimmer */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px pointer-events-none"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.7), transparent)" }} />

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-1"
                    style={{ background: "linear-gradient(135deg,rgba(124,58,237,0.6),rgba(79,70,229,0.6))", border: "1px solid rgba(167,139,250,0.4)", boxShadow: "0 4px 20px rgba(124,58,237,0.4)" }}>
                    <img src="/Tea.gif" width={40} height={40} alt="Tea" />
                </div>

                {/* Title */}
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white tracking-tight">
                        Create Your Account
                    </h1>
                    <p className="text-purple-300/70 text-sm mt-1">
                        Get Me A Chai — Fund your favourite creators
                    </p>
                </div>

                {/* Divider */}
                <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent)" }} />

                {/* Buttons */}
                <div className="w-full flex flex-col gap-4">

                    {/* Google */}
                    <button
                        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                        className="w-full flex items-center justify-center gap-3 py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                        style={{
                            background: "rgba(255,255,255,0.08)",
                            border: "1px solid rgba(255,255,255,0.18)",
                            color: "#fff",
                            boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
                            backdropFilter: "blur(8px)",
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.14)"}
                        onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
                    >
                        <svg className="h-5 w-5 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 0 48 48">
                            <g fill="none" fillRule="evenodd">
                                <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" fill="#FBBC05" />
                                <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" fill="#EB4335" />
                                <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" fill="#34A853" />
                                <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" fill="#4285F4" />
                            </g>
                        </svg>
                        Continue with Google
                    </button>

                    {/* GitHub */}
                    <button
                        onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
                        className="w-full flex items-center justify-center gap-3 py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                        style={{
                            background: "linear-gradient(135deg, rgba(124,58,237,0.6), rgba(79,70,229,0.6))",
                            border: "1px solid rgba(139,92,246,0.5)",
                            color: "#fff",
                            boxShadow: "0 4px 20px rgba(124,58,237,0.35)",
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = "linear-gradient(135deg, rgba(124,58,237,0.8), rgba(79,70,229,0.8))"}
                        onMouseLeave={e => e.currentTarget.style.background = "linear-gradient(135deg, rgba(124,58,237,0.6), rgba(79,70,229,0.6))"}
                    >
                        <svg className="h-5 w-5 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        Continue with Github
                    </button>
                </div>

                {/* Footer note */}
                <p className="text-xs text-purple-300/50 text-center mt-2">
                    By continuing, you agree to our Terms & Privacy Policy
                </p>
            </div>
        </div>
    )
}

export default Login
