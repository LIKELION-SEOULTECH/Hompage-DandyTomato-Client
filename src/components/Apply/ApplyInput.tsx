import React from 'react';

type ApplyInputProps = {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
    width?: string;
};

export default function ApplyInput({ label, name, value, onChange, placeholder, type = 'text', width }: ApplyInputProps) {
    return (
        <div style={{ width }}>
            <div className="text-[24px] font-bold mb-16 leading-36 tracking-[-0.72px]">{label}</div>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="bg-gray rounded-[15px] p-16 w-full focus:outline-none"
                placeholder={placeholder}
                style={{
                    color: 'var(--sub_seoultech_blue, #0B4066)',
                    fontFamily: 'Pretendard',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: '150%',
                    letterSpacing: '-0.48px',
                }}
            />
        </div>
    );
} 