import preset from 'tailwindcss-preset-px-to-rem'
import pxToVhSpacing from './src/lib/px-to-vh-spacing'

export default {
    presets: [preset],
    plugins: [pxToVhSpacing]
}
