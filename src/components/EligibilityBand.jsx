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
      className={`flex min-h-[511px] w-full flex-col justify-center bg-b-500 px-6 py-12 md:px-10 lg:px-12 xl:px-[72px] xl:py-[64px] ${className}`}
    >
      {/* Two-column grid (Figma 363:151): the chip sits in a max-content
          column and the intro line + bullet list share the second column, so
          the bullets stay flush with the intro instead of running back to the
          section's left edge. Below md it collapses to a single stack. */}
      <div className="grid gap-y-[27px] md:grid-cols-[max-content_1fr] md:items-center md:gap-x-10 xl:gap-x-16 2xl:gap-x-[226px]">
        <SectionChip
          variant="onBrown"
          className="justify-self-start md:col-start-1 md:row-start-1"
        >
          Eligibility Criteria
        </SectionChip>
        <p className="min-w-0 font-sans text-[20px] text-white md:col-start-2 md:row-start-1 md:text-[22px] xl:text-[24px]">
          {intro}
        </p>

        {/* Figma runs the bullets as one continuous 37px-leading block — no
            extra spacing between items. */}
        <ul className="min-w-0 md:col-start-2 md:row-start-2">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-[16px] xl:gap-[15px]">
              <span className="mt-[11px] size-[10px] shrink-0 rotate-45 bg-white xl:mt-[13px]" />
              <span className="font-sans text-[18px] leading-[28px] text-white md:text-[20px] xl:text-[24px] xl:leading-[37px]">
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
