{/* KomKits React components — PORTED from design-system/components/
    (hub root: forms/Button.jsx, brand/Logo.jsx). That folder is the
    source of truth; sync changes there first. Self-contained per
    Mintlify snippet rules (no imports, hooks are pre-injected).
    Tokens come from komkits.css.
    Deviations from source:
    - Button: textTransform 'none' instead of 'capitalize' (sentence-case rule);
      renders an <a> when `href` is passed.
    - Logo: renders the light/dark logo pair with Tailwind theme classes
      instead of an `onDark` prop (Mintlify controls the theme). */}

export const KkButton = ({
  children,
  href,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  cta = false,
  style = {},
  ...rest
}) => {
  const SIZES = {
    small: { padding: '4px 12px', fontSize: '0.8125rem', minHeight: 30 },
    medium: { padding: '8px 18px', fontSize: '0.875rem', minHeight: 38 },
    large: { padding: '11px 26px', fontSize: '0.9375rem', minHeight: 46 }
  };
  const CONTAINED = {
    primary: ['var(--kk-yellow)', 'var(--kk-black)', 'var(--kk-yellow-600)'],
    secondary: ['var(--kk-black)', 'var(--kk-white)', 'var(--grey-700)'],
    accent: ['var(--kk-olive)', 'var(--kk-white)', 'var(--kk-olive-700)']
  };
  const MAIN = { primary: 'var(--kk-olive)', secondary: 'var(--kk-black)', accent: 'var(--kk-olive)' };
  const WASH = { primary: 'var(--kk-yellow-100)', secondary: 'var(--grey-100)', accent: 'var(--kk-olive-100)' };

  const [hover, setHover] = useState(false);
  const sz = SIZES[size] || SIZES.medium;
  const [bg, ink, hoverBg] = CONTAINED[color] || CONTAINED.primary;
  const main = MAIN[color] || MAIN.primary;
  const wash = WASH[color] || WASH.primary;

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    fontSize: sz.fontSize,
    lineHeight: 1.3,
    padding: sz.padding,
    minHeight: sz.minHeight,
    width: fullWidth ? '100%' : 'auto',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    textTransform: 'none',
    textDecoration: 'none',
    transition:
      'background-color var(--dur-base) var(--ease-standard), color var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard), border-color var(--dur-base) var(--ease-standard)',
    boxShadow: cta && variant === 'contained' && !disabled ? 'var(--shadow-cta)' : 'none',
    opacity: disabled ? 0.55 : 1
  };

  let vs = {};
  if (variant === 'contained') {
    vs = { background: hover && !disabled ? hoverBg : bg, color: ink };
  } else if (variant === 'outlined') {
    vs = { background: hover && !disabled ? wash : 'transparent', color: main, borderColor: main };
  } else if (variant === 'text') {
    vs = { background: hover && !disabled ? wash : 'transparent', color: main };
  }
  if (disabled) {
    vs =
      variant === 'contained'
        ? { background: 'var(--grey-200)', color: 'var(--grey-400)' }
        : { ...vs, color: 'var(--grey-400)', borderColor: variant === 'text' ? 'transparent' : 'var(--grey-300)' };
  }

  const styles = { ...base, ...vs, ...style };
  const shared = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: styles,
    ...rest
  };

  if (href && !disabled) {
    return (
      <a href={href} {...shared}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" disabled={disabled} {...shared}>
      {children}
    </button>
  );
};

export const KkLogo = ({ size = 'md', height, alt = 'KomKits', style = {} }) => {
  const HEIGHTS = { sm: 28, md: 40, lg: 56, xl: 96 };
  const h = height || HEIGHTS[size] || HEIGHTS.md;
  const imgStyle = {
    height: h,
    width: 'auto',
    display: 'inline-block',
    flexShrink: 0,
    maxWidth: '100%',
    objectFit: 'contain',
    ...style
  };
  return (
    <>
      <img src="/logo/komkits-logo-light.png" alt={alt} className="block dark:hidden" style={imgStyle} noZoom />
      <img src="/logo/komkits-logo-dark.png" alt={alt} className="hidden dark:block" style={imgStyle} noZoom />
    </>
  );
};
