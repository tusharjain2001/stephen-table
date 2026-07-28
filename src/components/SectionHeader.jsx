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
      <div className={`flex items-start justify-between px-[72px] ${className}`}>
        <SectionChip variant={chipVariant}>{chipLabel}</SectionChip>
        <div className="flex flex-col gap-[40px]" style={{ width: ledeWidth }}>
          {lede && (
            <p className={`font-sans text-[24px] text-gray-59 ${ledeClassName}`}>{lede}</p>
          )}
          {actions}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center px-[72px] ${className}`}
      style={{ gap }}
    >
      <SectionChip variant={chipVariant} className="shrink-0 whitespace-nowrap">
        {chipLabel}
      </SectionChip>
      {lede && (
        <p
          className={`shrink-0 font-sans text-[24px] text-gray-59 ${ledeClassName}`}
          style={{ width: ledeWidth }}
        >
          {lede}
        </p>
      )}
    </div>
  );
}

export default SectionHeader;
