import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

const MyPreset = definePreset(Aura, {
	semantic: {
		color: {
			brand: {
				50: '#f4f7fb',
				100: '#c9d7ec',
				200: '#9fb8dd',
				300: '#7498ce',
				400: '#4a79bf',
				500: '#1F59B0',
				600: '#1a4c96',
				700: '#163e7b',
				800: '#2C3C98',
				900: '#0A0A46',
				950: '#0a1c36',
			},
			blue: {
				50: '#DEF4FD',
				100: '#BFEAFB',
				200: '#A1E1F9',
				500: '#52C7F4',
				700: '#1082CE',
				900: '#162554',
			},
			base: {
				0: '#FFFFFF',
				50: '#f9f9f9',
				100: '#F2F2F2',
				200: '#E0E0E0',
				300: '#CDCDCD',
				400: '#B2B2B2',
				700: '#505050',
				900: '#141414',
			},
			red: {
				50: '#FFEEED',
				500: '#FF564E',
				700: '#D82E2E',
				800: '#B9212E',
			},
		},
		primary: {
			50: '{color.brand.50}',
			100: '{color.brand.100}',
			200: '{color.brand.200}',
			300: '{color.brand.300}',
			400: '{color.brand.400}',
			500: '{color.brand.500}',
			600: '{color.brand.600}',
			700: '{color.brand.700}',
			800: '{color.brand.800}',
			900: '{color.brand.900}',
			950: '{color.brand.950}',
		},
		secondary: {
			50: '{color.blue.50}',
			100: '{color.blue.100}',
			200: '{color.blue.200}',
			500: '{color.blue.500}',
			700: '{color.blue.700}',
			900: '{color.blue.900}',
		},
		surface: {
			base: '{color.base.0}',
			background: '{color.base.50}',
			subtle: '{color.base.100}',
			line: '{color.base.300}',
		},
		text: {
			primary: '{color.base.900}',
			secondary: '{color.base.700}',
			tertiary: '{color.base.400}',
			inverse: '{color.base.0}',
			disabled: '{color.base.300}',
		},
		border: {
			primary: '{color.base.200}',
		},
		borderRadius: {
			sm: '8px',
			md: '12px',
			lg: '16px',
			xl: '24px',
		},

		formField: {
			paddingY: '0.75rem',
			paddingX: '1.5rem',
			fontSize: '1.125rem',
			borderRadius: '2.5rem',

			sm: {
				fontSize: '0.875rem',
				paddingX: '1rem',
				paddingY: '0.75rem',
			},

			lg: {
				fontSize: '1.25rem',
				paddingX: '2.5rem',
				paddingY: '0.875rem',
			},
		},
	},
	css: ({ dt }) => `
    :root {
      --p-text-color: ${dt('text.primary')};
      --p-overlay-modal-color: ${dt('text.primary')};
    }
  `,
	components: {
		button: {
			css: ({ dt }) => `
                :root {
                        /* Primary */
                        --p-button-label-font-weight: 400;

                        --p-button-primary-background: var(--p-primary-500);
                        --p-button-primary-color: #ffffff;
                        --p-button-primary-hover-color: #ffffff;
                        --p-button-primary-active-color: #ffffff;
                        --p-button-primary-hover-background: var(--p-primary-800);

                        /* Secondary (outlined-look в твоём дизайне) */
                        --p-button-secondary-background: transparent;
                        --p-button-secondary-color: var(--p-primary-500);
                        --p-button-secondary-border-color: var(--p-primary-500);
                        --p-button-secondary-hover-border-color: var(--p-primary-800);
                        --p-button-secondary-hover-color: var(--p-primary-800);
                        --p-button-secondary-hover-background: transparent;
                        --p-button-secondary-active-border-color: var(--p-primary-200);
                        --p-button-secondary-active-color: var(--p-primary-200);
                        --p-button-secondary-active-background: transparent;
                }`,
		},

		floatlabel: {
			css: ({ dt }) => `
                :root {
                        --p-floatlabel-label-color: ${dt('text.secondary')};
                        --p-floatlabel-focus-color: ${dt('surface.line')};
                        --p-floatlabel-font-weight: 400;
                        --p-floatlabel-active-font-size: 0.625rem;
                }`,
		},

		inputtext: {
			css: ({ dt }) => `
                :root {
                        --p-inputtext-background: ${dt('surface.subtle')};
                        --p-inputtext-border-radius: 100px;
                        --p-inputtext-color: ${dt('text.primary')};
                        --p-inputtext-border-color: ${dt('border.primary')};
                        --p-inputtext-hover-border-color: var(--p-primary-800);
                        --p-inputtext-background-focus: ${dt('surface.base')};
                } 
                .p-inputtext:enabled:focus, .p-filled { 
                        background-color: var(--p-inputtext-background-focus); 
                }`,
		},
		select: {
			css: ({ dt }) => `
                :root {
                        --p-select-background: ${dt('surface.subtle')};
                        --p-select-border-radius: 100px;
                        --p-select-color: ${dt('text.primary')};
                        --p-select-border-color: ${dt('border.primary')};
                        --p-select-hover-border-color: var(--p-primary-800);
                        --p-select-background-focus: ${dt('surface.base')};
                        --p-select-overlay-border-radius: 16px;
                        --p-select-option-border-radius: 8px;
                }
                
                .p-select:enabled:focus, .p-inputwrapper-filled { 
                        background-color: var(--p-select-background-focus); 
                }  
                .p-select {
                        min-width: 230px
                }          `,
		},
		message: {
			css: ({ dt }) => `
				:root {
					--p-message-simple-content-padding: 0 1.5rem;	
				}`,
		},
		dialog: {
			css: ({ dt }) => `
				:root {
				--p-dialog-title-font-size: clamp(1.25rem, calc(1.5vw + 0.875rem), 2.5rem);
				--p-overlay-modal-padding: clamp(1.25rem, calc(1.5vw + 0.875rem), 2.5rem);
				}
			`,
		},
	},
})
export default {
	preset: MyPreset,
	options: {
		ripple: true,
		inputVariant: 'filled',
		darkModeSelector: false,
	},
}
