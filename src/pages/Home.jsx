import { Link } from 'react-router-dom';
import Button from '../components/Button.jsx';
import PageHero from '../components/PageHero.jsx';
import SectionChip from '../components/SectionChip.jsx';
import StatsBand from '../components/StatsBand.jsx';
import StoryCard from '../components/StoryCard.jsx';
import CtaBanner from '../components/CtaBanner.jsx';
import FaqSection from '../components/FaqSection.jsx';

import heroMain from '../assets/images/hero-main.png';
import statsStreet from '../assets/images/stats-street.png';
import serveSeniors from '../assets/images/serve-seniors.png';
import serveFamilies from '../assets/images/serve-families.png';
import cardPractical from '../assets/images/card-practical.png';
import cardFellowship from '../assets/images/card-fellowship.png';
import cardCommunity from '../assets/images/card-community.png';
import ctaBannerImg from '../assets/images/cta-banner.png';

import iconOldWoman from '../assets/icons/icon-old-woman.svg';
import iconHome from '../assets/icons/icon-home.svg';
import iconBooks from '../assets/icons/icon-books.svg';
import iconCommunity from '../assets/icons/icon-community.svg';
import iconVolunteer from '../assets/icons/icon-volunteer.svg';
import iconPartnership from '../assets/icons/icon-partnership.svg';
import iconDonate from '../assets/icons/icon-donate.svg';

const FEATURES = [
  { icon: iconOldWoman, label: 'Safe & Dignified Aging', width: 188 },
  { icon: iconHome, label: 'Independent Home Support', width: 188 },
  { icon: iconBooks, label: 'Meaningful Fellowship', width: 150 },
  { icon: iconCommunity, label: 'Community Connections', width: 150 },
];

const STATS = [
  {
    value: '21.09%',
    caption: 'of the population in Northern Colorado cities is between the ages of 65 and 74.',
  },
  {
    value: '64,000+',
    caption: 'Seniors across Northern Colorado may benefit from trusted support and community resources.',
  },
];

function WhoWeServeCard({ image, title, body, showCta }) {
  return (
    <div className="flex h-[285px] w-full items-center gap-[79px] rounded-card border border-wb-400 bg-wb-200 px-[21px] py-[21px]">
      <img src={image} alt="" className="h-[243px] w-[450px] shrink-0 rounded-card object-cover" />
      <div className="flex flex-col gap-[12px]">
        <h3 className="font-sans text-[28px] font-semibold text-bl-900">{title}</h3>
        <p className="w-[661px] font-sans text-[20px] text-gray-67">{body}</p>
        {showCta && (
          <Button as={Link} to="/nominate" variant="primary" className="mt-[36px] self-start capitalize">
            Nominate a Senior
          </Button>
        )}
      </div>
    </div>
  );
}

function GetInvolvedCard({ icon, title, body, bg, textWidth, cta }) {
  const isDark = bg === 'dark';
  return (
    <div
      className={`flex h-[478px] w-[419px] flex-col items-start gap-[64px] rounded-card px-[39px] pt-[55px] ${
        isDark ? 'bg-bl-600' : 'bg-bl-100'
      }`}
    >
      <img src={icon} alt="" style={{ width: 46, height: 46 }} />
      <div className="flex flex-col gap-[12px]" style={{ width: textWidth }}>
        <h3 className={`font-sans text-[32px] font-medium ${isDark ? 'text-white' : 'text-navy'}`}>
          {title}
        </h3>
        <p className={`font-sans text-[20px] ${isDark ? 'text-[#d9d9d9]' : 'text-gray-59'}`}>{body}</p>
      </div>
      {cta}
    </div>
  );
}

function Home() {
  return (
    <div>
      <PageHero
        image={heroMain}
        height={746}
        textLeft={78}
        textWidth={485}
        textBottom={68}
        title="Helping Seniors Age Safely, Live with Dignity"
        subtitle="Providing practical home support, meaningful fellowship, and community connections for older adults across Colorado."
      >
        <div className="mt-[20px] flex items-center gap-[21px]">
          <Button variant="hero-primary">GET HELP</Button>
          <Button variant="outline-light">DONATE</Button>
        </div>
      </PageHero>

      {/* Feature strip */}
      <section className="w-full py-[43px]">
        <div className="mx-auto flex max-w-[1440px] items-center justify-center gap-[40px]">
          {FEATURES.map((feature, index) => (
            <div key={feature.label} className="flex items-center gap-[40px]">
              {index > 0 && <span className="h-[48px] w-px bg-b-300" />}
              <div className="flex flex-col items-center gap-[8px]">
                <img src={feature.icon} alt="" className="size-[50px]" />
                <p
                  className="text-center font-sans text-[24px] capitalize text-bl-600"
                  style={{ width: feature.width }}
                >
                  {feature.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <StatsBand image={statsStreet} stats={STATS} />

      {/* Who we serve */}
      <section className="w-full py-[108px]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-[61px]">
          <div className="flex items-center justify-center gap-[226px] px-[72px]">
            <SectionChip className="shrink-0 whitespace-nowrap">Who we serve</SectionChip>
            <p className="w-[857px] shrink-0 font-sans text-[24px] text-gray-59">
              Supporting seniors and their families with practical care, community connections, and
              compassionate assistance.
            </p>
          </div>
          <div className="flex flex-col gap-[31px] px-[72px]">
            <WhoWeServeCard
              image={serveSeniors}
              title="Seniors"
              body="Helping older adults maintain their independence through practical home support, companionship, and access to trusted community resources."
              showCta
            />
            <WhoWeServeCard
              image={serveFamilies}
              title="Families"
              body="Supporting families and caregivers with reliable services and guidance, ensuring their loved ones receive the care, connection, and assistance they need."
            />
          </div>
        </div>
      </section>

      {/* How we help */}
      <section className="w-full bg-bl-100 py-[110px]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-[64px]">
          <div className="flex items-center justify-center gap-[226px] px-[72px]">
            <SectionChip variant="blue" className="shrink-0 whitespace-nowrap">How we help</SectionChip>
            <p className="w-[877px] shrink-0 font-sans text-[24px] text-gray-59">
              Every senior&apos;s needs are unique. That&apos;s why our support is delivered through three
              key service categories, ensuring older adults receive the care, connection, and resources
              they need to thrive.
            </p>
          </div>
          <div className="flex gap-[20px] px-[72px]">
            <StoryCard
              image={cardPractical}
              title="Practical home support"
              body="Helping seniors remain safe and independent with home assistance, transportation, and minor household support."
              ctaHref="/services"
              showArrowBadge
            />
            <StoryCard
              image={cardFellowship}
              title="Fellowship"
              body="Building meaningful relationships through companionship, shared activities, and a welcoming community."
              ctaHref="/services"
              showArrowBadge
            />
            <StoryCard
              image={cardCommunity}
              title="Community Connections"
              body="Connecting seniors with trusted local resources, essential services, and community programs that enhance their well-being."
              ctaHref="/services"
              showArrowBadge
            />
          </div>
        </div>
      </section>

      <CtaBanner
        image={ctaBannerImg}
        title="Here When You Need Us..."
        subtitle="Whether you need assistance or want to support our community, we'd love to hear from you."
      />

      {/* Get involved */}
      <section className="w-full py-[110px]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-[72px]">
          <div className="flex items-center justify-center gap-[226px] px-[72px]">
            <SectionChip className="shrink-0 whitespace-nowrap">Get involved</SectionChip>
            <p className="w-[857px] shrink-0 font-sans text-[24px] text-gray-59">
              Join us in making a meaningful difference in the lives of seniors. Whether you volunteer,
              donate, or partner with us, your support helps build a stronger community.
            </p>
          </div>
          <div className="flex justify-center gap-[20px] px-[72px]">
            <GetInvolvedCard
              icon={iconVolunteer}
              title="Volunteer"
              body="Share your time and skills by helping seniors with practical support, companionship, and community activities."
              textWidth={342}
              cta={
                <Button as={Link} to="/get-involved" variant="learn-more">
                  learn more
                </Button>
              }
            />
            <GetInvolvedCard
              icon={iconPartnership}
              title="Corporate Partnerships"
              body="Partner with Stephen's Table to create lasting community impact through volunteering, sponsorships, and collaborative initiatives."
              textWidth={356}
              cta={
                <Button as={Link} to="/get-involved" variant="learn-more">
                  learn more
                </Button>
              }
            />
            <GetInvolvedCard
              icon={iconDonate}
              title="Donate"
              body="Share your time and skills by helping seniors with practical support, companionship, and community activities."
              textWidth={342}
              bg="dark"
              cta={
                <Button as={Link} to="/get-involved" variant="learn-more-light">
                  Donate Now
                </Button>
              }
            />
          </div>
        </div>
      </section>

      <FaqSection />
    </div>
  );
}

export default Home;
