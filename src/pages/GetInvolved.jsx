import Button from '../components/Button.jsx';
import PageHero from '../components/PageHero.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import CtaBanner from '../components/CtaBanner.jsx';
import FaqSection from '../components/FaqSection.jsx';

import heroGetInvolved from '../assets/images/hero-get-involved.png';
import signupBanner from '../assets/images/signup-banner.png';
import ctaBannerImg from '../assets/images/cta-banner.png';

import iconProfile from '../assets/icons/icon-profile.svg';
import iconGroup from '../assets/icons/icon-group.svg';
import iconHandshake from '../assets/icons/icon-handshake.svg';
import iconTick from '../assets/icons/icon-tick.svg';
import iconDonate from '../assets/icons/icon-donate.svg';
import iconRecurring from '../assets/icons/icon-recurring.svg';
import iconClothes from '../assets/icons/icon-clothes.svg';
import iconCandle from '../assets/icons/icon-candle.svg';
import iconEmail from '../assets/icons/icon-email-brownbg.svg';

const VOLUNTEER_CARDS = [
  {
    icon: iconProfile,
    title: 'Individual Volunteering',
    body: 'Make a personal impact by assisting seniors with practical support, companionship, and everyday activities.',
    items: [
      'Practical Home Support',
      'Fellowship & Companionship',
      'Transportation Assistance',
      'Community Events',
    ],
    // Figma strokes are drawn inside the frame, so an inset ring rather than
    // a CSS border — a border would add 2px to the 503px card.
    bgClassName: 'shadow-[inset_0_0_0_1px_#c8af9d] bg-b-200',
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
    bgClassName: 'shadow-[inset_0_0_0_1px_#cbd7e4] bg-bl-100',
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
    icon: iconRecurring,
    bgClassName: 'bg-wb-200',
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
    icon: iconCandle,
    bgClassName: 'bg-wb-200',
    title: 'Honor & Memorial Giving',
    body: 'Celebrate or remember a loved one through a meaningful charitable gift.',
  },
];

function VolunteerCard({ icon, title, body, items, bgClassName, font }) {
  return (
    <div
      className={`flex w-full flex-1 flex-col gap-[25px] rounded-card p-6 sm:p-8 xl:p-[50px] ${bgClassName}`}
    >
      {/* The corporate card is Neulis Sans, which falls back to Poppins
          (~1.5 leading vs Neulis' ~1.32) and ran the card 40px tall. Pin the
          line boxes to Figma's: title 37, body/items 26, label 21. DM Sans
          already lands on these, so both cards can share them. */}
      <div className="flex flex-col gap-[16px]">
        <img src={icon} alt="" className="size-[37px]" aria-hidden="true" />
        <h3 className={`capitalize ${font} text-[28px] font-medium leading-[37px] text-bl-800`}>{title}</h3>
        <p className={`${font} text-[20px] leading-[26px] text-gray-59`}>{body}</p>
      </div>
      <div className="flex flex-col gap-[15px]">
        <p className={`${font} text-[16px] font-medium uppercase leading-[21px] text-bl-600`}>Opportunities:</p>
        <div className="flex flex-col gap-[7px]">
          {items.map((item) => (
            <div key={item} className="flex items-center gap-[6px]">
              <img src={iconTick} alt="" className="size-[16px] shrink-0" aria-hidden="true" />
              <p className={`capitalize ${font} text-[20px] leading-[26px] text-bl-600`}>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DonateTile({ icon, bgClassName, title, body }) {
  return (
    <div className={`flex h-full w-full min-h-[220px] flex-col gap-8 rounded-[11.9px] px-6 py-7 xl:px-[29px] xl:py-[30px] 2xl:h-[263.4px] 2xl:w-[312.6px] 2xl:gap-[47.7px] ${bgClassName}`}>
      <img src={icon} alt="" className="size-[34px]" aria-hidden="true" />
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
        height={548}
        mobileTextTop={516}
        textLeft={81}
        textWidth={821}
        // 371:2954 sits at y=385 h=150 in a hero ending at 620.
        textBottom={85}
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
        <div className="mx-auto flex h-full max-w-[1440px] flex-col items-center justify-center gap-8 xl:gap-[62px]">
          <SectionHeader
            chipLabel="volunteering"
            lede="Join our mission by volunteering your time and skills to support seniors and strengthen our community."
          />

          <div className="flex w-full flex-col items-center gap-8 xl:gap-[44px]">
          <div className="flex w-full flex-col gap-5 px-6 md:px-10 xl:gap-[18px] xl:px-[72px]">
            <div className="flex flex-col gap-5 md:flex-row xl:gap-[20px]">
              {VOLUNTEER_CARDS.map((card) => (
                <VolunteerCard key={card.title} {...card} />
              ))}
            </div>

            <div className="flex flex-col gap-[25px] rounded-card bg-bl-100 shadow-[inset_0_0_0_1px_#cbd7e4] p-6 sm:p-8 xl:py-[50px] xl:pl-[50px] xl:pr-[103px]">
              <div className="flex flex-col gap-[16px]">
                <img src={iconHandshake} alt="" className="size-[37px]" aria-hidden="true" />
                <h3 className="capitalize font-sans text-[24px] font-medium text-bl-800 xl:text-[28px] xl:leading-[36px]">
                  corporate partnership
                </h3>
                {/* Figma 367:1525 holds this to 847px inside the 1143px
                    content box, so it breaks to two lines (h=52). */}
                <p className="font-sans text-[18px] text-gray-59 xl:w-[847px] xl:text-[20px] xl:leading-[26px]">
                  Partner with Stephen&apos;s Table Colorado to create lasting impact through
                  sponsorships, volunteer initiatives, and community programs.
                </p>
              </div>
              <div className="flex flex-col gap-[15px]">
                <p className="font-sans text-[16px] font-medium uppercase leading-[21px] text-bl-600">
                  Ways to Partner:
                </p>
                {/* Figma 658:3321 ticks each item, same as the two cards
                    above — this list was rendering as bare indented text. */}
                <div className="flex flex-col gap-[7px]">
                  {PARTNER_ITEMS.map((item) => (
                    <div key={item} className="flex items-center gap-[6px]">
                      <img src={iconTick} alt="" className="size-[16px] shrink-0" aria-hidden="true" />
                      <p className="capitalize font-sans text-[20px] leading-[26px] text-bl-600">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-[360px] w-[calc(100%-48px)] overflow-hidden rounded-card sm:h-[440px] sm:w-[calc(100%-64px)] md:w-[calc(100%-80px)] xl:h-[569px] xl:w-[calc(100%-144px)] 2xl:w-[1296px]">
            <img src={signupBanner} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to bottom, rgba(56,41,31,0.2), rgba(56,41,31,0.84))',
              }}
            />
            <div className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-[18px] px-6 sm:bottom-10 xl:bottom-auto xl:left-1/2 xl:top-[406px] xl:w-[692px] xl:-translate-x-1/2 xl:px-0">
              <p className="text-center font-neulis text-[18px] text-white sm:text-[20px] xl:text-[24px]">
                you can make a difference. sign up now
              </p>
              <span className="rounded-btn bg-s-200 px-[24px] py-[8px] text-center font-sans text-[18px] font-medium uppercase text-black xl:px-[32px] xl:text-[24px]">
                Sign up for Volunteering
              </span>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Donate */}
      {/* Figma 370:1644 is 714 tall: 99.29 + header 180 + 72 + tiles 263.43
          + 99.29. Only the padding was off. */}
      <section className="w-full py-14 xl:py-[99.29px]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-10 xl:gap-[72px]">
          <SectionHeader
            align="between"
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

      <CtaBanner
        image={ctaBannerImg}
        title="Here When You Need Us..."
        subtitle="Whether you need assistance or want to support our community, we'd love to hear from you."
        actions={
          <a
            href="mailto:info@stephenstablecolorado.org"
            className="flex w-fit items-center gap-[10px] rounded-btn bg-white px-[32px] py-[8px] font-sans text-[20px] font-medium text-wb-900"
          >
            <img src={iconEmail} alt="" className="size-[28px]" aria-hidden="true" />
            info@stephenstablecolorado.org
          </a>
        }
      />

      {/* Figma 370:1705 carries all six questions — the exclusion here left
          the section one collapsed row (71 + 16) short of the frame. */}
      <FaqSection eyebrowClassName="text-navy" />
    </div>
  );
}

export default GetInvolved;
