import { useEffect, useRef, useState } from 'react'

function useInView(useParent = false) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = useParent ? ref.current?.parentElement : ref.current
    if (!el || !('IntersectionObserver' in window)) return setShown(true)
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.disconnect() }
    }, { threshold: useParent ? 0.05 : 0.15, rootMargin: '0px 0px -40px 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, shown]
}

/* Scroll-reveal wrapper: adds .in once the element enters the viewport */
export function Reveal({ as: Tag = 'div', variant = 'up', delay = 0, className = '', children, ...rest }) {
  const [ref, shown] = useInView()
  return (
    <Tag ref={ref} className={`reveal ${variant} ${shown ? 'in' : ''} ${className}`}
      style={{ '--d': `${delay}ms` }} {...rest}>{children}</Tag>
  )
}

/* Real pet photo (background removed) that slides in from a page edge */
export function EdgePet({ src, side = 'right', flip = false, className = '', children }) {
  const [ref, shown] = useInView(true)
  return (
    <div ref={ref} className={`edge edge-${side} ${shown ? 'in' : ''} ${className}`} aria-hidden="true">
      <img className={flip ? 'flip' : ''} src={src} alt="" draggable="false" />
      {children}
    </div>
  )
}

/* Yarn ball swinging on a string, for the orange cat to reach for */
export function YarnToy() {
  return (
    <svg className="yarn" viewBox="0 0 80 230" aria-hidden="true">
      <circle cx="40" cy="6" r="5" fill="#2b3440" />
      <line x1="40" y1="8" x2="40" y2="160" stroke="#2b3440" strokeWidth="2" />
      <circle cx="40" cy="190" r="34" fill="#e25b6a" />
      <g fill="none" stroke="#f6a0aa" strokeWidth="3" strokeLinecap="round">
        <path d="M14 178 q26 -22 52 4" /><path d="M10 192 q30 -24 60 6" />
        <path d="M16 206 q24 -18 50 0" /><path d="M24 160 q6 40 28 60" /><path d="M42 158 q-14 30 6 64" />
      </g>
      <path d="M62 214 q14 10 8 18" fill="none" stroke="#e25b6a" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}
