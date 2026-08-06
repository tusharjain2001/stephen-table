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
 * - `ledeSize`     — px lede type size from `md` up (default 24). Services'
 *                    redrawn frame runs its ledes at 20 (363:165 / 363:224 —
 *                    2 lines x 26 = their 52px height); the other callers'
 *                    frames have not been re-fetched, so 24 keeps them
 *                    byte-identical. Driven off a variable rather than an
 *                    `md:`-prefixed className override, which would tie on
 *                    specificity with the rule it means to replace.
 *                    Deliberately `md:` and not `xl:` — the redesign's type
 *                    is the *design*, not a wide-screen refinement, so it has
 *                    to hold at every tier above the mobile frames. Scoped to
 *                    `xl` it was invisible below 1280, which on Windows at
 *                    125% scaling is a maximised 1600px window.
 * - `ledeClassName`— extra classes for the lede paragraph (e.g. color
 *                    overrides on dark backgrounds)
 * - `gap`          — px gap between chip and lede when `align="center"`
 *                    (default 226; Impact Stories pages use 159/310)
 * - `align`        — `'center'` (default, stacked+centered) | `'between'`
 *                    (Services/Get Involved detail sections: chip left,
 *                    lede + actions right, `justify-between px-72`)
 * - `mobileAlign`  — `'left'` (default) | `'center'`. Only relevant with
 *                    `align="center"`: below `md` the chip+lede always
 *                    stack, but most pages (Home, About, Get Involved
 *                    Volunteering) keep them left-aligned with a 24px gap,
 *                    while Impact Stories/Blogs want them centered with a
 *                    16px gap (plan §4.6) — pass `mobileAlign="center"` for
 *                    those. `align="between"` sections (Services) always
 *                    stack centered on mobile regardless of this prop.
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
  // Base-tier-only chip palette; forwarded to SectionChip, which re-emits
  // `chipVariant` behind `md:`. Omit and the chip is one palette everywhere.
  mobileChipVariant,
  lede,
  ledeWidth = 857,
  ledeSize = 24,
  ledeClassName = '',
  gap = 226,
  align = 'center',
  mobileAlign = 'left',
  actions,
  className = '',
}) {
  if (align === 'between') {
    // Mobile (base): the Services subsections (plan §6.3) stack chip+lede
    // centered with a 16px gap; `md:` restores the original left-aligned
    // chip-left/lede-right row untouched.
    return (
      <div
        className={`flex w-full flex-col items-center gap-[16px] px-[16px] text-center md:items-start md:gap-6 md:px-10 md:text-left lg:flex-row lg:justify-between lg:gap-8 xl:px-[72px] ${className}`}
      >
        <SectionChip variant={chipVariant} mobileVariant={mobileChipVariant} className="shrink-0">
          {chipLabel}
        </SectionChip>
        <div
          className="flex w-full min-w-0 flex-col gap-[24px] lg:max-w-[var(--sh-lede-w)] lg:gap-[40px] 2xl:w-[var(--sh-lede-w)]"
          style={{ '--sh-lede-w': `${ledeWidth}px`, '--sh-lede-size': `${ledeSize}px` }}
        >
          {lede && (
            <p
              className={`font-sans text-[16px] text-gray-59 md:text-[length:var(--sh-lede-size)] ${ledeClassName}`}
            >
              {lede}
            </p>
          )}
          {actions}
        </div>
      </div>
    );
  }

  const isMobileCentered = mobileAlign === 'center';

  return (
    <div
      className={`flex w-full flex-col px-[16px] md:items-center md:gap-6 md:px-10 md:text-left lg:flex-row lg:justify-center lg:gap-10 lg:text-left xl:gap-16 2xl:gap-[var(--sh-gap)] xl:px-[72px] ${
        isMobileCentered ? 'items-center gap-[16px] text-center' : 'items-start gap-[24px] text-left'
      } ${className}`}
      style={{ '--sh-gap': `${gap}px` }}
    >
      <SectionChip variant={chipVariant} className="shrink-0">
        {chipLabel}
      </SectionChip>
      {lede && (
        <p
          className="min-w-0 max-w-full font-sans text-[16px] text-gray-59 md:text-[length:var(--sh-lede-size)] lg:shrink lg:grow-0 lg:basis-auto lg:max-w-[var(--sh-lede-w)] 2xl:w-[var(--sh-lede-w)]"
          style={{ '--sh-lede-w': `${ledeWidth}px`, '--sh-lede-size': `${ledeSize}px` }}
        >
          {lede}
        </p>
      )}
    </div>
  );
}

export default SectionHeader;
