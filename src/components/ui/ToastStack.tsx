'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Toast } from '@/types'

interface ToastStackProps {
  toasts: Toast[]
  onRemove: (id: number) => void
}

export default function ToastStack({ toasts, onRemove }: ToastStackProps) {
  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[400]
                 flex flex-col gap-2 items-center pointer-events-none"
      aria-live="polite"
      aria-label="Notifications"
    >
      <AnimatePresence>
        {toasts.slice(-3).map(t => (
          <ToastItem key={t.id} toast={t} onRemove={onRemove} />
        ))}
      </AnimatePresence>
    </div>
  )
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: number) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), 2800)
    return () => clearTimeout(timer)
  }, [toast.id, onRemove])

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
      className="flex items-center gap-3 px-5 py-3
                 bg-stone-900 text-white rounded-full
                 shadow-[0_8px_32px_rgba(0,0,0,0.24)]
                 whitespace-nowrap pointer-events-auto
                 max-w-[90vw]"
      role="status"
    >
      <span className="text-base leading-none" aria-hidden="true">{toast.emoji}</span>
      <span className="text-sm font-medium leading-none">{toast.message}</span>
    </motion.div>
  )
}
