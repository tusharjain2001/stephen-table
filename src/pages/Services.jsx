import { Link } from 'react-router-dom';
import Button from '../components/Button.jsx';
import PageHero from '../components/PageHero.jsx';
import SectionChip from '../components/SectionChip.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import EligibilityBand from '../components/EligibilityBand.jsx';
import StepCard from '../components/StepCard.jsx';
import FaqSection from '../components/FaqSection.jsx';

import heroServices from '../assets/images/hero-services.png';
// Named for About, used here: it is the only 402×746 portrait mobile-hero
// export we have, and Services is the page asking for it.
import heroServicesMobile from '../assets/images/mobile-about-hero.png';
import svcSupport1 from '../assets/images/svc-support-1.png';
import svcSupport2 from '../assets/images/svc-support-2.png';
import svcSupport3 from '../assets/images/svc-support-3.png';
import svcSupport4 from '../assets/images/svc-support-4.png';
import svcSupport5 from '../assets/images/svc-support-5.png';
import svcSupport6 from '../assets/images/svc-support-6.png';
import svcConn1 from '../assets/images/svc-conn-1.png';
import svcConn2 from '../assets/images/svc-conn-2.png';
import svcConn3 from '../assets/images/svc-conn-3.png';
import svcConn4 from '../assets/images/svc-conn-4.png';

import iconStepReview from '../assets/icons/icon-step-review.svg';
import iconStepChat from '../assets/icons/icon-step-chat.svg';
import iconStepSpeak from '../assets/icons/icon-step-speak.svg';
import iconStepSupport from '../assets/icons/icon-step-support.svg';
import iconTick from '../assets/icons/icon-tick.svg';
import iconHandshakePeople from '../assets/icons/icon-handshake-people.svg';
import iconBooks from '../assets/icons/icon-books.svg';
import iconCrossMed from '../assets/icons/icon-cross-med.svg';
import iconSmiley from '../assets/icons/icon-smiley.svg';

const STEPS = [
  {
    icon: iconStepReview,
    title: 'Step 1: Submit a Request',
    body: 'Complete the Get Help form with your details and the type of support you need.',
  },
  {
    icon: iconStepChat,
    title: "Step 2: We'll Review Your Request",
    body: 'Our team reviews your information to understand your needs and determine the best support available.',
  },
  {
    icon: iconStepSpeak,
    title: 'Step 3: We Get in Touch',
    body: 'A team member will contact you to discuss your situation, answer questions, and confirm the next steps.',
  },
  {
    icon: iconStepSupport,
    title: 'Step 4: Receive Personalized Support',
    body: "Based on your needs, we'll connect you with practical home support, fellowship opportunities, or community resources.",
  },
];

const PRACTICAL_CARDS = [
  {
    image: svcSupport1,
    title: 'Seasonal Yard Care',
    ticks: ['Lawn mowing', 'weeding', 'leaf cleanup', 'seasonal outdoor maintenance'],
  },
  {
    image: svcSupport2,
    title: 'Home Organization',
    ticks: ['Decluttering', 'organizing spaces', 'creating a safer, more comfortable home'],
  },
  {
    image: svcSupport3,
    title: 'Minor Home Repairs',
    ticks: ['Simple repairs and maintenance to improve safety and accessibility'],
  },
  {
    image: svcSupport4,
    title: 'Transportation Assistance',
    ticks: ['Rides to medical appointments, grocery stores, and essential errands.'],
  },
  {
    image: svcSupport5,
    title: 'Ramp Building',
    ticks: [
      'Improving Home Accessibility',
      'Safe Entry & Exit Solutions',
      'Mobility Support For Independent Living',
    ],
  },
  {
    image: svcSupport6,
    title: 'Snow Care',
    ticks: ['Snow & Ice Removal', 'Safe Walkways & Driveways', 'Winter Home Safety Assistance'],
  },
];

const FELLOWSHIP_TILES = [
  {
    icon: iconHandshakePeople,
    title: 'Companionship',
    body: 'Building trusted friendships through regular visits and conversations.',
  },
  {
    icon: iconBooks,
    title: 'Book Clubs',
    body: 'Encouraging connection and lifelong learning through shared reading experiences.',
  },
  {
    icon: iconCrossMed,
    title: 'Bible Studies',
    body: 'Providing opportunities for faith, reflection, and spiritual fellowship.',
    mobileIconSize: 36.552,
  },
  {
    icon: iconSmiley,
    title: 'Hobby Groups',
    body: 'Bringing seniors together to enjoy shared interests and recreational activities.',
  },
];

const CONNECTION_TILES = [
  {
    image: svcConn1,
    left: 0,
    top: 0,
    width: 374,
    height: 378,
    title: 'Essential Resources',
    body: 'Access to food, clothing, and other everyday necessities.',
    // True-mobile (<md) stacked order per the Figma mobile frame (662:10555):
    // Essential, Educational, Community Activities, Partner Network — a swap
    // of the last two vs. this array's own (desktop masonry / md-tablet
    // 2-col) order. `order-*` only applies below md (md:order-none resets
    // to source order) so the ≥768 grid/masonry stay untouched.
    mobileOrder: 1,
  },
  {
    image: svcConn2,
    left: 395,
    top: 0,
    width: 443,
    height: 378,
    title: 'Educational Programs',
    body: 'Workshops on financial literacy, estate planning, fitness, and nutrition.',
    mobileOrder: 2,
  },
  {
    image: svcConn3,
    left: 857,
    top: 0,
    width: 439,
    height: 741,
    title: 'Partner Network',
    body: 'Connecting seniors with trusted local organizations and specialized support services.',
    mobileOrder: 4,
  },
  {
    image: svcConn4,
    left: 0,
    top: 400,
    width: 838,
    height: 341,
    title: 'Community Activities',
    body: 'Group outings, classes, and events that encourage engagement and social connection.',
    mobileOrder: 3,
  },
];

function ServiceActions() {
  return (
    // Mobile frame (662:10555) stacks these full-width with an 8px gap;
    // md: restores the original wrapping row untouched.
    <div className="flex w-full flex-col gap-[8px] md:w-auto md:flex-row md:flex-wrap md:items-center md:gap-[16px] xl:gap-[22px]">
      <Button variant="fill-soft" className="shrink-0 whitespace-nowrap">
        REQUEST ASSISTANCE
      </Button>
      <Button as={Link} to="/nominate" variant="outline-soft" className="shrink-0 whitespace-nowrap">
        NOMINATE A SENIOR
      </Button>
    </div>
  );
}

function ServiceCard({ image, title, ticks }) {
  return (
    // Figma 363:290 is a 206px card: the 176px photo sits inside 15px of
    // vertical and 18.5px of horizontal padding, not flush to the edges.
    <div className="flex h-full w-full min-h-[176px] flex-col items-center gap-5 rounded-card border border-wb-300 bg-white p-[16px] md:p-5 xl:gap-[20px] 2xl:h-[206px] 2xl:flex-row 2xl:justify-center 2xl:px-[18.5px] 2xl:py-[15px]">
      <img
        src={image}
        alt=""
        className="h-[176px] w-full shrink-0 rounded-card object-cover md:h-[220px] 2xl:h-[176px] 2xl:w-[296px]"
      />
      <div className="flex w-full flex-col gap-[13px] 2xl:w-[285px]">
        <h3 className="capitalize font-neulis text-[20px] text-bl-900">{title}</h3>
        <div className="flex flex-col gap-[7px]">
          {ticks.map((tick) => (
            <div key={tick} className="flex items-start gap-[6px]">
              <img src={iconTick} alt="" className="mt-[2px] size-[16px] shrink-0" />
              <p className="capitalize font-neulis text-[16px] text-bl-500">{tick}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FellowshipTile({ icon, title, body, mobileIconSize = 34.315 }) {
  return (
    <div
      className="flex h-[209px] w-full flex-col gap-[36px] rounded-[11.9px] bg-b-300 px-[31px] py-[24px] md:h-auto md:min-h-[220px] md:gap-8 md:px-6 md:py-7 xl:px-[29px] xl:py-[30px] 2xl:h-[263.4px] 2xl:w-[312.6px] 2xl:gap-[47.7px]"
    >
      <img
        src={icon}
        alt=""
        className="size-[var(--tile-icon-mobile)] md:size-[34px]"
        style={{ '--tile-icon-mobile': `${mobileIconSize}px` }}
      />
      <div className="flex flex-col gap-[9px]">
        <h3 className="capitalize font-sans text-[24px] font-medium text-b-800">{title}</h3>
        <p className="font-sans text-[16px] text-gray-59">{body}</p>
      </div>
    </div>
  );
}

function ConnectionTile({ image, left, top, width, height, title, body }) {
  return (
    <div
      className="absolute overflow-hidden rounded-card"
      style={{ left, top, width, height }}
    >
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute bottom-0 left-0 flex w-full flex-col gap-[8px] rounded-b-card border border-bl-300 bg-bl-100 px-[22px] py-[10px]">
        <p className="capitalize font-sans text-[24px] font-medium text-black">{title}</p>
        <p className="font-neulis text-[20px] text-gray-59">{body}</p>
      </div>
    </div>
  );
}

/** <xl fallback for the masonry grid above: a simple stacked/2-col grid of
 * image + caption cards instead of the fixed-pixel absolute masonry, which
 * only holds together exactly at the Figma 1296px content width. */
const ORDER_CLASS = { 1: 'order-1', 2: 'order-2', 3: 'order-3', 4: 'order-4' };

function ConnectionTileSimple({ image, title, body, mobileOrder }) {
  return (
    <div className={`overflow-hidden rounded-card ${ORDER_CLASS[mobileOrder] ?? ''} md:order-none`}>
      <img src={image} alt="" className="h-[266px] w-full object-cover md:h-[260px]" />
      {/* Mobile frame (662:10555) draws no border on the top edge — the
          caption bar sits flush under the image there — while md:+ restores
          the original all-sides border untouched. */}
      <div className="flex flex-col gap-[8px] rounded-b-card border-x border-b border-bl-300 bg-bl-100 px-[22px] py-[10px] md:border">
        <p className="capitalize font-sans text-[20px] font-medium text-black md:text-[22px]">{title}</p>
        <p className="font-neulis text-[16px] text-gray-59 md:text-[18px]">{body}</p>
      </div>
    </div>
  );
}

function Services() {
  return (
    <div>
      <PageHero
        image={heroServices}
        // The mobile frame wants a portrait crop rather than a slice of the
        // 1672×941 landscape, so base (<768) gets its own 402×746 export.
        // Unlike Home's mobile hero this one is a raw photo — its luma runs
        // 131/92/140 top/mid/bottom, i.e. no scrim baked into the pixels — so
        // `mobileOverlay` stays on its gradient default. `flipImage` and
        // `imagePosition` below only ever apply to `image`, which is now
        // md-and-up only, so the desktop hero is untouched.
        mobileImage={heroServicesMobile}
        // 363:154 (inside the layout frame) is 548 — the 746 rect at page
        // level is a leftover; only 548 makes the section stack sum to 6074.
        height={548}
        // Our asset is the mirror of Figma 363:152 and a taller crop
        // (1672x941 vs the frame's 1440x746); flipped, the best vertical
        // alignment is 12% (MAD 18.2 against 36.1/30.5 either side).
        flipImage
        imagePosition="50% 12%"
        mobileTextTop={571}
        textLeft={72}
        textWidth={618}
        textBottom={54}
        title="Our Services"
        // subtitleClassName intentionally omitted — see About.jsx: the old
        // unprefixed "text-[24px]" never won at md/xl anyway (18px/20px),
        // so dropping it keeps ≥768 byte-identical and lands the mobile
        // default (16px) for the Figma mobile frame.
        subtitle="Explore the practical support, companionship, and community resources we provide to help seniors live safely and independently."
      />

      <EligibilityBand />

      {/* How it works */}
      <section className="w-full py-[60px] md:py-14 xl:py-[102px]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-[39px] md:gap-8 xl:gap-[53px]">
          <div className="flex w-full flex-col items-center gap-[16px] px-[16px] text-center md:gap-6 md:px-10 lg:flex-row lg:justify-center lg:gap-10 lg:text-left xl:gap-16 2xl:gap-[226px] xl:px-[72px]">
            <SectionChip className="shrink-0">how it works</SectionChip>
            <p className="font-sans text-[16px] text-gray-59 md:text-[24px] min-w-0 max-w-full lg:max-w-[857px] lg:shrink lg:grow-0 2xl:w-[857px]">
              Supporting seniors and their families with practical care, community connections, and
              compassionate assistance.
            </p>
          </div>
          <div className="grid w-full grid-cols-1 gap-[24px] px-[16px] md:gap-4 md:grid-cols-2 md:px-10 lg:grid-cols-4 xl:px-[72px] 2xl:flex 2xl:w-auto 2xl:gap-[17px]">
            {STEPS.map((step) => (
              <StepCard key={step.title} borderClassName="border-[#ddcdc2]" {...step} />
            ))}
          </div>
        </div>
      </section>

      {/* Practical Home Support */}
      <section className="w-full bg-gradient-to-b from-cream to-wb-200 py-[60px] md:py-14 xl:py-[106px]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-[48px] md:gap-10 xl:gap-[76px]">
          <SectionHeader
            align="between"
            chipLabel="Practical home support"
            lede="Supporting seniors and their families with practical care, community connections, and compassionate assistance."
            actions={<ServiceActions />}
          />
          <div className="grid grid-cols-1 gap-[30px] px-[16px] md:gap-6 md:grid-cols-2 md:px-10 xl:gap-x-[19px] xl:gap-y-[40px] xl:px-[72px]">
            {PRACTICAL_CARDS.map((card) => (
              <ServiceCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      {/* Fellowship */}
      <section className="w-full py-[60px] md:py-14 xl:py-[103px]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-[32px] md:gap-10 xl:gap-[96px]">
          <SectionHeader
            align="between"
            chipLabel="Fellowship"
            lede="Creating meaningful relationships and fostering a sense of belonging through companionship and engaging social activities."
            actions={<ServiceActions />}
          />
          <div className="grid grid-cols-1 gap-[17px] px-[16px] md:gap-5 md:grid-cols-2 md:px-10 xl:px-[72px] 2xl:flex 2xl:justify-center 2xl:gap-[14.9px]">
            {FELLOWSHIP_TILES.map((tile) => (
              <FellowshipTile key={tile.title} {...tile} />
            ))}
          </div>
        </div>
      </section>

      {/* Community Connections */}
      <section className="w-full bg-bl-50 py-[60px] md:py-14 xl:py-[95px]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-[32px] md:gap-10 xl:gap-[96px]">
          <SectionHeader
            align="between"
            chipLabel="community connections"
            lede="Connecting seniors with trusted community resources, essential services, and programs that support their health, well-being, and independence."
            actions={<ServiceActions />}
          />

          {/* xl (≥1280): pixel-exact fixed masonry from Figma */}
          <div className="relative mx-auto hidden h-[741px] w-[1296px] 2xl:block">
            {CONNECTION_TILES.map((tile) => (
              <ConnectionTile key={tile.title} {...tile} />
            ))}
          </div>

          {/* <xl: the masonry's fixed px/left/top math only holds at the
              1296px content width, so fall back to a simple responsive
              grid of image + caption cards. Mobile frame (662:10555) stacks
              these single-column in a different order than the md-tablet
              2-col grid below — see each tile's `mobileOrder` above. */}
          <div className="grid grid-cols-1 gap-[32px] px-[16px] md:gap-5 md:grid-cols-2 md:px-10 2xl:hidden">
            {CONNECTION_TILES.map((tile) => (
              <ConnectionTileSimple key={tile.title} {...tile} />
            ))}
          </div>
        </div>
      </section>

      <FaqSection />
    </div>
  );
}

export default Services;
