import React, { useRef, useLayoutEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface AnimatedButtonProps {
    text: string;
    color: string; // 배경색 (hex, tailwind, etc)
    onClick?: () => void;
}

export default function AnimatedButton({ text, color, onClick }: AnimatedButtonProps) {
    const [hovered, setHovered] = useState(false);
    const controls = useAnimation();
    const textRef = useRef<HTMLSpanElement>(null);
    const [textWidth, setTextWidth] = useState(0);

    // 텍스트 width 측정
    useLayoutEffect(() => {
        if (textRef.current) {
            setTextWidth(textRef.current.offsetWidth);
        }
    }, [text]);

    // pill width: 원(44px) → 텍스트+원+padding(32px)
    const arrowWidth = 44; // 원(화살표) 크기
    const pillRest = 44;
    const pillHover = textWidth + arrowWidth + 32 - 23;
    const pillOvershoot = pillHover + 16;
    const pillUndershoot = pillRest - 14;

    React.useEffect(() => {
        if (hovered) {
            controls.start({
                width: pillOvershoot,
                height: 44,
                transition: { type: 'spring', stiffness: 350, damping: 15, mass: 0.1 }
            }).then(() => {
                controls.start({
                    width: pillHover,
                    height: 44,
                    transition: { type: 'spring', stiffness: 420, damping: 15, mass: 0.1 }
                });
            });
        } else {
            controls.start({
                width: pillUndershoot,
                height: 44,
                transition: { type: 'spring', stiffness: 400, damping: 15, mass: 0.05 }
            }).then(() => {
                controls.start({
                    width: pillRest,
                    height: 44,
                    transition: { type: 'spring', stiffness: 300, damping: 15 }
                });
            });
        }
    }, [hovered, controls, pillHover, pillOvershoot, pillUndershoot]);

    return (
        <button
            type="button"
            onClick={onClick}
            className="relative flex items-center font-bold text-[24px] leading-[36px] tracking-[-0.72px] px-0 py-0 bg-transparent border-none outline-none cursor-pointer"
            style={{ color: hovered ? '#fff' : color, transition: 'color 0.2s' }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* pill 배경 */}
            <motion.span
                animate={controls}
                initial={{ width: pillRest, height: 44 }}
                className="absolute right-0 top-1/2 -translate-y-1/2"
                style={{
                    borderRadius: 9999,
                    background: color,
                    marginRight: 16,
                    boxShadow: hovered ? '0 2px 8px rgba(0,0,0,0.08)' : undefined,
                    transition: 'background 0.2s',
                }}
            />
            {/* 텍스트와 원+화살표 */}
            <span className="flex items-center relative z-16" style={{ padding: '0 16px 0 0' }}>
                <span
                    ref={textRef}
                    className="transition-colors duration-200"
                    style={{
                        color: hovered ? '#fff' : color,
                        marginRight: 12,
                        transition: 'color 0.2s, transform 0.3s cubic-bezier(0.4,0,0.2,1)',
                        transform: hovered ? 'translateX(10px)' : 'translateX(0)'
                    }}
                >
                    {text}
                </span>
                <span className="flex items-center justify-center" style={{ width: arrowWidth, height: arrowWidth }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                        <path d="M10.6465 20.8535L8.66895 18.876L15.708 11.8359H0.396484V9.03906H15.583L8.66895 2.12402L10.6465 0.146484L21 10.5L10.6465 20.8535Z" fill="#F5F4F2" />
                    </svg>
                </span>
            </span>
        </button>
    );
}

// 반대 버튼 컴포넌트
export function ReverseAnimatedButton({ text, color, onClick }: AnimatedButtonProps) {
    const [hovered, setHovered] = useState(false);
    const controls = useAnimation();
    const textRef = useRef<HTMLSpanElement>(null);
    const [textWidth, setTextWidth] = useState(0);

    // 텍스트 width 측정
    useLayoutEffect(() => {
        if (textRef.current) {
            setTextWidth(textRef.current.offsetWidth);
        }
    }, [text]);

    // pill width: 원(44px) → 텍스트+원+padding(32px)
    const arrowWidth = 44; // 원(화살표) 크기
    const pillRest = 44;
    const pillHover = textWidth + arrowWidth + 32 - 23;
    const pillOvershoot = pillHover + 16;
    const pillUndershoot = pillRest - 14;

    React.useEffect(() => {
        if (hovered) {
            controls.start({
                width: pillOvershoot,
                height: 44,
                transition: { type: 'spring', stiffness: 350, damping: 15, mass: 0.1 }
            }).then(() => {
                controls.start({
                    width: pillHover,
                    height: 44,
                    transition: { type: 'spring', stiffness: 420, damping: 15, mass: 0.1 }
                });
            });
        } else {
            controls.start({
                width: pillUndershoot,
                height: 44,
                transition: { type: 'spring', stiffness: 400, damping: 15, mass: 0.05 }
            }).then(() => {
                controls.start({
                    width: pillRest,
                    height: 44,
                    transition: { type: 'spring', stiffness: 300, damping: 15 }
                });
            });
        }
    }, [hovered, controls, pillHover, pillOvershoot, pillUndershoot]);

    return (
        <button
            type="button"
            onClick={onClick}
            className="relative flex items-center font-bold text-[24px] leading-[36px] tracking-[-0.72px] px-0 py-0 bg-transparent border-none outline-none cursor-pointer"
            style={{ color: hovered ? '#fff' : color, transition: 'color 0.2s' }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* pill 배경 - 왼쪽에서 시작 */}
            <motion.span
                animate={controls}
                initial={{ width: pillRest, height: 44 }}
                className="absolute left-0 top-1/2 -translate-y-1/2"
                style={{
                    borderRadius: 9999,
                    background: color,
                    marginLeft: 16,
                    boxShadow: hovered ? '0 2px 8px rgba(0,0,0,0.08)' : undefined,
                    transition: 'background 0.2s',
                }}
            />
            {/* 화살표와 텍스트 - 순서 반전 */}
            <span className="flex items-center relative z-16" style={{ padding: '0 0 0 16px' }}>
                <span className="flex items-center justify-center" style={{ width: arrowWidth, height: arrowWidth }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                        <path d="M10.3535 0.146484L12.3311 2.12402L5.292 9.16406H20.6035V11.9609H5.417L12.3311 18.876L10.3535 20.8535L0 10.5L10.3535 0.146484Z" fill="#F5F4F2" />
                    </svg>
                </span>
                <span
                    ref={textRef}
                    className="transition-colors duration-200"
                    style={{
                        color: hovered ? '#fff' : color,
                        marginLeft: 12,
                        transition: 'color 0.2s, transform 0.3s cubic-bezier(0.4,0,0.2,1)',
                        transform: hovered ? 'translateX(-10px)' : 'translateX(0)'
                    }}
                >
                    {text}
                </span>
            </span>
        </button>
    );
} 