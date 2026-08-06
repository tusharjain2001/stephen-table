import Button from '../components/Button.jsx';
import PageHero from '../components/PageHero.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import CtaBanner from '../components/CtaBanner.jsx';
import FaqSection from '../components/FaqSection.jsx';

import heroGetInvolved from '../assets/images/hero-get-involved.png';
// Filename typo ("invovled") is the export's, kept as-is rather than renaming
// the asset.
import heroGetInvolvedMobile from '../assets/mobile/mobile-get-invovled-hero.png';
import signupBanner from '../assets/images/signup-banner.png';
import ctaBannerImg from '../assets/images/cta-banner.png';

import iconProfileWhite from '../assets/icons/icon-profile-white.svg';
import iconGroup from '../assets/icons/new-icon-group.svg';
import iconHandshake from '../assets/icons/new-icon-handshake.svg';
import iconTickWhite from '../assets/icons/icon-tick-white.svg';
import iconTickNavy from '../assets/icons/icon-tick-navy.svg';
import iconDonate from '../assets/icons/icon-donate.svg';
import iconRecurringMaroon from '../assets/icons/icon-recurring-maroon.svg';
import iconClothes from '../assets/icons/icon-clothes.svg';
import iconCandleMaroon from '../assets/icons/icon-candle-maroon.svg';

const VOLUNTEER_CARDS = [
  {
    icon: iconProfileWhite,
    title: 'Individual Volunteering',
    body: 'Make a personal impact by assisting seniors with practical support, companionship, and everyday activities.',
    items: [
      'Practical Home Support',
      'Fellowship & Companionship',
      'Transportation Assistance',
      'Community Events',
    ],
    dark: true,
    tickIcon: iconTickWhite,
    font: 'font-sans',
  },
  {
    icon: iconGroup,
    title: 'Corporate Volunteering',
    body: 'Bring your team together through meaningful group volunteer experiences that give back to the community.',
    items: [
      'Yard Clean-up Events',
      'Donation Drives',
      'Meal Preparation',
      'Holiday Gift Wrapping',
      'Hygiene & Wellness Kit Assembly',
    ],
    dark: false,
    tickIcon: iconTickNavy,
    font: 'font-neulis',
  },
];

const PARTNER_ITEMS = [
  'Corporate Sponsorships',
  'Employee Volunteer Programs',
  'In-Kind Donations',
  'Community Event Partnerships',
  'Cause-Based Campaigns',
];

const DONATE_TILES = [
  {
    icon: iconDonate,
    bgClassName: 'bg-bl-100',
    title: 'One-Time Donation',
    body: 'Make an immediate contribution to support our programs and services.',
  },
  {
    icon: iconRecurringMaroon,
    bgClassName: 'bg-[#ffeeeb]',
    title: 'Monthly Giving',
    body: 'Provide ongoing support to help us serve seniors throughout the year.',
  },
  {
    icon: iconClothes,
    bgClassName: 'bg-bl-100',
    title: 'In-Kind Donations',
    body: 'Donate essential items such as clothing, hygiene supplies, or other requested resources.',
  },
  {
    icon: iconCandleMaroon,
    iconSize: 39,
    bgClassName: 'bg-[#ffeeeb]',
    title: 'Honor & Memorial Giving',
    body: 'Celebrate or remember a loved one through a meaningful charitable gift.',
  },
];

function VolunteerCard({ icon, title, body, items, dark = false, tickIcon, font }) {
  return (
    // Maroon rollout: the Individual card goes solid maroon with an inset
    // white ring and all-white text (Figma strokes are inside, so a shadow
    // substitutes for a CSS border); the Corporate card gets a light red
    // tint with an inset maroon-tinted ring, its text unchanged.
    <div
      className={`flex w-full flex-1 flex-col gap-[25px] rounded-card px-[16px] py-[40px] sm:p-8 xl:p-[50px] ${
        dark ? 'bg-m-700 shadow-[inset_0_0_0_1px_#ffffff]' : 'bg-[#fff1ed] shadow-[inset_0_0_0_1px_rgba(115,0,0,0.19)]'
      }`}
    >
      {/* The corporate card is Neulis Sans, which falls back to Poppins
          (~1.5 leading vs Neulis' ~1.32) and ran the card 40px tall. Pin the
          line boxes to Figma's: title 37 (31 from md — 367:1472 / 367:1496
          dropped 28 -> 24 in the redraw), body/items 26, label 21. DM Sans
          already lands on these, so both cards can share them.

          Base (<768) is 830:9989's own scale, which is a long way below the
          desktop one and had never been fetched: icon 30, title 20/26, body
          14/18, the OPPORTUNITIES label 14/18 and the list items 12/16. Every
          one of those carries an `md:` twin restoring the desktop value, so
          >=768 is byte-identical. The 16/25/15/7/6 gaps and the 16px tick
          already matched the frame and are shared. */}
      <div className="flex flex-col gap-[16px]">
        <img src={icon} alt="" className="size-[30px] md:size-[37px]" aria-hidden="true" />
        <h3
          className={`capitalize ${font} text-[20px] font-medium leading-[26px] md:text-[24px] md:leading-[31px] ${dark ? 'text-white' : 'text-bl-800'}`}
        >
          {title}
        </h3>
        <p className={`${font} text-[14px] leading-[18px] md:text-[20px] md:leading-[26px] ${dark ? 'text-white' : 'text-gray-59'}`}>{body}</p>
      </div>
      <div className="flex flex-col gap-[15px]">
        <p className={`${font} text-[14px] font-medium uppercase leading-[18px] md:text-[16px] md:leading-[21px] ${dark ? 'text-white' : 'text-bl-600'}`}>Opportunities:</p>
        <div className="flex flex-col gap-[7px]">
          {items.map((item) => (
            <div key={item} className="flex items-center gap-[6px]">
              <img src={tickIcon} alt="" className="size-[16px] shrink-0" aria-hidden="true" />
              <p className={`capitalize ${font} text-[12px] leading-[16px] md:text-[20px] md:leading-[26px] ${dark ? 'text-white' : 'text-bl-600'}`}>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DonateTile({ icon, iconSize = 34, bgClassName, title, body }) {
  return (
    <div className={`flex h-full w-full min-h-[220px] flex-col gap-8 rounded-[11.9px] px-6 py-7 xl:px-[29px] xl:py-[30px] 2xl:h-[263.4px] 2xl:w-[312.6px] 2xl:gap-[47.7px] ${bgClassName}`}>
      <img src={icon} alt="" className="size-[var(--tile-icon-size)]" style={{ '--tile-icon-size': `${iconSize}px` }} aria-hidden="true" />
      <div className="flex flex-col gap-[9px]">
        <h3 className="font-sans text-[20px] font-medium leading-[30px] text-bl-800">{title}</h3>
        <p className="font-sans text-[16px] leading-[21px] text-gray-67">{body}</p>
      </div>
    </div>
  );
}

function GetInvolved() {
  return (
    <div>
      <PageHero
        image={heroGetInvolved}
        // Base (<768) gets its own 402×745 portrait export, which matches the
        // default `mobileHeight` exactly. It is a raw photo, not a flattened
        // one — its bottom luma is 13, far below the ~43 a baked 0.9 espresso
        // scrim would floor it at — so `mobileOverlay` stays on its gradient
        // default. `image` is md-and-up only once this is set, leaving the
        // desktop hero untouched.
        mobileImage={heroGetInvolvedMobile}
        // Maroon rollout (Figma 790:993): espresso scrim -> navy, near-solid
        // on the left (0.96) matching the redrawn frame.
        overlayGradient="linear-gradient(to right, rgba(24,33,45,0.96) 0%, rgba(24,33,45,0.2) 100%)"
        height={548}
        // 830:10165 re-drew the mobile block: 344 × 122 (a 43px one-line H1 +
        // 16 + a 63px three-line subtitle) at x=29, y=450 in the 610 band —
        // 38 clear of the bottom edge, where 803:6897 sat at 391 with 99.
        mobileTextTop={450}
        mobileTitleTracking={0}
        // No fluid gutter here, unlike Services/Impact: this subtitle holds
        // three lines down to a 291px measure, which the fixed 29px gutter
        // still gives at a 349px viewport.

        // 371:2954 is now 385..499 on a 607 measure in a hero ending at 620,
        // i.e. 121 clear of the bottom: H1 56->36 / 2.8->1.8 on a 46 line box
        // and the subtitle 24->20, which wraps to 2 lines where 24 took 3.
        textLeft={81}
        textWidth={607}
        textBottom={121}
        titleSize={36}
        titleTracking={1.8}
        titleSizeMd={36}
        titleTrackingMd={1.8}
        titleLeading={46}
        title="Get Involved"
        // subtitleClassName intentionally omitted — see About.jsx: the old
        // unprefixed "text-[24px]" never won at md/xl anyway (18px/20px),
        // so dropping it keeps ≥768 byte-identical and lands the mobile
        // default (16px) for the Figma mobile frame.
        subtitle="Join our community of volunteers, partners, and supporters making a lasting difference in the lives of seniors."
      />

      {/* Volunteering */}
      {/* Figma 367:1554: fixed h-2019 box, content centred. The gaps nest —
          62 below the header, then 44 above the sign-up banner, then 18
          between the two card rows. */}
      <section className="w-full bg-gradient-to-b from-[#fffcf6] to-wb-100 py-14 xl:h-[2019px] xl:py-0">
        {/* Base gaps come from 830:9983: header block ends at 181 and the card
            stack starts at 221, i.e. 40 (was 32). */}
        <div className="mx-auto flex h-full max-w-[1440px] flex-col items-center justify-center gap-[40px] md:gap-8 xl:gap-[62px]">
          {/* 367:1602 is an explicit h-62 box; chip 47 / 20px lede 52 would
              otherwise hug to 52 and slide the whole stack 5px. */}
          <SectionHeader
            className="xl:h-[62px]"
            ledeSize={20}
            chipLabel="volunteering"
            lede="Join our mission by volunteering your time and skills to support seniors and strengthen our community."
          />

          <div className="flex w-full flex-col items-center gap-8 xl:gap-[44px]">
          {/* 830:9988 sits the cards on the frame's own 16px gutter — the same
              one `SectionHeader` already uses at base, so the chip and the card
              edges finally line up (they were 16 vs 24) — and spaces all three
              24 apart. */}
          <div className="flex w-full flex-col gap-[24px] px-[16px] md:gap-5 md:px-10 xl:gap-[18px] xl:px-[72px]">
            {/* 367:1552 is 503 tall where the taller of the two cards only
                needs 497 — the individual card carries the slack in Figma
                (50 top / 89 bottom) rather than both hugging. Pinned, because
                the 6px propagates: the section is a fixed 2019 box with its
                content centred, so a short row slides the partner card and
                the sign-up banner 3px off their frames. */}
            <div className="flex flex-col gap-[24px] md:flex-row md:gap-5 xl:gap-[20px] 2xl:h-[503px]">
              {VOLUNTEER_CARDS.map((card) => (
                <VolunteerCard key={card.title} {...card} />
              ))}
            </div>

            {/* 830:10045 draws this card on the same mobile scale as the two
                above it — icon 30, title 20/26, body 14/18, label 14/18, items
                12/16 inside 16 x 40 of padding — so the base tier matches
                `VolunteerCard`'s and every value carries an `md:` twin holding
                the desktop card exactly as it was. */}
            <div className="flex flex-col gap-[25px] rounded-card bg-[#fff1ed] shadow-[inset_0_0_0_1px_rgba(115,0,0,0.19)] px-[16px] py-[40px] sm:p-8 xl:py-[50px] xl:pl-[50px] xl:pr-[103px]">
              <div className="flex flex-col gap-[16px]">
                <img src={iconHandshake} alt="" className="size-[30px] md:size-[37px]" aria-hidden="true" />
                <h3 className="capitalize font-sans text-[20px] font-medium leading-[26px] text-bl-800 md:text-[24px] md:leading-[31px]">
                  corporate partnership
                </h3>
                {/* Figma 367:1525 holds this to 847px inside the 1143px
                    content box, so it breaks to two lines (h=52). */}
                <p className="font-sans text-[14px] leading-[18px] text-gray-59 md:text-[18px] md:leading-normal xl:w-[847px] xl:text-[20px] xl:leading-[26px]">
                  Partner with Stephen&apos;s Table Colorado to create lasting impact through
                  sponsorships, volunteer initiatives, and community programs.
                </p>
              </div>
              <div className="flex flex-col gap-[15px]">
                <p className="font-sans text-[14px] font-medium uppercase leading-[18px] text-bl-600 md:text-[16px] md:leading-[21px]">
                  Ways to Partner:
                </p>
                {/* Figma 658:3321 ticks each item, same as the two cards
                    above — this list was rendering as bare indented text. */}
                <div className="flex flex-col gap-[7px]">
                  {PARTNER_ITEMS.map((item) => (
                    <div key={item} className="flex items-center gap-[6px]">
                      <img src={iconTickNavy} alt="" className="size-[16px] shrink-0" aria-hidden="true" />
                      <p className="capitalize font-sans text-[12px] leading-[16px] text-bl-600 md:text-[20px] md:leading-[26px]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Base gutter follows the cards above it (16, not 24) so the banner
              lines up with them and with the section header. */}
          <div className="relative h-[360px] w-[calc(100%-32px)] overflow-hidden rounded-card sm:h-[440px] sm:w-[calc(100%-64px)] md:w-[calc(100%-80px)] xl:h-[569px] xl:w-[calc(100%-144px)] 2xl:w-[1296px]">
            <img src={signupBanner} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to bottom, rgba(56,41,31,0.2), rgba(56,41,31,0.84))',
              }}
            />
            <div className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-[18px] px-6 sm:bottom-10 xl:bottom-auto xl:left-1/2 xl:top-[406px] xl:w-[692px] xl:-translate-x-1/2 xl:px-0">
              {/* 367:1389 is Neulis 20 on an explicit 29px box, and the copy
                  is sentence-cased with a trailing period in the frame. */}
              <p className="text-center font-neulis text-[18px] text-white sm:text-[20px] md:leading-[29px]">
                You can make a difference. Sign Up now.
              </p>
              <span className="rounded-btn bg-s-200 px-[24px] py-[8px] text-center font-sans text-[18px] font-medium uppercase text-black md:text-[20px] xl:px-[32px]">
                Sign up for Volunteering
              </span>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Donate */}
      {/* Figma 370:1644 is 714 tall: 122.286 + header 134 + 72 + tiles
          263.427 + 122.286. The header was 180 because its lede ran 24px over
          three lines and its button 47 tall; at 20px both come back to the
          frame (52 + 40 + 42) and the padding grows to match. */}
      <section className="w-full py-14 xl:py-[122.286px]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-10 xl:gap-[72px]">
          <SectionHeader
            align="between"
            ledeSize={20}
            chipLabel="donate"
            lede="Your generosity helps us provide practical support, meaningful companionship, and essential community resources for seniors across Northern Colorado."
            actions={<Button variant="fill-soft" className="w-fit">DONATE NOW</Button>}
          />
          <div className="grid w-full grid-cols-1 gap-5 px-6 sm:grid-cols-2 md:px-10 xl:px-[72px] 2xl:flex 2xl:gap-[14.9px]">
            {DONATE_TILES.map((tile) => (
              <DonateTile key={tile.title} {...tile} />
            ))}
          </div>
        </div>
      </section>

      {/* Maroon rollout: full conversion to the standard blue CTA banner —
          default sage pills (email/phone) replace the custom white email
          button, and the type scale/position match the redrawn 790:993
          frame. */}
      <CtaBanner
        image={ctaBannerImg}
        bg="blue"
        titleClassName="lg:text-[32px] lg:leading-[41px]"
        subtitleClassName="lg:w-[451px] lg:max-w-full lg:text-[16px]"
        barePillIcons
        pillTextTransform="normal-case"
        textTop={86}
        title="Here When You Need Us..."
        subtitle="Whether you need assistance or want to support our community, we'd love to hear from you."
      />

      {/* Figma 370:1705 carries all six questions — the exclusion here left
          the section one collapsed row (71 + 16) short of the frame.
          Maroon rollout: standard blue eyebrow (drop the navy override). */}
      <FaqSection compactType />
    </div>
  );
}

export default GetInvolved;
