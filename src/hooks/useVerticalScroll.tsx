import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function useVerticalScroll(
    containerRef: React.RefObject<HTMLDivElement>
) {
    useGSAP(
        () => {
            const totalHeight = containerRef.current?.scrollHeight
            if (!totalHeight) return
            gsap.to(containerRef.current, {
                y: -totalHeight,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                    end: () => `+=${totalHeight}`
                }
            })
        },
        {
            scope: containerRef.current
        }
    )
}
