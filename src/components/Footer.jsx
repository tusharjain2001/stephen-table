import { Link } from 'react-router-dom';
import logoFooter from '../assets/images/newlogofooter.svg';
import iconFacebook from '../assets/icons/icon-facebook.svg';
import iconInstagram from '../assets/icons/icon-instagram.svg';
import iconEmail from '../assets/icons/icon-email-footer.svg';
import iconPhoneSmall from '../assets/icons/icon-phone-small.svg';
import iconDot from '../assets/icons/dot.svg';

// 799:4199 / 799:4206 / 799:4213. The redraw re-cut the first and third
// columns without touching the second: "NGO" became "Our Organisation" and
// lost Get Involved + Impact Stories to Take Action, which in turn gave up
// FAQs to it. Take Action is now the tallest column at six items, and it is
// what sets the top block's 220px height.
const LINK_COLUMNS = [
  {
    heading: 'Our Organisation',
    items: [
      { label: 'Home', to: '/' },
      { label: 'About Us', to: '/about' },
      { label: 'Volunteer Opportunities', to: '/get-involved' },
      { label: 'FAQs', to: '/#faq' },
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
      { label: 'Get Involved', to: '/get-involved' },
      { label: 'Impact Stories', to: '/impact-stories' },
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
 * its own sibling block (`md:hidden`) and the desktop markup sits behind
 * `hidden md:block` (§ mobile-pass mechanics).
 *
 * `799:4113` re-drew the desktop frame. It is still 443 tall, but it is now
 * a plain centred stack rather than the old overlapping-frames arrangement:
 * 57 padding, a 220 top block, 32, the rule, 32, a 44 bottom bar, 57. The
 * background moved espresso → `m-900` (#260000) and the wordmark became the
 * crest mark. See the notes at each landmark below.
 */
function Footer() {
  // The dark box-shadow is a bleed, not decoration. The footer is the last
  // thing in the document and its bottom edge lands on a fractional CSS pixel
  // (the mobile block alone is 554.6 tall), so the last *device* row straddles
  // that edge: half footer, half the cream page canvas underneath. At an
  // integer DPR the blend rounds away, but at a fractional one — Windows
  // 125/175/225% display scaling, or a phone at DPR 2.625 — it renders as a
  // white hairline across the bottom of the footer. Padding can't fix it (the
  // seam just follows the new bottom edge); the shadow paints the footer colour
  // *past* the document bottom, and since shadows don't count toward scrollable
  // overflow, page height and every section total stay untouched.
  return (
    <footer className="w-full bg-m-900 shadow-[0_4px_0_0_var(--color-m-900)]">
      {/* Mobile footer (<768, true mobile) — Figma mobile frame. Not re-drawn
          by 799:4113, so only the two things that are page-wide follow it up:
          the crest mark replaces the wordmark, and the column contents come
          from the shared LINK_COLUMNS. */}
      <div className="md:hidden">
        <div className="w-full px-[16px] pt-[60px] pb-[28px]">
          <div className="flex w-full max-w-[372px] flex-col items-start gap-[28px]">
            {/* 1. Logo + contact info + mini-divider + address */}
            <div className="flex w-full flex-col items-start gap-[22.16px]">
              <img src={logoFooter} alt="Stephen's Table" className="h-[60px] w-auto" />
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
                  <h3 className="font-sans text-[16px] font-bold text-white">
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

      {/* Desktop/tablet footer (≥768).
          799:4113 is a fixed 443 box whose three children are centred on it
          with a 32 gap, which works out to 57 of clearance top and bottom
          (57 + 220 + 32 + 1 + 32 + 44 + 57). Expressing it as padding + gap
          rather than a pinned height means the stack still grows correctly
          when the columns wrap below the design width.
          The three children each own their width, so the wrapper carries no
          horizontal padding: the top block gutters at 128, the rule is 1320
          (60), and the bottom bar gutters at 56. */}
      <div className="hidden md:block">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-[32px] py-10 md:py-14 xl:py-[57px]">
          {/* Top block — 799:4114, 220 tall, its 1184 of content centred in
              1440. `xl:px-[128px]` leaves exactly that, and the left column's
              352 + 124 + the columns' 708 fills it with nothing over. */}
          <div className="flex w-full flex-col items-start gap-10 px-6 md:gap-12 md:px-10 lg:flex-row lg:gap-0 lg:px-16 xl:px-[128px]">
            {/* Left column: crest + contact info */}
            <div className="flex w-full flex-col gap-[24px] lg:w-[352px] lg:shrink-0">
              {/* 799:4116 is 125 × 85.482; the export rounds its box up to
                  125 × 86 and leaves the artwork where it was, so it renders
                  at the SVG's own size rather than being squashed to 85.482.
                  This mark is the *inverted* cut — white artwork knocked out
                  in #260000 — so it only reads on this background. */}
              <img
                src={logoFooter}
                alt="Stephen's Table"
                className="h-[64px] w-auto lg:h-[72px] xl:h-[86px] xl:w-[125px]"
              />
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

            {/* Links block — 799:4198, three hugging columns on a 72 gap that
                measure 708 together. `lg:flex-1` resolves to exactly that at
                1440, so any slack it picks up below the design width lands
                after the last column rather than inside the gaps. */}
            <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6 lg:ml-[124px] lg:flex lg:flex-1 lg:gap-[72px]">
              {LINK_COLUMNS.map((column) => (
                <div key={column.heading} className="flex flex-col gap-[16px]">
                  <h3 className="font-sans text-[20px] font-bold text-white">
                    {column.heading}
                  </h3>
                  <ul className="flex flex-col gap-[8px]">
                    {column.items.map((item) => (
                      <li key={item.label}>
                        {/* 799:4201: list items are 23px tall on a 31px pitch
                            (leading normal + the 8px gap), unlike the contact
                            rows above which are explicitly 32px. */}
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

          {/* 799:4222 — 1320 wide at x=60, i.e. a 60 gutter, narrower than the
              1440 frame but wider than the 1184 content above it. */}
          <div className="h-px w-[calc(100%-48px)] bg-white md:w-[calc(100%-80px)] 2xl:w-[1320px]" />

          {/* 799:4223 — 44 tall, socials and the legal row 222 apart with the
              pair centred, which puts the gutters at 56. */}
          <div className="flex w-full flex-col items-center justify-between gap-4 px-6 md:flex-row md:px-10 lg:px-14 2xl:justify-center 2xl:gap-[222px] 2xl:px-0">
            <div className="flex shrink-0 items-center gap-[12px]">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <img src={iconFacebook} alt="Facebook" className="size-[44px]" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <img src={iconInstagram} alt="Instagram" className="size-[44px]" />
              </a>
            </div>

            {/* 799:4251/4255/4259 put the bullet *before* its label on an 8px
                gap, and the copyright carries none — the old markup trailed
                each label with one instead. */}
            <div className="flex flex-wrap items-center justify-center gap-x-[24px] gap-y-2">
              {LEGAL_LINKS.map((link) => (
                <span key={link.label} className="flex items-center gap-[8px]">
                  <img src={iconDot} alt="" className="size-[4px]" aria-hidden="true" />
                  <a href={link.to} className="font-sans text-[20px] leading-[20px] text-white">
                    {link.label}
                  </a>
                </span>
              ))}
              <span className="text-center font-sans text-[20px] leading-[20px] text-white">
                © 2026 Stephen&apos;s Table Colorado. All Rights Reserved.
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
