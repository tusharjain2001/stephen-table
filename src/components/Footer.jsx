import { Link } from 'react-router-dom';
import iconFacebook from '../assets/icons/icon-facebook.svg';
import iconInstagram from '../assets/icons/icon-instagram.svg';
import iconEmail from '../assets/icons/icon-email-footer.svg';
import iconPhoneSmall from '../assets/icons/icon-phone-small.svg';
import iconDot from '../assets/icons/dot.svg';

const LINK_COLUMNS = [
  {
    heading: 'NGO',
    items: [
      { label: 'Home', to: '/' },
      { label: 'About Us', to: '/about' },
      { label: 'Volunteer Opportunities', to: '/get-involved' },
      { label: 'Get Involved', to: '/get-involved' },
      { label: 'Impact Stories', to: '/impact-stories' },
    ],
  },
  {
    heading: 'Our Programs',
    items: [
      { label: 'Practical Home Support', to: '/services' },
      { label: 'Fellowship', to: '/services' },
      { label: 'Community Connections', to: '/services' },
      { label: 'Get Help', to: '/nominate' },
    ],
  },
  {
    heading: 'Take Action',
    items: [
      { label: 'Volunteer', to: '/get-involved' },
      { label: 'Donate', to: '/get-involved' },
      { label: 'Nominate a Senior', to: '/nominate' },
      { label: 'Contact Us', to: '/contact' },
      { label: 'FAQs', to: '/#faq' },
    ],
  },
];

const LEGAL_LINKS = [
  { label: 'Terms of Service', to: '#' },
  { label: 'Privacy Policy', to: '#' },
  { label: 'Accessibility', to: '#' },
];

/**
 * Site footer. Figma defines the ≥1280 desktop layout (Implementation Plan
 * §3.1 "Footer") and, as of the mobile pass, the 402px mobile frame (Batch 1
 * Task 3). The two layouts differ structurally in almost every dimension
 * (3-column link grid vs. stacked desktop columns, a mobile-only Address
 * line, a completely different bottom legal/social bar), so rather than
 * threading base-tier overrides through one shared tree, mobile renders as
 * its own sibling block (`md:hidden`) and the pre-mobile-pass desktop markup
 * moves — byte-for-byte — behind `hidden md:block` (§ mobile-pass mechanics).
 */
function Footer() {
  // The espresso box-shadow is a bleed, not decoration. The footer is the last
  // thing in the document and its bottom edge lands on a fractional CSS pixel
  // (the mobile block alone is 554.6 tall), so the last *device* row straddles
  // that edge: half `bg-espresso`, half the cream page canvas underneath. At an
  // integer DPR the blend rounds away, but at a fractional one — Windows
  // 125/175/225% display scaling, or a phone at DPR 2.625 — it renders as a
  // white hairline across the bottom of the footer. Padding can't fix it (the
  // seam just follows the new bottom edge); the shadow paints espresso *past*
  // the document bottom, and since shadows don't count toward scrollable
  // overflow, page height and every section total stay untouched.
  return (
    <footer className="w-full bg-espresso shadow-[0_4px_0_0_var(--color-espresso)]">
      {/* Mobile footer (<768, true mobile) — Figma mobile frame */}
      <div className="md:hidden">
        <div className="w-full px-[16px] pt-[60px] pb-[28px]">
          <div className="flex w-full max-w-[372px] flex-col items-start gap-[28px]">
            {/* 1. Logo + contact info + mini-divider + address */}
            <div className="flex w-full flex-col items-start gap-[22.16px]">
              <span className="font-neulis text-[20.313px] font-normal text-white">
                Stephen&apos;s Table
              </span>
              <div className="flex flex-col items-start gap-[8.31px]">
                <a
                  href="mailto:info@stephenstablecolorado.org"
                  className="flex items-center gap-[11.08px] font-sans text-[14px] leading-[29.545px] text-white underline"
                >
                  <img src={iconEmail} alt="" className="size-[18.466px]" aria-hidden="true" />
                  info@stephenstablecolorado.org
                </a>
                <a
                  href="tel:970-375-9179"
                  className="flex items-center gap-[11.08px] font-sans text-[14px] leading-[29.545px] text-white"
                >
                  <img src={iconPhoneSmall} alt="" className="size-[18.466px]" aria-hidden="true" />
                  970-375-9179
                </a>
                {/* Figma's mobile contact card ships placeholder values here
                    (volunteer@… / (970) 555-0123) — the real, live contact
                    details above are kept instead, per Batch 1 instructions. */}
                <div className="h-px w-[92.33px] bg-white" />
                <p className="w-[215px] font-sans text-[14px] leading-normal text-white">
                  <span className="font-bold">Address:</span> 123 Community Way, Fort Collins, CO
                  80524
                </p>
              </div>
            </div>

            {/* 2. Links, 3 columns side by side */}
            <div className="grid w-full grid-cols-3 gap-[28px]">
              {LINK_COLUMNS.map((column) => (
                <div key={column.heading} className="flex flex-col gap-[16px]">
                  <h3 className="whitespace-nowrap font-sans text-[16px] font-bold text-white">
                    {column.heading}
                  </h3>
                  <ul className="flex flex-col gap-[4px]">
                    {column.items.map((item) => (
                      <li key={item.label}>
                        <Link to={item.to} className="font-sans text-[12px] leading-[16px] text-white">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Bottom bar: full-width hairline + tiny legal row + socials.
            This is a11y-poor at 7px, but it is exactly what the Figma
            mobile frame specifies (scaled-down group) — implemented as
            designed rather than substituted. */}
        {/* Inset by 16px so the rule lines up with the legal row's `p-[16px]`
            rather than bleeding to the viewport edge. Mobile block only —
            the desktop rule below is untouched. */}
        <div className="mx-[16px] h-[0.5px] bg-white" />
        <div className="flex h-[80px] w-full flex-col items-start justify-center gap-[16px] p-[16px]">
          <div className="flex flex-wrap items-center gap-x-[6px] gap-y-[2px]">
            {LEGAL_LINKS.map((link) => (
              <span key={link.label} className="flex items-center gap-[6px]">
                <img src={iconDot} alt="" className="size-[1.1px]" aria-hidden="true" />
                <a href={link.to} className="font-sans text-[7px] leading-[5.575px] text-white">
                  {link.label}
                </a>
              </span>
            ))}
            <span className="font-sans text-[7px] leading-[5.575px] text-white">
              © 2026 Stephen&apos;s Table Colorado. All Rights Reserved.
            </span>
          </div>
          <div className="flex items-center gap-[7.8px]">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <img src={iconFacebook} alt="Facebook" className="size-[28.58px]" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <img src={iconInstagram} alt="Instagram" className="size-[28.58px]" />
            </a>
          </div>
        </div>
      </div>

      {/* Desktop/tablet footer (≥768) — pre-mobile-pass markup, kept
          byte-identical; only wrapped in `hidden md:block` so base can
          render the mobile block above instead. */}
      <div className="hidden md:block">
        <div className="mx-auto max-w-[1440px] px-6 pt-10 md:px-10 md:pt-14 lg:px-16 xl:px-[128px] xl:pt-[80px]">
          <div className="flex flex-col items-start gap-10 md:gap-12 lg:flex-row lg:gap-0">
            {/* Left column: logo + contact info */}
            <div className="flex w-full flex-col gap-[24px] lg:w-[352px]">
              <span className="font-neulis text-[22px] font-normal text-white">
                Stephen&apos;s Table
              </span>
              <div className="flex flex-col gap-[9px]">
                <a
                  href="mailto:info@stephenstablecolorado.org"
                  className="flex items-center gap-[12px] font-sans text-[18px] leading-[32px] text-white underline"
                >
                  <img src={iconEmail} alt="" className="size-[20px]" aria-hidden="true" />
                  info@stephenstablecolorado.org
                </a>
                <a
                  href="tel:970-375-9179"
                  className="flex items-center gap-[12px] font-sans text-[18px] leading-[32px] text-white"
                >
                  <img src={iconPhoneSmall} alt="" className="size-[20px]" aria-hidden="true" />
                  970-375-9179
                </a>
              </div>
            </div>

            {/* Links block */}
            {/* Figma's two footer frames overlap: the top block (342:112) is
                349 tall but the bottom bar (342:68) starts at 344.198, so the
                80px bottom padding it draws only contributes 74.2 to the
                443.349 total. Flow layout can't overlap, so the padding carries
                the difference. */}
            <div className="grid w-full grid-cols-1 gap-8 pb-10 sm:grid-cols-3 sm:gap-6 lg:ml-[124px] lg:flex lg:flex-1 lg:gap-[72px] lg:pb-[80px] xl:pb-[74.2px]">
              {LINK_COLUMNS.map((column) => (
                <div key={column.heading} className="flex flex-col gap-[16px]">
                  <h3 className="font-sans text-[20px] font-bold text-white">
                    {column.heading}
                  </h3>
                  <ul className="flex flex-col gap-[8px]">
                    {column.items.map((item) => (
                      <li key={item.label}>
                        {/* Figma 342:131: list items are 23px tall on a 31px
                            pitch (leading normal + the 8px gap), unlike the
                            contact rows above which are explicitly 32px. */}
                        <Link
                          to={item.to}
                          className="font-sans text-[18px] leading-[23px] text-white"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto h-px w-[calc(100%-48px)] max-w-[1365px] bg-white md:w-[calc(100%-80px)] 2xl:w-[1365px]" />

        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-4 p-6 md:flex-row md:p-8 xl:h-[99.15px] xl:p-[32px]">
          <div className="flex items-center gap-[12px]">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <img src={iconFacebook} alt="Facebook" className="size-[44px]" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <img src={iconInstagram} alt="Instagram" className="size-[44px]" />
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-[24px] gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <span key={link.label} className="flex items-center gap-[24px]">
                <a href={link.to} className="font-sans text-[20px] leading-[20px] text-white">
                  {link.label}
                </a>
                <img src={iconDot} alt="" className="size-[4px]" aria-hidden="true" />
              </span>
            ))}
            <span className="text-center font-sans text-[20px] leading-[20px] text-white">
              © 2026 Stephen&apos;s Table Colorado. All Rights Reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
