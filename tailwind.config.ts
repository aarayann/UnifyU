
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
			fontFamily: {
				playfair: ['Playfair Display', 'serif'],
				montserrat: ['Montserrat', 'sans-serif'],
			},
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
				},
				'rotate-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'bounce-subtle': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'fade-in-up': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in-down': {
					'0%': { opacity: '0', transform: 'translateY(-20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in-left': {
					'0%': { opacity: '0', transform: 'translateX(-20px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'fade-in-right': {
					'0%': { opacity: '0', transform: 'translateX(20px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'reveal-width': {
					'0%': { width: '0%', opacity: '0' },
					'100%': { width: '100%', opacity: '1' }
				},
				'wave': {
					'0%, 100%': { transform: 'rotate(0deg)' },
					'20%': { transform: 'rotate(20deg)' },
					'40%': { transform: 'rotate(-10deg)' },
					'60%': { transform: 'rotate(10deg)' },
					'80%': { transform: 'rotate(-10deg)' }
				},
				'float-slow': {
					'0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
					'50%': { transform: 'translateY(-20px) rotate(2deg)' }
				},
				'float-medium': {
					'0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
					'50%': { transform: 'translateY(-15px) rotate(1deg)' }
				},
				'float-fast': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse-soft': {
					'0%, 100%': { transform: 'scale(1)', opacity: '1' },
					'50%': { transform: 'scale(1.03)', opacity: '0.9' }
				},
				'glimmer': {
					'0%': { transform: 'translateX(-100%)' },
					'60%, 100%': { transform: 'translateX(100%)' }
				},
				'shimmer-soft': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'btn-ripple': {
					'0%': { transform: 'scale(1)', opacity: '1' },
					'50%': { transform: 'scale(1.1)', opacity: '0.5' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'card-glow': {
					'0%': { boxShadow: '0 5px 15px rgba(36, 72, 85, 0)' },
					'50%': { boxShadow: '0 5px 25px rgba(36, 72, 85, 0.3)' },
					'100%': { boxShadow: '0 5px 15px rgba(36, 72, 85, 0)' }
				},
				'icon-pulse': {
					'0%, 100%': { transform: 'scale(1)', opacity: '1' },
					'50%': { transform: 'scale(1.2)', opacity: '0.8' }
				},
				'glass-shimmer': {
					'0%': { backgroundPosition: '0% 50%', backdropFilter: 'blur(5px)' },
					'50%': { backgroundPosition: '100% 50%', backdropFilter: 'blur(8px)' },
					'100%': { backgroundPosition: '0% 50%', backdropFilter: 'blur(5px)' }
				},
				'glass-morphism-animate': {
					'0%': { backdropFilter: 'blur(5px)', backgroundColor: 'rgba(255, 255, 255, 0.1)' },
					'50%': { backdropFilter: 'blur(8px)', backgroundColor: 'rgba(255, 255, 255, 0.2)' },
					'100%': { backdropFilter: 'blur(5px)', backgroundColor: 'rgba(255, 255, 255, 0.1)' }
				},
				'magnetic-pulse': {
					'0%, 100%': { transform: 'translateY(0) scale(1)' },
					'50%': { transform: 'translateY(-5px) scale(1.02)' }
				},
				'pulse-ring': {
					'0%': { boxShadow: '0 0 0 0 rgba(36, 72, 85, 0.4)' },
					'70%': { boxShadow: '0 0 0 10px rgba(36, 72, 85, 0)' },
					'100%': { boxShadow: '0 0 0 0 rgba(36, 72, 85, 0)' }
				},
				'btn-pulse': {
					'0%': { boxShadow: '0 0 0 0 rgba(230, 72, 51, 0.4)' },
					'70%': { boxShadow: '0 0 0 10px rgba(230, 72, 51, 0)' },
					'100%': { boxShadow: '0 0 0 0 rgba(230, 72, 51, 0)' }
				},
				'flip-in': {
					'0%': { transform: 'perspective(400px) rotateX(90deg)', opacity: '0' },
					'40%': { transform: 'perspective(400px) rotateX(-10deg)' },
					'70%': { transform: 'perspective(400px) rotateX(10deg)' },
					'100%': { transform: 'perspective(400px) rotateX(0deg)', opacity: '1' }
				},
				'flip-out': {
					'0%': { transform: 'perspective(400px) rotateX(0deg)', opacity: '1' },
					'30%': { transform: 'perspective(400px) rotateX(-10deg)' },
					'60%': { transform: 'perspective(400px) rotateX(10deg)' },
					'100%': { transform: 'perspective(400px) rotateX(90deg)', opacity: '0' }
				},
				'tilt': {
					'0%, 50%, 100%': { transform: 'rotate(0deg)' },
					'25%': { transform: 'rotate(2deg)' },
					'75%': { transform: 'rotate(-2deg)' }
				},
				'color-cycle': {
					'0%, 100%': { filter: 'hue-rotate(0deg)' },
					'50%': { filter: 'hue-rotate(30deg)' }
				},
				'focus-pulse': {
					'0%': { boxShadow: '0 0 0 0 rgba(36, 72, 85, 0.4)' },
					'70%': { boxShadow: '0 0 0 10px rgba(36, 72, 85, 0)' },
					'100%': { boxShadow: '0 0 0 0 rgba(36, 72, 85, 0)' }
				},
				'background-shine': {
					'from': { backgroundPosition: '200% 0' },
					'to': { backgroundPosition: '-200% 0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'pulse-gentle': 'pulse-gentle 3s ease-in-out infinite',
				'gradient-shift': 'gradient-shift 10s ease infinite',
				'scale-in-out': 'scale-in-out 8s ease-in-out infinite',
				'shimmer': 'shimmer 2s infinite',
				'rotate-slow': 'rotate-slow 15s linear infinite',
				'bounce-subtle': 'bounce-subtle 3s ease-in-out infinite',
				'fade-in-up': 'fade-in-up 0.6s ease-out',
				'fade-in-down': 'fade-in-down 0.6s ease-out',
				'fade-in-left': 'fade-in-left 0.6s ease-out',
				'fade-in-right': 'fade-in-right 0.6s ease-out',
				'reveal-width': 'reveal-width 0.8s ease-out',
				'wave': 'wave 2s ease-in-out',
				'float-slow': 'float-slow 8s ease-in-out infinite',
				'float-medium': 'float-medium 6s ease-in-out infinite',
				'float-fast': 'float-fast 4s ease-in-out infinite',
				'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
				'glimmer': 'glimmer 3s infinite',
				'shimmer-soft': 'shimmer-soft 2s infinite',
				'btn-ripple': 'btn-ripple 2s infinite',
				'card-glow': 'card-glow 8s infinite alternate',
				'icon-pulse': 'icon-pulse 3s ease-in-out infinite',
				'glass-shimmer': 'glass-shimmer 6s infinite',
				'glass-morphism-animate': 'glass-morphism-animate 10s ease-in-out infinite alternate',
				'magnetic-pulse': 'magnetic-pulse 8s ease-in-out infinite',
				'pulse-ring': 'pulse-ring 1.5s infinite',
				'btn-pulse': 'btn-pulse 3s infinite',
				'flip-in': 'flip-in 0.8s ease-out',
				'flip-out': 'flip-out 0.8s ease-in',
				'tilt': 'tilt 10s ease-in-out infinite',
				'color-cycle': 'color-cycle 8s infinite',
				'focus-pulse': 'focus-pulse 2s infinite',
				'background-shine': 'background-shine 3s linear infinite'
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
			boxShadow: {
				'soft': '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
				'elegant': '0 20px 30px -10px rgba(36, 72, 85, 0.15)',
				'button': '0 8px 20px rgba(36, 72, 85, 0.2)',
				'glow-teal': '0 0 15px rgba(36, 72, 85, 0.5)',
				'glow-orange': '0 0 15px rgba(230, 72, 51, 0.5)',
				'3d': '0 20px 30px -10px rgba(36, 72, 85, 0.2), 0 10px 10px -5px rgba(36, 72, 85, 0.1)',
				'inner-glow': 'inset 0 0 20px rgba(36, 72, 85, 0.2)',
				'highlight': '0 0 0 2px rgba(36, 72, 85, 0.3)',
				'focus': '0 0 0 3px rgba(36, 72, 85, 0.5), 0 0 0 5px rgba(36, 72, 85, 0.1)'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'shine': 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)'
			}
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
				},
				'.premium-card': {
					'@apply bg-white dark:bg-card rounded-lg shadow-elegant border border-border overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1': {},
				},
				'.resource-hover-box': {
					'@apply absolute bottom-full lg:bottom-auto lg:left-full transform lg:translate-x-2 translate-y-2 z-50 bg-white dark:bg-card shadow-xl rounded-lg p-4 border border-border': {},
					'width': 'max-content',
					'min-width': '280px',
					'max-width': 'calc(100vw - 40px)',
					'pointer-events': 'none',
					'visibility': 'hidden',
					'opacity': '0',
					'transition': 'all 0.3s ease',
				},
				'.responsive-container': {
					'@apply w-full px-4 sm:px-6 md:px-8 mx-auto': {},
					'max-width': '1400px',
				},
				'.responsive-padding': {
					'@apply px-4 sm:px-6 md:px-8': {},
				},
				'.responsive-grid': {
					'@apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6': {},
				},
				'.responsive-stack': {
					'@apply flex flex-col md:flex-row': {},
				},
				'.shine-button': {
					position: 'relative',
					overflow: 'hidden',
					'&::before': {
						content: '""',
						position: 'absolute',
						width: '200%',
						height: '100%',
						background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
						transform: 'translateX(-100%)',
					},
					'&:hover::before': {
						animation: 'background-shine 1.5s',
					},
				},
				'.gradient-button': {
					background: 'linear-gradient(90deg, var(--primary-color) 0%, var(--secondary-color) 100%)',
					'background-size': '200% auto',
					transition: 'background-position 0.5s ease',
					'&:hover': {
						'background-position': 'right center',
					},
				},
				'.card-3d': {
					transformStyle: 'preserve-3d',
					perspective: '1000px',
					transition: 'transform 0.5s',
				},
				'.floating-element': {
					animation: 'float 6s ease-in-out infinite',
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
				},
				'.hide-scrollbar': {
					'-ms-overflow-style': 'none',
					'scrollbar-width': 'none',
					'&::-webkit-scrollbar': {
						'display': 'none',
					}
				},
				'.border-animation': {
					'position': 'relative',
					'&::after': {
						'content': '""',
						'position': 'absolute',
						'left': '0',
						'right': '0',
						'bottom': '0',
						'height': '2px',
						'background': 'linear-gradient(to right, transparent, hsl(var(--secondary)), transparent)',
						'transform-origin': 'center',
						'transform': 'scaleX(0)',
						'transition': 'transform 0.5s ease-out',
					},
					'&:hover::after': {
						'transform': 'scaleX(1)',
					}
				},
				'.text-shadow-sm': {
					'text-shadow': '0 1px 2px rgba(0, 0, 0, 0.1)'
				},
				'.text-shadow-md': {
					'text-shadow': '0 2px 4px rgba(0, 0, 0, 0.15)'
				},
				'.text-shadow-lg': {
					'text-shadow': '0 4px 8px rgba(0, 0, 0, 0.2)'
				},
				'.text-glow': {
					'text-shadow': '0 0 10px rgba(230, 72, 51, 0.5), 0 0 20px rgba(230, 72, 51, 0.3)'
				},
				'.text-glow-teal': {
					'text-shadow': '0 0 10px rgba(36, 72, 85, 0.5), 0 0 20px rgba(36, 72, 85, 0.3)'
				},
				'.underline-animation': {
					'position': 'relative',
					'&::after': {
						'content': '""',
						'position': 'absolute',
						'left': '0',
						'right': '0',
						'bottom': '-2px',
						'height': '2px',
						'background-color': 'currentColor',
						'transform': 'scaleX(0)',
						'transition': 'transform 0.3s ease',
					},
					'&:hover::after': {
						'transform': 'scaleX(1)',
					}
				},
				'.bg-stripes': {
					'background-image': 'linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%, transparent 50%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.1) 75%, transparent 75%, transparent)',
					'background-size': '10px 10px'
				},
				'.bg-noise': {
					'background-image': 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
					'background-position': '50% 50%',
				}
			});
		}
	],
} satisfies Config;
