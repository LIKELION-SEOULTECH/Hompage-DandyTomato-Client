// components/StickerRain.jsx
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

import sticker01 from '@/assets/stickers/sticker01.png'
import sticker02 from '@/assets/stickers/sticker02.png'
import sticker03 from '@/assets/stickers/sticker03.png'
import sticker04 from '@/assets/stickers/sticker04.png'
import sticker05 from '@/assets/stickers/sticker05.png'
import sticker06 from '@/assets/stickers/sticker06.png'
import sticker07 from '@/assets/stickers/sticker07.png'
import sticker08 from '@/assets/stickers/sticker08.png'
import sticker09 from '@/assets/stickers/sticker09.png'
import sticker10 from '@/assets/stickers/sticker10.png'
import sticker11 from '@/assets/stickers/sticker11.png'
import sticker12 from '@/assets/stickers/sticker12.png'
import sticker13 from '@/assets/stickers/sticker13.png'
import sticker14 from '@/assets/stickers/sticker14.png'
import sticker15 from '@/assets/stickers/sticker15.png'
import sticker16 from '@/assets/stickers/sticker16.png'
import slogun from '@/assets/stickers/slogun.png'
import logo from '@/assets/stickers/logo.png'

const src = 'assets/stickers/'
// const stickers = [
//     {
//         id: 'sticker01',
//         src: sticker01,
//         x: 390.8223,
//         y: 127.2627,
//         rotation: -37
//     },
//     { id: 'sticker02', src: sticker02, x: 567.1758, y: 307.3525, rotation: 7 },
//     { id: 'sticker03', src: sticker03, x: 1320.1816, y: 256.3335, rotation: 9 },
//     {
//         id: 'sticker04',
//         src: sticker04,
//         x: 1483.7422,
//         y: 360.8877,
//         rotation: 28
//     },
//     { id: 'sticker05', src: sticker05, x: 201.5039, y: 300.1455, rotation: 7 },
//     {
//         id: 'sticker06',
//         src: sticker06,
//         x: 864.3848,
//         y: 263.3145,
//         rotation: -15
//     },
//     {
//         id: 'sticker07',
//         src: sticker07,
//         x: 1396.2012,
//         y: 344.8867,
//         rotation: -17.5
//     },
//     {
//         id: 'sticker08',
//         src: sticker08,
//         x: 1460.543,
//         y: 742.9629,
//         rotation: -9.65
//     },
//     { id: 'sticker09', src: sticker09, x: 279.4336, y: 422.5142, rotation: 13 },
//     { id: 'sticker10', src: sticker10, x: 835.9609, y: 531.9688, rotation: 8 },
//     { id: 'sticker11', src: sticker11, x: 1264.5117, y: 703.064, rotation: 50 },
//     { id: 'sticker12', src: sticker12, x: 708.1484, y: 595.1704, rotation: 8 },
//     {
//         id: 'sticker13',
//         src: sticker13,
//         x: 1199.7715,
//         y: 735.0923,
//         rotation: 17
//     },
//     { id: 'sticker14', src: sticker14, x: 162.0156, y: 425.7383, rotation: 18 },
//     {
//         id: 'sticker15',
//         src: sticker15,
//         x: 212.0645,
//         y: 669.5308,
//         rotation: -14
//     },
//     { id: 'sticker16', src: sticker16, x: 212.248, y: 779.48, rotation: 10 }
// ]
const stickers = [
    {
        id: 'sticker01',
        src: sticker01,
        x: '22.6%',
        y: '11.8%',
        rotation: 323
    },
    { id: 'sticker02', src: sticker02, x: '22.8%', y: '24.5%', rotation: 7 },
    { id: 'sticker03', src: sticker03, x: '76.4%', y: '23.7%', rotation: 9 },
    { id: 'sticker04', src: sticker04, x: '88.8%', y: '32.4%', rotation: 28 },
    { id: 'sticker05', src: sticker05, x: '11.7%', y: '27.8%', rotation: 7 },
    { id: 'sticker06', src: sticker06, x: '50.0%', y: '24.4%', rotation: 345 },
    {
        id: 'sticker07',
        src: sticker07,
        x: '80.8%',
        y: '31.9%',
        rotation: -17.5
    },
    {
        id: 'sticker08',
        src: sticker08,
        x: '84.5%',
        y: '68.8%',
        rotation: -9.65
    },
    { id: 'sticker09', src: sticker09, x: '16.2%', y: '29.1%', rotation: 13 },
    { id: 'sticker10', src: sticker10, x: '48.4%', y: '49.3%', rotation: 8 },
    { id: 'sticker11', src: sticker11, x: '73.2%', y: '65.1%', rotation: 50 },
    { id: 'sticker12', src: sticker12, x: '41.0%', y: '55.1%', rotation: 8 },
    { id: 'sticker13', src: sticker13, x: '69.4%', y: '68.1%', rotation: 17 },
    { id: 'sticker14', src: sticker14, x: '9.4%', y: '39.4%', rotation: 18 },
    { id: 'sticker15', src: sticker15, x: '12.3%', y: '72.0%', rotation: 344 },
    { id: 'sticker16', src: sticker16, x: '12.3%', y: '72.2%', rotation: 10 }
]

export default function StickerRain() {
    const containerRef = useRef(null)
    // 시안 1

    // useEffect(() => {
    //     const stickers1 = stickers.slice(0, stickers.length / 2)
    //     const stickers2 = stickers.slice(stickers.length / 2)

    //     stickers1.forEach(({ id, x, y }, index) => {
    //         const el = containerRef.current.querySelector(`#${id}`)

    //         gsap.set(el, {
    //             x: x + 500,
    //             y,
    //             opacity: 0
    //         })

    //         gsap.to(el, {
    //             x,
    //             opacity: 1,
    //             ease: 'back.out',
    //             duration: 0.7,
    //             delay: Math.random() * 0.4 + index * 0.05 // 랜덤 + 살짝 시간차
    //         })
    //     })

    //     stickers2.forEach(({ id, x, y }, index) => {
    //         const el = containerRef.current.querySelector(`#${id}`)

    //         gsap.set(el, {
    //             x,
    //             y: y - 500,
    //             opacity: 0
    //         })

    //         gsap.to(el, {
    //             y,
    //             opacity: 1,
    //             ease: 'back.out',
    //             duration: 0.7,
    //             delay: Math.random() * 0.4 + index * 0.05
    //         })
    //     })

    //     // 1. 오버레이 페이드인
    //     gsap.delayedCall(1.5, () => {
    //         gsap.to('#overlay', {
    //             opacity: 0.6,
    //             duration: 1,
    //             onComplete: () => {
    //                 // 2. 중앙 슬로건/로고 등장
    //                 gsap.to('#finalReveal', {
    //                     opacity: 1,
    //                     scale: 1,
    //                     duration: 1.2,
    //                     delay: 0.5,
    //                     ease: 'back.out'
    //                 })
    //             }
    //         })
    //     })
    // }, [])

    // 시안 2

    // useEffect(() => {
    //     const animations = []

    //     stickers.forEach(({ id, x, y, rotation }) => {
    //         const el = containerRef.current.querySelector(`#${id}`)

    //         const startX = `${Math.random() * 100}%`
    //         const startY = `${Math.random() * 100}%`

    //         gsap.set(el, {
    //             x: startX,
    //             y: startY,
    //             scale: 0,
    //             opacity: 0,
    //             rotate: rotation + Math.random() * 60 - 30
    //         })

    //         animations.push(
    //             gsap.to(el, {
    //                 x,
    //                 y,
    //                 scale: 1,
    //                 opacity: 1,
    //                 rotate: rotation,
    //                 ease: 'power2.out',
    //                 duration: 1,
    //                 delay: Math.random() * 0.5
    //             })
    //         )
    //     })

    //     gsap.delayedCall(2, () => {
    //         // 배경 어둡게
    //         gsap.to('#overlay', {
    //             backgroundColor: 'rgba(0,0,0,0.7)',
    //             opacity: 1,
    //             duration: 1.2
    //         })

    //         // 슬로건 + 로고 등장
    //         gsap.to('#finalReveal', {
    //             opacity: 1,
    //             scale: 1,
    //             duration: 1.4,
    //             ease: 'power3.out',
    //             delay: 1.5,
    //             onComplete: () => {
    //                 // 약간 흔들리는 느낌
    //                 gsap.to('#finalReveal', {
    //                     y: '-2px',
    //                     repeat: -1,
    //                     yoyo: true,
    //                     duration: 1,
    //                     ease: 'sine.inOut'
    //                 })
    //             }
    //         })
    //     })
    // }, [])

    // 시안3

    // const stickerGroups = {
    //     floatInLeft: ['sticker01', 'sticker03', 'sticker09', 'sticker14'],
    //     bounceFromBottom: ['sticker02', 'sticker06', 'sticker10', 'sticker15'],
    //     spinDropTop: [
    //         'sticker04',
    //         'sticker05',
    //         'sticker07',
    //         'sticker08',
    //         'sticker11',
    //         'sticker12',
    //         'sticker13',
    //         'sticker16'
    //     ]
    // }

    // useEffect(() => {
    //     const playGroup = (ids, effectFn) => {
    //         ids.forEach(id => {
    //             const el = containerRef.current.querySelector(`#${id}`)
    //             const sticker = stickers.find(s => s.id === id)
    //             if (el && sticker) effectFn(el, sticker)
    //         })
    //     }

    //     // Float-in from left
    //     playGroup(stickerGroups.floatInLeft, (el, { x, y, rotation }) => {
    //         gsap.set(el, { x: '-100%', y, opacity: 0, rotate: rotation })
    //         gsap.to(el, {
    //             x,
    //             opacity: 1,
    //             duration: 1.4,
    //             ease: 'power2.out',
    //             delay: Math.random() * 0.6
    //         })
    //     })

    //     // Bounce up from bottom
    //     playGroup(stickerGroups.bounceFromBottom, (el, { x, y, rotation }) => {
    //         gsap.set(el, { x, y: '120%', opacity: 0, rotate: rotation })
    //         gsap.to(el, {
    //             y,
    //             opacity: 1,
    //             duration: 1,
    //             ease: 'bounce.out',
    //             delay: Math.random() * 0.5
    //         })
    //     })

    //     // Spin + drop from top
    //     playGroup(stickerGroups.spinDropTop, (el, { x, y, rotation }) => {
    //         gsap.set(el, {
    //             x,
    //             y: '-150%',
    //             rotate: rotation + 360,
    //             opacity: 0
    //         })
    //         gsap.to(el, {
    //             y,
    //             rotate: rotation,
    //             opacity: 1,
    //             duration: 0.9,
    //             ease: 'back.out',
    //             delay: Math.random() * 0.4
    //         })
    //     })

    //     // 다음 단계 (overlay + 슬로건 등)는 이전 코드 그대로 사용
    //     gsap.delayedCall(2, () => {
    //         // 배경 어둡게
    //         gsap.to('#overlay', {
    //             backgroundColor: 'rgba(0,0,0,0.7)',
    //             opacity: 1,
    //             duration: 1.2
    //         })

    //         // 슬로건 + 로고 등장
    //         gsap.to('#finalReveal', {
    //             opacity: 1,
    //             scale: 1,
    //             duration: 1.4,
    //             ease: 'power3.out',
    //             delay: 1.5,
    //             onComplete: () => {
    //                 // 약간 흔들리는 느낌
    //                 gsap.to('#finalReveal', {
    //                     y: '-2px',
    //                     repeat: -1,
    //                     yoyo: true,
    //                     duration: 1,
    //                     ease: 'sine.inOut'
    //                 })
    //             }
    //         })
    //     })
    // }, [])

    // 시안 4
    // useEffect(() => {
    //     const centerX = '50%'
    //     const centerY = '50%'

    //     stickers.forEach(({ id, x, y, rotation }) => {
    //         const el = containerRef.current.querySelector(`#${id}`)

    //         gsap.set(el, {
    //             left: centerX,
    //             top: centerY,
    //             scale: 0.3,
    //             opacity: 0,
    //             rotate: 0
    //         })

    //         gsap.to(el, {
    //             left: x,
    //             top: y,
    //             scale: 1,
    //             rotate: rotation,
    //             opacity: 1,
    //             duration: 3,
    //             ease: 'expo.out',
    //             delay: Math.random() * 0.3
    //         })
    //     })

    //     // 다음 단계 (overlay + 슬로건 등)는 이전 코드 그대로 사용
    //     gsap.delayedCall(2, () => {
    //         // 배경 어둡게
    //         gsap.to('#overlay', {
    //             backgroundColor: 'rgba(0,0,0,0.7)',
    //             opacity: 1,
    //             duration: 1.2
    //         })

    //         // 슬로건 + 로고 등장
    //         gsap.to('#finalReveal', {
    //             opacity: 1,
    //             scale: 1,
    //             duration: 1.4,
    //             ease: 'power3.out',
    //             delay: 1.5,
    //             onComplete: () => {
    //                 // 약간 흔들리는 느낌
    //                 gsap.to('#finalReveal', {
    //                     y: '-2px',
    //                     repeat: -1,
    //                     yoyo: true,
    //                     duration: 1,
    //                     ease: 'sine.inOut'
    //                 })
    //             }
    //         })
    //     })
    // }, [])
    // 시안 5
    useEffect(() => {
        stickers.forEach(({ id, x, y, rotation }) => {
            const el = containerRef.current.querySelector(`#${id}`)

            // 초기 위치는 좀 더 멀리, 스케일은 10배
            gsap.set(el, {
                x: `${parseFloat(x) + (Math.random() - 0.5) * 50}%`,
                y: `${parseFloat(y) + (Math.random() - 0.5) * 50}%`,
                scale: 4,
                opacity: 0,
                rotate: rotation + (Math.random() * 60 - 30)
            })

            gsap.to(el, {
                x,
                y,
                scale: 1,
                opacity: 1,
                rotate: rotation,
                ease: 'bounce.out',
                duration: 1.1,
                delay: Math.random() * 0.5
            })
        })
        gsap.delayedCall(1.5, () => {
            gsap.to('#overlay', {
                opacity: 0.6,
                duration: 1,
                onComplete: () => {
                    // 2. 중앙 슬로건/로고 등장
                    gsap.to('#finalReveal', {
                        opacity: 1,
                        scale: 1,
                        duration: 1.2,
                        delay: 0.5,
                        ease: 'back.out'
                    })
                }
            })
        })
    }, [])

    return (
        <div>
            {/* 시안 1 */}
            <div
                id="overlay"
                className="pointer-events-none absolute inset-0 z-10 bg-white opacity-1 transition-opacity duration-1000"
            />
            <div className="absolute inset-0 z-20 flex h-full w-full items-center justify-center">
                <div
                    className="flex scale-95 flex-col items-center space-y-4 opacity-0"
                    id="finalReveal">
                    <img
                        src={logo}
                        id="logo"
                    />
                    <img
                        src={slogun}
                        id="slogun"
                    />
                </div>
            </div>
            {/* 시안2 */}
            {/* <div
                id="overlay"
                className="absolute inset-0 z-10 bg-black/0 opacity-0 backdrop-blur-md transition-opacity duration-1000"
            />

            <div className="absolute inset-0 z-20 flex items-center justify-center">
                <div
                    id="finalReveal"
                    className="flex scale-95 flex-col items-center space-y-4 opacity-0">
                    <img src={slogun} />
                    <img src={logo} />
                </div>
            </div> */}

            <div
                className="relative h-screen w-auto"
                ref={containerRef}>
                {stickers.map(({ id, src, x, y, rotation }) => (
                    <img
                        key={id}
                        id={id}
                        src={src}
                        className="absolute"
                        style={{
                            left: x,
                            top: y,
                            transform: `rotate(-${rotation}deg)`
                            // scale: 0.3
                        }}
                    />
                ))}
            </div>
        </div>
    )
}
