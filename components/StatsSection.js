"use client"
import { useEffect, useRef, useState } from "react"

/* ── Animated counter ── */
const useCountUp = (target, duration = 2000, started = false) => {
    const [value, setValue] = useState(0)
    useEffect(() => {
        if (!started || target === 0) return
        let start = 0
        const step = target / (duration / 16)
        const timer = setInterval(() => {
            start += step
            if (start >= target) { setValue(target); clearInterval(timer) }
            else setValue(Math.floor(start))
        }, 16)
        return () => clearInterval(timer)
    }, [target, started])
    return value
}

/* ── Animated bar graph (7 fake monthly bars + real total) ── */
const BarGraph = ({ value, color, started }) => {
    // Generate 6 historical bars as fractions of the real value
    const fractions = [0.35, 0.48, 0.55, 0.63, 0.72, 0.85, 1]
    return (
        <div className="flex items-end gap-1.5 h-20 w-full">
            {fractions.map((f, i) => (
                <div key={i} className="flex-1 rounded-t-md transition-all"
                    style={{
                        height: started ? `${f * 100}%` : "0%",
                        transitionDelay: `${i * 80}ms`,
                        transitionDuration: "700ms",
                        background: color,
                        opacity: 0.4 + f * 0.6,
                        boxShadow: i === 6 ? `0 0 10px ${color}` : "none",
                    }} />
            ))}
        </div>
    )
}

/* ── Pulse line graph (decorative SVG wave) ── */
const PulseLine = ({ color }) => {
    const points = "0,40 20,30 40,45 60,20 80,35 100,15 120,30 140,10 160,28 180,18 200,32 220,8 240,25 260,12 280,30 300,20"
    return (
        <svg viewBox="0 0 300 50" className="w-full h-10" preserveAspectRatio="none">
            <defs>
                <linearGradient id={`grad-${color.replace("#", "")}`} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={color} stopOpacity="0" />
                    <stop offset="50%" stopColor={color} stopOpacity="1" />
                    <stop offset="100%" stopColor={color} stopOpacity="0.4" />
                </linearGradient>
            </defs>
            <polyline
                points={points}
                fill="none"
                stroke={`url(#grad-${color.replace("#", "")})`}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

/* ── Stat card ── */
const StatCard = ({ icon, label, value, prefix = "", suffix = "", color, barColor, started }) => {
    const displayed = useCountUp(value, 1800, started)
    const formatted = prefix + displayed.toLocaleString() + suffix

    return (
        <div className="relative flex flex-col gap-4 p-5 sm:p-6 rounded-2xl overflow-hidden w-full"
            style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(139,92,246,0.28)",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.04) inset, 0 8px 32px rgba(0,0,0,0.5)",
            }}>
            {/* Corner glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full pointer-events-none"
                style={{ background: `radial-gradient(circle, ${color}33 0%, transparent 70%)`, filter: "blur(20px)" }} />

            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                    style={{ background: `${color}22`, border: `1px solid ${color}55` }}>
                    {icon}
                </div>
                <span className="text-sm font-semibold uppercase tracking-widest text-purple-300/60">{label}</span>
            </div>

            {/* Big number */}
            <div className="text-4xl font-extrabold tracking-tight text-white"
                style={{ textShadow: `0 0 24px ${color}88` }}>
                {formatted}
            </div>

            {/* Bar graph */}
            <BarGraph value={value} color={barColor} started={started} />

            {/* Pulse line */}
            <PulseLine color={color} />
        </div>
    )
}

/* ── Main component ── */
const StatsSection = ({ userCount, paymentCount, totalRaised }) => {
    const ref = useRef(null)
    const [started, setStarted] = useState(false)

    // Start animation when section scrolls into view
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect() } },
            { threshold: 0.2 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    return (
        <section
            ref={ref}
            id="stats-section"
            className="relative py-20 px-6 md:px-16 overflow-hidden"
        >
            {/* Ambient blobs behind the card */}
            <div className="absolute top-[-60px] left-[-80px] w-[380px] h-[380px] rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(139,92,246,0.22) 0%, transparent 70%)", filter: "blur(70px)", animation: "pulseBlob 7s ease-in-out infinite alternate" }} />
            <div className="absolute bottom-[-40px] right-[-60px] w-[300px] h-[300px] rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(109,40,217,0.18) 0%, transparent 70%)", filter: "blur(60px)", animation: "pulseBlob 9s ease-in-out infinite alternate-reverse" }} />

            {/* ── Glassmorphic container ── */}
            <div
                className="relative z-10 max-w-5xl mx-auto rounded-3xl px-8 md:px-14 py-12 overflow-hidden"
                style={{
                    background: "linear-gradient(135deg, rgba(60,20,110,0.45) 0%, rgba(20,8,50,0.6) 60%, rgba(50,15,90,0.4) 100%)",
                    backdropFilter: "blur(28px)",
                    WebkitBackdropFilter: "blur(28px)",
                    border: "1px solid rgba(167,139,250,0.55)",
                    boxShadow: "0 0 0 1px rgba(255,255,255,0.05) inset, 0 0 40px rgba(139,92,246,0.5), 0 0 80px rgba(109,40,217,0.3), 0 20px 60px rgba(0,0,0,0.7)",
                }}
            >
                {/* Shimmer top edge */}
                <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                    style={{ background: "linear-gradient(90deg, transparent 0%, rgba(216,180,254,0.8) 50%, transparent 100%)" }} />

                {/* Inner ambient glow spots */}
                <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)", filter: "blur(30px)" }} />
                <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(109,40,217,0.25) 0%, transparent 70%)", filter: "blur(30px)" }} />

                {/* Section heading */}
                <div className="relative text-center mb-12">
                    <p className="text-xs font-bold uppercase tracking-[0.28em] mb-3"
                        style={{ color: "rgba(196,165,255,0.65)" }}>Platform Stats</p>
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4"
                        style={{ background: "linear-gradient(135deg,#f3e8ff,#c4b5fd,#818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                        Growing Together
                    </h2>
                    <p className="text-sm max-w-md mx-auto" style={{ color: "rgba(196,165,255,0.5)" }}>
                        Real-time numbers from our community of creators and supporters
                    </p>
                    <div className="w-28 h-px mx-auto mt-5"
                        style={{ background: "linear-gradient(90deg, transparent, rgba(216,180,254,0.7), transparent)" }} />
                </div>

                {/* Cards row */}
                <div className="relative flex flex-col md:flex-row gap-5">
                    <StatCard icon="👥" label="Creators Joined" value={userCount} color="#c4b5fd" barColor="rgba(167,139,250,0.9)" started={started} />
                    <StatCard icon="☕" label="Chais Funded" value={paymentCount} color="#93c5fd" barColor="rgba(147,197,253,0.9)" started={started} />
                    <StatCard icon="💰" label="Total Raised" value={totalRaised} prefix="₹" color="#6ee7b7" barColor="rgba(110,231,183,0.9)" started={started} />
                </div>

                {/* Bottom shimmer */}
                <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
                    style={{ background: "linear-gradient(90deg, transparent 0%, rgba(167,139,250,0.5) 50%, transparent 100%)" }} />
            </div>
        </section>
    )
}

export default StatsSection
