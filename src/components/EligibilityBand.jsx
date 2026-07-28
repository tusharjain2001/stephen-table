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
      className={`flex min-h-[511px] w-full flex-col justify-center gap-[27px] bg-b-500 px-[72px] py-[64px] ${className}`}
    >
      <div className="flex items-center gap-[226px]">
        <SectionChip variant="onBrown">Eligibility Criteria</SectionChip>
        <p className="w-[819px] font-sans text-[24px] text-white">{intro}</p>
      </div>

      <ul className="flex flex-col gap-[13px]">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-[25px]">
            <span className="mt-[13px] size-[10px] shrink-0 rotate-45 bg-white" />
            <span className="font-sans text-[24px] leading-[37px] text-white">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default EligibilityBand;
