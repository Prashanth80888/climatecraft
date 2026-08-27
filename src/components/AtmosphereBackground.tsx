export function AtmosphereBackground() {
  return (
    <div aria-hidden="true" className="cc-concentric pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="cc-ring cc-ring--1" />
      <div className="cc-ring cc-ring--2" />
      <div className="cc-ring cc-ring--3" />
      <div className="cc-ring cc-ring--4" />
      <div className="cc-ring cc-ring--5" />
      <div className="grain-overlay opacity-[0.08]" />
    </div>
  )
}
