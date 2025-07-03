import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function useHorizontalScroll(
    containerRef: React.RefObject<HTMLDivElement>,
    scrollRef: React.RefObject<HTMLDivElement> = containerRef
) {
    useGSAP(
        () => {
            const sections = gsap.utils.toArray('.main-section')
            const totalWidth =
                containerRef.current.scrollWidth - window.innerWidth
            gsap.to(scrollRef.current, {
                x: -totalWidth,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current || scrollRef.current,
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                    end: () => `+=${totalWidth}`
                }
            })
        },
        {
            scope: containerRef.current || scrollRef.current
        }
    )
}
