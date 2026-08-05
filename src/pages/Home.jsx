import { Link } from 'react-router-dom';
import Button from '../components/Button.jsx';
import PageHero from '../components/PageHero.jsx';
import SectionChip from '../components/SectionChip.jsx';
import StatsBand from '../components/StatsBand.jsx';
import StoryCard from '../components/StoryCard.jsx';
import CtaBanner from '../components/CtaBanner.jsx';
import FaqSection from '../components/FaqSection.jsx';

import heroMainClean from '../assets/images/hero-main-clean.png';
import statsStreet from '../assets/images/stats-street.png';
import serveSeniors from '../assets/images/serve-seniors.png';
import serveFamilies from '../assets/images/serve-families.png';
import cardPractical from '../assets/images/card-practical.png';
import cardFellowship from '../assets/images/card-fellowship.png';
import cardCommunity from '../assets/images/card-community.png';
import ctaBannerImg from '../assets/images/cta-banner.png';

import statsStreetMobile from '../assets/mobile/mobile-home-third.png';

import iconOldWoman from '../assets/icons/icon-old-woman.svg';
import iconHome from '../assets/icons/icon-home.svg';
import iconBooks from '../assets/icons/icon-books-blue.svg';
import iconCommunity from '../assets/icons/icon-community.svg';
import iconVolunteer from '../assets/icons/icon-volunteer-maroon.svg';
import iconPartnership from '../assets/icons/icon-partnership-maroon.svg';
import iconDonate from '../assets/icons/icon-donate-white.svg';
import iconEmailBadged from '../assets/icons/icon-email-badged.svg';
import iconPhoneBadged from '../assets/icons/icon-phone-badged.svg';

/**
 * On Home the CTA banner's contact pills route into the Contact page's form
 * rather than opening a mail/phone client. The redesign's pill icons (799:
 * 3346 / 799:3350) already bake in their own s-300 rounded-square badge —
 * unlike every other caller's plain glyph — so they're only ever used with
 * `barePillIcons` (no second wrapper badge drawn around them).
 */
const CONTACT_PILLS = [
  {
    icon: iconEmailBadged,
    label: 'info@stephenstablecolorado.org',
    to: '/contact#contact-form',
  },
  { icon: iconPhoneBadged, label: '970-375-9179', to: '/contact#contact-form' },
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

// Get involved's redesign recolors the Volunteer/Corporate Partnerships
// "learn more" outline to the sage s-600 stroke with black type (799:3117 /
// 799:3127); Donate's white-on-maroon "Donate Now" pill (learn-more-light)
// is untouched, so only the first two cards swap LEARN_MORE_FIXED_STYLE for
// this variant of it.
const GI_LEARN_MORE_STYLE = {
  ...LEARN_MORE_FIXED_STYLE,
  borderColor: 'var(--color-s-600)',
  color: '#000',
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
      className="flex w-full flex-col items-start gap-[24px] rounded-card border border-[#d0e4db] bg-bl-50 pt-[10px] px-[10px] pb-[20px] md:flex-row md:items-center md:gap-8 md:p-5 xl:min-h-[var(--wws-card-h)] xl:gap-[79px] xl:px-[21px] xl:py-[21px] 2xl:h-[var(--wws-card-h)]"
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
          <Button
            as={Link}
            to="/nominate"
            variant="primary"
            className="self-start capitalize uppercase"
            style={{ backgroundColor: 'var(--color-s-200)' }}
          >
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
        isDark ? 'bg-m-700' : 'border border-[rgba(200,0,0,0.19)] bg-[#fff1ed]'
      }`}
      style={{ '--card-offset-l': `${offsetLeft}px`, '--card-offset-t': `${offsetTop}px` }}
    >
      <img src={icon} alt="" style={{ width: iconSize, height: iconSize }} />
      <div
        className="flex w-full min-w-0 max-w-full flex-col gap-[12px] xl:max-w-[var(--card-text-w)] 2xl:w-[var(--card-text-w)]"
        style={{ '--card-text-w': `${textWidth}px` }}
      >
        <h3
          className={`font-sans text-[28px] font-medium ${isDark ? 'text-white' : 'text-m-600'} md:text-[26px] xl:text-[24px]`}
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
        image={heroMainClean}
        imagePosition="50% 34%"
        // 799:2922's frame carries a real scrim, unlike the previous
        // Home hero (which had it baked into a flattened export): dark on
        // the LEFT (behind the copy), fading out toward the wall on the
        // right — a 270deg gradient rather than the shared `to right`
        // default.
        overlay="gradient"
        overlayGradient="linear-gradient(270deg, rgba(24,33,45,0.2) 12.26%, rgba(24,33,45,0.81) 67.58%, #18212d 104.69%)"
        // The mobile frame keeps the same top-light/bottom-dark vertical
        // wash every page uses, just recolored to match the redesign's
        // navy-blue (bl-900) scrim instead of the site-wide espresso.
        mobileOverlayGradient="linear-gradient(to bottom, rgba(24,33,45,0.2), rgba(24,33,45,0.9))"
        height={548}
        // 803:6013's hero rect is 610 tall (the 746 image inside it overflows
        // and is clipped), and 803:6271 — the only mobile text block on the
        // site that carries a CTA row — sits at y=345 in a band starting at
        // 71, i.e. 274 down, and ends **65 clear of the band's bottom**.
        //
        // Those two numbers cannot both be honoured, because the frame's
        // subtitle is the unfinished "We provide practical..." fragment (one
        // 21px line) where we ship the real three-line copy. Our block is
        // 313 against the frame's 271, so the **65** is what gets matched —
        // anchored from the bottom rather than positioned at 610 − 65 − 313,
        // so a narrower phone that wraps the H1 to five lines spends the
        // extra height on the empty space above the copy rather than on the
        // buttons' clearance. Top-anchored at 274 the row sat 11px off the
        // band's bottom edge, which is the crowding this pass exists to fix.
        mobileHeight={610}
        mobileTextBottom={65}
        mobileTextInset={16}
        // 803:6273 is the site's only multi-line mobile H1 — four lines on a
        // 41px box. Playfair draws its `normal` at 43, i.e. 172 against the
        // frame's 164, and all 8px of that landed on the CTA clearance.
        mobileTitleLeading={41}
        // 830:6 is a 430 × 267 block at x=72, ending 94 clear of the band's
        // bottom edge (259 + 267 = 526 in a band running 72…620). The 485
        // measure and the 78/100 offsets it replaces were 799:2928's.
        textLeft={72}
        textWidth={430}
        textBottom={94}
        titleSize={36}
        // 830:8 carries **no letter-spacing** — the 1.8px this used to pass
        // (2.4 before the redesign) is gone from the layer entirely. `md` is
        // set with it so the tablet tier gets the same type style rather than
        // keeping the old 2.2 step, which is the tier a Windows box at 125%
        // scaling actually lands on.
        titleTracking={0}
        titleTrackingMd={0}
        // 830:8 is 144 tall over three lines, i.e. a 48px box — which is
        // exactly Playfair's `normal` at 36. Pinned rather than left implicit
        // so the block height can't drift with the font stack.
        titleLeading={48}
        // The SemiBold weight 830:8 draws now lives on PageHero's h1 — every
        // hero wants it — so this only carries the measures.
        //
        // The 430 column now breaks the H1 the way the frame does on its own
        // ("Helping Seniors Age / Safely And Experience A / True Sense Of
        // Belonging."), so the old `xl:max-w-[460px]` pin — fitted to the
        // wider 485 measure — is gone.
        //
        // Base keeps its own cap: 803:6272 is a **335** measure inside a 370
        // gutter-to-gutter block, which is what breaks the mobile H1
        // "Helping Seniors Age / Safely And / Experience A True / Sense Of
        // Belonging." Left on the full 370 it reads "…Age / Safely And
        // Experience / A True Sense Of / Belonging." — still four lines, so
        // no height moves, but not the frame's words. The cap is on the H1
        // alone; the subtitle keeps the full 370. `md:max-w-none` holds the
        // tablet tier exactly where it already was.
        titleClassName="max-w-[335px] md:max-w-none"
        title="Helping seniors age safely and experience a true sense of belonging."
        // 830:9 reads "We provide practical..." — it looks like an unfinished
        // Figma fragment, and this used to ship the longer real sentence
        // instead. Shipping the frame's string verbatim was asked for
        // directly, and it is what makes the block land on its drawn
        // geometry: one 26px line takes 830:6 to its authored
        // 144 + 16 + 26 + 36 + 45 = 267, so the bottom-anchored block starts
        // at the frame's y=259 rather than 43px above it.
        //
        // It does the same on mobile — 803:6274 carries the identical
        // fragment, and the 313-tall block the old copy produced there
        // (against the frame's 271) is what `mobileTextBottom` exists to
        // absorb. That anchor still holds the CTA row at 65 clear; it just no
        // longer has 42px of overflow to soak up.
        subtitle="We provide practical..."
      >
        <div className="mt-[20px] flex flex-wrap items-center gap-[21px]">
          <Button variant="hero-primary" style={{ backgroundColor: 'var(--color-s-200)' }}>
            GET HELP
          </Button>
          <Button as={Link} to="/donation" variant="outline-light">
            DONATE
          </Button>
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
              {index > 0 && <span className="hidden h-[48px] w-px bg-bl-600 xl:block" />}
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

      <StatsBand
        image={statsStreet}
        mobileImage={statsStreetMobile}
        stats={STATS}
        bgClassName="bg-m-600"
      />

      {/* Who we serve */}
      <section className="w-full py-[60px] md:py-14 xl:py-[108px]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-[24px] md:gap-10 xl:gap-[61px]">
          {/* 342:181 is a fixed 62px row — taller than either of its children
              (47px chip, 52px two-line intro), which centre inside it. */}
          <div className="flex w-full flex-col items-start gap-6 px-[16px] text-left md:items-center md:px-10 md:text-center lg:flex-row lg:justify-center lg:gap-10 lg:text-left xl:gap-16 2xl:h-[62px] 2xl:gap-[226px] xl:items-center xl:px-[72px]">
            <SectionChip variant="green-tint" className="shrink-0">Who we serve</SectionChip>
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
      <section
        className="w-full py-[60px] md:py-14 xl:py-[117.45px]"
        style={{ backgroundImage: 'linear-gradient(235.17deg, #fffcf7 1.4134%, #ffe3e3 100%)' }}
      >
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-[24px] md:gap-10 xl:gap-[64px]">
          <div className="flex w-full flex-col items-start gap-6 px-[16px] text-left md:items-center md:px-10 md:text-center lg:flex-row lg:justify-center lg:gap-10 lg:text-left xl:gap-16 2xl:gap-[226px] xl:px-[72px]">
            <SectionChip variant="green-solid" className="shrink-0">How we help</SectionChip>
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
              titleClassName="capitalize text-black"
              bodyClassName="text-gray-59 md:text-black"
            />
            <StoryCard
              image={cardFellowship}
              title="Fellowship"
              body="Building meaningful relationships through companionship, shared activities, and a welcoming community."
              ctaHref="/services"
              showArrowBadge
              titleClassName="capitalize text-black"
              bodyClassName="text-gray-59 md:text-black"
            />
            <StoryCard
              image={cardCommunity}
              title="Community Connections"
              body="Connecting seniors with trusted local resources, essential services, and community programs that enhance their well-being."
              ctaHref="/services"
              showArrowBadge
              titleClassName="capitalize text-black"
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
        bg="blue"
        title="Here When You Need Us..."
        subtitle="Whether you need assistance or want to support our community, we'd love to hear from you."
        pills={CONTACT_PILLS}
        pillTextTransform="normal-case"
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
            <SectionChip variant="green-solid" className="shrink-0">Get involved</SectionChip>
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
                <Button as={Link} to="/get-involved" variant="learn-more" style={GI_LEARN_MORE_STYLE}>
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
                <Button as={Link} to="/get-involved" variant="learn-more" style={GI_LEARN_MORE_STYLE}>
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
