// import { describe, it, expect } from 'vitest'
// import { render, screen, fireEvent } from '@testing-library/react'
// import {
//     Accordion,
//     AccordionItem,
//     AccordionTrigger,
//     AccordionContent
// } from '@/components/ui/accordion'
// import '@testing-library/jest-dom'

// describe('Figma 명세 기반 Accordion', () => {
//     const items = [
//         {
//             title: '아코디언 제목 1',
//             content: '아코디언 내용 1'
//         },
//         {
//             title: '아코디언 제목 2',
//             content: '아코디언 내용 2'
//         }
//     ]

//     function setup() {
//         render(
//             <Accordion
//                 type="single"
//                 collapsible>
//                 {items.map((item, idx) => (
//                     <AccordionItem
//                         value={String(idx)}
//                         key={item.title}>
//                         <AccordionTrigger>{item.title}</AccordionTrigger>
//                         <AccordionContent>{item.content}</AccordionContent>
//                     </AccordionItem>
//                 ))}
//             </Accordion>
//         )
//     }

//     it('타이틀, 본문, 아이콘이 렌더링된다', () => {
//         setup()
//         items.forEach(item => {
//             expect(screen.getByText(item.title)).toBeInTheDocument()
//             // 본문은 기본적으로 닫혀있음
//             expect(screen.queryByText(item.content)).not.toBeVisible()
//         })
//         // Chevron 아이콘 존재
//         expect(
//             screen.getAllByRole('img', { hidden: true }).length
//         ).toBeGreaterThan(0)
//     })

//     it('타이틀 클릭 시 본문이 열리고, 다시 클릭하면 닫힌다', () => {
//         setup()
//         const trigger = screen.getByText(items[0].title)
//         fireEvent.click(trigger)
//         expect(screen.getByText(items[0].content)).toBeVisible()
//         fireEvent.click(trigger)
//         expect(screen.getByText(items[0].content)).not.toBeVisible()
//     })

//     it('여러 개 중 하나만 열릴 수 있다', () => {
//         setup()
//         const [trigger1, trigger2] = items.map(item =>
//             screen.getByText(item.title)
//         )
//         fireEvent.click(trigger1)
//         expect(screen.getByText(items[0].content)).toBeVisible()
//         fireEvent.click(trigger2)
//         expect(screen.getByText(items[1].content)).toBeVisible()
//         expect(screen.getByText(items[0].content)).not.toBeVisible()
//     })

//     it('타이틀/본문 스타일이 Figma 명세와 일치한다', () => {
//         setup()
//         const trigger = screen.getByText(items[0].title)
//         const content = screen.getByText(items[0].content)
//         // Pretendard, 18px, 700, #222
//         expect(trigger).toHaveStyle({
//             fontFamily: expect.stringContaining('Pretendard'),
//             fontSize: '18px',
//             fontWeight: '700',
//             color: '#222'
//         })
//         // 본문: Pretendard, 16px, 400, #666
//         expect(content).toHaveStyle({
//             fontFamily: expect.stringContaining('Pretendard'),
//             fontSize: '16px',
//             fontWeight: '400',
//             color: '#666'
//         })
//     })

//     it('배경, 테두리, 여백 스타일이 명세와 일치한다', () => {
//         setup()
//         const item = screen
//             .getByText(items[0].title)
//             .closest('[data-slot="accordion-item"]')
//         expect(item).toHaveStyle({
//             backgroundColor: '#F8F8F8',
//             borderBottom: '1px solid #E5E5E5',
//             padding: '24px'
//         })
//         const content = screen.getByText(items[0].content)
//         expect(content.parentElement).toHaveStyle({ padding: '20px 0 20px 0' })
//     })

//     it('Chevron 아이콘이 열릴 때 회전한다', () => {
//         setup()
//         const trigger = screen.getByText(items[0].title)
//         const icon = trigger.querySelector('svg')
//         expect(icon).toHaveStyle({ transform: 'rotate(0deg)' })
//         fireEvent.click(trigger)
//         expect(icon).toHaveStyle({ transform: 'rotate(180deg)' })
//     })

//     it('키보드(Enter/Space)로 토글 가능', () => {
//         setup()
//         const trigger = screen.getByText(items[0].title)
//         trigger.focus()
//         fireEvent.keyDown(trigger, { key: 'Enter' })
//         expect(screen.getByText(items[0].content)).toBeVisible()
//         fireEvent.keyDown(trigger, { key: ' ' })
//         expect(screen.getByText(items[0].content)).not.toBeVisible()
//     })

//     it('접근성: aria 속성이 올바르게 적용된다', () => {
//         setup()
//         const trigger = screen.getByText(items[0].title)
//         expect(trigger).toHaveAttribute('aria-expanded')
//         expect(trigger).toHaveAttribute('aria-controls')
//     })
// })
