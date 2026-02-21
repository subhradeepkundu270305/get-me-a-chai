'use client';

import { useEffect, useRef } from 'react';

const howItWorks = [
    {
        gif: '/grp.gif',
        title: 'Fans Want to Collaborate',
        desc: 'Your fans are enthusiastic about teaming up on your projects and watching your ideas come to life.',
    },
    {
        gif: '/coin.gif',
        title: 'Support Through Chai',
        desc: 'Receive support in the form of chai purchases — every cup directly funds your creative endeavors.',
    },
];

const cards = [
    {
        icon: '🎨',
        gradient: 'linear-gradient(135deg,#7c3aed,#6d28d9)',
        label: 'For Creators',
        title: 'Benefits for Creators',
        items: [
            'Direct financial support from your fanbase',
            'Engage with your fans on a more personal level',
            'Access to a platform tailored for creative projects',
        ],
    },
    {
        icon: '🌟',
        gradient: 'linear-gradient(135deg,#2563eb,#4f46e5)',
        label: 'For Fans',
        title: 'Benefits for Fans',
        items: [
            "Directly contribute to your favorite creators' success",
            'Exclusive rewards and perks for supporting creators',
            'Be part of the creative process and connect with creators',
        ],
    },
    {
        icon: '🤝',
        gradient: 'linear-gradient(135deg,#0891b2,#2563eb)',
        label: 'Partnership',
        title: 'Benefits of Collaboration',
        items: [
            'Unlock new opportunities through fellow creator collaboration',
            'Expand your network and reach a wider audience',
            'Combine skills and resources for innovative projects',
        ],
    },
    {
        icon: '💬',
        gradient: 'linear-gradient(135deg,#059669,#0891b2)',
        label: 'Engagement',
        title: 'Community Engagement',
        items: [
            'Interact with a supportive community of like-minded individuals',
            'Receive valuable feedback and encouragement from peers',
            'Participate in discussions and events around your interests',
        ],
    },
    {
        icon: '📚',
        gradient: 'linear-gradient(135deg,#d97706,#dc2626)',
        label: 'Learning',
        title: 'Access to Resources',
        items: [
            'Gain access to tutorials, templates, and creator tools',
            'Receive guidance and mentorship from experienced creators',
            'Stay updated on industry trends and best practices',
        ],
    },
    {
        icon: '🏆',
        gradient: 'linear-gradient(135deg,#7c3aed,#db2777)',
        label: 'Growth',
        title: 'Recognition & Exposure',
        items: [
            'Showcase your work to a global audience',
            'Feature in promotional materials and campaigns',
            'Build your portfolio and increase your creator credibility',
        ],
    },
    {
        icon: '🫂',
        gradient: 'linear-gradient(135deg,#db2777,#7c3aed)',
        label: 'Together',
        title: 'Supportive Community',
        items: [
            'Join a community that values creativity and inclusivity',
            'Find encouragement and inspiration from fellow members',
            'Collaborate on projects and share resources for mutual growth',
        ],
    },
];

/* — A single animated card that observes its own visibility — */
function RevealCard({ children, delay = 0 }) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // small delay so cards stagger
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, delay);
                    observer.unobserve(el);
                }
            },
            { threshold: 0.15 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [delay]);

    return (
        <div
            ref={ref}
            style={{
                opacity: 0,
                transform: 'translateY(48px)',
                transition: 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)',
            }}
        >
            {children}
        </div>
    );
}

export default function AboutSection() {
    return (
        <div
            className="relative text-white w-full pb-32 pt-20 px-6 md:px-24 lg:px-40 overflow-hidden"
        >
            {/* Top fade — blends from glass.gif section */}
            <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
                style={{ background: "linear-gradient(to bottom, rgba(5,3,15,0.0) 0%, rgba(5,3,15,0) 100%)" }} />

            {/* Blobs for depth */}
            <div className="absolute top-[-60px] right-[-80px] w-[400px] h-[400px] rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)", filter: "blur(65px)", animation: "pulseBlob 8s ease-in-out infinite alternate" }} />
            <div className="absolute bottom-[10%] left-[-60px] w-[320px] h-[320px] rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(59,130,246,0.14) 0%, transparent 70%)", filter: "blur(55px)", animation: "pulseBlob 10s ease-in-out infinite alternate-reverse" }} />


            {/* ── Section heading ── */}
            <RevealCard delay={0}>
                <div className="text-center mb-16">
                    <p
                        className="text-xs font-semibold tracking-[0.35em] uppercase mb-3"
                        style={{ color: '#a78bfa' }}
                    >
                        Platform Overview
                    </p>
                    <h1
                        className="text-4xl md:text-5xl font-extrabold mb-5 tracking-tight"
                        style={{
                            background: 'linear-gradient(135deg,#e0d7ff 0%,#c4b5fd 50%,#818cf8 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        About Get Me a Chai
                    </h1>
                    <p
                        className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
                        style={{ color: '#cbd5e1' }}
                    >
                        A crowdfunding platform designed for creators — where your fans directly contribute to
                        your creative journey by buying you a chai. Unlock your fanbase&apos;s potential and
                        bring your projects to life.
                    </p>
                </div>
            </RevealCard>

            {/* ── How It Works ── */}
            <div className="flex flex-col gap-5 max-w-3xl mx-auto mb-14">
                {howItWorks.map((item, i) => (
                    <RevealCard key={item.title} delay={i * 120}>
                        <div
                            className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 rounded-2xl p-5 sm:p-6 w-full"
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(167,139,250,0.25)',
                                backdropFilter: 'blur(16px)',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = '0 16px 48px rgba(124,58,237,0.3), inset 0 1px 0 rgba(255,255,255,0.08)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)';
                            }}
                        >
                            <div
                                className="shrink-0 rounded-xl p-1"
                                style={{
                                    background: 'linear-gradient(135deg,#7c3aed,#4f46e5)',
                                    boxShadow: '0 4px 20px rgba(124,58,237,0.5)',
                                }}
                            >
                                <img src={item.gif} alt={item.title} className="w-16 h-16 rounded-lg object-cover" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-1" style={{ color: '#e2d9f3' }}>
                                    {item.title}
                                </h3>
                                <p className="text-sm leading-relaxed" style={{ color: '#94a3b8' }}>
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    </RevealCard>
                ))}
            </div>

            {/* ── Divider label ── */}
            <RevealCard delay={0}>
                <div className="flex items-center gap-4 max-w-3xl mx-auto mb-10">
                    <div className="flex-1 h-px" style={{ background: 'rgba(139,92,246,0.25)' }} />
                    <p className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: '#818cf8' }}>
                        What You Get
                    </p>
                    <div className="flex-1 h-px" style={{ background: 'rgba(139,92,246,0.25)' }} />
                </div>
            </RevealCard>

            {/* ── Feature Cards — single column, scroll-reveal ── */}
            <div className="flex flex-col gap-5 max-w-3xl mx-auto">
                {cards.map((card, i) => (
                    <RevealCard key={card.title} delay={i * 100}>
                        <div
                            className="rounded-2xl p-6 w-full flex flex-col gap-4"
                            style={{
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid rgba(255,255,255,0.09)',
                                backdropFilter: 'blur(20px)',
                                boxShadow: '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)';
                            }}
                        >
                            {/* Card header */}
                            <div className="flex items-center gap-4">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                                    style={{
                                        background: card.gradient,
                                        boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
                                    }}
                                >
                                    {card.icon}
                                </div>
                                <div>
                                    <p
                                        className="text-[10px] font-semibold tracking-widest uppercase"
                                        style={{ color: '#818cf8' }}
                                    >
                                        {card.label}
                                    </p>
                                    <h3
                                        className="text-base font-bold leading-tight"
                                        style={{ color: '#e2d9f3' }}
                                    >
                                        {card.title}
                                    </h3>
                                </div>
                            </div>

                            {/* Accent divider */}
                            <div
                                className="h-px w-full"
                                style={{ background: 'linear-gradient(to right, rgba(139,92,246,0.5), transparent)' }}
                            />

                            {/* Bullet items */}
                            <ul className="flex flex-col gap-2">
                                {card.items.map(item => (
                                    <li
                                        key={item}
                                        className="flex items-start gap-2 text-sm leading-relaxed"
                                        style={{ color: '#94a3b8' }}
                                    >
                                        <span className="mt-0.5 shrink-0 text-xs" style={{ color: '#818cf8' }}>
                                            ✦
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </RevealCard>
                ))}
            </div>
        </div>
    );
}
