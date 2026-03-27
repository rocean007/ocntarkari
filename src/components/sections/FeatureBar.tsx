import { Truck, Leaf, ShieldCheck, Star } from 'lucide-react'

const features = [
  { icon: Truck,        label: 'Free Delivery',   sub: 'Orders over $30',      bg: '#E8F4E8', ic: '#3D7A3A' },
  { icon: Leaf,         label: '100% Organic',     sub: 'Certified local farms', bg: '#FFF0E0', ic: '#B35A00' },
  { icon: ShieldCheck,  label: 'Quality Assured',  sub: 'Hand-picked daily',    bg: '#E0F0FF', ic: '#0050A0' },
  { icon: Star,         label: '4.9★ Rating',       sub: '15,000+ happy customers', bg: '#F5E8F5', ic: '#6B2A8B' },
]

export default function FeatureBar() {
  return (
    <div className="bg-white border-y border-cream-300 py-5 sm:py-6 px-4 sm:px-6">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: f.bg }}
              >
                <f.icon size={18} style={{ color: f.ic }} />
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-800">{f.label}</p>
                <p className="text-xs text-stone-500 mt-0.5 leading-tight">{f.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
