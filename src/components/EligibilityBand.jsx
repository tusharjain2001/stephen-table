import SectionChip from './SectionChip.jsx';

/** Real copy from the Figma Services page (identical on Nominate a Senior). */
const DEFAULT_ITEMS = [
  'Be an older adult of 60 years or more residing in Colorado.',
  'Require assistance with everyday home or community-based needs.',
  'Be seeking practical support, companionship, or access to community resources.',
  'Complete a service request or be nominated by a family member, caregiver, or community member.',
  'Meet program availability and service area requirements.',
];

/**
 * Brown "Eligibility Criteria" band used on Services and Nominate a Senior
 * (Implementation Plan §3.1 "EligibilityBand"). Copy is identical on both
 * pages, so sensible defaults are provided; override via props if needed.
 *
 * Props:
 * - `intro`     — intro line under the chip
 * - `items`     — array of bullet strings
 * - `className` — extra classes on the outer <section>
 */
function EligibilityBand({
  intro = 'To be eligible for support, individuals should:',
  items = DEFAULT_ITEMS,
  className = '',
}) {
  return (
    <section
      className={`flex w-full flex-col justify-center bg-b-500 px-[16px] py-[60px] md:min-h-[511px] md:px-10 md:py-12 lg:px-12 xl:px-[72px] xl:py-[64px] ${className}`}
    >
      {/* Two-column grid (Figma 363:151): the chip sits in a max-content
          column and the intro line + bullet list share the second column, so
          the bullets stay flush with the intro instead of running back to the
          section's left edge. Below md it collapses to a single stack — the
          mobile frame (662:9459) groups chip+intro with their own 24px gap
          (via a `contents`-at-md wrapper so the md+ grid positioning below is
          untouched) and widens the gap to the list to 40px. */}
      <div className="mx-auto grid w-full max-w-[1296px] gap-y-[40px] md:grid-cols-[max-content_1fr] md:items-center md:gap-x-10 md:gap-y-[27px] xl:gap-x-16 2xl:gap-x-[226px]">
        <div className="flex flex-col gap-[24px] md:contents">
          <SectionChip
            variant="onBrown"
            // `self-start` is the base-tier fix: below md the wrapper is a
            // flex column, whose default `stretch` blew the chip out to the
            // full band width — `justify-self-start` does nothing in flex.
            // `md:self-auto` hands alignment back to the grid's `items-center`
            // from md up, so the desktop chip is unchanged.
            className="self-start justify-self-start md:self-auto md:col-start-1 md:row-start-1"
          >
            Eligibility Criteria
          </SectionChip>
          <p className="min-w-0 font-sans text-[16px] text-white md:col-start-2 md:row-start-1 md:text-[22px] xl:text-[24px] 2xl:w-[819px]">
            {intro}
          </p>
        </div>

        {/* Figma runs the bullets as one continuous 37px-leading block at
            md+ — no extra spacing between items. The 797px measure
            (363:118) is load bearing: it wraps items 3 and 4 onto two
            lines, so the block is 7 lines / 259px, not 5 lines / 185px.
            Left unbounded it stops wrapping above ~1440 and the band goes
            hollow. Mobile instead stacks items with an explicit 19px gap. */}
        <ul className="flex min-w-0 flex-col gap-[19px] md:block md:col-start-2 md:row-start-2">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-[12.5px] md:gap-[16px] xl:gap-[15px]">
              <span className="mt-[3px] size-[10px] shrink-0 rotate-45 bg-white md:mt-[11px] xl:mt-[13px]" />
              <span className="font-sans text-[16px] leading-[17px] text-white md:text-[20px] md:leading-[28px] xl:text-[24px] xl:leading-[37px] 2xl:w-[797px]">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default EligibilityBand;
