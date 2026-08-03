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

import heroMainMobile from '../assets/mobile/mobile-hone-hero.png';
import statsStreetMobile from '../assets/mobile/mobile-home-third.png';

import iconOldWoman from '../assets/icons/icon-old-woman.svg';
import iconHome from '../assets/icons/icon-home.svg';
import iconBooks from '../assets/icons/icon-books-blue.svg';
import iconCommunity from '../assets/icons/icon-community.svg';
import iconVolunteer from '../assets/icons/icon-volunteer.svg';
import iconPartnership from '../assets/icons/icon-partnership.svg';
import iconDonate from '../assets/icons/icon-donate-white.svg';
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

// `mobileLines` is the two-line break the mobile frame draws each label on
// ("Meaningful / Fellowship", not one long line). The 159px grid column is
// just wide enough to fit "Meaningful Fellowship" on one line, so the break
// is pinned with a <br> that's display:none from md up rather than left to
// the measured text width — which also keeps it stable while webfonts load.
//
// `forceBreak` restores that <br> at xl. Now that the desktop label is 16px
// (342:157, was 24), three of the four still wrap on their own inside their
// 188/150px measures, but "Safe & Dignified Aging" fits 188 on one line —
// and 342:157 is authored as two explicit lines, which is what keeps every
// column's label 42px tall and the row at its designed 90.
const FEATURES = [
  { icon: iconOldWoman, label: 'Safe & Dignified Aging', mobileLines: ['Safe &', 'Dignified Aging'], width: 188, forceBreak: true },
  { icon: iconHome, label: 'Independent Home Support', mobileLines: ['Independent', 'Home Support'], width: 188 },
  { icon: iconBooks, label: 'Meaningful Fellowship', mobileLines: ['Meaningful', 'Fellowship'], width: 150 },
  { icon: iconCommunity, label: 'Community Connections', mobileLines: ['Community', 'Connections'], width: 150 },
];

// Get-involved card CTAs keep their desktop (md:) geometry at every width per
// Figma's mobile frame (662:9459 nodes 662:9569/9577/9585 already match the
// md: numbers 1:1) — Button's learn-more/learn-more-light variants only
// expose that geometry from md: up, so an inline style (guaranteed to beat
// any class, regardless of Tailwind's stylesheet ordering) pins it here
// instead of letting it shrink to the variant's normal base/mobile size.
const LEARN_MORE_FIXED_STYLE = {
  height: '39.211px',
  borderRadius: '8.6px',
  borderWidth: '2.15px',
  paddingLeft: '34.4px',
  paddingRight: '34.4px',
  fontSize: '17.211px',
};

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

// Figma 342:186 / 342:194 no longer share a height: the Seniors card is 247
// with a 203px photo, Families is 251 with a 205px photo (its frame carries
// 25px of bottom padding against the other's 22). Both are pinned rather than
// left to the content, since 21px padding + the text column only sums to 246/247.
function WhoWeServeCard({
  image,
  title,
  body,
  showCta,
  mobileImageHeight = 199,
  cardHeight,
  imageHeight,
}) {
  return (
    <div
      className="flex w-full flex-col items-start gap-[24px] rounded-card border border-wb-400 bg-wb-200 pt-[10px] px-[10px] pb-[20px] md:flex-row md:items-center md:gap-8 md:p-5 xl:min-h-[var(--wws-card-h)] xl:gap-[79px] xl:px-[21px] xl:py-[21px] 2xl:h-[var(--wws-card-h)]"
      style={{ '--wws-card-h': `${cardHeight}px` }}
    >
      <img
        src={image}
        alt=""
        className="h-[var(--wws-img-h)] w-full shrink-0 rounded-card object-cover md:h-[200px] md:w-[300px] xl:h-[var(--wws-img-h-xl)] xl:w-[376px]"
        style={{ '--wws-img-h': `${mobileImageHeight}px`, '--wws-img-h-xl': `${imageHeight}px` }}
      />
      {/* Mobile frame (662:9459) groups image/text/CTA under one 24px gap
          (image→text and text→CTA both 24); the text-only wrapper below
          keeps its own 12px title/body gap unchanged at every width. */}
      <div className="flex min-w-0 flex-1 flex-col gap-[24px] md:gap-[36px]">
        <div className="flex flex-col gap-[12px]">
          <h3 className="font-sans text-[20px] font-semibold text-bl-900 md:text-[22px] xl:text-[28px]">{title}</h3>
          <p className="font-sans text-[16px] text-gray-67 md:text-[18px] xl:max-w-[661px] xl:text-[20px] 2xl:w-[661px]">{body}</p>
        </div>
        {showCta && (
          <Button as={Link} to="/nominate" variant="primary" className="self-start capitalize uppercase">
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
      className={`flex h-full min-h-[320px] w-full flex-col items-start gap-[48px] rounded-card px-[28px] py-[32px] md:gap-8 md:px-8 md:py-10 xl:gap-[64px] xl:pr-0 xl:pb-0 xl:pl-[var(--card-offset-l)] xl:pt-[var(--card-offset-t)] 2xl:h-[478px] 2xl:max-w-[419px] ${
        isDark ? 'bg-bl-600' : 'bg-bl-100'
      }`}
      style={{ '--card-offset-l': `${offsetLeft}px`, '--card-offset-t': `${offsetTop}px` }}
    >
      <img src={icon} alt="" style={{ width: iconSize, height: iconSize }} />
      <div
        className="flex w-full min-w-0 max-w-full flex-col gap-[12px] xl:max-w-[var(--card-text-w)] 2xl:w-[var(--card-text-w)]"
        style={{ '--card-text-w': `${textWidth}px` }}
      >
        <h3
          className={`font-sans text-[28px] font-medium ${isDark ? 'text-white' : 'text-navy'} md:text-[26px] xl:text-[24px]`}
        >
          {title}
        </h3>
        <p
          className={`font-sans text-[16px] ${isDark ? 'text-[#d9d9d9]' : 'text-gray-59'} md:text-[18px] xl:text-[20px]`}
        >
          {body}
        </p>
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
        // The mobile frame uses its own 402×746 portrait crop, exported
        // flattened — the scrim is already in the pixels, so the base CSS
        // wash is switched off to avoid double-darkening it.
        mobileImage={heroMainMobile}
        mobileOverlay="none"
        imagePosition="50% 34%"
        // 342:19 reports a scrim (0.9 held to 17.882%, fading to 0.2), but it
        // is ALREADY BAKED INTO hero-main.png — that 2880×1492 file is a
        // flattened export, not the 4096×2723 raw fill Figma references.
        // Measured against the Figma render of the frame: asset alone is MAD
        // 7.1, asset + this gradient in CSS is 19.1, and the raw fill + the
        // gradient is 36.0. Where the two differ (x≈160) the render is
        // *lighter* than the asset, so no added wash can help. Same trap as
        // About's hero — layering the CSS scrim double-darkens it.
        overlay="none"
        height={548}
        mobileHeight={746}
        mobileTextTop={410}
        mobileTextInset={16}
        textLeft={78}
        textWidth={485}
        textBottom={89}
        titleSize={36}
        titleTracking={1.8}
        // 342:22 is 92px over two lines. Playfair stands in for Lettertype and
        // its `normal` leading at 36px is 48, which would make the block 4px
        // taller and drag the buttons off their designed baseline — so the
        // line box is pinned.
        //
        // The frame holds the H1 to 426px, but that measure is Lettertype's:
        // in Playfair "Safely, Live With Dignity" runs 450px at 36/1.8, so 426
        // splits it a third time ("…/ Safely, Live With / Dignity"). Letting it
        // fill the 485px column reproduces the designed two-line break exactly
        // — 450 fits, while "Helping Seniors Age Safely," (500) still does not.
        titleLeading={46}
        title="Helping Seniors Age Safely, Live with Dignity"
        subtitle="Providing practical home support, meaningful fellowship, and community connections for older adults across Colorado."
      >
        <div className="mt-[20px] flex flex-wrap items-center gap-[21px]">
          <Button variant="hero-primary">GET HELP</Button>
          <Button variant="outline-light">DONATE</Button>
        </div>
      </PageHero>

      {/* Feature strip. 342:788 is a fixed 206px box that centres its 90px row
          (40 icon + 8 + 42 label), not a padded one — hence h + py-0 rather
          than a py that happens to sum to 206. */}
      <section className="w-full py-[60px] md:py-8 xl:flex xl:h-[206px] xl:flex-col xl:justify-center xl:py-0">
        {/* Figma 342:153 spaces each label 80px from the divider on either
            side (160px label-to-label), so both the row gap and the
            divider gap are 80. Mobile frame (662:9459) stays a plain 2-col
            grid (no dividers) inside the 370px content column. */}
        <div className="mx-auto grid max-w-[370px] grid-cols-2 gap-x-[20px] gap-y-[45px] px-[16px] md:max-w-[1440px] md:grid-cols-4 md:gap-x-8 md:gap-y-8 md:px-10 xl:flex xl:items-center xl:justify-center xl:gap-[80px] xl:px-0">
          {FEATURES.map((feature, index) => (
            <div key={feature.label} className="flex items-center gap-[40px] xl:gap-[80px]">
              {index > 0 && <span className="hidden h-[48px] w-px bg-b-300 xl:block" />}
              <div className="flex w-full flex-col items-center gap-[5.221px] md:gap-[8px]">
                <img src={feature.icon} alt="" className="size-[32.63px] md:size-[40px]" />
                <p
                  className="w-full text-center font-sans text-[15.662px] capitalize text-bl-600 md:text-[16px] xl:w-[var(--feature-w)]"
                  style={{ '--feature-w': `${feature.width}px` }}
                >
                  {feature.mobileLines[0]}
                  <br className={`md:hidden ${feature.forceBreak ? 'xl:block' : ''}`} />{' '}
                  {feature.mobileLines[1]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <StatsBand image={statsStreet} mobileImage={statsStreetMobile} stats={STATS} />

      {/* Who we serve */}
      <section className="w-full py-[60px] md:py-14 xl:py-[108px]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-[24px] md:gap-10 xl:gap-[61px]">
          {/* 342:181 is a fixed 62px row — taller than either of its children
              (47px chip, 52px two-line intro), which centre inside it. */}
          <div className="flex w-full flex-col items-start gap-6 px-[16px] text-left md:items-center md:px-10 md:text-center lg:flex-row lg:justify-center lg:gap-10 lg:text-left xl:gap-16 2xl:h-[62px] 2xl:gap-[226px] xl:items-center xl:px-[72px]">
            <SectionChip className="shrink-0">Who we serve</SectionChip>
            <p className="font-sans text-[16px] text-gray-59 md:text-[24px] min-w-0 max-w-full lg:max-w-[857px] lg:shrink lg:grow-0 xl:text-[20px] 2xl:w-[857px]">
              Supporting seniors and their families with practical care, community connections, and
              compassionate assistance.
            </p>
          </div>
          <div className="flex flex-col gap-6 px-[16px] md:px-10 xl:gap-[31px] xl:px-[72px]">
            <WhoWeServeCard
              image={serveSeniors}
              title="Seniors"
              body="Helping older adults maintain their independence through practical home support, companionship, and access to trusted community resources."
              showCta
              cardHeight={247}
              imageHeight={203}
            />
            <WhoWeServeCard
              image={serveFamilies}
              title="Families"
              body="Supporting families and caregivers with reliable services and guidance, ensuring their loved ones receive the care, connection, and assistance they need."
              mobileImageHeight={189}
              cardHeight={251}
              imageHeight={205}
            />
          </div>
        </div>
      </section>

      {/* How we help */}
      {/* 342:204 is a fixed 981 box centring 746.09 of content, i.e. 117.45
          of clearance top and bottom rather than the old 110. */}
      <section className="w-full bg-bl-100 py-[60px] md:py-14 xl:py-[117.45px]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-[24px] md:gap-10 xl:gap-[64px]">
          <div className="flex w-full flex-col items-start gap-6 px-[16px] text-left md:items-center md:px-10 md:text-center lg:flex-row lg:justify-center lg:gap-10 lg:text-left xl:gap-16 2xl:gap-[226px] xl:px-[72px]">
            <SectionChip variant="blue" className="shrink-0">How we help</SectionChip>
            <p className="font-sans text-[16px] text-gray-67 md:text-[24px] md:text-gray-59 min-w-0 max-w-full lg:max-w-[877px] lg:shrink lg:grow-0 xl:text-[20px] xl:text-gray-67 2xl:w-[877px]">
              Every senior&apos;s needs are unique. That&apos;s why our support is delivered through three
              key service categories, ensuring older adults receive the care, connection, and resources
              they need to thrive.
            </p>
          </div>
          <div className="grid w-full grid-cols-1 gap-6 px-[16px] md:grid-cols-2 md:px-10 lg:grid-cols-3 xl:gap-[20px] xl:px-[72px]">
            <StoryCard
              image={cardPractical}
              title="Practical home support"
              body="Helping seniors remain safe and independent with home assistance, transportation, and minor household support."
              ctaHref="/services"
              showArrowBadge
              bodyClassName="text-gray-59 md:text-black"
            />
            <StoryCard
              image={cardFellowship}
              title="Fellowship"
              body="Building meaningful relationships through companionship, shared activities, and a welcoming community."
              ctaHref="/services"
              showArrowBadge
              bodyClassName="text-gray-59 md:text-black"
            />
            <StoryCard
              image={cardCommunity}
              title="Community Connections"
              body="Connecting seniors with trusted local resources, essential services, and community programs that enhance their well-being."
              ctaHref="/services"
              showArrowBadge
              bodyClassName="text-gray-59 md:text-black"
            />
          </div>
        </div>
      </section>

      {/* 342:1002/1003 — 32px head over a 16px sub held to a 451px measure
          inside the 529px column, and 342:1004's pills carry a bare 28px
          glyph rather than the badge the other callers still draw. */}
      <CtaBanner
        image={ctaBannerImg}
        title="Here When You Need Us..."
        subtitle="Whether you need assistance or want to support our community, we'd love to hear from you."
        pills={CONTACT_PILLS}
        titleClassName="lg:text-[32px] lg:leading-[41px]"
        subtitleClassName="lg:w-[451px] lg:max-w-full lg:text-[16px]"
        barePillIcons
        textTop={86}
      />

      {/* Get involved. 342:251 is a fixed 863 box centring 602 of content
          (52 header + 72 + 478 cards) — 130.5 of clearance, not 110. The
          header shrank because its intro is now 20px and fits two lines. */}
      <section className="w-full py-[60px] md:py-14 xl:py-[130.5px]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-[24px] md:gap-10 xl:gap-[72px]">
          <div className="flex w-full flex-col items-start gap-6 px-[16px] text-left md:items-center md:px-10 md:text-center lg:flex-row lg:justify-center lg:gap-10 lg:text-left xl:gap-16 2xl:gap-[226px] xl:px-[72px]">
            <SectionChip className="shrink-0">Get involved</SectionChip>
            <p className="font-sans text-[16px] text-gray-59 md:text-[24px] min-w-0 max-w-full lg:max-w-[857px] lg:shrink lg:grow-0 xl:text-[20px] 2xl:w-[857px]">
              Join us in making a meaningful difference in the lives of seniors. Whether you volunteer,
              donate, or partner with us, your support helps build a stronger community.
            </p>
          </div>
          <div className="grid w-full grid-cols-1 gap-6 px-[16px] md:grid-cols-2 md:px-10 lg:grid-cols-3 xl:justify-center xl:gap-[20px] xl:px-[72px]">
            <GetInvolvedCard
              icon={iconVolunteer}
              iconSize={46}
              title="Volunteer"
              body="Share your time and skills by helping seniors with practical support, companionship, and community activities."
              textWidth={342}
              offsetLeft={39}
              offsetTop={55}
              cta={
                <Button as={Link} to="/get-involved" variant="learn-more" style={LEARN_MORE_FIXED_STYLE}>
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
                <Button as={Link} to="/get-involved" variant="learn-more" style={LEARN_MORE_FIXED_STYLE}>
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
                <Button as={Link} to="/get-involved" variant="learn-more-light" style={LEARN_MORE_FIXED_STYLE}>
                  Donate Now
                </Button>
              }
            />
          </div>
        </div>
      </section>

      <FaqSection compactType />
    </div>
  );
}

export default Home;
