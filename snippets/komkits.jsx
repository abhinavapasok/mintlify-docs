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
  const HEIGHTS = { sm: 28, md: 40, lg: 56, xl: 96, '2xl': 160 };
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

{/* ---- Ports of design-system/components/data-display, feedback,
      navigation. Same props as the source primitives. ---- */}

export const KkCard = ({
  title,
  subheader,
  secondary,
  children,
  border = true,
  hover = false,
  divider = true,
  contentPadding = 20,
  content = true,
  style = {},
  ...rest
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: 'var(--surface-card)',
        border: border ? '1px solid var(--border-subtle)' : 'none',
        borderRadius: 'var(--radius-md)',
        boxShadow: hover && hovered ? 'var(--shadow-z1)' : 'none',
        transition: 'box-shadow var(--dur-base) var(--ease-standard)',
        fontFamily: 'var(--font-body)',
        color: 'var(--text-body)',
        ...style
      }}
      {...rest}
    >
      {title && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '16px 20px' }}>
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 'var(--fw-semibold)', color: 'var(--text-heading)' }}>{title}</div>
            {subheader && <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 2 }}>{subheader}</div>}
          </div>
          {secondary && <div style={{ display: 'inline-flex', alignItems: 'center' }}>{secondary}</div>}
        </div>
      )}
      {title && divider && <div style={{ height: 1, background: 'var(--border-subtle)' }} />}
      {content ? <div style={{ padding: contentPadding }}>{children}</div> : children}
    </div>
  );
};

export const KkChip = ({ label, children, color = 'secondary', variant = 'light', size = 'medium', icon, onDelete, style = {}, ...rest }) => {
  const PAL = {
    primary: { main: 'var(--kk-olive)', light: 'var(--color-primary-wash)', border: 'var(--kk-yellow)' },
    secondary: { main: 'var(--grey-600)', light: 'var(--grey-100)', border: 'var(--grey-300)' },
    accent: { main: 'var(--kk-olive)', light: 'var(--color-accent-wash)', border: 'var(--kk-olive)' },
    success: { main: 'var(--success-dark)', light: 'var(--success-lighter)', border: 'var(--success-light)' },
    error: { main: 'var(--error-dark)', light: 'var(--error-lighter)', border: 'var(--error-light)' },
    warning: { main: 'var(--warning-dark)', light: 'var(--warning-lighter)', border: 'var(--warning-light)' }
  };
  const H = { small: 24, medium: 32, large: 40 };
  const p = PAL[color] || PAL.secondary;
  const h = H[size] || H.medium;

  let vs;
  if (variant === 'filled') {
    vs = { background: p.main, color: 'var(--kk-white)', border: '1px solid transparent' };
  } else if (variant === 'combined') {
    vs = { background: p.light, color: p.main, border: `1px solid ${p.border}` };
  } else {
    vs = { background: p.light, color: p.main, border: '1px solid transparent' };
  }

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        height: h,
        padding: `0 ${size === 'small' ? 8 : 12}px`,
        borderRadius: 'var(--radius-sm)',
        fontFamily: 'var(--font-body)',
        fontSize: size === 'large' ? '1rem' : size === 'small' ? '0.75rem' : '0.8125rem',
        fontWeight: 'var(--fw-medium)',
        lineHeight: 1,
        whiteSpace: 'nowrap',
        ...vs,
        ...style
      }}
      {...rest}
    >
      {icon && <span style={{ display: 'inline-flex', fontSize: '0.85em' }}>{icon}</span>}
      {label || children}
      {onDelete && (
        <span
          onClick={onDelete}
          role="button"
          aria-label="remove"
          style={{ display: 'inline-flex', cursor: 'pointer', marginLeft: 2, opacity: 0.7, fontSize: '1.1em' }}
        >
          ×
        </span>
      )}
    </span>
  );
};

export const KkBadge = ({ children, badgeContent, color = 'error', dot = false, max = 99, invisible = false, style = {}, ...rest }) => {
  const PAL = {
    primary: ['var(--kk-yellow)', 'var(--kk-black)'],
    secondary: ['var(--grey-600)', 'var(--kk-white)'],
    error: ['var(--error)', 'var(--kk-white)'],
    success: ['var(--success)', 'var(--kk-white)'],
    warning: ['var(--warning)', 'var(--kk-black)']
  };
  const [bg, ink] = PAL[color] || PAL.error;
  const show = !invisible && (dot || (badgeContent !== undefined && badgeContent !== null && badgeContent !== 0));
  let content = badgeContent;
  if (typeof badgeContent === 'number' && badgeContent > max) content = `${max}+`;

  return (
    <span style={{ position: 'relative', display: 'inline-flex', ...style }} {...rest}>
      {children}
      {show && (
        <span
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            transform: 'translate(40%, -40%)',
            minWidth: dot ? 8 : 18,
            height: dot ? 8 : 18,
            padding: dot ? 0 : '0 5px',
            borderRadius: 'var(--radius-pill)',
            background: bg,
            color: ink,
            fontFamily: 'var(--font-body)',
            fontSize: '0.6875rem',
            fontWeight: 'var(--fw-semibold)',
            lineHeight: dot ? '8px' : '18px',
            textAlign: 'center',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 0 2px var(--surface-card)'
          }}
        >
          {!dot && content}
        </span>
      )}
    </span>
  );
};

export const KkDot = ({ color = 'primary', size = 8, style = {}, ...rest }) => {
  const C = {
    primary: 'var(--kk-yellow)',
    secondary: 'var(--grey-400)',
    success: 'var(--success)',
    error: 'var(--error)',
    warning: 'var(--warning)',
    info: 'var(--info)'
  };
  return (
    <span
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        borderRadius: '50%',
        background: C[color] || C.primary,
        flexShrink: 0,
        ...style
      }}
      {...rest}
    />
  );
};

export const KkAlert = ({ children, title, color = 'primary', variant = 'standard', icon, onClose, action, style = {}, ...rest }) => {
  const PAL = {
    primary: { main: 'var(--kk-olive)', lighter: 'var(--color-primary-wash)', light: 'var(--kk-yellow)' },
    success: { main: 'var(--success)', lighter: 'var(--success-lighter)', light: 'var(--success-light)' },
    error: { main: 'var(--error)', lighter: 'var(--error-lighter)', light: 'var(--error-light)' },
    warning: { main: 'var(--warning)', lighter: 'var(--warning-lighter)', light: 'var(--warning-light)' },
    info: { main: 'var(--info)', lighter: 'var(--info-lighter)', light: 'var(--info-light)' }
  };
  const DEFAULT_ICON = { primary: 'ⓘ', success: '✓', error: '⚠', warning: '⚠', info: 'ⓘ' };
  const p = PAL[color] || PAL.primary;
  const filled = variant === 'filled';
  const containerBg = filled ? p.main : p.lighter;
  const ink = filled ? (color === 'warning' || color === 'primary' ? 'var(--kk-black)' : 'var(--kk-white)') : 'var(--text-body)';

  return (
    <div
      role="alert"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        padding: '10px 16px',
        borderRadius: 'var(--radius-sm)',
        background: containerBg,
        color: ink,
        border: variant === 'border' ? `1px solid color-mix(in srgb, ${p.light} 60%, transparent)` : '1px solid transparent',
        fontFamily: 'var(--font-body)',
        fontSize: '0.875rem',
        lineHeight: 1.5,
        ...style
      }}
      {...rest}
    >
      {icon !== false && (
        <span style={{ display: 'inline-flex', fontSize: '1rem', lineHeight: '1.4', color: filled ? ink : p.main, flexShrink: 0 }}>
          {icon || DEFAULT_ICON[color] || DEFAULT_ICON.primary}
        </span>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && (
          <div style={{ fontWeight: 'var(--fw-semibold)', marginBottom: children ? 2 : 0, color: filled ? ink : 'var(--text-heading)' }}>
            {title}
          </div>
        )}
        {children}
      </div>
      {action}
      {onClose && (
        <span
          onClick={onClose}
          role="button"
          aria-label="dismiss"
          style={{ cursor: 'pointer', opacity: 0.6, fontSize: '1.05rem', lineHeight: 1, flexShrink: 0 }}
        >
          ×
        </span>
      )}
    </div>
  );
};

export const KkTabs = ({ items = [], value, defaultValue, onChange, style = {}, ...rest }) => {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue ?? (items[0] && items[0].value));
  const active = isControlled ? value : internal;
  const [hover, setHover] = useState(null);

  const select = (v) => {
    if (!isControlled) setInternal(v);
    onChange && onChange(v);
  };

  return (
    <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--border-subtle)', fontFamily: 'var(--font-body)', ...style }} {...rest}>
      {items.map((it) => {
        const on = it.value === active;
        return (
          <button
            key={it.value}
            type="button"
            onClick={() => select(it.value)}
            onMouseEnter={() => setHover(it.value)}
            onMouseLeave={() => setHover(null)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              minHeight: 46,
              padding: '0 16px',
              border: 'none',
              background: on || hover === it.value ? 'var(--color-primary-wash)' : 'transparent',
              borderTopLeftRadius: 'var(--radius-sm)',
              borderTopRightRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: on ? 'var(--fw-semibold)' : 'var(--fw-medium)',
              color: on ? 'var(--text-heading)' : 'var(--text-secondary)',
              position: 'relative',
              transition: 'color var(--dur-base) var(--ease-standard), background-color var(--dur-base) var(--ease-standard)'
            }}
          >
            {it.icon && <span style={{ display: 'inline-flex', fontSize: '1.05em' }}>{it.icon}</span>}
            {it.label}
            <span
              style={{
                position: 'absolute',
                left: 8,
                right: 8,
                bottom: -1,
                height: 2,
                background: on ? 'var(--kk-black)' : 'transparent',
                transition: 'background-color var(--dur-base) var(--ease-standard)'
              }}
            />
          </button>
        );
      })}
    </div>
  );
};
