import { createSystem, defaultConfig } from '@chakra-ui/react';

const colors = {
  // CBTM Brand Colors
  primary: {
    50: '#E3F2FD',
    100: '#BBDEFB',
    200: '#90CAF9',
    300: '#64B5F6',
    400: '#42A5F5',
    500: '#2196F3',
    600: '#1E88E5',
    700: '#1976D2',
    800: '#1565C0',
    900: '#0052CC', // CBTM Primary Blue
  },
  secondary: {
    50: '#E8F5E9',
    100: '#C8E6C9',
    200: '#A5D6A7',
    300: '#81C784',
    400: '#66BB6A',
    500: '#4CAF50',
    600: '#43A047',
    700: '#388E3C',
    800: '#2E7D32',
    900: '#28A745', // CBTM Secondary Green
  },
  accent: {
    50: '#FFF8E1',
    100: '#FFECB3',
    200: '#FFE082',
    300: '#FFD54F',
    400: '#FFCA28',
    500: '#FFC107',
    600: '#FFB300',
    700: '#FFA000',
    800: '#FF8F00',
    900: '#FF6F00',
  },
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#999999',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
};

const semanticTokens = {
  colors: {
    'brand.primary': { value: colors.primary[900] }, // #0052CC
    'brand.secondary': { value: colors.secondary[900] }, // #28A745
    'brand.accent': { value: colors.accent[500] }, // #FFC107
    'text.primary': { value: '#333333' },
    'text.secondary': { value: '#666666' },
    'text.muted': { value: '#999999' },
    'text.light': { value: '#FFFFFF' },
    'bg.primary': { value: '#FFFFFF' },
    'bg.secondary': { value: '#F5F5F5' },
    'bg.tertiary': { value: '#EEEEEE' },
    'border.light': { value: '#E0E0E0' },
  },
};

const config = {
  globalConfig: {
    cssVarsRoot: ':root',
  },
  theme: {
    colors,
    tokens: {
      colors: semanticTokens.colors,
    },
    semanticTokens: {
      colors: semanticTokens.colors,
    },
    textStyles: {
      h1: {
        fontSize: '2xl',
        fontWeight: 'bold',
        lineHeight: '1.2',
        letterSpacing: '-0.02em',
      },
      h2: {
        fontSize: 'xl',
        fontWeight: 'bold',
        lineHeight: '1.3',
      },
      h3: {
        fontSize: 'lg',
        fontWeight: '600',
        lineHeight: '1.4',
      },
      body: {
        fontSize: 'md',
        lineHeight: '1.6',
      },
      small: {
        fontSize: 'sm',
        lineHeight: '1.5',
      },
    },
    componentStyles: {
      Button: {
        baseStyle: {
          fontWeight: '500',
          borderRadius: 'md',
          transition: 'all 0.2s',
        },
        variants: {
          solid: {
            colorScheme: 'primary',
            bg: 'brand.primary',
            color: 'text.light',
            _hover: {
              bg: colors.primary[800],
            },
            _active: {
              bg: colors.primary[900],
            },
          },
          outline: {
            borderColor: 'brand.primary',
            color: 'brand.primary',
            _hover: {
              bg: 'primary.50',
            },
          },
          ghost: {
            color: 'brand.primary',
            _hover: {
              bg: 'primary.50',
            },
          },
        },
        defaultProps: {
          variant: 'solid',
        },
      },
      Link: {
        baseStyle: {
          color: 'brand.primary',
          textDecoration: 'none',
          _hover: {
            textDecoration: 'underline',
          },
        },
      },
      Table: {
        baseStyle: {
          table: {
            borderCollapse: 'collapse',
            w: '100%',
          },
          thead: {
            bg: '#0052CC',
            color: 'white',
          },
          th: {
            textAlign: 'left',
            fontWeight: '600',
            padding: '0.75rem',
            borderBottom: '2px solid',
            borderColor: '#0052CC',
            color: 'white',
          },
          td: {
            padding: '0.75rem',
            borderBottom: '1px solid',
            borderColor: 'border.light',
          },
          tbody: {
            tr: {
              _hover: {
                bg: 'bg.secondary',
              },
              _even: {
                bg: 'bg.secondary',
              },
            },
          },
        },
      },
      Tabs: {
        baseStyle: {
          tablist: {
            borderBottom: '2px solid',
            borderColor: 'border.light',
          },
          tab: {
            color: 'text.secondary',
            fontWeight: '500',
            borderBottom: '2px solid transparent',
            _hover: {
              color: 'brand.primary',
            },
            _selected: {
              color: 'brand.primary',
              borderColor: 'brand.primary',
            },
          },
        },
      },
      Badge: {
        baseStyle: {
          fontWeight: '600',
          borderRadius: 'full',
        },
        variants: {
          solid: {
            bg: 'brand.primary',
            color: 'text.light',
          },
          subtle: {
            bg: 'primary.50',
            color: 'brand.primary',
          },
        },
      },
      Card: {
        baseStyle: {
          container: {
            bg: 'bg.primary',
            borderRadius: 'md',
            border: '1px solid',
            borderColor: 'border.light',
            p: '1.5rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          },
        },
      },
      Heading: {
        baseStyle: {
          color: 'text.primary',
          fontWeight: '700',
        },
      },
      Text: {
        baseStyle: {
          color: 'text.primary',
        },
      },
    },
  },
};

export const system = createSystem(defaultConfig, config);
