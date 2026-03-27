'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Lock, Eye, EyeOff, Leaf, Check, Loader2 } from 'lucide-react'

interface SignInModalProps {
  onClose: () => void
  onSuccess: (user: { email: string }) => void
}

export default function SignInModal({ onClose, onSuccess }: SignInModalProps) {
  const [mode,    setMode]    = useState<'signin' | 'signup'>('signin')
  const [email,   setEmail]   = useState('')
  const [pass,    setPass]    = useState('')
  const [showPw,  setShowPw]  = useState(false)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')
  const [success, setSuccess] = useState(false)

  const switchMode = (m: typeof mode) => { setMode(m); setError(''); setPass('') }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !pass) { setError('Please fill in all fields.'); return }
    if (pass.length < 6) { setError('Password must be at least 6 characters.'); return }
    setError(''); setLoading(true)
    await new Promise(r => setTimeout(r, 1300))
    setLoading(false); setSuccess(true)
    setTimeout(() => { onSuccess({ email }); onClose() }, 1100)
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center p-0 sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/40 backdrop-blur-md"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Modal */}
        <motion.div
          className="relative w-full sm:max-w-[440px] bg-white z-10
                     rounded-t-[28px] sm:rounded-[28px]
                     overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.18)]"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 40 }}
          role="dialog"
          aria-modal="true"
          aria-label="Sign in to Verdura"
        >
          {/* Drag handle (mobile) */}
          <div className="sm:hidden flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 bg-stone-200 rounded-full" />
          </div>

          {/* Decorative header */}
          <div className="relative h-20 bg-gradient-to-br from-[#1A3A1A] via-[#2D5E2A] to-[#3D7A3A] overflow-hidden">
            {/* Blobs */}
            <div className="absolute -top-12 -right-8 w-40 h-40 rounded-full bg-white/[0.05]" />
            <div className="absolute -bottom-8 left-6 w-24 h-24 rounded-full bg-white/[0.07]" />
            <div className="absolute top-4 right-16 w-10 h-10 rounded-full bg-white/[0.06]" />
            {/* Logo mark */}
            <div className="absolute bottom-[-18px] left-6 w-11 h-11 bg-white rounded-xl
                            flex items-center justify-center shadow-lg border border-cream-200">
              <Leaf size={18} className="text-brand-500" />
            </div>
            {/* Close */}
            <button
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center
                         rounded-full bg-white/10 text-white hover:bg-white/20
                         transition-colors duration-150"
              onClick={onClose}
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 pb-6 pt-7 space-y-5">
            {success ? (
              <motion.div
                className="flex flex-col items-center gap-3 py-6 text-center"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              >
                <motion.div
                  className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.1 }}
                >
                  <Check size={30} className="text-brand-500" strokeWidth={2.5} />
                </motion.div>
                <h2 className="font-display text-2xl font-semibold text-stone-900">Welcome back!</h2>
                <p className="text-sm text-stone-500">You're signed in. Happy shopping!</p>
              </motion.div>
            ) : (
              <>
                {/* Tabs */}
                <div className="flex bg-cream-200 p-1 rounded-full gap-1">
                  {(['signin', 'signup'] as const).map(m => (
                    <button
                      key={m}
                      role="tab"
                      aria-selected={mode === m}
                      className={`flex-1 h-9 rounded-full text-sm font-medium transition-all duration-200 ${
                        mode === m
                          ? 'bg-white shadow text-stone-900 font-semibold'
                          : 'text-stone-500 hover:text-stone-700'
                      }`}
                      onClick={() => switchMode(m)}
                    >
                      {m === 'signin' ? 'Sign In' : 'Create Account'}
                    </button>
                  ))}
                </div>

                {/* Heading */}
                <div>
                  <h2 className="font-display text-2xl font-semibold text-stone-900">
                    {mode === 'signin' ? 'Welcome back' : 'Join Verdura'}
                  </h2>
                  <p className="text-sm text-stone-500 mt-1">
                    {mode === 'signin'
                      ? 'Sign in to track your orders and deliveries.'
                      : 'Create an account. First delivery on us.'}
                  </p>
                </div>

                {/* Error */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="bg-red-50 border border-red-200 text-red-600 text-sm
                                 font-medium rounded-xl px-4 py-3"
                      role="alert"
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-600 tracking-wide uppercase" htmlFor="s-email">
                      Email address
                    </label>
                    <div className="relative">
                      <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
                      <input
                        id="s-email"
                        type="email"
                        className="w-full h-12 pl-9 pr-4 bg-cream-100 border border-cream-300
                                   rounded-xl text-sm text-stone-800 placeholder:text-stone-400
                                   focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20
                                   focus:bg-white transition-all duration-200"
                        placeholder="you@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-600 tracking-wide uppercase" htmlFor="s-pass">
                      Password
                    </label>
                    <div className="relative">
                      <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
                      <input
                        id="s-pass"
                        type={showPw ? 'text' : 'password'}
                        className="w-full h-12 pl-9 pr-12 bg-cream-100 border border-cream-300
                                   rounded-xl text-sm text-stone-800 placeholder:text-stone-400
                                   focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20
                                   focus:bg-white transition-all duration-200"
                        placeholder={mode === 'signup' ? 'Min. 6 characters' : '••••••••'}
                        value={pass}
                        onChange={e => setPass(e.target.value)}
                        autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3.5 top-1/2 -translate-y-1/2
                                   text-stone-400 hover:text-stone-600 transition-colors"
                        onClick={() => setShowPw(v => !v)}
                        aria-label={showPw ? 'Hide password' : 'Show password'}
                      >
                        {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {mode === 'signin' && (
                    <div className="text-right">
                      <button type="button" className="text-xs text-brand-600 font-medium hover:underline">
                        Forgot password?
                      </button>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 flex items-center justify-center gap-2
                               bg-brand-500 hover:bg-brand-600 disabled:opacity-70
                               text-white font-semibold text-base rounded-xl
                               shadow-brand hover:shadow-brand-lg
                               transition-all duration-150 mt-1"
                    aria-busy={loading}
                  >
                    {loading
                      ? <Loader2 size={18} className="animate-spin" />
                      : (mode === 'signin' ? 'Sign In' : 'Create Account')}
                  </button>
                </form>

                {/* Divider */}
                <div className="relative flex items-center gap-3">
                  <div className="flex-1 h-px bg-cream-300" />
                  <span className="text-xs text-stone-400 font-medium uppercase tracking-wider">or</span>
                  <div className="flex-1 h-px bg-cream-300" />
                </div>

                {/* Social */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: 'Google', icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                      )
                    },
                    { name: 'Apple', icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                        </svg>
                      )
                    },
                  ].map(s => (
                    <button
                      key={s.name}
                      type="button"
                      className="h-11 flex items-center justify-center gap-2 rounded-xl
                                 border border-cream-300 bg-cream-100 text-sm font-medium text-stone-700
                                 hover:border-stone-400 hover:bg-white
                                 transition-all duration-150"
                      aria-label={`Continue with ${s.name}`}
                    >
                      {s.icon}
                      {s.name}
                    </button>
                  ))}
                </div>

                {mode === 'signup' && (
                  <p className="text-xs text-stone-400 text-center leading-relaxed">
                    By creating an account you agree to our{' '}
                    <button type="button" className="text-brand-600 hover:underline font-medium">Terms</button>
                    {' '}and{' '}
                    <button type="button" className="text-brand-600 hover:underline font-medium">Privacy Policy</button>.
                  </p>
                )}
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
