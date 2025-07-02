import { useNavigate } from 'react-router-dom';
import InstaIcon from '@/assets/icons/insta_icon.svg';
import KakaoIcon from '@/assets/icons/kakao_icon.svg';
import ContactIcon from '@/assets/icons/contact_icon.svg';
import SharedButton from '@/components/SharedButton';
import AnimatedButton from '@/components/ui/AnimatedButton';
import HighlightenTitle from '@/components/HighlightenTitle';
import { useAuthZustandStore } from '@/stores/auth';
import { postRecruitSubscribe } from '@/api/recruit';

export default function ApplySection() {
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
        <div className="relative w-1610 flex items-start justify-between overflow-hidden">
            {/* 왼쪽 컨텐츠 */}
            <div className="flex flex-col items-start mt-[17.5vh] mb-[11vh] ml-15">
                <HighlightenTitle text="지원하기" className='mb-78' />

                <AnimatedButton text="지원서 작성하기" color="#0B4066" onClick={() => navigate('/apply')} />

                <SharedButton onClick={handleSubscribe} className='px-16 py-8 rounded-50 mt-115'>
                    모집 알림 받기
                </SharedButton>

                <div className="absolute bottom-[11vh] left-0 flex gap-24 flex-wrap">
                    <div className="flex items-center gap-10 bg-[#E4E5E9] p-24 rounded-15 font-pretendard text-[#032B49] font-bold tracking-[-0.6px] text-sub_seoultech_blue">
                        <img src={InstaIcon} alt="인스타그램" className="w-20 h-20" /> @likelion_st
                    </div>
                    <div className="flex items-center gap-10 bg-[#E4E5E9] p-24 rounded-15 font-pretendard text-[#032B49] font-bold tracking-[-0.6px] text-sub_seoultech_blue">
                        <img src={KakaoIcon} alt="카카오톡" className="w-20 h-20" /> @ajh1215hoo
                    </div>
                    <div className="flex items-center gap-10 bg-[#E4E5E9] px-24 rounded-15 font-pretendard text-[#032B49] font-bold tracking-[-0.6px] text-sub_seoultech_blue">
                        <img src={ContactIcon} alt="이메일" className="w-20 h-20" /> seoultech.likelion@gmail.com
                    </div>
                </div>
            </div>

            {/* 오른쪽 배경 이미지 */}
            <div className="absolute right-0 top-0 w-1/2 h-full">
                <img
                    src="/assets/introduction/ApplySectionImg.png"
                    alt="지원 섹션 이미지"
                    className="w-full h-full object-cover object-center opacity-80"
                />
            </div>
        </div>
    )
}
