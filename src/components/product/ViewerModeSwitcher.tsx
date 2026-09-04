import { RotateCw, Sparkles } from 'lucide-react'

export type ViewerMode = '3d' | 'details'

interface ViewerModeSwitcherProps {
  mode: ViewerMode
  onChange: (mode: ViewerMode) => void
}

export function ViewerModeSwitcher({
  mode,
  onChange,
}: ViewerModeSwitcherProps) {
  const modes = [
    {
      id: '3d' as const,
      label: '360° View',
      icon: RotateCw,
    },
    {
      id: 'details' as const,
      label: 'Detail View',
      icon: Sparkles,
    },
  ]

  return (
    <div
      role="tablist"
      aria-label="Product viewer mode"
      className="
        inline-flex
        items-center
        gap-1
        rounded-full
        border
        border-[#0B3F42]/10
        bg-white/75
        p-1
        shadow-[0_8px_25px_-12px_rgba(6,61,60,0.25)]
        backdrop-blur-md
      "
    >
      {modes.map(({ id, label, icon: Icon }) => {
        const isActive = mode === id

        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(id)}
            className={`
              flex
              items-center
              justify-center
              gap-2
              rounded-full
              px-4
              py-2.5
              text-[11.5px]
              font-semibold
              uppercase
              tracking-[0.12em]
              transition-all
              duration-300
              sm:px-5
              sm:py-2.5
              sm:text-[11px]
              ${isActive
                ? `
                    bg-gold-400
                    text-ink-950
                    shadow-[0_8px_20px_-8px_rgba(22,155,154,0.6)]
                  `
                : `
                    text-[#36585A]
                    hover:bg-[#E8EFEC]
                    hover:text-[#36585A]
                  `
              }
            `}
          >
            <Icon
              className="h-4 w-4 flex-none"
              strokeWidth={2}
            />

            <span className="whitespace-nowrap">
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}