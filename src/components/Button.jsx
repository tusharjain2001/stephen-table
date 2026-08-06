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
  // The hero pair is pinned to 45px rather than padded to it. `outline-light`
  // carries a 2px CSS border, which sits *outside* the padding box — with the
  // same `py-[12px]` on both, the filled pill measured 44.8 and the outlined
  // one 48.8, so the row read as two different button sizes. Height + `py-0`
  // makes the stroke free, exactly as `learn-more` / `outline-soft` do.
  //
  // Base (<768) has exactly the same problem and needs exactly the same fix:
  // 803:6276 and 803:6278 are both 34 tall, but padded to it the filled pill
  // came out 34 and the outlined one 38 — visibly taller, and 2px off-centre
  // against its neighbour in an `items-center` row. Both are now pinned to
  // 34. The widths follow too: the frame is 129 / 120 with the stroke drawn
  // *inside*, so the outlined pill takes `px-[30px]` (30 + 2 + 56 + 2 + 30)
  // where the filled one keeps 32 (32 + 65 + 32).
  'hero-primary':
    'rounded-btn bg-s-200 h-[34px] px-[32px] py-0 font-sans text-[14px] font-semibold uppercase text-navy md:h-[45px] md:bg-s-300 md:px-[44px] md:py-0 md:text-[16px] md:normal-case',
  'outline-light':
    'rounded-btn h-[34px] border-2 border-cream bg-transparent px-[30px] py-0 font-sans text-[14px] font-semibold uppercase text-white md:h-[45px] md:px-[44px] md:py-0 md:text-[16px] md:normal-case',
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
  // The redraw takes both soft pills to 20px, which is what makes them 42
  // tall (8 + 26 + 8, stroke inside) rather than 47. Changed on the variant
  // rather than per call site: Services (both) and Get Involved (`fill-soft`)
  // are the only callers and all three frames now agree, and a `md:` override
  // in a className would tie with the variant's own `md:` rule on
  // specificity. Base (<768) keeps its own mobile-frame sizing.
  // Base (<768): 830:12453/12455 are both a flat 370 x 34 on an 8px gap, and
  // the stroke on the outlined one is inside that 34. It had been padded to
  // 34.23 and pinned to **47** respectively, so the row rendered as two
  // different-sized pills — the same stroke-inside trap the hero pair and the
  // mobile GET HELP / DONATE row already hit. Both pin 34 now; `md:h-auto`
  // hands `fill-soft` back to its padding so >=768 is byte-identical.
  // Base side padding is 42 (830:10091 is 178 wide around a 94 label), not 32.
  // It only shows on a hugging caller — Services' two pills are the frame's
  // full 370 at base, where the label centres and the padding never binds.
  'fill-soft':
    'h-[34px] w-full rounded-btn bg-s-200 px-[42px] py-[8px] font-sans text-[14px] font-semibold capitalize text-navy md:h-auto md:w-fit md:px-[32px] md:text-[20px]',
  'outline-soft':
    'h-[34px] w-full rounded-btn border border-[#8db2a1] bg-transparent px-[32px] font-sans text-[14px] font-semibold capitalize tracking-[0.7px] text-navy md:h-[42px] md:w-fit md:border-2 md:text-[20px] md:tracking-[1px]',
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
