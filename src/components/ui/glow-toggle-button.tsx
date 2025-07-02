'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

type GlowToggleButtonProps = {
  text: string
  onClick?: () => void
  bgColor?: string
  textColor?: string
  className?: string
}

export default function GlowToggleButton({
  text,
  onClick,
  bgColor = '#EA5A2B',
  textColor = '#EA5A2B',
  className,
}: GlowToggleButtonProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'relative flex items-center justify-start pl-6 pr-[48px] py-[12px] rounded-full font-bold overflow-hidden w-fit',
        className
      )}
      style={{ backgroundColor: 'transparent' }}
    >
      {/* 텍스트 */}
      <motion.span
        animate={{
          x: hovered ? -4 : 0,
          color: hovered ? '#ffffff' : textColor,
        }}
        transition={{
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="text-base font-semibold z-20 whitespace-nowrap"
      >
        {text}
      </motion.span>

      {/* 확장 배경 */}
      <motion.div
        initial={{ width: 48 }}
        animate={
          hovered
            ? { width: [48, 200, 170] }
            : { width: [170, 54, 48] }
        }
        transition={{
          duration: 0.6,
          ease: [0.4, 0, 0.2, 1],
          times: [0, 0.5, 1],
        }}
        className="absolute right-0 z-10 h-[48px] rounded-full"
        style={{
          backgroundColor: bgColor,
          transformOrigin: 'right',
        }}
      />

      {/* 화살표 아이콘 */}
      <div className="absolute right-0 h-[48px] w-[48px] flex items-center justify-center z-20">
        <ArrowRight size={20} className="text-white" />
      </div>
    </motion.button>
  )
}