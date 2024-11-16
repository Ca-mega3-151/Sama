import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],

  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        'yy-blue': 'var(--yy-blue)',
        'yy-purple': 'var(--yy-purple)',
        'yy-cyan': 'var(--yy-cyan)',
        'yy-green': 'var(--yy-green)',
        'yy-magenta': 'var(--yy-magenta)',
        'yy-pink': 'var(--yy-pink)',
        'yy-red': 'var(--yy-red)',
        'yy-orange': 'var(--yy-orange)',
        'yy-yellow': 'var(--yy-yellow)',
        'yy-volcano': 'var(--yy-volcano)',
        'yy-geekblue': 'var(--yy-geekblue)',
        'yy-gold': 'var(--yy-gold)',
        'yy-lime': 'var(--yy-lime)',
        'yy-primary': 'var(--yy-color-primary)',
        'yy-success': 'var(--yy-color-success)',
        'yy-warning': 'var(--yy-color-warning)',
        'yy-error': 'var(--yy-color-error)',
        'yy-info': 'var(--yy-color-info)',
        'yy-link': 'var(--yy-color-link)',
        'yy-text-base': 'var(--yy-color-text-base)',
        'yy-bg-base': 'var(--yy-color-bg-base)',
        'yy-text': 'var(--yy-color-text)',
        'yy-text-secondary': 'var(--yy-color-text-secondary)',
        'yy-text-tertiary': 'var(--yy-color-text-tertiary)',
        'yy-text-quaternary': 'var(--yy-color-text-quaternary)',
        'yy-fill': 'var(--yy-color-fill)',
        'yy-fill-secondary': 'var(--yy-color-fill-secondary)',
        'yy-fill-tertiary': 'var(--yy-color-fill-tertiary)',
        'yy-fill-quaternary': 'var(--yy-color-fill-quaternary)',
        'yy-bg-layout': 'var(--yy-color-bg-layout)',
        'yy-bg-container': 'var(--yy-color-bg-container)',
        'yy-bg-elevated': 'var(--yy-color-bg-elevated)',
        'yy-bg-spotlight': 'var(--yy-color-bg-spotlight)',
        'yy-border': 'var(--yy-color-border)',
        'yy-border-secondary': 'var(--yy-color-border-secondary)',
        'yy-primary-bg': 'var(--yy-color-primary-bg)',
        'yy-primary-bg-hover': 'var(--yy-color-primary-bg-hover)',
        'yy-primary-border': 'var(--yy-color-primary-border)',
        'yy-primary-border-hover': 'var(--yy-color-primary-border-hover)',
        'yy-primary-hover': 'var(--yy-color-primary-hover)',
        'yy-primary-active': 'var(--yy-color-primary-active)',
        'yy-primary-text-hover': 'var(--yy-color-primary-text-hover)',
        'yy-primary-text': 'var(--yy-color-primary-text)',
        'yy-primary-text-active': 'var(--yy-color-primary-text-active)',
        'yy-success-bg': 'var(--yy-color-success-bg)',
        'yy-success-bg-hover': 'var(--yy-color-success-bg-hover)',
        'yy-success-border': 'var(--yy-color-success-border)',
        'yy-success-border-hover': 'var(--yy-color-success-border-hover)',
        'yy-success-hover': 'var(--yy-color-success-hover)',
        'yy-success-active': 'var(--yy-color-success-active)',
        'yy-success-text-hover': 'var(--yy-color-success-text-hover)',
        'yy-success-text': 'var(--yy-color-success-text)',
        'yy-success-text-active': 'var(--yy-color-success-text-active)',
        'yy-error-bg': 'var(--yy-color-error-bg)',
        'yy-error-bg-hover': 'var(--yy-color-error-bg-hover)',
        'yy-error-bg-active': 'var(--yy-color-error-bg-active)',
        'yy-error-border': 'var(--yy-color-error-border)',
        'yy-error-border-hover': 'var(--yy-color-error-border-hover)',
        'yy-error-hover': 'var(--yy-color-error-hover)',
        'yy-error-active': 'var(--yy-color-error-active)',
        'yy-error-text-hover': 'var(--yy-color-error-text-hover)',
        'yy-error-text': 'var(--yy-color-error-text)',
        'yy-error-text-active': 'var(--yy-color-error-text-active)',
        'yy-warning-bg': 'var(--yy-color-warning-bg)',
        'yy-warning-bg-hover': 'var(--yy-color-warning-bg-hover)',
        'yy-warning-border': 'var(--yy-color-warning-border)',
        'yy-warning-border-hover': 'var(--yy-color-warning-border-hover)',
        'yy-warning-hover': 'var(--yy-color-warning-hover)',
        'yy-warning-active': 'var(--yy-color-warning-active)',
        'yy-warning-text-hover': 'var(--yy-color-warning-text-hover)',
        'yy-warning-text': 'var(--yy-color-warning-text)',
        'yy-warning-text-active': 'var(--yy-color-warning-text-active)',
        'yy-info-bg': 'var(--yy-color-info-bg)',
        'yy-info-bg-hover': 'var(--yy-color-info-bg-hover)',
        'yy-info-border': 'var(--yy-color-info-border)',
        'yy-info-border-hover': 'var(--yy-color-info-border-hover)',
        'yy-info-hover': 'var(--yy-color-info-hover)',
        'yy-info-active': 'var(--yy-color-info-active)',
        'yy-info-text-hover': 'var(--yy-color-info-text-hover)',
        'yy-info-text': 'var(--yy-color-info-text)',
        'yy-info-text-active': 'var(--yy-color-info-text-active)',
        'yy-link-hover': 'var(--yy-color-link-hover)',
        'yy-link-active': 'var(--yy-color-link-active)',
        'yy-bg-mask': 'var(--yy-color-bg-mask)',
        'yy-white': 'var(--yy-color-white)',
        'yy-fill-content': 'var(--yy-color-fill-content)',
        'yy-fill-content-hover': 'var(--yy-color-fill-content-hover)',
        'yy-fill-alter': 'var(--yy-color-fill-alter)',
        'yy-bg-container-disabled': 'var(--yy-color-bg-container-disabled)',
        'yy-border-bg': 'var(--yy-color-border-bg)',
        'yy-split': 'var(--yy-color-split)',
        'yy-text-placeholder': 'var(--yy-color-text-placeholder)',
        'yy-text-disabled': 'var(--yy-color-text-disabled)',
        'yy-text-heading': 'var(--yy-color-text-heading)',
        'yy-text-label': 'var(--yy-color-text-label)',
        'yy-text-description': 'var(--yy-color-text-description)',
        'yy-text-light-solid': 'var(--yy-color-text-light-solid)',
        'yy-highlight': 'var(--yy-color-highlight)',
        'yy-bg-text-hover': 'var(--yy-color-bg-text-hover)',
        'yy-bg-text-active': 'var(--yy-color-bg-text-active)',
        'yy-icon': 'var(--yy-color-icon)',
        'yy-icon-hover': 'var(--yy-color-icon-hover)',
        'yy-error-outline': 'var(--yy-color-error-outline)',
        'yy-warning-outline': 'var(--yy-color-warning-outline)',
      },
      fontSize: {
        'yy-fs-sm': 'var(--yy-font-size-sm)',
        'yy-fs-base': 'var(--yy-font-size)',
        'yy-fs-lg': 'var(--yy-font-size-lg)',
        'yy-fs-xl': 'var(--yy-font-size-xl)',
        'yy-fs-heading-1': 'var(--yy-font-size-heading-1)',
        'yy-fs-heading-2': 'var(--yy-font-size-heading-2)',
        'yy-fs-heading-3': 'var(--yy-font-size-heading-3)',
        'yy-fs-heading-4': 'var(--yy-font-size-heading-4)',
        'yy-fs-heading-5': 'var(--yy-font-size-heading-5)',
      },
      lineHeight: {
        'yy-lh-base': 'var(--yy-line-height)',
        'yy-lh-lg': 'var(--yy-line-height-lg)',
        'yy-lh-sm': 'var(--yy-line-height-sm)',
        'yy-lh-heading-1': 'var(--yy-line-height-heading-1)',
        'yy-lh-heading-2': 'var(--yy-line-height-heading-2)',
        'yy-lh-heading-3': 'var(--yy-line-height-heading-3)',
        'yy-lh-heading-4': 'var(--yy-line-height-heading-4)',
        'yy-lh-heading-5': 'var(--yy-line-height-heading-5)',
      },
      borderRadius: {
        'yy-br-xs': 'var(--yy-border-radius-xs)',
        'yy-br-sm': 'var(--yy-border-radius-sm)',
        'yy-br-default': 'var(--yy-border-radius)',
        'yy-br-lg': 'var(--yy-border-radius-lg)',
        'yy-br-outer': 'var(--yy-border-radius-outer)',
      },
      spacing: {
        'yy-control-height': 'var(--yy-control-height)',
        'yy-control-height-sm': 'var(--yy-control-height-sm)',
        'yy-control-height-lg': 'var(--yy-control-height-lg)',
        'yy-margin-lg': 'var(--yy-margin-lg)',
        'yy-margin-sm': 'var(--yy-margin-sm)',
        'yy-margin-md': 'var(--yy-margin-md)',
        'yy-padding-lg': 'var(--yy-padding-lg)',
        'yy-padding-sm': 'var(--yy-padding-sm)',
        'yy-padding-md': 'var(--yy-padding-md)',
      },
    },
  },
  corePlugins: {
    alignContent: true,
    alignItems: true,
    animation: true,
    aspectRatio: true,
    backgroundClip: true,
    backgroundColor: true,
    backgroundOrigin: true,
    backgroundPosition: true,
    backgroundRepeat: true,
    backgroundSize: true,
    blur: true,
    borderColor: true,
    borderRadius: true,
    borderStyle: true,
    borderWidth: true,
    boxShadow: true,
    brightness: true,
    contrast: true,
    cursor: true,
    display: true,
    dropShadow: true,
    fill: true,
    filter: true,
    flex: true,
    flexBasis: true,
    flexDirection: true,
    flexGrow: true,
    flexShrink: true,
    flexWrap: true,
    fontFamily: true,
    fontSize: true,
    fontStyle: true,
    fontWeight: true,
    gap: true,
    grayscale: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnStart: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowStart: true,
    gridTemplateColumns: true,
    height: true,
    hueRotate: true,
    inset: true,
    invert: true,
    justifyContent: true,
    justifyItems: true,
    lineClamp: true,
    listStyleImage: true,
    listStylePosition: true,
    listStyleType: true,
    margin: true,
    maxHeight: true,
    maxWidth: true,
    minHeight: true,
    minWidth: true,
    objectFit: true,
    objectPosition: true,
    opacity: true,
    order: true,
    overflow: true,
    padding: true,
    placeholderColor: true,
    placeholderOpacity: true,
    pointerEvents: true,
    position: true,
    rotate: true,
    saturate: true,
    scale: true,
    sepia: true,
    skew: true,
    stroke: true,
    strokeWidth: true,
    textAlign: true,
    textColor: true,
    textDecoration: true,
    textOpacity: true,
    textOverflow: true,
    textTransform: true,
    touchAction: true,
    transform: true,
    transformOrigin: true,
    transitionDelay: true,
    transitionDuration: true,
    transitionProperty: true,
    transitionTimingFunction: true,
    translate: true,
    userSelect: true,
    width: true,
    willChange: true,
    zIndex: true,
    visibility: true,
    whitespace: true,

    //
    preflight: false,
    container: false,
    accessibility: false,
    isolation: false,
    float: false,
    clear: false,
    boxSizing: false,
    tableLayout: false,
    captionSide: false,
    borderCollapse: false,
    borderSpacing: false,
    resize: false,
    scrollSnapType: false,
    scrollSnapAlign: false,
    scrollSnapStop: false,
    scrollMargin: false,
    scrollPadding: false,
    appearance: false,
    columns: false,
    breakBefore: false,
    breakInside: false,
    breakAfter: false,
    gridAutoColumns: false,
    gridAutoFlow: false,
    gridAutoRows: false,
    gridTemplateRows: false,
    placeContent: false,
    placeItems: false,
    space: false,
    divideWidth: false,
    divideStyle: false,
    divideColor: false,
    divideOpacity: false,
    placeSelf: false,
    alignSelf: false,
    justifySelf: false,
    overscrollBehavior: false,
    scrollBehavior: false,
    hyphens: false,
    wordBreak: false,
    borderOpacity: false,
    backgroundOpacity: false,
    backgroundImage: false,
    gradientColorStops: false,
    boxDecorationBreak: false,
    backgroundAttachment: false,
    textIndent: false,
    verticalAlign: false,
    fontVariantNumeric: false,
    lineHeight: false,
    letterSpacing: false,
    textDecorationColor: false,
    textDecorationStyle: false,
    textDecorationThickness: false,
    textUnderlineOffset: false,
    fontSmoothing: false,
    caretColor: false,
    accentColor: false,
    backgroundBlendMode: false,
    mixBlendMode: false,
    boxShadowColor: false,
    outlineStyle: false,
    outlineWidth: false,
    outlineOffset: false,
    outlineColor: false,
    ringWidth: false,
    ringColor: false,
    ringOpacity: false,
    ringOffsetWidth: false,
    ringOffsetColor: false,
    backdropBlur: false,
    backdropBrightness: false,
    backdropContrast: false,
    backdropGrayscale: false,
    backdropHueRotate: false,
    backdropInvert: false,
    backdropOpacity: false,
    backdropSaturate: false,
    backdropSepia: false,
    backdropFilter: false,
    content: false,
  },
} satisfies Config;
