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
import iconEmail from '../assets/icons/icon-email.svg';

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
    bgClassName: 'border-[#c8af9d] bg-b-200',
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
    bgClassName: 'border-[#cbd7e4] bg-bl-100',
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
      className={`flex flex-1 flex-col gap-[25px] rounded-card border p-[50px] ${bgClassName}`}
    >
      <div className="flex flex-col gap-[16px]">
        <img src={icon} alt="" className="size-[37px]" aria-hidden="true" />
        <h3 className={`capitalize ${font} text-[28px] font-medium text-bl-800`}>{title}</h3>
        <p className={`${font} text-[20px] text-gray-59`}>{body}</p>
      </div>
      <div className="flex flex-col gap-[15px]">
        <p className={`${font} text-[16px] font-medium uppercase text-bl-600`}>Opportunities:</p>
        <div className="flex flex-col gap-[7px]">
          {items.map((item) => (
            <div key={item} className="flex items-center gap-[6px]">
              <img src={iconTick} alt="" className="size-[16px] shrink-0" aria-hidden="true" />
              <p className={`capitalize ${font} text-[20px] text-bl-600`}>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DonateTile({ icon, bgClassName, title, body }) {
  return (
    <div className={`flex h-[263.4px] w-[312.6px] flex-col gap-[47.7px] rounded-[11.9px] px-[29px] py-[30px] ${bgClassName}`}>
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
        textLeft={81}
        textWidth={821}
        textBottom={48}
        title="Get Involved"
        subtitleClassName="text-[24px]"
        subtitle="Read inspiring stories of how our volunteers, partners, and supporters are making a meaningful difference in the lives of seniors."
      />

      {/* Volunteering */}
      <section className="w-full bg-gradient-to-b from-[#fffcf6] to-wb-100 py-[100px]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-[44px]">
          <SectionHeader
            chipLabel="volunteering"
            lede="Join our mission by volunteering your time and skills to support seniors and strengthen our community."
          />

          <div className="flex flex-col gap-[18px] px-[72px]">
            <div className="flex gap-[20px]">
              {VOLUNTEER_CARDS.map((card) => (
                <VolunteerCard key={card.title} {...card} />
              ))}
            </div>

            <div className="flex flex-col gap-[25px] rounded-card border border-bl-200 bg-bl-100 py-[50px] pl-[50px] pr-[103px]">
              <div className="flex flex-col gap-[16px]">
                <img src={iconHandshake} alt="" className="size-[37px]" aria-hidden="true" />
                <h3 className="capitalize font-sans text-[28px] font-medium text-bl-800">
                  corporate partnership
                </h3>
                <p className="font-sans text-[20px] text-gray-59">
                  Partner with Stephen&apos;s Table Colorado to create lasting impact through
                  sponsorships, volunteer initiatives, and community programs.
                </p>
              </div>
              <div className="flex flex-col gap-[15px]">
                <p className="font-sans text-[16px] font-medium uppercase text-bl-600">
                  Ways to Partner:
                </p>
                <div className="flex flex-col gap-[7px]">
                  {PARTNER_ITEMS.map((item) => (
                    <div key={item} className="flex items-center gap-[6px]">
                      <img src={iconTick} alt="" className="size-[16px] shrink-0" aria-hidden="true" />
                      <p className="capitalize font-sans text-[20px] text-bl-600">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative mx-auto h-[569px] w-[1296px] overflow-hidden rounded-card">
            <img src={signupBanner} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to bottom, rgba(56,41,31,0.2), rgba(56,41,31,0.84))',
              }}
            />
            <div
              className="absolute left-1/2 flex w-[692px] -translate-x-1/2 flex-col items-center gap-[18px]"
              style={{ top: 406 }}
            >
              <p className="text-center font-neulis text-[24px] text-white">
                you can make a difference. sign up now
              </p>
              <span className="rounded-btn bg-s-200 px-[32px] py-[8px] font-sans text-[24px] font-medium uppercase text-black">
                Sign up for Volunteering
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Donate */}
      <section className="w-full py-[72px]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-[72px]">
          <SectionHeader
            align="between"
            chipLabel="donate"
            lede="Your generosity helps us provide practical support, meaningful companionship, and essential community resources for seniors across Northern Colorado."
            actions={<Button variant="fill-soft">DONATE NOW</Button>}
          />
          <div className="flex gap-[14.9px] px-[72px]">
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

      <FaqSection
        excludeQuestions={["How can I support Stephen's Table?"]}
        eyebrowClassName="text-navy"
      />
    </div>
  );
}

export default GetInvolved;
