import PageHero from '../components/PageHero.jsx';
import SectionChip from '../components/SectionChip.jsx';
import StatsBand from '../components/StatsBand.jsx';
import CtaBanner from '../components/CtaBanner.jsx';

import heroAbout from '../assets/images/hero-about.png';
import aboutStory from '../assets/images/about-story.png';
import ctaBannerBlueImg from '../assets/images/cta-banner-blue.png';
import leaderJim from '../assets/images/leader-jim.png';
import leaderJess from '../assets/images/leader-jess.png';
import leaderRyan from '../assets/images/leader-ryan.png';
import iconStarOutline from '../assets/icons/icon-star-outline.svg';

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

const STORY_PARAGRAPHS = [
  "Stephen's Table Colorado was born from a simple yet powerful belief: every senior deserves to age with dignity, independence, and a genuine sense of belonging. As Northern Colorado's older adult population continues to grow, so does the need for compassionate support that extends beyond basic care. Many seniors wish to remain in the comfort of their own homes, surrounded by familiar places and cherished memories, but often face challenges that make everyday living more difficult.",
  "Recognizing these needs, Stephen's Table Colorado brings together caring volunteers, dedicated partners, generous donors, and local organizations to create a network of practical assistance and meaningful human connection. Whether it's helping with household tasks, providing transportation, offering companionship, or connecting individuals with essential community resources, every effort is focused on improving the quality of life for older adults and their families.",
  'At the heart of our work is the belief that small acts of kindness can create lasting impact. We know that a helping hand, a friendly conversation, or access to the right resources can make all the difference in helping someone remain safe, independent, and connected to their community.',
];

const LEADERS = [
  { image: leaderJim, name: 'Jim Nix', role: 'Chief Executive Officer (CEO)' },
  { image: leaderJess, name: 'Jess Nix', role: 'President of Advancement' },
  { image: leaderRyan, name: 'Ryan Potter', role: 'Chief Operations Officer (COO)' },
];

function MissionBlock({ title, body }) {
  // Figma 342:626 top-aligns the star with the title, not centred; the
  // mobile frame (662:10346 node 662:10363) also top-aligns (items-start),
  // it's only the ≥768 tiers that centre the star until xl restores start.
  return (
    <div className="flex w-full max-w-[466px] items-start gap-6 md:items-center xl:items-start xl:gap-[44px]">
      <img src={iconStarOutline} alt="" className="size-[25px] shrink-0 md:size-[40px] xl:size-[50px]" />
      <div className="flex w-full max-w-[372px] flex-col gap-[8px]">
        {/* Neulis Sans isn't licensed here so font-neulis falls back to
            Poppins, whose normal leading is ~1.5 vs Neulis' ~1.32. Pin the
            line boxes to Figma's (342:629 h=37, 342:630 h=62 over 2 lines) —
            the mobile frame doesn't call out a custom leading, so base stays
            "normal". */}
        <h3 className="font-neulis text-[20px] font-semibold text-bl-600 md:text-[22px] xl:text-[28px] xl:leading-[37px]">{title}</h3>
        <p className="font-neulis text-[16px] text-bl-600 md:text-[18px] xl:text-[24px] xl:leading-[31px]">{body}</p>
      </div>
    </div>
  );
}

function LeaderCard({ image, name, role }) {
  return (
    <div className="w-full max-w-[419.34px] rounded-[14.117px] bg-white p-[3.529px] md:rounded-card md:p-[4px]">
      <div className="w-full rounded-[14.117px] bg-cream md:rounded-card">
        <img
          src={image}
          alt={name}
          className="h-[395.858px] w-full rounded-t-[14.117px] object-cover md:h-[400px] md:rounded-t-card xl:h-[448.65px]"
        />
        <div className="flex flex-col gap-[6.93px] p-[14.908px] md:gap-[7.9px] md:p-[16.9px]">
          {/* Figma 342:938 h=37, 342:939 h=26 — see the Poppins note above;
              the mobile frame's 24.705/17.647px sizes don't call out a
              custom leading, so base uses "normal". */}
          <h3 className="font-neulis text-[24.705px] font-medium text-bl-600 md:text-[28px] md:leading-[37px]">{name}</h3>
          <p className="font-neulis text-[17.647px] capitalize text-bl-600 md:text-[20px] md:leading-[26px]">{role}</p>
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <div>
      <PageHero
        image={heroAbout}
        // hero-about.png is a flattened 1440x548 export of the Figma hero —
        // it already contains the scrim (it matches the Figma render at a
        // mean abs difference of 1.21/255), so adding the CSS gradient on
        // top darkened it twice.
        overlay="none"
        height={548}
        mobileTextTop={571}
        textLeft={72}
        textWidth={618}
        textBottom={54}
        title="About us"
        // subtitleClassName is deliberately omitted: the pre-mobile-pass
        // "text-[24px]" override never actually won at md/xl (the
        // component's own md:text-[18px]/xl:text-[20px] always beat it —
        // verified via computed style, 18px/20px respectively) — its only
        // real effect was at base (<768), where it's now superseded by the
        // component's own base text-[16px] mobile default. Omitting it
        // keeps ≥768 byte-identical while landing exactly on the Figma
        // mobile subtitle size.
        subtitle="we provide practical home support, meaningful fellowship, and community connections for older adults across Northern Colorado."
      />

      {/* Mission / Vision */}
      {/* Figma 342:625 declares this band as a fixed h-203 box with its
          content centred, not as padding around content. The mobile frame
          (662:10346 node 662:10362) drops the gradient/divider entirely and
          just stacks the two blocks with a 20px gap. */}
      <section className="w-full py-[60px] md:bg-gradient-to-b md:from-wb-200 md:to-cream md:py-10 xl:h-[203px] xl:py-0">
        <div className="mx-auto flex h-full max-w-[1440px] flex-col items-center justify-center gap-[20px] px-6 md:flex-row md:gap-10 md:px-10 xl:gap-[108px]">
          <MissionBlock title="Mission" body="Helping older adults age safely and live with dignity." />
          <span className="hidden h-[45px] w-[2px] bg-[#3E4F69] md:block" />
          <MissionBlock title="Vision" body="to build A community where every senior thrives" />
        </div>
      </section>

      {/* Our Story */}
      {/* Figma 342:838: fixed h-826 box, content centred. Mobile frame
          (662:10346 node 662:10502) uses the same wb-100 (#fbf6ee) bg but a
          tighter 23px gap between chip/image/copy, an image cropped to its
          bottom edge, and un-justified body copy. */}
      <section className="w-full bg-wb-100 py-[60px] md:py-14 xl:h-[826px] xl:py-0">
        <div className="mx-auto flex h-full max-w-[1440px] flex-col justify-center gap-[23px] px-6 md:gap-[32px] md:px-10 xl:px-[72px]">
          <SectionChip variant="beige" className="self-start">Our Story</SectionChip>
          <div className="flex flex-col gap-[23px] md:gap-8 lg:flex-row lg:items-center lg:gap-[53px]">
            <img
              src={aboutStory}
              alt=""
              className="h-[460px] w-full shrink-0 rounded-card object-cover object-bottom md:h-[360px] md:object-center lg:h-[520px] lg:w-[419px]"
            />
            {/* Figma 342:828 sets 20px on a normal (26px) leading and
                separates paragraphs with a single blank line, i.e. one more
                26px line — not an arbitrary gap. Mobile frame drops the
                justify (md:text-justify) and bumps the body to 20px. */}
            <div className="flex flex-col gap-[20px] font-neulis text-[20px] text-gray-59 md:text-justify md:text-[18px] lg:w-[824px] xl:gap-[26px] xl:text-[20px] xl:leading-[26px]">
              {STORY_PARAGRAPHS.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <StatsBand stats={STATS} />

      {/* Leadership */}
      {/* Figma 342:964: fixed h-816 box, content centred. */}
      <section className="w-full bg-gradient-to-b from-cream to-bl-100 py-[60px] md:py-14 xl:h-[816px] xl:py-0">
        <div className="mx-auto flex h-full max-w-[1440px] flex-col items-center justify-center gap-[24px] md:gap-8 xl:gap-[38px]">
          <div className="flex w-full flex-col items-start gap-6 px-[16px] text-left md:items-center md:px-10 md:text-center lg:flex-row lg:justify-center lg:gap-10 lg:text-left xl:gap-16 2xl:gap-[247px] xl:px-[72px]">
            <SectionChip className="shrink-0">Leadership</SectionChip>
            <p className="font-sans text-[16px] text-gray-59 md:text-[24px] min-w-0 max-w-full lg:max-w-[857px] lg:shrink lg:grow-0 2xl:w-[857px]">
              Meet the leaders of Stephen&apos;s Table
            </p>
          </div>
          <div className="grid w-full grid-cols-1 gap-6 px-[16px] md:grid-cols-2 md:px-10 lg:grid-cols-3 xl:gap-[20px] xl:px-[72px]">
            {LEADERS.map((leader) => (
              <LeaderCard key={leader.name} {...leader} />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        bg="blue"
        image={ctaBannerBlueImg}
        title="Here When You Need Us..."
        subtitle="Whether you need assistance or want to support our community, we'd love to hear from you."
      />
    </div>
  );
}

export default About;
