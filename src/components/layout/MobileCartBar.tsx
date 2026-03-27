'use client'

import { motion } from 'framer-motion'
import { ShoppingBag, ArrowRight } from 'lucide-react'

interface MobileCartBarProps {
  count: number
  total: number
  onClick: () => void
}

export default function MobileCartBar({ count, total, onClick }: MobileCartBarProps) {
  return (
    <motion.div
      className="fixed bottom-0 inset-x-0 z-[90] md:hidden safe-bottom px-4 pb-4"
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 80, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 36 }}
    >
      <button
        className="w-full flex items-center justify-between
                   bg-brand-500 text-white rounded-2xl px-5 py-4
                   shadow-brand-lg active:scale-[0.98] transition-transform"
        onClick={onClick}
        aria-label={`View cart, ${count} items, total $${total.toFixed(2)}`}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
            <ShoppingBag size={16} />
          </div>
          <span className="font-semibold text-sm">
            {count} item{count !== 1 ? 's' : ''} in cart
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold">${total.toFixed(2)}</span>
          <ArrowRight size={16} />
        </div>
      </button>
    </motion.div>
  )
}
