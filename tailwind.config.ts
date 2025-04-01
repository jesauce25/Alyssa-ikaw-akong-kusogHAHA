import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				display: ['Playfair Display', 'serif'],
				birthday: ['Lobster', 'Pacifico', 'cursive'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				birthday: {
					pink: '#FFD6E0',
					blue: '#D6E5FF',
					gold: '#FFF2CC',
					peach: '#FFDFD3',
                    /* Added green theme colors */
                    green: '#E8F5E9',
                    mint: '#C8E6C9',
                    leaf: '#A5D6A7',
                    emerald: '#66BB6A',
                    teal: '#4DB6AC'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(10px)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'confetti-slow': {
					'0%': { transform: 'translate3d(0, 0, 0) rotateX(0) rotateY(0)' },
					'100%': { transform: 'translate3d(25px, 105vh, 0) rotateX(360deg) rotateY(180deg)' }
				},
				'confetti-medium': {
					'0%': { transform: 'translate3d(0, 0, 0) rotateX(0) rotateY(0)' },
					'100%': { transform: 'translate3d(100px, 105vh, 0) rotateX(100deg) rotateY(360deg)' }
				},
				'confetti-fast': {
					'0%': { transform: 'translate3d(0, 0, 0) rotateX(0) rotateY(0)' },
					'100%': { transform: 'translate3d(-50px, 105vh, 0) rotateX(10deg) rotateY(250deg)' }
				},
				'float': {
					'0%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' },
					'100%': { transform: 'translateY(0px)' }
				},
				'flicker': {
					'0%, 100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
					'25%': { opacity: '0.8', transform: 'translateY(-1px) scale(0.98)' },
					'50%': { opacity: '1', transform: 'translateY(0) scale(1.02)' },
					'75%': { opacity: '0.9', transform: 'translateY(1px) scale(0.99)' }
				},
				'button': {
					'0%': { transform: 'translateY(0)' },
					'100%': { transform: 'translateY(0)' }
				},
				'fadeIn': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'scale-in': 'scale-in 0.3s ease-out',
				'confetti-slow': 'confetti-slow 3.25s ease-in-out infinite',
				'confetti-medium': 'confetti-medium 2.75s ease-in-out infinite',
				'confetti-fast': 'confetti-fast 2.25s ease-in-out infinite',
				'float': 'float 3s ease-in-out infinite',
				'flicker': 'flicker 3s ease-in-out infinite',
				'button': 'button 0.3s ease-out',
				'fadeIn': 'fadeIn 0.5s ease-in'
			},
			dropShadow: {
				'glow': '0 0 8px rgba(255, 255, 255, 0.5)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

