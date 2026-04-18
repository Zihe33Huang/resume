/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        slateNight: '#060816',
        azure: '#00d2ff',
        mint: '#23f5c5',
        coral: '#ff7e67',
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 24px 60px rgba(4, 8, 24, 0.35)',
      },
      backgroundImage: {
        'mesh-gradient':
          'radial-gradient(circle at 15% 20%, rgba(0,210,255,0.24), transparent 30%), radial-gradient(circle at 80% 0%, rgba(255,126,103,0.22), transparent 38%), radial-gradient(circle at 50% 100%, rgba(35,245,197,0.14), transparent 35%)',
      },
    },
  },
  plugins: [],
}
