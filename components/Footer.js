'use client'
import React from 'react'
import Link from 'next/link'

const Footer = () => {
  const socials = [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/_in_the_focus_?igsh=MWJidDJkZ3d0Z2Rs',
      color: '#E1306C',
      glow: 'rgba(225,48,108,0.5)',
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/share/1En7x9o8Rj/',
      color: '#1877F2',
      glow: 'rgba(24,119,242,0.5)',
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/subhradeep-kundu-798660283?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      color: '#0A66C2',
      glow: 'rgba(10,102,194,0.5)',
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ]

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/#about' },
    { label: 'Create Account', href: '/login' },
    { label: 'Profile', href: '/dashboard' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Stats', href: '/#stats-section' },
  ]

  return (
    <footer
      style={{
        background: 'linear-gradient(180deg, #0a0a0a 0%, #0d0518 100%)',
        borderTop: '1px solid #7c3aed',
        boxShadow: '0 -4px 32px rgba(124,58,237,0.25)',
      }}
    >
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Column 1 — Logo + About */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2 w-fit">
            <img src="/Tea.gif" width={42} alt="Chai" />
            <span
              className="font-bold text-xl"
              style={{
                background: 'linear-gradient(135deg,#e0d7ff,#c4b5fd,#818cf8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Get-Me-A-Chai
            </span>
          </Link>
          <p style={{ color: '#9ca3af', lineHeight: '1.7', fontSize: '0.875rem' }}>
            A cozy corner where your supporters can buy you a virtual chai — fuelling
            your passion one sip at a time. Built for creators, dreamers, and makers
            who deserve a little love.
          </p>
        </div>

        {/* Column 2 — Quick Links */}
        <div className="flex flex-col gap-4">
          <h3
            className="font-semibold text-sm uppercase tracking-widest"
            style={{ color: '#c4b5fd' }}
          >
            Quick Links
          </h3>
          <ul className="flex flex-col gap-2">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm transition-colors duration-200"
                  style={{ color: '#9ca3af' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#c4b5fd')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#9ca3af')}
                >
                  → {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Socials + Contact */}
        <div className="flex flex-col gap-6">
          {/* Socials */}
          <div>
            <h3
              className="font-semibold text-sm uppercase tracking-widest mb-4"
              style={{ color: '#c4b5fd' }}
            >
              Follow Us
            </h3>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  title={s.name}
                  className="flex items-center justify-center rounded-full transition-all duration-200"
                  style={{
                    width: 42,
                    height: 42,
                    background: 'rgba(124,58,237,0.12)',
                    border: '1px solid rgba(124,58,237,0.4)',
                    color: s.color,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = s.color
                    e.currentTarget.style.color = '#fff'
                    e.currentTarget.style.boxShadow = `0 0 16px ${s.glow}`
                    e.currentTarget.style.border = `1px solid ${s.color}`
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(124,58,237,0.12)'
                    e.currentTarget.style.color = s.color
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.border = '1px solid rgba(124,58,237,0.4)'
                  }}
                >
                  {s.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="font-semibold text-sm uppercase tracking-widest mb-3"
              style={{ color: '#c4b5fd' }}
            >
              Contact
            </h3>
            <ul className="flex flex-col gap-2 text-sm" style={{ color: '#9ca3af' }}>
              <li className="flex items-center gap-2">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.43 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 5.49 5.49l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21 15.41z" />
                </svg>
                <a href="tel:+919883822532" style={{ color: '#9ca3af' }} onMouseEnter={e => (e.currentTarget.style.color = '#c4b5fd')} onMouseLeave={e => (e.currentTarget.style.color = '#9ca3af')}>
                  +91 9883822532
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <a href="mailto:subhradeepkundu27@gmail.com" style={{ color: '#9ca3af' }} onMouseEnter={e => (e.currentTarget.style.color = '#c4b5fd')} onMouseLeave={e => (e.currentTarget.style.color = '#9ca3af')}>
                  subhradeepkundu27@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div
        className="mx-6"
        style={{ height: 1, background: 'linear-gradient(90deg, transparent, #7c3aed, #c084fc, #7c3aed, transparent)' }}
      />

      {/* Copyright bar */}
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-2">
        <p className="text-sm" style={{ color: '#6b7280' }}>
          &copy; {new Date().getFullYear()} Get-Me-A-Chai. All rights reserved.
        </p>
        <p className="text-sm" style={{ color: '#6b7280' }}>
          Made with{' '}
          <span style={{ color: '#c084fc' }}>♥</span>{' '}
          by{' '}
          <span style={{ color: '#c4b5fd', fontWeight: 500 }}>Subhradeep Kundu</span>
        </p>
      </div>
    </footer>
  )
}

export default Footer
