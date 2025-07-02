import React from 'react';

interface PortfolioLinksSectionProps {
    links: string[];
    onChange: (idx: number, value: string) => void;
}

export default function PortfolioLinksSection({ links, onChange }: PortfolioLinksSectionProps) {
    return (
        <div className="w-full max-w-2xl h-full flex flex-col">
            <div className="mb-24 flex items-center gap-3">
                <span className="border-2 border-primary_seoultech_gold text-primary_seoultech_gold rounded-50 px-14 py-6 text-lg font-bold leading-30 tracking-[-0.6px] text-16">
                    포트폴리오 링크
                </span>
            </div>
            <div className="mb-auto min-h-[108px]">
                <p className="text-black font-pretendard text-[24px] font-bold leading-[36px] tracking-[-0.72px]">포트폴리오가 있다면 첨부해주세요.</p>
                <span className="text-[#B8B8B8] font-pretendard text-[24px] font-bold leading-[36px] tracking-[-0.72px]">*선택항목</span>
            </div>
            <div className="flex flex-col justify-between h-full flex-1">
                {[0, 1, 2].map((idx) => (
                    <div key={idx}>
                        <div className="font-bold text-[24px] mb-16 leading-[36px] tracking-[-0.72px]">LINK {idx + 1}</div>
                        <div className="bg-gray rounded-15 p-16">
                            <input
                                type="url"
                                className="w-full bg-transparent outline-none text-sub_seoultech_blue text-[16px] font-normal leading-[24px] tracking-[-0.48px]"
                                value={links[idx] || ''}
                                onChange={e => onChange(idx, e.target.value)}
                                placeholder="https://"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 