import { useState } from 'react';
import iconFaqToggle from '../assets/icons/icon-faq-toggle.svg';

/**
 * Default FAQ copy shared across the 5 pages that use this section
 * (Implementation Plan §3.1 "FaqSection"). Only the first question's
 * answer is authored in the Figma file (the rest are only ever shown
 * collapsed there); the remaining answers below are reasonable
 * placeholder copy pending real content.
 */
const DEFAULT_FAQS = [
  {
    question: "Who can receive support from Stephen's Table?",
    answer:
      "Partner with Stephen's Table to create lasting community impact through volunteering, sponsorships, and collaborative initiatives.",
  },
  {
    question: 'How can I request help?',
    answer:
      'Reach out through our Nominate a Senior form or give us a call, and a member of our team will follow up to understand your needs and next steps.',
  },
  {
    question: 'Can I nominate a family member or friend?',
    answer:
      'Yes — anyone can nominate a senior in need using our online nomination form, whether you are a family member, friend, or neighbor.',
  },
  {
    question: 'How can I become a volunteer?',
    answer:
      'Visit our Get Involved page to browse individual and corporate volunteering opportunities and submit your interest online.',
  },
  {
    question: "How can I support Stephen's Table?",
    answer:
      'You can support our mission through one-time or monthly donations, in-kind gifts, tribute gifts, or by volunteering your time.',
  },
  {
    question: 'Where do you provide services?',
    answer:
      'We currently serve seniors and families throughout our Colorado service area — reach out to confirm coverage in your community.',
  },
];

// Tailwind's JIT scanner only generates a utility class when it sees the
// exact literal token somewhere in a scanned source file — it can't see
// runtime string concatenation, so building "md:" + eyebrowClassName at
// render time silently produces a class with NO matching CSS rule (verified
// via the compiled stylesheet: no `.md\:text-navy` rule existed even though
// the class name was present in the DOM). Known overrides are mapped to
// their literal, statically-scannable `md:`-prefixed class instead — add a
// new entry here if a future page needs a different eyebrow override color.
const EYEBROW_MD_OVERRIDES = {
  'text-navy': 'md:text-navy',
};

/**
 * Working FAQ accordion, first item open by default.
 *
 * Props:
 * - `faqs`             — optional override array of `{ question, answer }`
 * - `excludeQuestions` — question strings to omit (Get Involved drops
 *                        "How can I support Stephen's Table?")
 * - `eyebrowClassName` — color override for the eyebrow label, applied from
 *                        `md:` up only (e.g. `text-navy` on Get Involved);
 *                        below `md` the eyebrow is always `text-bl-500`
 *                        (plan §4.8 — Get Involved shows navy on desktop but
 *                        blue on its mobile frame). Must be a key of
 *                        `EYEBROW_MD_OVERRIDES` above (see note there).
 * - `className`        — extra classes on the outer <section>
 */
function FaqSection({
  faqs = DEFAULT_FAQS,
  excludeQuestions = [],
  eyebrowClassName = '',
  className = '',
}) {
  const items = faqs.filter((item) => !excludeQuestions.includes(item.question));
  const [openIndex, setOpenIndex] = useState(0);

  const mdEyebrowClassName = EYEBROW_MD_OVERRIDES[eyebrowClassName.trim()] ?? '';

  return (
    <section
      className={`flex w-full flex-col items-center gap-[24px] px-[16px] py-[60px] md:gap-[36px] md:px-10 md:py-16 xl:px-6 xl:py-[91px] ${className}`}
    >
      <h2
        className={`w-full max-w-[1300px] text-left font-sans text-[16px] font-bold uppercase text-bl-500 md:text-[20px] ${mdEyebrowClassName}`}
      >
        Frequently Asked Questions
      </h2>

      <div className="flex w-full max-w-[1300px] flex-col gap-[16px]">
        {/* Figma 378:3173 — a collapsed row is exactly the 71px toggle height
            with the question centered in it and no vertical padding; an open
            row is 24 + (question 23 + 12 + answer 52) + 24 = 135, with the
            toggle pinned to the top so it overlaps the answer instead of
            stretching the row. Hence the absolutely positioned toggle: in
            flow it would force every open row to at least 24 + 71. Mobile
            (662:9459) uses a plainer flow: py-16 rows, a lighter #d9d9d9
            rule, and a smaller 35px toggle. */}
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          // Figma strokes sit inside the frame, so the rule must not add to
          // the 71/135 row height — inset shadow, not border-b. Mobile rule
          // color is lighter (#d9d9d9 vs #9c9999 at md+).
          return (
            <div
              key={item.question}
              className="relative shadow-[inset_0_-1px_0_#d9d9d9] md:shadow-[inset_0_-1px_0_var(--color-gray-9c)]"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                aria-expanded={isOpen}
                className={`flex w-full items-center py-[16px] pr-[48px] text-left md:pr-[83px] ${
                  isOpen
                    ? 'md:pt-[24px] md:pb-0'
                    : 'md:min-h-[71px] md:px-[10px] md:py-0'
                }`}
              >
                <span
                  className={`font-sans text-[20px] leading-[22.895px] tracking-[-0.2px] text-ink md:text-[24px] md:leading-[22.895px] md:tracking-[-0.24px] ${
                    isOpen ? 'font-medium md:font-normal' : ''
                  }`}
                >
                  {item.question}
                </span>
              </button>
              <img
                src={iconFaqToggle}
                alt=""
                aria-hidden="true"
                className={`pointer-events-none absolute right-0 size-[35px] transition-transform duration-300 ease-in-out md:size-[71px] ${
                  isOpen
                    ? 'top-[16px] md:top-[24px]'
                    : 'top-1/2 -translate-y-1/2 rotate-45 md:top-0 md:translate-y-0'
                }`}
              />
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="min-h-0 overflow-hidden">
                  <p className="max-w-[273px] pb-[24px] pt-[12px] font-sans text-[16px] text-gray-67 md:max-w-[892px] md:text-[20px]">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default FaqSection;
