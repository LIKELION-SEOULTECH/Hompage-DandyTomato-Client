module.exports = {
    presets: [require('tailwindcss-preset-px-to-rem')],
    theme: {
      extend: {
        colors: {
          background: '#202225',
          sub_seoultech_red: '#E74C2E',
          sub_seoultech_blue: '#0B4066',
          primary_seoultech_gold: '#E2CC9D',
          white: '#F5F4F2',
          black: '#0A0E11',
          gray: '#E4E5E9',
          gray_disabled: '#B8B8B8',
        },
        fontFamily: {
          pretendard: ['Pretendard'],
        },
      },
    },
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    plugins: [],
  }