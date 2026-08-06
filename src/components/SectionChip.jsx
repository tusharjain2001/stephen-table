/**
 * Small pill "chip" used at the top of most page sections
 * (Implementation Plan §3.1 "SectionChip").
 *
 * Props:
 * - `variant` — `'beige'` (default) | `'blue'` | `'onBrown'` | `'green-tint'` |
 *               `'green-solid'` (the latter two added for the home redesign,
 *               plan §3.4) | `'green-67'` | `'green-34'` | `'green-borderless'` |
 *               `'beige-warm'` (added for the maroon rollout to About/
 *               Services/Nominate/Get Involved/Impact/Blog)
 * - `className` — extra classes
 * - `children` — chip label text
 */

const VARIANTS = {
  beige: 'border-bl-300 text-bl-900 bg-[rgba(229,235,242,0.34)]',
  blue: 'border-bl-500 text-bl-500 bg-[rgba(255,255,255,0.32)]',
  onBrown: 'border-white text-white bg-[rgba(255,255,255,0.07)]',
  'green-tint': 'border-bl-300 text-bl-900 bg-[rgba(182,210,197,0.3)]',
  'green-solid': 'border-bl-300 text-black bg-[#e9efe8]',
  'green-67': 'border-bl-300 text-bl-900 bg-[rgba(233,239,232,0.67)]',
  'green-34': 'border-bl-300 text-bl-900 bg-[rgba(233,239,232,0.34)]',
  'green-borderless': 'border-[#e9efe8] text-bl-900 bg-[#e9efe8]',
  'beige-warm': 'border-wb-400 text-bl-900 bg-[rgba(232,220,198,0.2)]',
};

function SectionChip({ variant = 'beige', className = '', children }) {
  const variantClasses = VARIANTS[variant] ?? VARIANTS.beige;

  return (
    <span
      // Figma draws the chip 47px tall (24px label + 8+8 padding + 2+2
      // border = a 27px line box). Playfair Display stands in for Lettertype
      // and its normal leading is 32, which made every chip 52. Mobile frame
      // (662:9459) pins the same shape at 20px/24px/8px.
      //
      // Tracking is a deliberate override of the frame: Figma authors these
      // labels at 1px / 1.2px (5% of the font size at both tiers) and we ship
      // 0. That narrows every chip by ~1px per character — the chip is a hug
      // box, so only its own width moves; the section heights it sits in are
      // driven by its 47px height, which is unchanged.
      className={`inline-block rounded-btn border-2 px-[24px] py-[8px] font-display text-[20px] capitalize tracking-normal md:px-[24px] md:py-[8px] md:text-[24px] md:leading-[27px] ${variantClasses} ${className}`}
    >
      {children}
    </span>
  );
}

export default SectionChip;
