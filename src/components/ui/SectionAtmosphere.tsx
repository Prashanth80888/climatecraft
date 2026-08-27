// Reusable section-level atmospheric overlay.
// Renders soft, blurred radial gradients that sit behind section content but
// above the global atmosphere. Each variant creates a different ambient feel
// while staying within the #E5FEFF color system.
// Pure CSS animations — no JS per frame, GPU-accelerated transforms only.

type Variant = 'bloom' | 'wave' | 'radial' | 'glow' | 'ambient'

interface SectionAtmosphereProps {
  variant?: Variant
  className?: string
}

const VARIANTS: Record<Variant, {
  gradients: string[]
  animation?: string
}> = {
  bloom: {
    gradients: [
      'radial-gradient(900px 600px at 20% 50%, rgba(201, 243, 242, 0.52) 0%, rgba(201, 243, 242, 0) 62%)',
      'radial-gradient(600px 400px at 80% 30%, rgba(247, 252, 251, 0.60) 0%, rgba(247, 252, 251, 0) 55%)',
    ],
    animation: 'cc-section-drift-a 28s ease-in-out infinite alternate',
  },
  wave: {
    gradients: [
      'radial-gradient(1200px 500px at 50% 80%, rgba(184, 233, 232, 0.48) 0%, rgba(184, 233, 232, 0) 58%)',
      'radial-gradient(800px 350px at 15% 20%, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0) 52%)',
    ],
    animation: 'cc-section-drift-b 32s ease-in-out infinite alternate',
  },
  radial: {
    gradients: [
      'radial-gradient(700px 500px at 60% 40%, rgba(201, 243, 242, 0.50) 0%, rgba(201, 243, 242, 0) 60%)',
      'radial-gradient(500px 350px at 30% 70%, rgba(247, 252, 251, 0.55) 0%, rgba(247, 252, 251, 0) 55%)',
    ],
    animation: 'cc-section-drift-c 26s ease-in-out infinite alternate',
  },
  glow: {
    gradients: [
      'radial-gradient(800px 550px at 35% 55%, rgba(21, 159, 163, 0.08) 0%, rgba(21, 159, 163, 0) 55%)',
      'radial-gradient(600px 400px at 75% 25%, rgba(247, 252, 251, 0.58) 0%, rgba(247, 252, 251, 0) 52%)',
    ],
    animation: 'cc-section-drift-d 30s ease-in-out infinite alternate',
  },
  ambient: {
    gradients: [
      'radial-gradient(1000px 650px at 45% 50%, rgba(229, 254, 255, 0.55) 0%, rgba(229, 254, 255, 0) 58%)',
      'radial-gradient(700px 450px at 70% 70%, rgba(201, 243, 242, 0.40) 0%, rgba(201, 243, 242, 0) 55%)',
    ],
    animation: 'cc-section-drift-e 34s ease-in-out infinite alternate',
  },
}

export function SectionAtmosphere({ variant = 'bloom', className = '' }: SectionAtmosphereProps) {
  const v = VARIANTS[variant]
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {v.gradients.map((g, i) => (
        <div
          key={i}
          className="absolute inset-0 cc-atmo-shape"
          style={{
            background: g,
            animation: v.animation ? `${v.animation.replace(/-drift-[a-e]/, `-drift-${i === 0 ? 'a' : 'b'}`)} ${i === 0 ? '28s' : '34s'} ease-in-out infinite alternate` : undefined,
          }}
        />
      ))}
    </div>
  )
}
