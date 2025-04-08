
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
			padding: {
				DEFAULT: '1rem',
				sm: '2rem',
				lg: '4rem',
				xl: '5rem',
				'2xl': '6rem',
			},
			screens: {
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
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
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-20px)' }
				},
				'pulse-gentle': {
					'0%, 100%': { opacity: 1 },
					'50%': { opacity: 0.7 }
				},
				'gradient-shift': {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' }
				},
				'scale-in-out': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.05)' }
				},
				'shimmer': {
					'100%': { transform: 'translateX(100%)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'pulse-gentle': 'pulse-gentle 3s ease-in-out infinite',
				'gradient-shift': 'gradient-shift 10s ease infinite',
				'scale-in-out': 'scale-in-out 8s ease-in-out infinite',
				'shimmer': 'shimmer 2s infinite'
			},
			fontSize: {
				'fluid-sm': 'clamp(0.875rem, 0.8rem + 0.25vw, 1rem)',
				'fluid-base': 'clamp(1rem, 0.95rem + 0.25vw, 1.125rem)',
				'fluid-lg': 'clamp(1.125rem, 1rem + 0.5vw, 1.25rem)',
				'fluid-xl': 'clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)',
				'fluid-2xl': 'clamp(1.5rem, 1.25rem + 1vw, 1.875rem)',
				'fluid-3xl': 'clamp(1.875rem, 1.5rem + 1.5vw, 2.25rem)',
				'fluid-4xl': 'clamp(2.25rem, 1.75rem + 2vw, 3rem)',
				'fluid-5xl': 'clamp(3rem, 2.5rem + 2.5vw, 4rem)',
			},
			spacing: {
				'fluid-1': 'clamp(0.25rem, 0.2rem + 0.25vw, 0.5rem)',
				'fluid-2': 'clamp(0.5rem, 0.4rem + 0.5vw, 0.75rem)',
				'fluid-4': 'clamp(1rem, 0.75rem + 1vw, 1.5rem)',
				'fluid-6': 'clamp(1.5rem, 1.25rem + 1.5vw, 2.25rem)',
				'fluid-8': 'clamp(2rem, 1.75rem + 1.75vw, 3rem)',
				'fluid-12': 'clamp(3rem, 2.5rem + 3vw, 4.5rem)',
				'fluid-16': 'clamp(4rem, 3.5rem + 4vw, 6rem)',
			},
			zIndex: {
				'60': '60',
				'70': '70',
				'80': '80',
				'90': '90',
				'100': '100',
			},
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		function({ addComponents, addUtilities }) {
			addComponents({
				'.glass-card': {
					'@apply backdrop-blur-lg bg-white/80 dark:bg-background/80 border border-white/20 dark:border-white/10 shadow-lg': {},
				},
				'.interactive-card': {
					'@apply transition-all duration-300 hover:shadow-xl hover:-translate-y-1': {},
				}
			});
			
			addUtilities({
				'.text-balance': {
					'text-wrap': 'balance',
				},
				'.text-pretty': {
					'text-wrap': 'pretty',
				},
				'.animate-shimmer': {
					'position': 'relative',
					'overflow': 'hidden',
					'&::after': {
						'content': '""',
						'position': 'absolute',
						'top': '0',
						'right': '-100%',
						'bottom': '0',
						'left': '0',
						'background': 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
						'animation': 'shimmer 2s infinite',
					}
				}
			});
		}
	],
} satisfies Config;
