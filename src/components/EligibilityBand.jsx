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
      className={`flex min-h-[511px] w-full flex-col justify-center gap-[27px] bg-b-500 px-6 py-12 md:px-10 lg:px-12 xl:px-[72px] xl:py-[64px] ${className}`}
    >
      <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-10 xl:gap-16 2xl:gap-[226px]">
        <SectionChip variant="onBrown" className="shrink-0">Eligibility Criteria</SectionChip>
        <p className="min-w-0 max-w-full font-sans text-[20px] text-white md:text-[22px] xl:max-w-[819px] xl:text-[24px] xl:shrink 2xl:w-[819px]">{intro}</p>
      </div>

      <ul className="flex flex-col gap-[13px]">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-[16px] xl:gap-[25px]">
            <span className="mt-[13px] size-[10px] shrink-0 rotate-45 bg-white" />
            <span className="font-sans text-[18px] leading-[28px] text-white md:text-[20px] xl:text-[24px] xl:leading-[37px]">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default EligibilityBand;
