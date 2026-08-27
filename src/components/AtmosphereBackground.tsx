// Climate Craft's global atmospheric canvas.
// One fixed layer behind every route: layered aqua/mint gradients with a few
// oversized blurred organic light forms drifting on very slow (22–34s)
// transform cycles. Pure CSS — no video, no canvas, no JS per frame.
// Sits at a negative z-index so all page content paints above it; sections
// use translucent tints so the atmosphere remains visible everywhere.
export function AtmosphereBackground() {
  return (
    <div aria-hidden="true" className="cc-atmosphere pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="cc-shape cc-shape-a" />
      <div className="cc-shape cc-shape-b" />
      <div className="cc-shape cc-shape-c" />
      <div className="cc-shape cc-shape-d" />
      <div className="cc-shape cc-shape-e" />
      <div className="grain-overlay opacity-[0.28]" />
    </div>
  )
}
