import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function useHorizontalScroll(
    containerRef: React.RefObject<HTMLDivElement>
) {
    useGSAP(
        () => {
            const sections = gsap.utils.toArray('.main-section')
            const totalWidth =
                containerRef.current.scrollWidth - window.innerWidth / 2
            gsap.to(containerRef.current, {
                x: -totalWidth,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                    end: () => `+=${totalWidth}`
                }
            })
        },
        {
            scope: containerRef.current
        }
    )
}
