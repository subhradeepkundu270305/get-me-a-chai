"use client"
import React, { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'

const Navbar = () => {
  const { data: session } = useSession()
  const [showdropdown, setShowdropdown] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const closeMobile = () => setMobileOpen(false)

  return (
    <nav
      className="text-white px-4 py-4 flex items-center justify-between h-16 w-full z-50 sticky top-0"
      style={{
        background: '#0a0a0a',
        borderBottom: '1px solid #c084fc',
        boxShadow: '0 0 8px #a855f7, 0 0 20px rgba(168,85,247,0.7), 0 0 40px rgba(168,85,247,0.35), 0 2px 0 #7c3aed',
      }}
    >
      {/* Logo */}
      <div className="shrink-0">
        <Link href="/" className="logo font-bold text-lg sm:text-xl flex items-center gap-2">
          <img src="/Tea.gif" width={40} alt="Tea" className="shrink-0" />
          <span
            className="hidden xs:inline sm:inline"
            style={{
              background: 'linear-gradient(135deg,#e0d7ff,#c4b5fd,#818cf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Get-me-a-chai !
          </span>
        </Link>
      </div>

      {/* ── Desktop nav (md and up) ── */}
      <div className="hidden md:flex relative items-center gap-3">
        {session && <>
          <button
            onClick={() => setShowdropdown(!showdropdown)}
            id="dropdownDefaultButton"
            type="button"
            className="font-medium rounded-xl text-sm px-5 py-2.5 text-center inline-flex items-center transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg,#7c3aed,#4f46e5)',
              boxShadow: '0 4px 15px rgba(124,58,237,0.4)',
              color: '#fff',
            }}
          >
            Account
            <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
          </button>

          {showdropdown && (
            <button
              onClick={() => setShowdropdown(false)}
              className="fixed inset-0 z-10 w-full h-full cursor-default focus:outline-none"
            />
          )}

          <div
            id="dropdown"
            className={`z-20 ${showdropdown ? '' : 'hidden'} absolute left-[15px] top-[50px] rounded-xl shadow-xl w-48 overflow-hidden`}
            style={{
              background: '#0a0a0a',
              border: '1px solid #a855f7',
              boxShadow: '0 0 16px rgba(168,85,247,0.5), 0 8px 32px rgba(0,0,0,0.8)',
            }}
          >
            <ul className="py-1 text-sm text-white" aria-labelledby="dropdownDefaultButton">
              <li>
                <Link
                  onClick={() => setShowdropdown(false)}
                  href="/"
                  className="block px-4 py-2.5 transition-colors duration-150"
                  style={{ color: '#c4b5fd' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(124,58,237,0.2)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setShowdropdown(false)}
                  href="/dashboard"
                  className="block px-4 py-2.5 transition-colors duration-150"
                  style={{ color: '#c4b5fd' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(124,58,237,0.2)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href={`/${session.user.name}`}
                  className="block px-4 py-2.5 transition-colors duration-150"
                  style={{ color: '#c4b5fd' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(124,58,237,0.2)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        </>}

        {session && (
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="font-medium rounded-xl text-sm p-px transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg,#7c3aed,#4f46e5)',
              boxShadow: '0 4px 15px rgba(124,58,237,0.3)',
            }}
          >
            <span
              className="block rounded-xl px-4 py-2.5 transition-all duration-200"
              style={{ background: 'rgba(5,3,15,0.85)', color: '#c4b5fd' }}
              onMouseEnter={e => e.currentTarget.style.background = 'transparent'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(5,3,15,0.85)'}
            >
              Logout
            </span>
          </button>
        )}

        {!session && (
          <Link href="/login">
            <button
              className="font-medium rounded-xl text-sm p-px transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg,#7c3aed,#4f46e5)',
                boxShadow: '0 4px 15px rgba(124,58,237,0.3)',
              }}
            >
              <span
                className="block rounded-xl px-4 py-2.5 transition-all duration-200"
                style={{ background: 'rgba(5,3,15,0.85)', color: '#c4b5fd' }}
                onMouseEnter={e => e.currentTarget.style.background = 'transparent'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(5,3,15,0.85)'}
              >
                Login
              </span>
            </button>
          </Link>
        )}

        {/* Stats — always visible */}
        <button
          onClick={() => {
            const el = document.getElementById('stats-section')
            if (el) el.scrollIntoView({ behavior: 'smooth' })
            else { window.location.href = '/#stats-section' }
          }}
          className="font-medium rounded-xl text-sm p-px transition-all duration-200"
          style={{
            background: 'linear-gradient(135deg,#7c3aed,#4f46e5)',
            boxShadow: '0 4px 15px rgba(124,58,237,0.3)',
          }}
        >
          <span
            className="block rounded-xl px-4 py-2.5 transition-all duration-200"
            style={{ background: 'rgba(5,3,15,0.85)', color: '#c4b5fd' }}
            onMouseEnter={e => e.currentTarget.style.background = 'transparent'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(5,3,15,0.85)'}
          >
            Stats
          </span>
        </button>
      </div>

      {/* ── Hamburger (mobile, < md) ── */}
      <button
        className="md:hidden flex flex-col justify-center items-center gap-[5px] w-9 h-9 rounded-lg shrink-0"
        onClick={() => setMobileOpen(o => !o)}
        aria-label="Toggle menu"
        style={{
          background: 'rgba(124,58,237,0.15)',
          border: '1px solid rgba(139,92,246,0.4)',
        }}
      >
        <span
          className="block w-5 h-0.5 rounded-full transition-all duration-300"
          style={{
            background: '#c4b5fd',
            transform: mobileOpen ? 'rotate(45deg) translate(4px, 5px)' : 'none',
          }}
        />
        <span
          className="block w-5 h-0.5 rounded-full transition-all duration-300"
          style={{
            background: '#c4b5fd',
            opacity: mobileOpen ? 0 : 1,
          }}
        />
        <span
          className="block w-5 h-0.5 rounded-full transition-all duration-300"
          style={{
            background: '#c4b5fd',
            transform: mobileOpen ? 'rotate(-45deg) translate(4px, -5px)' : 'none',
          }}
        />
      </button>

      {/* ── Mobile dropdown menu ── */}
      {mobileOpen && (
        <>
          {/* backdrop */}
          <button
            className="fixed inset-0 z-30 w-full h-full cursor-default focus:outline-none"
            onClick={closeMobile}
          />
          <div
            className="absolute top-16 left-0 right-0 z-40 flex flex-col gap-1 px-4 py-4"
            style={{
              background: '#0a0a0a',
              borderBottom: '1px solid rgba(139,92,246,0.5)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.8)',
            }}
          >
            {/* Stats */}
            <button
              onClick={() => {
                closeMobile()
                const el = document.getElementById('stats-section')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
                else { window.location.href = '/#stats-section' }
              }}
              className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-150"
              style={{ color: '#c4b5fd' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(124,58,237,0.2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              📊 Stats
            </button>

            {session ? (
              <>
                <Link href="/" onClick={closeMobile}
                  className="px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-150 block"
                  style={{ color: '#c4b5fd' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(124,58,237,0.2)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  🏠 Home
                </Link>
                <Link href="/dashboard" onClick={closeMobile}
                  className="px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-150 block"
                  style={{ color: '#c4b5fd' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(124,58,237,0.2)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  ⚙️ Dashboard
                </Link>
                <Link href={`/${session.user.name}`} onClick={closeMobile}
                  className="px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-150 block"
                  style={{ color: '#c4b5fd' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(124,58,237,0.2)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  👤 Profile
                </Link>
                {/* divider */}
                <div className="w-full h-px my-1" style={{ background: 'rgba(139,92,246,0.25)' }} />
                <button
                  onClick={() => { closeMobile(); signOut({ callbackUrl: "/" }) }}
                  className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-150"
                  style={{ color: '#f87171' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <Link href="/login" onClick={closeMobile}
                className="px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-150 block"
                style={{ color: '#c4b5fd' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(124,58,237,0.2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                🔑 Login
              </Link>
            )}
          </div>
        </>
      )}
    </nav>
  )
}

export default Navbar
