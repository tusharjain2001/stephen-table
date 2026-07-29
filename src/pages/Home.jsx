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
import iconBooks from '../assets/icons/icon-books-blue.svg';
import iconCommunity from '../assets/icons/icon-community.svg';
import iconVolunteer from '../assets/icons/icon-volunteer.svg';
import iconPartnership from '../assets/icons/icon-partnership.svg';
import iconDonate from '../assets/icons/icon-donate.svg';
import iconEmail from '../assets/icons/icon-email.svg';
import iconPhone from '../assets/icons/icon-phone.svg';

/**
 * On Home the CTA banner's contact pills route into the Contact page's form
 * rather than opening a mail/phone client.
 */
const CONTACT_PILLS = [
  {
    icon: iconEmail,
    label: 'info@stephenstablecolorado.org',
    to: '/contact#contact-form',
  },
  { icon: iconPhone, label: '970-375-9179', to: '/contact#contact-form' },
];

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
    <div className="flex w-full flex-col items-start gap-6 rounded-card border border-wb-400 bg-wb-200 p-5 sm:flex-row sm:items-center sm:gap-8 xl:min-h-[285px] xl:gap-[79px] xl:px-[21px] xl:py-[21px] 2xl:h-[285px]">
      <img
        src={image}
        alt=""
        className="h-[220px] w-full shrink-0 rounded-card object-cover sm:h-[200px] sm:w-[300px] xl:h-[243px] xl:w-[450px]"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-[12px]">
        <h3 className="font-sans text-[22px] font-semibold text-bl-900 xl:text-[28px]">{title}</h3>
        <p className="font-sans text-[18px] text-gray-67 xl:max-w-[661px] xl:text-[20px] 2xl:w-[661px]">{body}</p>
        {showCta && (
          <Button as={Link} to="/nominate" variant="primary" className="mt-[24px] self-start capitalize xl:mt-[36px]">
            Nominate a Senior
          </Button>
        )}
      </div>
    </div>
  );
}

function GetInvolvedCard({ icon, iconSize = 46, title, body, bg, textWidth, offsetLeft = 39, offsetTop = 55, cta }) {
  const isDark = bg === 'dark';
  return (
    <div
      className={`flex h-full min-h-[320px] w-full flex-col items-start gap-8 rounded-card px-8 py-10 xl:gap-[64px] xl:pr-0 xl:pb-0 xl:pl-[var(--card-offset-l)] xl:pt-[var(--card-offset-t)] 2xl:h-[478px] 2xl:max-w-[419px] ${
        isDark ? 'bg-bl-600' : 'bg-bl-100'
      }`}
      style={{ '--card-offset-l': `${offsetLeft}px`, '--card-offset-t': `${offsetTop}px` }}
    >
      <img src={icon} alt="" style={{ width: iconSize, height: iconSize }} />
      <div
        className="flex w-full min-w-0 max-w-full flex-col gap-[12px] xl:max-w-[var(--card-text-w)] 2xl:w-[var(--card-text-w)]"
        style={{ '--card-text-w': `${textWidth}px` }}
      >
        <h3 className={`font-sans text-[26px] font-medium ${isDark ? 'text-white' : 'text-navy'} xl:text-[32px]`}>
          {title}
        </h3>
        <p className={`font-sans text-[18px] ${isDark ? 'text-[#d9d9d9]' : 'text-gray-59'} xl:text-[20px]`}>{body}</p>
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
        <div className="mt-[20px] flex flex-wrap items-center gap-[21px]">
          <Button variant="hero-primary">GET HELP</Button>
          <Button variant="outline-light">DONATE</Button>
        </div>
      </PageHero>

      {/* Feature strip */}
      <section className="w-full py-8 xl:py-[43px]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-x-6 gap-y-8 px-6 sm:grid-cols-4 sm:gap-x-8 md:px-10 xl:flex xl:items-center xl:justify-center xl:gap-[40px] xl:px-0">
          {FEATURES.map((feature, index) => (
            <div key={feature.label} className="flex items-center gap-[40px]">
              {index > 0 && <span className="hidden h-[48px] w-px bg-b-300 xl:block" />}
              <div className="flex w-full flex-col items-center gap-[8px]">
                <img src={feature.icon} alt="" className="size-[40px] xl:size-[50px]" />
                <p
                  className="w-full text-center font-sans text-[16px] capitalize text-bl-600 xl:w-[var(--feature-w)] xl:text-[24px]"
                  style={{ '--feature-w': `${feature.width}px` }}
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
      <section className="w-full py-14 xl:py-[108px]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-10 xl:gap-[61px]">
          <div className="flex w-full flex-col items-center gap-6 px-6 text-center md:px-10 lg:flex-row lg:justify-center lg:gap-10 lg:text-left xl:gap-16 2xl:gap-[226px] xl:px-[72px]">
            <SectionChip className="shrink-0">Who we serve</SectionChip>
            <p className="font-sans text-[18px] text-gray-59 md:text-[24px] min-w-0 max-w-full lg:max-w-[857px] lg:shrink lg:grow-0 2xl:w-[857px]">
              Supporting seniors and their families with practical care, community connections, and
              compassionate assistance.
            </p>
          </div>
          <div className="flex flex-col gap-6 px-6 md:px-10 xl:gap-[31px] xl:px-[72px]">
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
      <section className="w-full bg-bl-100 py-14 xl:py-[110px]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-10 xl:gap-[64px]">
          <div className="flex w-full flex-col items-center gap-6 px-6 text-center md:px-10 lg:flex-row lg:justify-center lg:gap-10 lg:text-left xl:gap-16 2xl:gap-[226px] xl:px-[72px]">
            <SectionChip variant="blue" className="shrink-0">How we help</SectionChip>
            <p className="font-sans text-[18px] text-gray-59 md:text-[24px] min-w-0 max-w-full lg:max-w-[877px] lg:shrink lg:grow-0 2xl:w-[877px]">
              Every senior&apos;s needs are unique. That&apos;s why our support is delivered through three
              key service categories, ensuring older adults receive the care, connection, and resources
              they need to thrive.
            </p>
          </div>
          <div className="grid w-full grid-cols-1 gap-6 px-6 md:grid-cols-2 md:px-10 lg:grid-cols-3 xl:gap-[20px] xl:px-[72px]">
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
        pills={CONTACT_PILLS}
      />

      {/* Get involved */}
      <section className="w-full py-14 xl:py-[110px]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-10 xl:gap-[72px]">
          <div className="flex w-full flex-col items-center gap-6 px-6 text-center md:px-10 lg:flex-row lg:justify-center lg:gap-10 lg:text-left xl:gap-16 2xl:gap-[226px] xl:px-[72px]">
            <SectionChip className="shrink-0">Get involved</SectionChip>
            <p className="font-sans text-[18px] text-gray-59 md:text-[24px] min-w-0 max-w-full lg:max-w-[857px] lg:shrink lg:grow-0 2xl:w-[857px]">
              Join us in making a meaningful difference in the lives of seniors. Whether you volunteer,
              donate, or partner with us, your support helps build a stronger community.
            </p>
          </div>
          <div className="grid w-full grid-cols-1 gap-6 px-6 md:grid-cols-2 md:px-10 lg:grid-cols-3 xl:justify-center xl:gap-[20px] xl:px-[72px]">
            <GetInvolvedCard
              icon={iconVolunteer}
              iconSize={46}
              title="Volunteer"
              body="Share your time and skills by helping seniors with practical support, companionship, and community activities."
              textWidth={342}
              offsetLeft={39}
              offsetTop={55}
              cta={
                <Button as={Link} to="/get-involved" variant="learn-more">
                  learn more
                </Button>
              }
            />
            <GetInvolvedCard
              icon={iconPartnership}
              iconSize={49}
              title="Corporate Partnerships"
              body="Partner with Stephen's Table to create lasting community impact through volunteering, sponsorships, and collaborative initiatives."
              textWidth={356}
              offsetLeft={32}
              offsetTop={52}
              cta={
                <Button as={Link} to="/get-involved" variant="learn-more">
                  learn more
                </Button>
              }
            />
            <GetInvolvedCard
              icon={iconDonate}
              iconSize={46}
              title="Donate"
              body="Your generosity helps provide practical support, nourishing meals, and meaningful connection to seniors who need it most."
              textWidth={342}
              offsetLeft={39}
              offsetTop={53}
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
