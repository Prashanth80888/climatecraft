interface SectionAtmosphereProps {
  variant?: string
  className?: string
}

export function SectionAtmosphere({ className = '' }: SectionAtmosphereProps) {
  return (
    <div aria-hidden="true" className={`cc-concentric pointer-events-none absolute inset-0 overflow-hidden -z-10 ${className}`}>
      <div className="cc-ring cc-ring--1" />
      <div className="cc-ring cc-ring--2" />
      <div className="cc-ring cc-ring--3" />
      <div className="cc-ring cc-ring--4" />
      <div className="cc-ring cc-ring--5" />
      <div className="grain-overlay opacity-[0.06]" />
    </div>
  )
}
