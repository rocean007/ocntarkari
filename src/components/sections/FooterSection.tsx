import { Leaf } from 'lucide-react'

const links = {
  Company: ['About', 'How it works', 'Farms', 'Blog', 'Careers'],
  Support: ['FAQ', 'Contact', 'Delivery info', 'Returns', 'Track order'],
  Legal:   ['Privacy', 'Terms', 'Cookies', 'Accessibility'],
}

export default function FooterSection() {
  return (
    <footer className="bg-stone-900 text-white px-4 sm:px-6 pt-14 pb-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
                <Leaf size={15} className="text-white" />
              </div>
              <span className="font-display text-lg font-semibold tracking-tight">verdura</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-[200px]">
              Farm-fresh vegetables, delivered daily with care and zero compromise.
            </p>
            <div className="flex gap-3">
              {['🌿', '📦', '🚜'].map(e => (
                <div key={e} className="w-9 h-9 bg-white/8 rounded-xl flex items-center justify-center
                                       hover:bg-white/15 transition-colors cursor-pointer text-base">
                  {e}
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group} className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40">{group}</p>
              <ul className="space-y-2">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm text-white/60 hover:text-white transition-colors duration-150 underline-grow">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6">
          <p className="text-xs text-white/30">© 2025 Verdura Ltd. All rights reserved.</p>
          <p className="text-xs text-white/30">Made with 🌿 for food lovers everywhere</p>
        </div>
      </div>
    </footer>
  )
}
