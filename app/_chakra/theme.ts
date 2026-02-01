import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineRecipe,
  defineSlotRecipe,
} from '@chakra-ui/react';
import { tableAnatomy, tabsAnatomy } from '@chakra-ui/react/anatomy';

const colors = {
  // CBTM Brand Colors
  primary: {
    50: {
      value: '#E3F2FD',
    },
    100: {
      value: '#BBDEFB',
    },
    200: {
      value: '#90CAF9',
    },
    300: {
      value: '#64B5F6',
    },
    400: {
      value: '#42A5F5',
    },
    500: {
      value: '#2196F3',
    },
    600: {
      value: '#1E88E5',
    },
    700: {
      value: '#1976D2',
    },
    800: {
      value: '#1565C0',
    },
    900: {
      value: '#0052CC',
    }, // CBTM Primary Blue
  },
  secondary: {
    50: { value: '#E8F5E9' },
    100: { value: '#C8E6C9' },
    200: { value: '#A5D6A7' },
    300: { value: '#81C784' },
    400: { value: '#66BB6A' },
    500: { value: '#4CAF50' },
    600: { value: '#43A047' },
    700: { value: '#388E3C' },
    800: { value: '#2E7D32' },
    900: { value: '#28A745' }, // CBTM Secondary Green
  },
  accent: {
    50: { value: '#FFF8E1' },
    100: { value: '#FFECB3' },
    200: { value: '#FFE082' },
    300: { value: '#FFD54F' },
    400: { value: '#FFCA28' },
    500: { value: '#FFC107' },
    600: { value: '#FFB300' },
    700: { value: '#FFA000' },
    800: { value: '#FF8F00' },
    900: { value: '#FF6F00' },
  },
  neutral: {
    50: { value: '#FAFAFA' },
    100: { value: '#F5F5F5' },
    200: { value: '#EEEEEE' },
    300: { value: '#E0E0E0' },
    400: { value: '#BDBDBD' },
    500: { value: '#999999' },
    600: { value: '#757575' },
    700: { value: '#616161' },
    800: { value: '#424242' },
    900: { value: '#212121' },
  },
};

const semanticTokens = {
  colors: {
    'brand.primary': colors.primary[900], // #0052CC
    'brand.secondary': colors.secondary[900], // #28A745
    'brand.accent': colors.accent[500], // #FFC107
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

export const tableSlotRecipe = defineSlotRecipe({
  slots: tableAnatomy.keys(),
  base: {
    root: {
      borderCollapse: 'collapse',
      w: '100%',
    },
    columnHeader: {
      bg: 'primary.900',
      color: 'white',
      textAlign: 'left',
      fontWeight: '600',
      padding: '0.75rem',
    },
    cell: {
      padding: '0.75rem',
      borderBottom: '1px solid',
      borderColor: 'border.light',
    },
  },

  variants: {
    interactive: {
      true: {
        body: {
          '& tr': {
            _hover: {
              '& td': {
                bg: 'primary.50',
              },
            },
          },
        },
      },
    },
  },
});

const tabsSlotRecipe = defineSlotRecipe({
  slots: tabsAnatomy.keys(),
  base: {
    trigger: {
      fontWeight: '500',
    },
  },
  variants: {
    variant: {
      line: {
        list: {
          display: 'flex',
          borderColor: 'border.light',
          _horizontal: {
            borderBottomWidth: '2px',
          },
          _vertical: {
            borderEndWidth: '2px',
          },
        },
        trigger: {
          color: 'text.secondary',
          _hover: {
            color: 'brand.primary',
          },
          _selected: {
            color: 'brand.primary',
            _horizontal: {
              '--indicator-color': 'colors.brand.primary',
            },
          },
        },
      },
    },
  },
});

const linkRecipe = defineRecipe({
  base: {
    color: 'primary.900',
    transition: 'color 0.2s',
  },
  variants: {
    variant: {
      underline: {
        color: 'primary.900',
        textDecoration: 'underline',
        textUnderlineOffset: '3px',
        textDecorationColor: 'currentColor/20',
      },
      plain: {
        color: 'primary.900',
        _hover: {
          textDecoration: 'none',
        },
      },
    },
  },

  defaultVariants: {
    variant: 'plain',
  },
});

const badgeRecipe = defineRecipe({
  base: {
    fontWeight: '600',
    borderRadius: 'full',
  },
  variants: {
    variant: {
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
});

const buttonRecipe = defineRecipe({
  base: {
    fontWeight: '500',
    borderRadius: 'md',
    transition: 'all 0.2s',
  },
  variants: {
    variant: {
      solid: {
        colorScheme: 'primary',
        bg: 'brand.primary',
        color: 'text.light',
        _hover: {
          bg: 'primary.800',
        },
        _active: {
          bg: 'primary.900',
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
  },
});

const config = defineConfig({
  theme: {
    tokens: {
      colors,
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
    recipes: {
      button: buttonRecipe,
      link: linkRecipe,
      badge: badgeRecipe,
    },
    slotRecipes: {
      table: tableSlotRecipe,
      tabs: tabsSlotRecipe,
    },
  },
});

export const system = createSystem(defaultConfig, config);
