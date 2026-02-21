"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { fetchuser, updateProfile } from '@/actions/useractions'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Bounce } from 'react-toastify'

/* ── Reusable styled field ── */
const Field = ({ label, children }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-widest text-purple-300/70">
            {label}
        </label>
        {children}
    </div>
)

const inputCls = `
    w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-purple-300/30 outline-none
    transition-all duration-200
    focus:ring-2 focus:ring-purple-500/60
`
const inputStyle = {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(139,92,246,0.30)",
    backdropFilter: "blur(8px)",
}
const inputFocusStyle = {
    background: "rgba(255,255,255,0.10)",
    border: "1px solid rgba(167,139,250,0.55)",
}

const StyledInput = ({ type = "text", name, id, value, onChange, placeholder }) => {
    const [focused, setFocused] = useState(false)
    return (
        <input
            type={type}
            name={name}
            id={id}
            value={value || ""}
            onChange={onChange}
            placeholder={placeholder}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={inputCls}
            style={focused ? { ...inputStyle, ...inputFocusStyle } : inputStyle}
        />
    )
}

const StyledTextarea = ({ name, id, value, onChange, placeholder }) => {
    const [focused, setFocused] = useState(false)
    return (
        <textarea
            name={name}
            id={id}
            value={value || ""}
            onChange={onChange}
            placeholder={placeholder}
            rows={3}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={`${inputCls} resize-none`}
            style={focused ? { ...inputStyle, ...inputFocusStyle } : inputStyle}
        />
    )
}

const Dashboard = () => {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [form, setform] = useState({})

    useEffect(() => {
        if (status === 'loading') return // session still loading
        if (!session) {
            router.push('/login')
        } else {
            getData()
        }
    }, [status, session])

    const getData = async () => {
        let u = await fetchuser(session.user.name)
        setform(u)
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let a = await updateProfile(form, session.user.name)
            if (a && a.error) {
                toast.error(a.error, {
                    position: "top-right", autoClose: 5000, hideProgressBar: false,
                    closeOnClick: true, pauseOnHover: true, draggable: true,
                    theme: "dark", transition: Bounce,
                })
            } else {
                toast('✅ Profile Updated!', {
                    position: "top-right", autoClose: 4000, hideProgressBar: false,
                    closeOnClick: true, pauseOnHover: true, draggable: true,
                    theme: "dark", transition: Bounce,
                })
                router.push(`/${form.username}`)
            }
        } catch (err) {
            console.error("Save profile error:", err)
            toast.error(`Failed to save profile: ${err.message || "Unknown error"}`, {
                position: "top-right", autoClose: 6000, hideProgressBar: false,
                closeOnClick: true, pauseOnHover: true, draggable: true,
                theme: "dark", transition: Bounce,
            })
        }
    }

    const isCreator = form.accounttype === "creator"

    return (
        <>
            <ToastContainer theme="dark" />

            {/* ── Page background ── */}
            <div
                className="relative min-h-screen py-16 px-4 overflow-hidden"
                style={{
                    background: "radial-gradient(ellipse at 50% 0%, rgba(88,28,135,0.4) 0%, rgba(5,3,15,1) 65%)",
                }}
            >
                {/* Glow blobs */}
                <div className="absolute top-[-80px] left-[-80px] w-[400px] h-[400px] rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(139,92,246,0.28) 0%, transparent 70%)", filter: "blur(60px)", animation: "pulseBlob 7s ease-in-out infinite alternate" }} />
                <div className="absolute bottom-[-60px] right-[-60px] w-[320px] h-[320px] rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(59,130,246,0.22) 0%, transparent 70%)", filter: "blur(50px)", animation: "pulseBlob 9s ease-in-out infinite alternate-reverse" }} />

                {/* ── Glassmorphic card ── */}
                <div
                    className="relative z-10 w-full max-w-2xl mx-auto rounded-3xl px-4 py-6 sm:px-8 sm:py-10"
                    style={{
                        background: "rgba(255,255,255,0.04)",
                        backdropFilter: "blur(28px)",
                        WebkitBackdropFilter: "blur(28px)",
                        border: "1px solid rgba(139,92,246,0.30)",
                        boxShadow: "0 0 0 1px rgba(255,255,255,0.05) inset, 0 8px 48px rgba(139,92,246,0.25), 0 2px 12px rgba(0,0,0,0.7)",
                    }}
                >
                    {/* Top shimmer */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/5 h-px pointer-events-none"
                        style={{ background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.65), transparent)" }} />

                    {/* Header */}
                    <div className="flex flex-wrap items-center gap-3 mb-8">
                        {form.profilepic
                            ? <img src={form.profilepic} alt="Profile" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover shrink-0" style={{ border: "2px solid rgba(139,92,246,0.5)", boxShadow: "0 0 16px rgba(139,92,246,0.4)" }} />
                            : <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full shrink-0 flex items-center justify-center text-xl sm:text-2xl font-bold text-white"
                                style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)", border: "2px solid rgba(139,92,246,0.5)", boxShadow: "0 0 16px rgba(139,92,246,0.4)" }}>
                                {session?.user?.name?.[0]?.toUpperCase() || "U"}
                            </div>
                        }
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold uppercase tracking-widest text-purple-400/70 mb-0.5">Dashboard</p>
                            <h1 className="text-lg sm:text-2xl font-bold text-white leading-tight truncate">
                                Welcome back{session?.user?.name ? `, ${session.user.name}` : ""}! 👋
                            </h1>
                        </div>
                        <img src="/Tea.gif" width={36} alt="Tea" className="ml-auto shrink-0" />
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px mb-8" style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent)" }} />

                    {/* Form */}
                    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

                        <Field label="Name">
                            <StyledInput name="name" id="name" value={form.name} onChange={handleChange} placeholder="Your display name" />
                        </Field>

                        <Field label="Email">
                            <StyledInput type="email" name="email" id="email" value={form.email} onChange={handleChange} placeholder="your@email.com" />
                        </Field>

                        <Field label="Username">
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400/60 text-sm select-none">@</span>
                                <StyledInput name="username" id="username" value={form.username} onChange={handleChange} placeholder="username" />
                            </div>
                        </Field>

                        {/* Profile pic */}
                        <Field label="Profile Picture">
                            <div className="flex items-center gap-4">
                                {form.profilepic && (
                                    <img className="w-12 h-12 rounded-full object-cover shrink-0"
                                        src={form.profilepic} alt="Profile"
                                        style={{ border: "1px solid rgba(139,92,246,0.4)" }} />
                                )}
                                <label htmlFor="profilepicFile"
                                    className="cursor-pointer text-sm font-medium text-white px-5 py-2.5 rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                                    style={{ background: "linear-gradient(135deg,rgba(124,58,237,0.7),rgba(79,70,229,0.7))", border: "1px solid rgba(139,92,246,0.4)", boxShadow: "0 4px 16px rgba(124,58,237,0.3)" }}>
                                    {form.profilepic ? "Change Photo" : "Upload Photo"}
                                </label>
                                <input type="file" id="profilepicFile" className="hidden" onChange={(e) => {
                                    const file = e.target.files[0]
                                    if (file) {
                                        const reader = new FileReader()
                                        reader.onloadend = () => setform({ ...form, profilepic: reader.result })
                                        reader.readAsDataURL(file)
                                    }
                                }} />
                            </div>
                        </Field>

                        {/* Cover pic */}
                        <Field label="Cover Picture">
                            <div className="flex flex-col gap-3">
                                {form.coverpic && (
                                    <img className="w-full h-24 object-cover rounded-xl"
                                        src={form.coverpic} alt="Cover"
                                        style={{ border: "1px solid rgba(139,92,246,0.3)" }} />
                                )}
                                <label htmlFor="coverpicFile"
                                    className="cursor-pointer text-sm font-medium text-white px-5 py-2.5 rounded-full w-fit transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                                    style={{ background: "linear-gradient(135deg,rgba(124,58,237,0.7),rgba(79,70,229,0.7))", border: "1px solid rgba(139,92,246,0.4)", boxShadow: "0 4px 16px rgba(124,58,237,0.3)" }}>
                                    {form.coverpic ? "Change Cover" : "Upload Cover"}
                                </label>
                                <input type="file" id="coverpicFile" className="hidden" onChange={(e) => {
                                    const file = e.target.files[0]
                                    if (file) {
                                        const reader = new FileReader()
                                        reader.onloadend = () => setform({ ...form, coverpic: reader.result })
                                        reader.readAsDataURL(file)
                                    }
                                }} />
                            </div>
                        </Field>

                        {/* ── Bio ── */}
                        <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.25), transparent)" }} />

                        <Field label="Bio">
                            <StyledTextarea
                                name="bio"
                                id="bio"
                                value={form.bio}
                                onChange={handleChange}
                                placeholder="Tell your supporters a little something about yourself… ✨"
                            />
                        </Field>

                        {/* ── Account Type ── */}
                        <Field label="Account Type">
                            <p className="text-xs text-purple-300/50 -mt-0.5 mb-1">
                                Choose whether you want to receive support (Creator) or support others (Supporter).
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                {/* Creator card */}
                                <button
                                    type="button"
                                    onClick={() => setform({ ...form, accounttype: "creator" })}
                                    className="relative flex flex-col items-center gap-2 py-4 px-3 rounded-2xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.97]"
                                    style={{
                                        background: isCreator
                                            ? "linear-gradient(135deg,rgba(124,58,237,0.35),rgba(79,70,229,0.25))"
                                            : "rgba(255,255,255,0.04)",
                                        border: isCreator
                                            ? "1.5px solid rgba(167,139,250,0.7)"
                                            : "1px solid rgba(139,92,246,0.2)",
                                        boxShadow: isCreator ? "0 0 20px rgba(139,92,246,0.3)" : "none",
                                    }}
                                >
                                    {isCreator && (
                                        <span className="absolute top-2 right-2 w-2 h-2 rounded-full"
                                            style={{ background: "#a78bfa", boxShadow: "0 0 6px rgba(167,139,250,0.8)" }} />
                                    )}
                                    <span className="text-2xl">🎨</span>
                                    <span className="text-sm font-bold text-white">Creator</span>
                                    <span className="text-xs text-purple-300/60 text-center leading-snug">
                                        Receive chai from supporters
                                    </span>
                                </button>

                                {/* Supporter card */}
                                <button
                                    type="button"
                                    onClick={() => setform({ ...form, accounttype: "supporter" })}
                                    className="relative flex flex-col items-center gap-2 py-4 px-3 rounded-2xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.97]"
                                    style={{
                                        background: !isCreator
                                            ? "linear-gradient(135deg,rgba(34,197,94,0.2),rgba(16,185,129,0.15))"
                                            : "rgba(255,255,255,0.04)",
                                        border: !isCreator
                                            ? "1.5px solid rgba(34,197,94,0.6)"
                                            : "1px solid rgba(139,92,246,0.2)",
                                        boxShadow: !isCreator ? "0 0 20px rgba(34,197,94,0.2)" : "none",
                                    }}
                                >
                                    {!isCreator && (
                                        <span className="absolute top-2 right-2 w-2 h-2 rounded-full"
                                            style={{ background: "#4ade80", boxShadow: "0 0 6px rgba(74,222,128,0.8)" }} />
                                    )}
                                    <span className="text-2xl">☕</span>
                                    <span className="text-sm font-bold text-white">Supporter</span>
                                    <span className="text-xs text-green-300/60 text-center leading-snug">
                                        Buy chai for creators
                                    </span>
                                </button>
                            </div>
                        </Field>

                        {/* ── Razorpay (Creator only) ── */}
                        {isCreator && (
                            <div
                                className="flex flex-col gap-4 rounded-2xl p-4 transition-all duration-300"
                                style={{
                                    background: "rgba(124,58,237,0.08)",
                                    border: "1px dashed rgba(167,139,250,0.35)",
                                }}
                            >
                                <p className="text-xs font-semibold text-purple-300/70 flex items-center gap-1.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 21.75Z" />
                                    </svg>
                                    Razorpay Payment Credentials
                                </p>

                                <Field label="Razorpay ID">
                                    <StyledInput name="razorpayid" id="razorpayid" value={form.razorpayid} onChange={handleChange} placeholder="rzp_live_xxxxxxxxxxxx" />
                                </Field>

                                <Field label="Razorpay Secret">
                                    <StyledInput type="password" name="razorpaysecret" id="razorpaysecret" value={form.razorpaysecret} onChange={handleChange} placeholder="••••••••••••••••" />
                                </Field>
                            </div>
                        )}

                        {/* Divider */}
                        <div className="w-full h-px mt-2" style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.35), transparent)" }} />

                        {/* Save button */}
                        <button
                            type="submit"
                            className="w-full py-3 rounded-full text-white text-sm font-bold tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                            style={{
                                background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
                                boxShadow: "0 4px 24px rgba(124,58,237,0.5)",
                                border: "1px solid rgba(167,139,250,0.4)",
                            }}
                            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 6px 32px rgba(124,58,237,0.75)"}
                            onMouseLeave={e => e.currentTarget.style.boxShadow = "0 4px 24px rgba(124,58,237,0.5)"}
                        >
                            Save Profile
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Dashboard