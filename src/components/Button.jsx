/**
 * Shared button primitive covering every button treatment used across the
 * site (see Implementation Plan §3.1 "Buttons").
 *
 * Props:
 * - `as`      — element/component to render (default `'button'`). Pass
 *               `Link` (react-router-dom) for internal navigation or `'a'`
 *               for plain anchors.
 * - `variant` — one of: `primary`, `hero-primary`, `outline-light`,
 *               `learn-more`, `learn-more-light`, `submit`, `donate-nav`.
 * - `className` — extra classes merged onto the variant's base classes.
 * - `type`    — only applied when `as === 'button'`; defaults to
 *               `'submit'` for the `submit` variant, `'button'` otherwise.
 * - all other props are forwarded to the rendered element (e.g. `to`,
 *   `href`, `onClick`, `disabled`).
 */

const VARIANTS = {
  primary:
    'rounded-btn bg-s-btn px-[32px] py-[8px] font-sans text-[24px] font-semibold text-navy',
  'hero-primary':
    'rounded-btn bg-s-300 px-[44px] py-[12px] font-sans text-[20px] font-semibold text-navy',
  'outline-light':
    'rounded-btn border-2 border-cream bg-transparent px-[44px] py-[12px] font-sans text-[24px] font-semibold text-white',
  'learn-more':
    'rounded-[8.6px] border-[2.15px] border-s-outline bg-transparent px-[34.4px] py-[8.6px] font-sans text-[17.211px] font-semibold capitalize text-navy',
  'learn-more-light':
    'rounded-[8.6px] border-[2.15px] border-white bg-transparent px-[34.4px] py-[8.6px] font-sans text-[17.211px] font-semibold capitalize text-white',
  submit:
    'rounded-btn bg-bl-700 px-[32px] py-[10px] font-sans text-[20px] font-semibold text-white',
  'donate-nav':
    'rounded-btn bg-s-800 px-[32px] py-[8px] font-sans text-[20px] font-bold uppercase tracking-[1px] text-white',
  'fill-soft':
    'rounded-btn bg-s-200 px-[32px] py-[8px] font-sans text-[24px] font-semibold capitalize text-navy',
  'outline-soft':
    'rounded-btn border-2 border-[#8db2a1] bg-transparent px-[32px] py-[8px] font-sans text-[24px] font-semibold capitalize tracking-[1.2px] text-navy',
};

function Button({
  as: Component = 'button',
  variant = 'primary',
  type,
  className = '',
  children,
  ...props
}) {
  const variantClasses = VARIANTS[variant] ?? VARIANTS.primary;
  const resolvedType =
    Component === 'button' ? (type ?? (variant === 'submit' ? 'submit' : 'button')) : undefined;

  return (
    <Component
      type={resolvedType}
      className={`inline-flex items-center justify-center text-center transition-colors ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Button;
