export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-cream-200 flex flex-col">
      <div className="skeleton h-[120px] sm:h-[148px] w-full rounded-none" />
      <div className="p-3 sm:p-4 space-y-2.5">
        <div className="skeleton h-3.5 w-12 rounded-full" />
        <div className="skeleton h-5 w-3/4" />
        <div className="skeleton h-3.5 w-full" />
        <div className="skeleton h-3.5 w-4/5" />
        <div className="skeleton h-5 w-20 rounded-full" />
        <div className="flex items-center justify-between pt-2 mt-1 border-t border-cream-200">
          <div className="skeleton h-6 w-14" />
          <div className="skeleton h-8 w-20 rounded-full" />
        </div>
      </div>
    </div>
  )
}
