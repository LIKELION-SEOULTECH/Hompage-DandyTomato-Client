import { useAuthZustandStore } from '@/stores/auth'
import { postRecruitSubscribe } from '@/api/recruit'
import { useNavigate } from 'react-router-dom'
import React from 'react'

export default function SubscribeButton() {
    const { accessToken, email } = useAuthZustandStore()
    const navigate = useNavigate()

    const isLoggedIn = !!accessToken && !!email

    const handleSubscribe = async () => {
        if (!isLoggedIn) {
            navigate('/login')
            return
        }
        try {
            const res = await postRecruitSubscribe(email, accessToken)
        } catch (e) {
            console.log('구독 요청에 실패했습니다.')
        }
    }

    return (
        <button onClick={handleSubscribe} className="bg-sub_seoultech_red text-white font-bold rounded-full px-16 py-8 text-20 leading-[30px] tracking-[-0.6px]">
            모집 알림 받기
        </button>
    )
} 