'use client'

import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal } from 'lucide-react'
import { vegetables, categories } from '@/data/vegetables'
import type { CartItem, Vegetable } from '@/types'
import VeggieCard from '@/components/ui/VeggieCard'
import SkeletonCard from '@/components/ui/SkeletonCard'

interface ShopSectionProps {
  cart: CartItem[]
  category: string
  onCategoryChange: (c: string) => void
  onAdd: (v: Vegetable) => void
  onIncrement: (id: number) => void
  onDecrement: (id: number) => void
  search: string
}

export default function ShopSection({
  cart, category, onCategoryChange,
  onAdd, onIncrement, onDecrement, search,
}: ShopSectionProps) {
  const filtered = useMemo(() => vegetables.filter(v => {
    const mc = category === 'all' || v.category === category
    const ms = !search || v.name.toLowerCase().includes(search.toLowerCase())
    return mc && ms
  }), [category, search])

  return (
    <section className="py-10 sm:py-14 px-4 sm:px-6 pb-32 md:pb-16" aria-label="Shop vegetables">
      <div className="mx-auto max-w-[1440px] space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-[clamp(26px,4vw,42px)] font-bold text-stone-900 tracking-tight leading-tight">
              Fresh Today
            </h2>
            <p className="text-sm text-stone-500 mt-1">
              {filtered.length} variet{filtered.length === 1 ? 'y' : 'ies'} available
              {search ? ` for "${search}"` : ''}
            </p>
          </div>

          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1" role="tablist" aria-label="Filter by category">
            {categories.map(cat => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={category === cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`flex items-center gap-1.5 h-9 px-4 rounded-full text-sm font-medium
                            whitespace-nowrap transition-all duration-200 shrink-0
                            ${category === cat.id
                              ? 'bg-brand-500 text-white shadow-brand'
                              : 'bg-white border border-cream-300 text-stone-600 hover:border-brand-400 hover:text-brand-600'
                            }`}
              >
                <span aria-hidden="true">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <div className="text-5xl">🔍</div>
            <p className="font-display text-xl font-semibold text-stone-800">Nothing found</p>
            <p className="text-sm text-stone-500">Try a different category or search term.</p>
            <button
              className="mt-1 px-5 py-2.5 rounded-full bg-brand-500 text-white text-sm font-medium"
              onClick={() => onCategoryChange('all')}
            >
              Clear filter
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((veg, i) => (
                <motion.div
                  key={veg.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.88 }}
                  transition={{ duration: 0.25, delay: Math.min(i * 0.04, 0.3) }}
                >
                  <VeggieCard
                    vegetable={veg}
                    cartItem={cart.find(c => c.vegetable.id === veg.id)}
                    onAdd={onAdd}
                    onIncrement={onIncrement}
                    onDecrement={onDecrement}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  )
}
