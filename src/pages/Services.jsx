import { Link } from 'react-router-dom';
import Button from '../components/Button.jsx';
import PageHero from '../components/PageHero.jsx';
import SectionChip from '../components/SectionChip.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import EligibilityBand from '../components/EligibilityBand.jsx';
import StepCard from '../components/StepCard.jsx';
import FaqSection from '../components/FaqSection.jsx';

import heroServices from '../assets/images/hero-services.png';
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
  },
  {
    image: svcConn2,
    left: 395,
    top: 0,
    width: 443,
    height: 378,
    title: 'Educational Programs',
    body: 'Workshops on financial literacy, estate planning, fitness, and nutrition.',
  },
  {
    image: svcConn3,
    left: 857,
    top: 0,
    width: 439,
    height: 741,
    title: 'Partner Network',
    body: 'Connecting seniors with trusted local organizations and specialized support services.',
  },
  {
    image: svcConn4,
    left: 0,
    top: 400,
    width: 838,
    height: 341,
    title: 'Community Activities',
    body: 'Group outings, classes, and events that encourage engagement and social connection.',
  },
];

function ServiceActions() {
  return (
    <div className="flex items-center gap-[22px]">
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
    <div className="flex h-[206px] w-[638px] items-center justify-center gap-[20px] rounded-card border border-wb-300 bg-white">
      <img src={image} alt="" className="h-[176px] w-[296px] shrink-0 rounded-card object-cover" />
      <div className="flex w-[285px] flex-col gap-[13px]">
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

function FellowshipTile({ icon, title, body }) {
  return (
    <div className="flex h-[263.4px] w-[312.6px] flex-col gap-[47.7px] rounded-[11.9px] bg-b-300 px-[29px] py-[30px]">
      <img src={icon} alt="" className="size-[34px]" />
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

function Services() {
  return (
    <div>
      <PageHero
        image={heroServices}
        height={746}
        textLeft={72}
        textWidth={618}
        textBottom={87}
        title="Our Services"
        subtitleClassName="text-[24px]"
        subtitle="Explore the practical support, companionship, and community resources we provide to help seniors live safely and independently."
      />

      <EligibilityBand />

      {/* How it works */}
      <section className="w-full py-[102px]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-[53px]">
          <div className="flex items-center justify-center gap-[226px] px-[72px]">
            <SectionChip className="shrink-0 whitespace-nowrap">how it works</SectionChip>
            <p className="w-[857px] shrink-0 font-sans text-[24px] text-gray-59">
              Supporting seniors and their families with practical care, community connections, and
              compassionate assistance.
            </p>
          </div>
          <div className="flex gap-[17px]">
            {STEPS.map((step) => (
              <StepCard key={step.title} borderClassName="border-[#ddcdc2]" {...step} />
            ))}
          </div>
        </div>
      </section>

      {/* Practical Home Support */}
      <section className="w-full bg-gradient-to-b from-cream to-wb-200 py-[106px]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-[76px]">
          <SectionHeader
            align="between"
            chipLabel="Practical home support"
            lede="Supporting seniors and their families with practical care, community connections, and compassionate assistance."
            actions={<ServiceActions />}
          />
          <div className="flex flex-col gap-[40px] px-[72px]">
            {[0, 2, 4].map((i) => (
              <div key={i} className="flex gap-[19px]">
                <ServiceCard {...PRACTICAL_CARDS[i]} />
                <ServiceCard {...PRACTICAL_CARDS[i + 1]} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fellowship */}
      <section className="w-full py-[103px]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-[96px]">
          <SectionHeader
            align="between"
            chipLabel="Fellowship"
            lede="Creating meaningful relationships and fostering a sense of belonging through companionship and engaging social activities."
            actions={<ServiceActions />}
          />
          <div className="flex justify-center gap-[14.9px] px-[72px]">
            {FELLOWSHIP_TILES.map((tile) => (
              <FellowshipTile key={tile.title} {...tile} />
            ))}
          </div>
        </div>
      </section>

      {/* Community Connections */}
      <section className="w-full bg-bl-50 py-[95px]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-[96px]">
          <SectionHeader
            align="between"
            chipLabel="community connections"
            lede="Connecting seniors with trusted community resources, essential services, and programs that support their health, well-being, and independence."
            actions={<ServiceActions />}
          />
          <div className="relative mx-auto h-[741px] w-[1296px]">
            {CONNECTION_TILES.map((tile) => (
              <ConnectionTile key={tile.title} {...tile} />
            ))}
          </div>
        </div>
      </section>

      <FaqSection />
    </div>
  );
}

export default Services;
