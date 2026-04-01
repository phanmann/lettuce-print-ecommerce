'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0

    const updateCursor = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`
      }
    }

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.1
      ringY += (mouseY - ringY) * 0.1
      
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`
      }
      
      requestAnimationFrame(animateRing)
    }

    document.addEventListener('mousemove', updateCursor)
    animateRing()

    return () => {
      document.removeEventListener('mousemove', updateCursor)
    }
  }, [])

  return (
    <>
      <div 
        ref={cursorRef}
        className="fixed w-3 h-3 bg-[#2e6b38] rounded-full pointer-events-none z-[9999] transition-transform duration-75"
        style={{ top: 0, left: 0 }}
      />
      <div 
        ref={ringRef}
        className="fixed w-10 h-10 border-2 border-[#2e6b38] rounded-full pointer-events-none z-[9998] opacity-40"
        style={{ top: 0, left: 0 }}
      />
    </>
  )
}