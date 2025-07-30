// Chibi-style font families
export const FONTS = {
  // Primary chibi font - cute and rounded
  CHIBI_PRIMARY: 'Manrope',
  
  // Secondary chibi font - playful
  CHIBI_SECONDARY: 'Marker Felt',
  
  // Cute bubble font
  CHIBI_BUBBLE: 'Arial Rounded MT Bold',
  
  // Fun handwritten style
  CHIBI_HANDWRITTEN: 'Bradley Hand',
  
  // Fallback fonts for different platforms
  FALLBACK: {
    ios: 'Helvetica Neue',
    android: 'Roboto',
  },
  
  // Font weights for chibi style
  WEIGHTS: {
    LIGHT: '300' as const,
    REGULAR: '400' as const,
    MEDIUM: '500' as const,
    SEMI_BOLD: '600' as const,
    BOLD: '700' as const,
    EXTRA_BOLD: '800' as const,
  },
  
  // Font sizes for chibi elements
  SIZES: {
    TINY: 10,
    SMALL: 12,
    MEDIUM: 14,
    LARGE: 16,
    XLARGE: 18,
    XXLARGE: 20,
    TITLE: 24,
    HEADER: 28,
    GIANT: 32,
    MEGA: 36,
  },
};

// Platform-specific font selection
export const getChibiFont = (fontFamily: string = FONTS.CHIBI_PRIMARY) => {
  return fontFamily;
};

// Font styles for different elements
export const FONT_STYLES = {
  CHIBI_TITLE: {
    fontFamily: FONTS.CHIBI_PRIMARY,
    fontWeight: FONTS.WEIGHTS.BOLD,
    fontSize: FONTS.SIZES.GIANT,
  },
  CHIBI_SUBTITLE: {
    fontFamily: FONTS.CHIBI_SECONDARY,
    fontWeight: FONTS.WEIGHTS.MEDIUM,
    fontSize: FONTS.SIZES.LARGE,
  },
  CHIBI_BODY: {
    fontFamily: FONTS.CHIBI_PRIMARY,
    fontWeight: FONTS.WEIGHTS.REGULAR,
    fontSize: FONTS.SIZES.MEDIUM,
  },
  CHIBI_BUTTON: {
    fontFamily: FONTS.CHIBI_BUBBLE,
    fontWeight: FONTS.WEIGHTS.SEMI_BOLD,
    fontSize: FONTS.SIZES.LARGE,
  },
  CHIBI_EMOJI: {
    fontFamily: FONTS.CHIBI_PRIMARY,
    fontSize: FONTS.SIZES.MEGA,
  },
}; 