'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, Star, Zap } from 'lucide-react'
import type { Vegetable, CartItem } from '@/types'

interface VeggieCardProps {
  vegetable: Vegetable
  cartItem?: CartItem
  onAdd: (v: Vegetable) => void
  onIncrement: (id: number) => void
  onDecrement: (id: number) => void
}

export default function VeggieCard({
  vegetable: veg, cartItem,
  onAdd, onIncrement, onDecrement,
}: VeggieCardProps) {
  const [ripple, setRipple] = useState(false)
  const qty = cartItem?.qty ?? 0
  const inCart = qty > 0

  const handleAdd = () => {
    setRipple(true)
    setTimeout(() => setRipple(false), 400)
    onAdd(veg)
  }

  const discountedPrice = veg.discount
    ? veg.price * (1 - veg.discount / 100)
    : null

  return (
    <article
      className="group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden
                 border border-cream-200 shadow-card
                 hover:shadow-card-hover hover:-translate-y-1
                 transition-all duration-300 flex flex-col"
      aria-label={`${veg.name}, $${veg.price} per ${veg.unit}`}
    >
      {/* Visual area */}
      <div
        className="relative pt-5 pb-3 px-4 flex flex-col items-center justify-center min-h-[120px] sm:min-h-[148px]"
        style={{ background: veg.bgColor }}
      >
        {/* Shimmer highlight */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent pointer-events-none" />

        {/* Badge */}
        {veg.badge && (
          <span className="absolute top-2.5 left-2.5 text-[9px] sm:text-[10px] font-bold uppercase
                           bg-brand-500 text-white px-2 py-0.5 rounded-full tracking-wide z-10">
            {veg.badge}
          </span>
        )}

        {/* Discount */}
        {veg.discount && (
          <span className="absolute top-2.5 right-2.5 text-[9px] sm:text-[10px] font-bold
                           bg-amber-400 text-stone-900 px-2 py-0.5 rounded-full z-10">
            -{veg.discount}%
          </span>
        )}

        {/* Emoji */}
        <span
          className="text-[52px] sm:text-[64px] leading-none select-none
                     group-hover:scale-110 group-hover:-rotate-6
                     transition-transform duration-300 ease-out
                     drop-shadow-[0_4px_8px_rgba(0,0,0,0.12)]"
          aria-hidden="true"
        >
          {veg.emoji}
        </span>

        {/* In-cart indicator */}
        <AnimatePresence>
          {inCart && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute bottom-2.5 right-2.5 w-5 h-5 bg-brand-500 rounded-full
                         flex items-center justify-center shadow-brand"
            >
              <Zap size={10} className="text-white fill-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-3 sm:p-4 gap-2">
        {/* Tags */}
        {veg.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {veg.tags.map(t => (
              <span
                key={t}
                className="text-[10px] font-medium px-2 py-0.5 rounded-full
                           bg-cream-200 text-stone-600"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Name */}
        <h3 className="font-display font-semibold text-stone-900 leading-tight
                       text-base sm:text-lg line-clamp-1">
          {veg.name}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-[13px] text-stone-500 leading-snug line-clamp-2 flex-1">
          {veg.description}
        </p>

        {/* Nutrition tag */}
        <div className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-medium
                        bg-sky-50 text-sky-700 border border-sky-200 px-2 py-1 rounded-full
                        w-fit">
          {veg.nutrition}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1" aria-label={`${veg.rating} stars, ${veg.reviews} reviews`}>
          <Star size={11} className="fill-amber-400 text-amber-400" />
          <span className="text-xs font-semibold text-stone-700">{veg.rating}</span>
          <span className="text-xs text-stone-400">({veg.reviews})</span>
        </div>

        {/* Footer: price + action */}
        <div className="flex items-center justify-between pt-2 border-t border-cream-200 mt-auto">
          {/* Price */}
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="font-mono font-bold text-stone-900 text-base sm:text-lg">
                ${(discountedPrice ?? veg.price).toFixed(2)}
              </span>
              {discountedPrice && (
                <span className="font-mono text-xs text-stone-400 line-through">
                  ${veg.price.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-stone-400">/{veg.unit}</span>
          </div>

          {/* Add / Qty control */}
          <AnimatePresence mode="wait">
            {qty === 0 ? (
              <motion.button
                key="add"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className={`relative flex items-center gap-1.5 h-8 sm:h-9 px-3 sm:px-4
                            rounded-full font-semibold text-xs sm:text-sm
                            transition-all duration-150 overflow-hidden
                            ${ripple
                              ? 'bg-brand-600 text-white scale-95'
                              : 'bg-brand-100 text-brand-700 hover:bg-brand-500 hover:text-white'
                            }`}
                onClick={handleAdd}
                aria-label={`Add ${veg.name} to cart`}
                whileTap={{ scale: 0.92 }}
              >
                <Plus size={13} strokeWidth={2.5} />
                Add
              </motion.button>
            ) : (
              <motion.div
                key="qty"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="flex items-center gap-1 bg-cream-100 rounded-full p-0.5"
                role="group"
                aria-label={`Quantity for ${veg.name}`}
              >
                <button
                  className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full
                             bg-white shadow-sm text-brand-600 hover:bg-brand-100
                             transition-colors duration-150"
                  onClick={() => onDecrement(veg.id)}
                  aria-label="Remove one"
                >
                  <Minus size={12} />
                </button>

                <AnimatePresence mode="wait">
                  <motion.span
                    key={qty}
                    initial={{ y: -6, opacity: 0, scale: 0.6 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 6, opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.15 }}
                    className="w-6 text-center font-mono font-bold text-sm text-stone-900"
                    aria-live="polite"
                  >
                    {qty}
                  </motion.span>
                </AnimatePresence>

                <button
                  className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full
                             bg-brand-500 text-white shadow-brand hover:bg-brand-600
                             transition-colors duration-150"
                  onClick={() => onIncrement(veg.id)}
                  aria-label="Add one more"
                >
                  <Plus size={12} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </article>
  )
}
