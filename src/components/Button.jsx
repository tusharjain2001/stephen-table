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
  // Mobile (base) sizes come from the Figma mobile frames (Implementation
  // Plan §3/§4.4); `md:` restores every value exactly as it was before the
  // mobile pass so ≥768 rendering is untouched.
  // 574:2 / 342:25 / 342:27 — all three are Home-only variants, and the
  // redesigned frame drops their desktop type a step (24→20, 20→16, 24→16).
  primary:
    'rounded-btn bg-s-btn px-[32px] py-[8px] font-sans text-[14px] font-semibold text-navy md:text-[20px]',
  'hero-primary':
    'rounded-btn bg-s-200 px-[32px] py-[8px] font-sans text-[14px] font-semibold uppercase text-navy md:bg-s-300 md:px-[44px] md:py-[12px] md:text-[16px] md:normal-case',
  'outline-light':
    'rounded-btn border-2 border-cream bg-transparent px-[32px] py-[8px] font-sans text-[14px] font-semibold uppercase text-white md:px-[44px] md:py-[12px] md:text-[16px] md:normal-case',
  // Figma frames these at exactly 39.211px tall (377:3068) with the stroke
  // drawn inside; a CSS border sits outside the padding box and would add
  // 4.3px, so the height is pinned instead. Mobile frame (662:9459) pins the
  // same shape at 33.6px tall / 15.22px type.
  'learn-more':
    'h-[33.6px] rounded-[7.6px] border-[1.9px] border-s-outline bg-transparent px-[30.4px] font-sans text-[15.22px] font-semibold capitalize text-navy md:h-[39.211px] md:rounded-[8.6px] md:border-[2.15px] md:px-[34.4px] md:text-[17.211px]',
  'learn-more-light':
    'h-[33.6px] rounded-[7.6px] border-[1.9px] border-white bg-transparent px-[30.4px] font-sans text-[15.22px] font-semibold capitalize text-white md:h-[39.211px] md:rounded-[8.6px] md:border-[2.15px] md:px-[34.4px] md:text-[17.211px]',
  submit:
    'rounded-[5.43px] bg-bl-700 px-[21.7px] py-[6.8px] font-sans text-[13.57px] font-semibold text-white md:rounded-btn md:px-[32px] md:py-[10px] md:text-[20px]',
  // 342:250 sizes the desktop bar's button at 16/0.8 tracking. The `lg:`
  // scope keeps the tablet slide-down menu and the mobile dropdown — both
  // hidden at lg+ — on their own 20/1px sizing.
  'donate-nav':
    'rounded-btn bg-s-800 px-[32px] py-[8px] font-sans text-[20px] font-bold uppercase tracking-[1px] text-white lg:text-[16px] lg:tracking-[0.8px]',
  // `md:w-fit` (not `w-auto`): several call sites (e.g. Get Involved's
  // "DONATE NOW", passed as a SectionHeader `actions` node) sit inside a
  // column flex with the default `align-items: stretch`, where `width:
  // auto` still stretches the item edge-to-edge. Only an explicit
  // non-stretching width (`fit-content`, matching the pre-mobile-pass
  // absence of any width utility here) reproduces the original desktop
  // shrink-to-content sizing.
  'fill-soft':
    'w-full rounded-btn bg-s-200 px-[32px] py-[8px] font-sans text-[14px] font-semibold capitalize text-navy md:w-fit md:text-[24px]',
  // Figma frames this at 47px, same as its filled sibling (363:225 /
  // 363:228) — the stroke is drawn inside, so the CSS border must not add
  // its 4px on top of the 8+8 padding.
  'outline-soft':
    'h-[47px] w-full rounded-btn border border-[#8db2a1] bg-transparent px-[32px] font-sans text-[14px] font-semibold capitalize tracking-[0.7px] text-navy md:w-fit md:border-2 md:text-[24px] md:tracking-[1.2px]',
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
