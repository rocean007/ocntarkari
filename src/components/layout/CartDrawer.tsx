'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Trash2, Plus, Minus, Truck, ArrowRight, Package } from 'lucide-react'
import type { CartItem } from '@/types'

interface CartDrawerProps {
  open: boolean
  onClose: () => void
  items: CartItem[]
  subtotal: number
  shipping: number
  total: number
  freeShipping: boolean
  onIncrement: (id: number) => void
  onDecrement: (id: number) => void
  onRemove: (id: number) => void
  onCheckout: () => void
}

export default function CartDrawer({
  open, onClose, items,
  subtotal, shipping, total, freeShipping,
  onIncrement, onDecrement, onRemove, onCheckout,
}: CartDrawerProps) {
  const progressPct = Math.min((subtotal / 30) * 100, 100)

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[200] bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            className="fixed top-0 right-0 h-dvh w-full max-w-[420px] z-[201]
                       bg-cream-100 shadow-drawer flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 340, damping: 38 }}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-cream-300 bg-white/70">
              <div className="flex items-center gap-2.5">
                <ShoppingBag size={20} className="text-brand-500" />
                <h2 className="font-display text-xl font-semibold tracking-tight">Cart</h2>
                {items.length > 0 && (
                  <span className="bg-brand-500 text-white text-xs font-bold px-2 py-0.5 rounded-full font-mono">
                    {items.reduce((s, i) => s + i.qty, 0)}
                  </span>
                )}
              </div>
              <button
                className="w-9 h-9 flex items-center justify-center rounded-full
                           text-stone-500 hover:bg-cream-200 hover:text-stone-800
                           transition-colors duration-150"
                onClick={onClose}
                aria-label="Close cart"
              >
                <X size={18} />
              </button>
            </div>

            {/* Free shipping progress */}
            {items.length > 0 && (
              <div className="px-5 py-3 border-b border-cream-300 bg-white/50">
                <div className="flex items-center gap-2 mb-2">
                  <Truck size={14} className="text-brand-500 shrink-0" />
                  <p className="text-xs text-stone-600">
                    {freeShipping
                      ? <span className="font-semibold text-brand-600">🎉 You unlocked free delivery!</span>
                      : <span>Add <span className="font-semibold text-stone-800">${(30 - subtotal).toFixed(2)}</span> more for free delivery</span>
                    }
                  </p>
                </div>
                <div className="h-1.5 bg-cream-300 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-brand-500 rounded-full"
                    initial={false}
                    animate={{ width: `${progressPct}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-20">
                  <div className="w-20 h-20 rounded-2xl bg-cream-200 flex items-center justify-center">
                    <Package size={32} className="text-stone-400" />
                  </div>
                  <div>
                    <p className="font-display text-xl font-semibold text-stone-800">Your cart is empty</p>
                    <p className="text-sm text-stone-500 mt-1 max-w-[200px] mx-auto">
                      Discover fresh vegetables and add them here
                    </p>
                  </div>
                  <button
                    className="h-11 px-6 rounded-full bg-brand-500 text-white text-sm font-semibold
                               hover:bg-brand-600 shadow-brand transition-all duration-150"
                    onClick={onClose}
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {items.map(item => (
                    <motion.div
                      key={item.vegetable.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 40, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.22 }}
                      className="flex gap-3 bg-white rounded-2xl p-3 border border-cream-300
                                 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                    >
                      {/* Visual */}
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0"
                        style={{ background: item.vegetable.bgColor }}
                      >
                        {item.vegetable.emoji}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-semibold text-stone-800 leading-tight line-clamp-1">
                            {item.vegetable.name}
                          </p>
                          <button
                            className="w-6 h-6 flex items-center justify-center rounded-lg
                                       text-stone-400 hover:text-red-500 hover:bg-red-50
                                       transition-colors duration-150 shrink-0"
                            onClick={() => onRemove(item.vegetable.id)}
                            aria-label={`Remove ${item.vegetable.name}`}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                        <p className="text-xs text-stone-400 mt-0.5">{item.vegetable.unit}</p>
                        <div className="flex items-center justify-between mt-2">
                          {/* Qty */}
                          <div className="flex items-center gap-1 bg-cream-200 rounded-full p-0.5">
                            <button
                              className="w-6 h-6 flex items-center justify-center rounded-full
                                         bg-white shadow-sm text-brand-600
                                         hover:bg-brand-50 transition-colors"
                              onClick={() => onDecrement(item.vegetable.id)}
                              aria-label="Decrease"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-6 text-center text-sm font-semibold font-mono text-stone-800">
                              {item.qty}
                            </span>
                            <button
                              className="w-6 h-6 flex items-center justify-center rounded-full
                                         bg-white shadow-sm text-brand-600
                                         hover:bg-brand-50 transition-colors"
                              onClick={() => onIncrement(item.vegetable.id)}
                              aria-label="Increase"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <span className="text-sm font-semibold font-mono text-stone-800">
                            ${(item.vegetable.price * item.qty).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-5 py-5 border-t border-cream-300 bg-white/70 space-y-3 safe-bottom">
                <div className="space-y-1.5">
                  {[
                    { label: 'Subtotal', value: `$${subtotal.toFixed(2)}` },
                    { label: 'Delivery', value: freeShipping ? 'FREE' : `$${shipping.toFixed(2)}`, green: freeShipping },
                  ].map(row => (
                    <div key={row.label} className="flex justify-between text-sm text-stone-600">
                      <span>{row.label}</span>
                      <span className={row.green ? 'text-brand-600 font-semibold' : 'font-mono'}>{row.value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-cream-300">
                    <span>Total</span>
                    <span className="font-mono">${total.toFixed(2)}</span>
                  </div>
                </div>

                <motion.button
                  className="w-full h-13 flex items-center justify-center gap-2
                             bg-brand-500 hover:bg-brand-600 text-white font-semibold text-base
                             rounded-2xl shadow-brand hover:shadow-brand-lg
                             transition-all duration-150"
                  style={{ height: '52px' }}
                  onClick={onCheckout}
                  whileTap={{ scale: 0.97 }}
                >
                  Checkout
                  <ArrowRight size={16} />
                </motion.button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
