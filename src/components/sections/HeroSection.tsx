'use client'

import { motion } from 'framer-motion'
import { Truck, ArrowRight, Star, Leaf } from 'lucide-react'
import { heroStats, vegetables } from '@/data/vegetables'

interface HeroProps {
  onShopNow: () => void
}

const featured = vegetables.filter(v => v.featured).slice(0, 4)

export default function HeroSection({ onShopNow }: HeroProps) {
  return (
    <section
      className="relative min-h-[100dvh] flex flex-col justify-center
                 pt-20 pb-12 px-4 sm:px-6 overflow-hidden"
      aria-label="Hero"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-cream-100 via-[#f2f5ee] to-cream-200" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full
                        bg-brand-100/40 blur-[120px] translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full
                        bg-amber-100/30 blur-[100px] -translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="mx-auto w-full max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Left: Copy ────────────────────────────────── */}
          <div className="space-y-6 order-2 lg:order-1">
            {/* Pill badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2
                         bg-brand-100 text-brand-700 rounded-full
                         text-sm font-medium border border-brand-200/60"
            >
              <Truck size={14} />
              Free delivery on orders over $30
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
            >
              <h1 className="font-display font-bold leading-[1.05] tracking-tight
                             text-[clamp(42px,7vw,76px)] text-stone-900">
                Farm-fresh{' '}
                <span className="italic text-brand-500">vegetables</span>
                <br />delivered daily.
              </h1>
            </motion.div>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.26 }}
              className="text-stone-500 text-base sm:text-lg leading-relaxed max-w-md"
            >
              Straight from local farms to your door within 48 hours.
              No plastic. No compromise. Just real food.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.34 }}
              className="flex flex-col xs:flex-row gap-3"
            >
              <button
                onClick={onShopNow}
                className="flex items-center justify-center gap-2
                           h-14 px-8 rounded-2xl
                           bg-brand-500 hover:bg-brand-600 text-white
                           font-semibold text-base shadow-brand hover:shadow-brand-lg
                           transition-all duration-200 group"
                aria-label="Shop now"
              >
                Shop Now
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button
                className="flex items-center justify-center h-14 px-6 rounded-2xl
                           border border-cream-400 bg-white/70 text-stone-600
                           font-medium text-base hover:border-brand-400 hover:text-brand-600
                           hover:bg-brand-50 transition-all duration-200"
              >
                How it works
              </button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.44 }}
              className="flex gap-8 pt-4 border-t border-cream-300"
            >
              {heroStats.map((s, i) => (
                <div key={i} className="space-y-0.5">
                  <p className="font-display text-2xl font-bold text-stone-900 tracking-tight">{s.value}</p>
                  <p className="text-xs text-stone-500 font-medium">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Bento Grid ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="order-1 lg:order-2"
          >
            <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto lg:max-w-none">

              {/* Large feature card */}
              <div className="col-span-2 relative bg-white rounded-3xl p-5 border border-cream-300
                              shadow-card overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full
                                bg-brand-50 blur-2xl -translate-y-1/2 translate-x-1/4" />
                <div className="relative flex items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-5xl
                                  bg-[#E8F4E8] animate-[float_4s_ease-in-out_infinite]">
                    🥦
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-brand-500">
                      Today's Pick
                    </span>
                    <p className="font-display text-xl font-semibold text-stone-900 leading-tight">
                      Organic Broccoli
                    </p>
                    <div className="flex items-center gap-1.5">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      <span className="text-xs text-stone-600 font-medium">4.8 · 67 reviews</span>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <span className="bg-brand-500 text-white px-3 py-1.5 rounded-xl text-sm font-bold font-mono shadow-brand">
                      $2.99
                    </span>
                  </div>
                </div>
                {/* Delivery badge */}
                <div className="mt-3 pt-3 border-t border-cream-200 flex items-center gap-2">
                  <Truck size={13} className="text-brand-500" />
                  <span className="text-xs text-stone-500">
                    Next delivery: <strong className="text-stone-700">Today 6–9 PM</strong>
                  </span>
                </div>
              </div>

              {/* Small cards */}
              {featured.slice(0, 4).map((veg, i) => (
                <motion.div
                  key={veg.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.06 }}
                  className="relative bg-white rounded-2xl p-3.5 border border-cream-300 shadow-card
                             hover:shadow-card-hover hover:-translate-y-0.5
                             transition-all duration-200 cursor-default overflow-hidden"
                  style={{ background: veg.bgColor }}
                >
                  <div className="absolute top-1 right-1 w-12 h-12 rounded-full bg-white/20 blur-lg" />
                  <div className="text-3xl mb-2">{veg.emoji}</div>
                  <p className="text-xs font-semibold text-stone-700 leading-tight line-clamp-1">{veg.name}</p>
                  <p className="text-xs font-bold font-mono text-stone-900 mt-0.5">${veg.price.toFixed(2)}</p>
                  {veg.badge && (
                    <span className="absolute top-2 right-2 text-[9px] font-bold uppercase
                                     bg-brand-500 text-white px-1.5 py-0.5 rounded-full">
                      {veg.badge}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
