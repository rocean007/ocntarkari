'use client'

import { useState, useEffect, useCallback } from 'react'
import type { CartItem, Vegetable } from '@/types'

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])
  const [hydrated, setHydrated] = useState(false)

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('verdura-cart')
      if (saved) setItems(JSON.parse(saved))
    } catch {}
    setHydrated(true)
  }, [])

  // Persist to localStorage
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem('verdura-cart', JSON.stringify(items))
    }
  }, [items, hydrated])

  const addItem = useCallback((vegetable: Vegetable) => {
    setItems(prev => {
      const existing = prev.find(i => i.vegetable.id === vegetable.id)
      if (existing) {
        return prev.map(i =>
          i.vegetable.id === vegetable.id ? { ...i, qty: i.qty + 1 } : i
        )
      }
      return [...prev, { vegetable, qty: 1 }]
    })
  }, [])

  const removeItem = useCallback((id: number) => {
    setItems(prev => prev.filter(i => i.vegetable.id !== id))
  }, [])

  const increment = useCallback((id: number) => {
    setItems(prev =>
      prev.map(i => i.vegetable.id === id ? { ...i, qty: i.qty + 1 } : i)
    )
  }, [])

  const decrement = useCallback((id: number) => {
    setItems(prev => {
      const item = prev.find(i => i.vegetable.id === id)
      if (!item) return prev
      if (item.qty <= 1) return prev.filter(i => i.vegetable.id !== id)
      return prev.map(i => i.vegetable.id === id ? { ...i, qty: i.qty - 1 } : i)
    })
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0)
  const subtotal   = items.reduce((sum, i) => sum + i.vegetable.price * i.qty, 0)
  const freeShipping = subtotal >= 30
  const shipping   = freeShipping ? 0 : 3.99
  const total      = subtotal + shipping

  return {
    items,
    totalItems,
    subtotal,
    shipping,
    total,
    freeShipping,
    addItem,
    removeItem,
    increment,
    decrement,
    clearCart,
    hydrated,
  }
}
