'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Search, User, Leaf, X, Menu } from 'lucide-react'
import clsx from 'clsx'

interface NavbarProps {
  cartCount: number
  onCartClick: () => void
  onSignInClick: () => void
  search: string
  onSearchChange: (v: string) => void
  user: { email: string } | null
}

export default function Navbar({
  cartCount, onCartClick, onSignInClick,
  search, onSearchChange, user,
}: NavbarProps) {
  const [scrolled,     setScrolled]     = useState(false)
  const [searchOpen,   setSearchOpen]   = useState(false)
  const [mobileOpen,   setMobileOpen]   = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 inset-x-0 z-[100] transition-all duration-300',
          scrolled
            ? 'glass border-b border-white/40 shadow-[0_2px_20px_rgba(0,0,0,0.06)]'
            : 'bg-transparent'
        )}
        role="banner"
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 h-16 flex items-center gap-3">

          {/* Logo */}
          <a href="#" className="flex items-center gap-2 shrink-0 group" aria-label="Verdura home">
            <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center
                            shadow-brand group-hover:shadow-brand-lg transition-shadow duration-200">
              <Leaf size={15} className="text-white" />
            </div>
            <span className="font-display text-xl font-semibold tracking-tight text-stone-900 hidden xs:block">
              verdura
            </span>
          </a>

          {/* Desktop search */}
          <div className="hidden md:flex flex-1 max-w-md mx-auto relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
            <input
              type="search"
              placeholder="Search vegetables…"
              className="w-full h-10 pl-9 pr-4 bg-white/80 border border-cream-300
                         rounded-full text-sm text-stone-800 placeholder:text-stone-400
                         focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20
                         transition-all duration-200"
              value={search}
              onChange={e => onSearchChange(e.target.value)}
              aria-label="Search vegetables"
            />
          </div>

          {/* Spacer on mobile */}
          <div className="flex-1 md:hidden" />

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Mobile search toggle */}
            <button
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full
                         text-stone-600 hover:bg-cream-200 transition-colors"
              onClick={() => setSearchOpen(v => !v)}
              aria-label="Toggle search"
            >
              {searchOpen ? <X size={18} /> : <Search size={18} />}
            </button>

            {/* Sign in */}
            <button
              className="flex items-center gap-1.5 h-9 px-3 sm:px-4 rounded-full border border-cream-300
                         bg-white/70 text-stone-700 text-sm font-medium
                         hover:border-brand-400 hover:bg-brand-50 hover:text-brand-600
                         transition-all duration-150"
              onClick={onSignInClick}
              aria-label="Sign in"
            >
              <User size={15} />
              <span className="hidden sm:inline">{user ? user.email.split('@')[0] : 'Sign In'}</span>
            </button>

            {/* Cart */}
            <motion.button
              className="relative w-11 h-11 flex items-center justify-center rounded-xl
                         bg-brand-500 text-white shadow-brand
                         hover:bg-brand-600 hover:shadow-brand-lg
                         active:scale-95 transition-all duration-150"
              onClick={onCartClick}
              aria-label={`Cart, ${cartCount} items`}
              whileTap={{ scale: 0.92 }}
            >
              <ShoppingBag size={20} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.3, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1
                               flex items-center justify-center
                               bg-amber-400 text-stone-900 text-[10px] font-bold
                               rounded-full shadow font-mono"
                    aria-live="polite"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-cream-200/60 bg-cream-100/95"
            >
              <div className="px-4 py-3 relative">
                <Search size={15} className="absolute left-7 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
                <input
                  autoFocus
                  type="search"
                  placeholder="Search vegetables…"
                  className="w-full h-10 pl-9 pr-4 bg-white border border-cream-300
                             rounded-full text-sm text-stone-800 placeholder:text-stone-400
                             focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20"
                  value={search}
                  onChange={e => onSearchChange(e.target.value)}
                  aria-label="Search mobile"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
