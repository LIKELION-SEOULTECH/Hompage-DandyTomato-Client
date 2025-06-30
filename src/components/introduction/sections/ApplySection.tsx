import { useNavigate } from 'react-router-dom';
import InstaIcon from '@/assets/icons/insta_icon.svg';
import KakaoIcon from '@/assets/icons/kakao_icon.svg';
import ContactIcon from '@/assets/icons/contact_icon.svg';

export default function ApplySection() {
    const navigate = useNavigate();
    return (
        <div className="relative w-1610 flex items-start justify-between bg-white overflow-hidden">
            {/* 왼쪽 컨텐츠 */}
            <div className="flex flex-col items-start mt-[17.5vh] mb-[11vh]">
                <h2 className="text-[64px] font-bold text-white bg-sub_seoultech_red w-fit leading-76 tracking-[-1.92px] font-pretendard">
                    지원하기
                </h2>

                <button className="flex items-center gap-2 text-sub_seoultech_blue font-bold text-[20px] mt-[7.5vh]"
                    onClick={() => navigate('/apply')}
                >
                    지원서 작성하기
                    <svg
                        className="w-5 h-5 text-sub_seoultech_blue"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10.293 15.707a1 1 0 010-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>

                <button className="inline-flex justify-center items-center gap-[10px] px-[16px] py-[8px] rounded-[50px] border-2 border-sub_seoultech_red bg-sub_seoultech_red text-[#F5F4F2] font-pretendard text-[20px] font-bold leading-[30px] tracking-[-0.6px] mt-[10.6vh]">
                    모집 알림 받기
                </button>

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