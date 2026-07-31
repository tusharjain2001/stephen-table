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

/**
 * Working FAQ accordion, first item open by default.
 *
 * Props:
 * - `faqs`             — optional override array of `{ question, answer }`
 * - `excludeQuestions` — question strings to omit (Get Involved drops
 *                        "How can I support Stephen's Table?")
 * - `eyebrowClassName` — color override for the eyebrow label; defaults to
 *                        `text-bl-500`, use `text-navy` on Get Involved
 * - `className`        — extra classes on the outer <section>
 */
function FaqSection({
  faqs = DEFAULT_FAQS,
  excludeQuestions = [],
  eyebrowClassName = 'text-bl-500',
  className = '',
}) {
  const items = faqs.filter((item) => !excludeQuestions.includes(item.question));
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      className={`flex w-full flex-col items-center gap-[36px] px-6 py-16 md:px-10 xl:px-6 xl:py-[91px] ${className}`}
    >
      <h2 className={`w-full max-w-[1300px] text-left font-sans text-[20px] font-bold uppercase ${eyebrowClassName}`}>
        Frequently Asked Questions
      </h2>

      <div className="flex w-full max-w-[1300px] flex-col gap-[16px]">
        {/* Figma 378:3173 — a collapsed row is exactly the 71px toggle height
            with the question centered in it and no vertical padding; an open
            row is 24 + (question 23 + 12 + answer 52) + 24 = 135, with the
            toggle pinned to the top so it overlaps the answer instead of
            stretching the row. Hence the absolutely positioned toggle: in
            flow it would force every open row to at least 24 + 71. */}
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          // Figma strokes sit inside the frame, so the rule must not add to
          // the 71/135 row height — inset shadow, not border-b.
          return (
            <div
              key={item.question}
              className="relative shadow-[inset_0_-1px_0_var(--color-gray-9c)]"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                aria-expanded={isOpen}
                className={`flex w-full items-center pr-[83px] text-left ${
                  isOpen
                    ? 'py-[16px] md:pt-[24px] md:pb-0'
                    : 'px-[10px] py-[16px] md:min-h-[71px] md:py-0'
                }`}
              >
                <span className="font-sans text-[18px] leading-[26px] tracking-[-0.24px] text-ink md:text-[24px] md:leading-[22.895px]">
                  {item.question}
                </span>
              </button>
              <img
                src={iconFaqToggle}
                alt=""
                aria-hidden="true"
                className={`pointer-events-none absolute right-0 size-[40px] transition-transform duration-300 ease-in-out md:size-[71px] ${
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
                  <p className="max-w-[892px] pb-[24px] pt-[12px] font-sans text-[18px] text-gray-67 md:text-[20px]">
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
