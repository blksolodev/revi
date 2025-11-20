const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  darkMode: ["class"],
  theme: {
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
  			gradient: {
  				from: 'hsl(var(--gradient-from))',
  				to: 'hsl(var(--gradient-to))'
  			},
  			'context-card-border': 'var(--context-card-border)',
  			'blue-900': 'var(--ds-blue-900)',
  			'gray-200': 'var(--ds-gray-200)',
  			'gray-alpha-100': 'var(--ds-gray-alpha-100)',
  			'gray-alpha-300': 'var(--ds-gray-alpha-300)',
  			'gray-alpha-200': 'var(--ds-gray-alpha-200)',
  			'gray-alpha-400': 'var(--ds-gray-alpha-400)',
  			'gray-alpha-500': 'var(--ds-gray-alpha-500)',
  			'gray-100': 'var(--ds-gray-100)',
  			'gray-400': 'var(--ds-gray-400)',
  			'gray-700': 'var(--ds-gray-700)',
  			'gray-900': 'var(--ds-gray-900)',
  			'gray-1000': 'var(--ds-gray-1000)',
  			'gray-1000-h': 'var(--ds-gray-1000-h)',
  			'background-100': 'var(--ds-background-100)',
  			'background-200': 'var(--ds-background-200)',
  			'accents-2': 'var(--accents-2)',
  			'red-800': 'var(--ds-red-800)',
  			'red-900': 'var(--ds-red-900)',
  			'red-900-alpha-160': 'var(--ds-red-900-alpha-160)',
  			'amber-800': 'var(--ds-amber-800)',
  			'amber-850': 'var(--ds-amber-850)',
  			'geist-foreground': 'var(--geist-foreground)',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	},
  	backgroundImage: {
  		'gradient-primary': 'linear-gradient(135deg, hsl(var(--gradient-from)) 0%, hsl(var(--gradient-to)) 100%)',
  		'gradient-primary-radial': 'radial-gradient(ellipse at top, hsl(var(--gradient-from)) 0%, hsl(var(--gradient-to)) 100%)'
  	},
  	borderRadius: {
  		lg: 'var(--radius)',
  		md: 'calc(var(--radius) - 2px)',
  		sm: 'calc(var(--radius) - 4px)'
  	},
  	animation: {
  		aurora: 'aurora 60s linear infinite',
  		'fade-spin': 'fade-spin 1.2s linear infinite'
  	},
  	keyframes: {
  		aurora: {
  			from: {
  				backgroundPosition: '50% 50%, 50% 50%'
  			},
  			to: {
  				backgroundPosition: '350% 50%, 350% 50%'
  			}
  		},
  		'fade-spin': {
  			'0%': {
  				opacity: '1'
  			},
  			'100%': {
  				opacity: '0.15'
  			}
  		}
  	},
  	boxShadow: {
  		'border-small': 'var(--ds-shadow-border-small)',
  		border: 'var(--ds-shadow-border)',
  		'border-medium': 'var(--ds-shadow-border-medium)',
  		'border-large': 'var(--ds-shadow-border-large)',
  		tooltip: 'var(--ds-shadow-tooltip)',
  		menu: 'var(--ds-shadow-menu)',
  		modal: 'var(--ds-shadow-modal)',
  		fullscreen: 'var(--ds-shadow-fullscreen)',
  		'focus-input': 'var(--ds-input-ring)',
  		'error-input': 'var(--ds-input-error-ring)',
  		'error-input-hover': 'var(--ds-input-error-hover-ring)',
  		'focus-calendar-date': 'var(--ds-focus-calendar-date-ring)',
  		'focus-ring': 'var(--ds-focus-ring)'
  	}
  },
  plugins: [require("tailwindcss-animate"), addVariablesForColors],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
