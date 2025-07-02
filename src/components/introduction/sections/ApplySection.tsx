import { useNavigate } from 'react-router-dom';
import InstaIcon from '@/assets/icons/insta_icon.svg';
import KakaoIcon from '@/assets/icons/kakao_icon.svg';
import ContactIcon from '@/assets/icons/contact_icon.svg';
import SubscribeButton from '@/components/recruit/SubscribeButton';
import AnimatedButton from '@/components/ui/AnimatedButton';

export default function ApplySection() {
    const navigate = useNavigate();
    return (
        <div className="relative w-1610 flex items-start justify-between bg-white overflow-hidden">
            {/* 왼쪽 컨텐츠 */}
            <div className="flex flex-col items-start mt-[17.5vh] mb-[11vh] ml-15">
                <h2 className="text-[64px] font-bold text-white bg-sub_seoultech_red w-fit leading-76 tracking-[-1.92px] font-pretendard mb-78">
                    지원하기
                </h2>

                <AnimatedButton text="지원서 작성하기" color="#0B4066" onClick={() => navigate('/apply')} />

                <div className="mt-[10.6vh]">
                    <SubscribeButton />
                </div>

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