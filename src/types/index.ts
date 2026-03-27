export interface Vegetable {
  id: number
  name: string
  category: string
  price: number
  unit: string
  emoji: string
  bgColor: string
  accentColor: string
  tags: string[]
  badge: string | null
  rating: number
  reviews: number
  description: string
  origin: string
  nutrition: string
  featured: boolean
  discount?: number
}

export interface CartItem {
  vegetable: Vegetable
  qty: number
}

export interface Category {
  id: string
  label: string
  icon: string
}

export interface Toast {
  id: number
  message: string
  emoji: string
  type?: 'success' | 'error' | 'info'
}

export interface User {
  email: string
  name?: string
}
