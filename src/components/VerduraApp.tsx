'use client'

import { useState, useCallback, useRef } from 'react'
import { useCart } from '@/hooks/useCart'
import { useToast } from '@/hooks/useToast'
import type { Vegetable } from '@/types'

import Navbar          from '@/components/layout/Navbar'
import HeroSection     from '@/components/sections/HeroSection'
import FeatureBar      from '@/components/sections/FeatureBar'
import ShopSection     from '@/components/sections/ShopSection'
import FooterSection   from '@/components/sections/FooterSection'
import CartDrawer      from '@/components/layout/CartDrawer'
import SignInModal     from '@/components/layout/SignInModal'
import ToastStack      from '@/components/ui/ToastStack'
import MobileCartBar   from '@/components/layout/MobileCartBar'

export default function VerduraApp() {
  const cart  = useCart()
  const toast = useToast()

  const [cartOpen,   setCartOpen]   = useState(false)
  const [signInOpen, setSignInOpen] = useState(false)
  const [search,     setSearch]     = useState('')
  const [category,   setCategory]   = useState('all')
  const [user,       setUser]       = useState<{ email: string } | null>(null)

  const shopRef = useRef<HTMLDivElement>(null)

  const scrollToShop = useCallback(() => {
    shopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const handleAdd = useCallback((veg: Vegetable) => {
    cart.addItem(veg)
    toast.addToast(`${veg.name} added to cart`, veg.emoji)
  }, [cart, toast])

  const handleRemove = useCallback((id: number) => {
    cart.removeItem(id)
    toast.addToast('Item removed from cart', '🗑️', 'info')
  }, [cart, toast])

  const handleCheckout = useCallback(() => {
    if (!user) {
      setCartOpen(false)
      setTimeout(() => setSignInOpen(true), 260)
    } else {
      cart.clearCart()
      setCartOpen(false)
      toast.addToast('Order placed! Delivery within 48h 🎉', '🎉')
    }
  }, [user, cart, toast])

  const handleSignIn = useCallback((userData: { email: string }) => {
    setUser(userData)
    toast.addToast('Welcome back! Happy shopping 🌿', '🌿')
  }, [toast])

  return (
    <div className="min-h-dvh bg-cream-100 overflow-x-hidden">
      <Navbar
        cartCount={cart.totalItems}
        onCartClick={() => setCartOpen(true)}
        onSignInClick={() => setSignInOpen(true)}
        search={search}
        onSearchChange={setSearch}
        user={user}
      />

      <main>
        <HeroSection onShopNow={scrollToShop} />
        <FeatureBar />
        <div ref={shopRef} id="shop">
          <ShopSection
            cart={cart.items}
            category={category}
            onCategoryChange={setCategory}
            onAdd={handleAdd}
            onIncrement={cart.increment}
            onDecrement={cart.decrement}
            search={search}
          />
        </div>
      </main>

      <FooterSection />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart.items}
        subtotal={cart.subtotal}
        shipping={cart.shipping}
        total={cart.total}
        freeShipping={cart.freeShipping}
        onIncrement={cart.increment}
        onDecrement={cart.decrement}
        onRemove={handleRemove}
        onCheckout={handleCheckout}
      />

      {signInOpen && (
        <SignInModal
          onClose={() => setSignInOpen(false)}
          onSuccess={handleSignIn}
        />
      )}

      <ToastStack toasts={toast.toasts} onRemove={toast.removeToast} />

      {/* Mobile sticky cart bar */}
      {cart.totalItems > 0 && (
        <MobileCartBar
          count={cart.totalItems}
          total={cart.total}
          onClick={() => setCartOpen(true)}
        />
      )}
    </div>
  )
}
