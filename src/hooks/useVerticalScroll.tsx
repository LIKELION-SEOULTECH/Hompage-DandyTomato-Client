import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function useVerticalScroll(
    containerRef: React.RefObject<HTMLDivElement>,
    scrollRef: React.RefObject<HTMLDivElement> = containerRef,
    dependencies: any[] = []
) {
    useGSAP(
        () => {
            const totalHeight = containerRef.current?.scrollHeight - window.innerHeight
            if (!totalHeight) return
            gsap.to(scrollRef.current, {
                y: -totalHeight,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current || scrollRef.current,
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                    end: () => `+=${totalHeight}`
                }
            })
        },
        {
            scope: containerRef.current || scrollRef.current,
            dependencies
        }
    )
}
