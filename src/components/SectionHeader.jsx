import SectionChip from './SectionChip.jsx';

/**
 * Chip + lede row that opens most page sections
 * (Implementation Plan §3.1 "SectionHeader").
 *
 * Props:
 * - `chipLabel`    — text inside the SectionChip
 * - `chipVariant`  — forwarded to SectionChip (`'beige' | 'blue' | 'onBrown'`)
 * - `lede`         — paragraph copy under/after the chip
 * - `ledeWidth`    — px width of the lede column (default 857; use 877 on
 *                    blue-background sections per plan §2.4)
 * - `ledeClassName`— extra classes for the lede paragraph (e.g. color
 *                    overrides on dark backgrounds)
 * - `gap`          — px gap between chip and lede when `align="center"`
 *                    (default 226; Impact Stories pages use 159/310)
 * - `align`        — `'center'` (default, stacked+centered) | `'between'`
 *                    (Services/Get Involved detail sections: chip left,
 *                    lede + actions right, `justify-between px-72`)
 * - `actions`      — optional node rendered under the lede (only used with
 *                    `align="between"`), e.g. a row of CTA buttons
 * - `className`    — extra classes on the outer wrapper
 *
 * Breakpoint note (plan §5, Task 14): the literal Figma gap/lede-width
 * numbers (up to 877px lede + up to 310px gap) only actually fit within a
 * 1440px frame. Tailwind's `xl` breakpoint starts at 1280, so those exact
 * values are held back to the `2xl` (1440) breakpoint — verified against
 * real overflow at 1280–1439 — while `xl` gets a smaller, still-flexible
 * gap and a `max-width` (not a fixed width) so the lede can shrink instead
 * of forcing a horizontal scrollbar.
 */
function SectionHeader({
  chipLabel,
  chipVariant = 'beige',
  lede,
  ledeWidth = 857,
  ledeClassName = '',
  gap = 226,
  align = 'center',
  actions,
  className = '',
}) {
  if (align === 'between') {
    return (
      <div
        className={`flex w-full flex-col items-start gap-6 px-6 md:px-10 lg:flex-row lg:justify-between lg:gap-8 xl:px-[72px] ${className}`}
      >
        <SectionChip variant={chipVariant} className="shrink-0">
          {chipLabel}
        </SectionChip>
        <div
          className="flex w-full min-w-0 flex-col gap-[24px] lg:max-w-[var(--sh-lede-w)] lg:gap-[40px] 2xl:w-[var(--sh-lede-w)]"
          style={{ '--sh-lede-w': `${ledeWidth}px` }}
        >
          {lede && (
            <p className={`font-sans text-[18px] text-gray-59 md:text-[24px] ${ledeClassName}`}>{lede}</p>
          )}
          {actions}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex w-full flex-col items-center gap-6 px-6 text-center md:px-10 md:text-left lg:flex-row lg:justify-center lg:gap-10 lg:text-left xl:gap-16 2xl:gap-[var(--sh-gap)] xl:px-[72px] ${className}`}
      style={{ '--sh-gap': `${gap}px` }}
    >
      <SectionChip variant={chipVariant} className="shrink-0">
        {chipLabel}
      </SectionChip>
      {lede && (
        <p
          className="min-w-0 max-w-full font-sans text-[18px] text-gray-59 md:text-[24px] lg:shrink lg:grow-0 lg:basis-auto lg:max-w-[var(--sh-lede-w)] 2xl:w-[var(--sh-lede-w)]"
          style={{ '--sh-lede-w': `${ledeWidth}px` }}
        >
          {lede}
        </p>
      )}
    </div>
  );
}

export default SectionHeader;
