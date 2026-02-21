"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AboutSection from "@/components/AboutSection";
import StatsSection from "@/components/StatsSection";
import { fetchStats } from "@/actions/useractions";

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [stats, setStats] = useState({ userCount: 0, paymentCount: 0, totalRaised: 0 });
  const debounceRef = useRef(null);
  const wrapperRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch global stats for StatsSection
  useEffect(() => {
    fetchStats().then(setStats).catch(() => { });
  }, []);


  // Debounced search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!query.trim()) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.users || []);
        setShowDropdown(true);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const handleNavigate = (username) => {
    setShowDropdown(false);
    setQuery("");
    router.push(`/${username}`);
  };

  const handleSearch = () => {
    if (query.trim()) router.push(`/${query.trim()}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <>
      {/* ── Unified Hero + Search Panel (single glass.gif background) ── */}
      <div
        className="relative flex flex-col"
        style={{
          height: "calc(100vh - 64px)",
          backgroundImage: "url('/glass.gif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Single shared dark overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />

        {/* ── Hero Content ── */}
        <div className="relative z-10 flex-1 flex items-center justify-center flex-col text-white">
          <div className="text-3xl sm:text-4xl md:text-5xl font-bold flex justify-center items-center gap-2 px-4 text-center">
            Get Me A Chai{" "}
            <span>
              <img src="/Tea.gif" width="50" height="50" alt="Tea" className="inline-block ml-2" />
            </span>
          </div>
          <p className="mt-2 text-gray-200 text-center px-6 text-sm sm:text-base">
            A crowd-funding platform for creators. Get funded by your supporters! Start now !
          </p>
          <div className="mt-4 flex flex-col sm:flex-row gap-3 px-4">
            <Link href="/login">
              <button
                type="button"
                className="w-full sm:w-auto text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-xl text-sm px-4 py-2.5 text-center leading-5"
              >
                Create Account
              </button>
            </Link>
            <button
              type="button"
              onClick={() => document.getElementById("about-section")?.scrollIntoView({ behavior: "smooth" })}
              className="w-full sm:w-auto text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-xl text-sm px-4 py-2.5 text-center leading-5"
            >
              About Us
            </button>
          </div>
        </div>

        {/* ── Search Panel ── */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-4 pb-8">
          {/* Animated background blobs */}
          <div
            className="absolute top-[-60px] left-[-80px] w-[340px] h-[340px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(139,92,246,0.30) 0%, transparent 70%)",
              filter: "blur(48px)",
              animation: "pulseBlob 6s ease-in-out infinite alternate",
            }}
          />
          <div
            className="absolute bottom-[-60px] right-[-60px] w-[280px] h-[280px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 70%)",
              filter: "blur(48px)",
              animation: "pulseBlob 8s ease-in-out infinite alternate-reverse",
            }}
          />
          <div
            className="absolute top-[30%] right-[15%] w-[160px] h-[160px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(168,85,247,0.18) 0%, transparent 70%)",
              filter: "blur(32px)",
              animation: "pulseBlob 5s ease-in-out infinite alternate",
            }}
          />

          {/* Floating particle dots */}
          {[
            { top: "12%", left: "8%", size: 4, opacity: 0.5, delay: "0s" },
            { top: "70%", left: "5%", size: 3, opacity: 0.35, delay: "1.2s" },
            { top: "20%", right: "10%", size: 5, opacity: 0.4, delay: "0.6s" },
            { top: "80%", right: "8%", size: 3, opacity: 0.3, delay: "2s" },
            { top: "50%", left: "20%", size: 2, opacity: 0.25, delay: "1.8s" },
            { top: "35%", right: "22%", size: 2, opacity: 0.3, delay: "0.9s" },
          ].map((dot, i) => (
            <div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                top: dot.top,
                left: dot.left,
                right: dot.right,
                width: dot.size,
                height: dot.size,
                background: "rgba(167,139,250,0.8)",
                opacity: dot.opacity,
                animation: `floatDot 4s ease-in-out ${dot.delay} infinite alternate`,
              }}
            />
          ))}

          {/* Glassmorphic card */}
          <div
            className="relative z-10 w-full max-w-xl rounded-3xl px-4 py-6 sm:px-8 sm:py-10 mx-4"
            style={{
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(139,92,246,0.30)",
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.05) inset, 0 8px 48px rgba(139,92,246,0.25), 0 2px 8px rgba(0,0,0,0.6)",
            }}
          >
            {/* Inner top highlight */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(167,139,250,0.6), transparent)",
              }}
            />

            {/* Heading */}
            <h2 className="text-white text-center text-2xl font-bold mb-2 tracking-wide">
              🔍 Find a Creator
            </h2>
            <p className="text-gray-400 text-center text-sm mb-6">
              Search by username to discover and support your favourite creators
            </p>

            {/* Search Box */}
            <div ref={wrapperRef} className="relative">
              <div
                className="flex items-center gap-2 rounded-2xl px-4 py-3 border border-purple-500/40"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 4px 30px rgba(139,92,246,0.15)",
                }}
              >
                {/* Search Icon */}
                <svg
                  className="w-5 h-5 text-purple-400 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                  />
                </svg>

                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => results.length > 0 && setShowDropdown(true)}
                  placeholder="Search by username or name…"
                  className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-sm"
                />

                {/* Spinner */}
                {loading && (
                  <svg
                    className="animate-spin w-4 h-4 text-purple-400 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                )}

                {/* Search Button */}
                <button
                  onClick={handleSearch}
                  className="shrink-0 text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl font-medium rounded-xl text-xs px-4 py-1.5 transition-all"
                >
                  Go
                </button>
              </div>

              {/* Dropdown Results */}
              {showDropdown && results.length > 0 && (
                <div
                  className="absolute top-full mt-2 w-full rounded-2xl z-[9999] border border-purple-500/30"
                  style={{
                    background: "rgba(15,10,30,0.97)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    boxShadow: "0 8px 32px rgba(139,92,246,0.3)",
                    maxHeight: "183px",
                    overflowY: "auto",
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(139,92,246,0.5) transparent",
                  }}
                >
                  {results.map((user) => (
                    <button
                      key={user.username}
                      onClick={() => handleNavigate(user.username)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-purple-600/20 transition-colors text-left group"
                    >
                      {/* Avatar */}
                      {user.profilepic ? (
                        <img
                          src={user.profilepic}
                          alt={user.username}
                          className="w-9 h-9 rounded-full object-cover border border-purple-500/40 shrink-0"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center shrink-0 text-white text-sm font-bold">
                          {(user.name || user.username)[0].toUpperCase()}
                        </div>
                      )}

                      {/* Text */}
                      <div className="flex flex-col min-w-0">
                        <span className="text-white text-sm font-semibold truncate group-hover:text-purple-300 transition-colors">
                          {user.name || user.username}
                        </span>
                        <span className="text-gray-400 text-xs truncate">
                          @{user.username}
                        </span>
                      </div>

                      {/* Arrow */}
                      <svg
                        className="w-4 h-4 text-gray-600 group-hover:text-purple-400 ml-auto transition-colors shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  ))}
                </div>
              )}

              {/* No results */}
              {showDropdown && !loading && query.trim() && results.length === 0 && (
                <div
                  className="absolute top-full mt-2 w-full rounded-2xl px-4 py-4 text-center border border-purple-500/20 z-50"
                  style={{
                    background: "rgba(15,10,30,0.92)",
                    backdropFilter: "blur(16px)",
                  }}
                >
                  <p className="text-gray-400 text-sm">
                    No creators found for &quot;<span className="text-purple-400">{query}</span>&quot;
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── About + Stats unified background ── */}
      <div
        style={{
          background: "radial-gradient(ellipse at 50% 30%, rgba(80,20,140,0.55) 0%, rgba(14,5,32,0.95) 45%, rgba(7,3,26,1) 100%)",
        }}
      >
        <div id="about-section">
          <AboutSection />
        </div>

        {/* ── Stats Section ── */}
        <StatsSection
          userCount={stats.userCount}
          paymentCount={stats.paymentCount}
          totalRaised={stats.totalRaised}
        />
      </div>
    </>
  );
}
