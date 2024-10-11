/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    safelist: [
        'text-playerRed',
        'text-playerGreen',
        'text-playerBlue',
        'text-playerPink',
        'text-playerYellow',
        'text-playerTeal',
        'border-b-playerRed',
        'border-b-playerBlue',
        'border-b-playerGreen',
        'border-b-playerPink',
        'border-b-playerYellow',
        'border-b-playerTeal',
        'bg-playerRed',
        'bg-playerBlue',
        'bg-playerGreen',
        'bg-playerPink',
        'bg-playerYellow',
        'bg-playerTeal',
    ],
    theme: {
        extend: {
            colors: {
                playerRed: 'var(--player-red)',
                playerBlue: 'var(--player-blue)',
                playerGreen: 'var(--player-green)',
                playerPink: 'var(--player-pink)',
                playerYellow: 'var(--player-yellow)',
                playerTeal: 'var(--player-teal)',
            },
        }

    },
    plugins: [],
}

