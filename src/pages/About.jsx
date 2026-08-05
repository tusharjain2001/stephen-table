import PageHero from '../components/PageHero.jsx';
import SectionChip from '../components/SectionChip.jsx';
import StatsBand from '../components/StatsBand.jsx';
import CtaBanner from '../components/CtaBanner.jsx';

import heroAbout from '../assets/images/hero-about.png';
import heroAboutWide from '../assets/images/hero-about-wide.jpg';
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
            line boxes to Figma's (342:629 h=31 at 24px, 342:630 h=52 over 2
            lines at 20px) — the mobile frame doesn't call out a custom
            leading, so base stays "normal". */}
        <h3 className="font-neulis text-[20px] font-semibold text-bl-600 md:text-[22px] xl:text-[24px] xl:leading-[31px]">{title}</h3>
        <p className="font-neulis text-[16px] text-bl-600 md:text-[18px] xl:text-[20px] xl:leading-[26px]">{body}</p>
      </div>
    </div>
  );
}

// The 2026-08 redraw shrank the card from a 419.34px column to 343.948
// (342:949) — every inner measure is that same 0.8202 ratio, so the whole
// card is re-pinned at xl rather than nudged: padding 4→3.281, radius
// 16→13.123, photo 448.65→367.984, label pad 16.9→13.859, name 28→22.966,
// role 20→16.404. The md tier keeps the pre-redraw numbers.
function LeaderCard({ image, name, role }) {
  return (
    <div className="w-full max-w-[419.34px] rounded-[14.117px] bg-white p-[3.529px] md:rounded-card md:p-[4px] xl:rounded-[13.123px] xl:p-[3.281px]">
      <div className="w-full rounded-[14.117px] bg-cream md:rounded-card xl:rounded-[13.123px]">
        <img
          src={image}
          alt={name}
          className="h-[395.858px] w-full rounded-t-[14.117px] object-cover md:h-[400px] md:rounded-t-card xl:h-[367.984px] xl:rounded-t-[13.123px]"
        />
        <div className="flex flex-col gap-[6.93px] p-[14.908px] md:gap-[7.9px] md:p-[16.9px] xl:gap-[6.442px] xl:p-[13.859px]">
          {/* Figma 342:938 h=30, 342:939 h=21 — see the Poppins note above;
              the mobile frame's 24.705/17.647px sizes don't call out a
              custom leading, so base uses "normal". */}
          {/* Type moves at md, not xl: the md grid puts these cards at ~340
              and the lg grid at ~280-365, both at or under the design's
              343.948 column, so the pre-redraw 28/20 read oversized on every
              tier below 1280. */}
          <h3 className="font-neulis text-[24.705px] font-medium text-bl-600 md:text-[22.966px] md:leading-[30px]">{name}</h3>
          <p className="font-neulis text-[17.647px] capitalize text-bl-600 md:text-[16.404px] md:leading-[21px]">{role}</p>
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <div>
      <PageHero
        // hero-about.png is a flattened 1440x548 export with the scrim baked
        // into its pixels, which is only correct at exactly 1440: object-cover
        // upscales it 1.78x at 2560 (soft, and the framing tightens past the
        // designed crop) and shaves 80px off each side at 1280. It stays
        // on `mobileImage` because the <768 frame is a different crop anyway.
        //
        // Above that we ship the photo Figma actually references, so the band
        // resolves at any width: 342:785 is a *mirrored* rect (hence the
        // baked-in flip, same x=w quirk as the Our Story photo) whose fill is
        // the 4096x2730 source at `h-175.14% top--41.88%` — i.e. cover at
        // 55.74% — with the scrim as a real gradient rather than pixels.
        // Rebuilt that way it matches the frame render at 2.85 MAD, where the
        // flattened export itself scores 2.77.
        image={heroAboutWide}
        mobileImage={heroAbout}
        imagePosition="50% 55.74%"
        // Maroon rollout (Figma 790:688): the espresso scrim moves to a navy
        // wash, matching the already-shipped Services/Nominate/Get Involved/
        // Impact treatment. Mobile gets the same navy pair since its frame's
        // flattened export is what previously baked the espresso wash in —
        // the base scrim here is a live CSS gradient, not baked pixels.
        overlayGradient="linear-gradient(to right, rgba(24,33,45,0.9) 0%, rgba(24,33,45,0.83) 11.797%, rgba(24,33,45,0.2) 100%)"
        mobileOverlayGradient="linear-gradient(to bottom, rgba(24,33,45,0.2), rgba(24,33,45,0.9))"
        height={548}
        // 803:6903 sits at y=394 in the redrawn 610-tall band — PageHero's
        // own default now, so no override is needed here.

        // 342:816 is 482 wide and sits 385..525 in a hero that ends at 620,
        // i.e. 95 clear of the bottom. The redraw dropped the H1 to 36/1.8
        // (342:817 h=46 — Playfair's `normal` at 36 is 48, hence the pin) and
        // the subtitle to 20 (342:818 h=78 = 3 lines x 26), which is already
        // PageHero's xl default.
        textLeft={72}
        textWidth={482}
        textBottom={95}
        titleSize={36}
        titleTracking={1.8}
        titleSizeMd={36}
        titleTrackingMd={1.8}
        titleLeading={46}
        title="About us"
        // subtitleClassName is deliberately omitted: the pre-mobile-pass
        // "text-[24px]" override never actually won at md/xl (the
        // component's own md:text-[18px]/xl:text-[20px] always beat it —
        // verified via computed style, 18px/20px respectively) — its only
        // real effect was at base (<768), where it's now superseded by the
        // component's own base text-[16px] mobile default. Omitting it
        // keeps ≥768 byte-identical while landing exactly on the Figma
        // mobile subtitle size.
        subtitle="We provide practical home support, meaningful fellowship, and community connections for older adults across Northern Colorado."
      />

      {/* Mission / Vision */}
      {/* Figma 342:625 declares this band as a fixed h-203 box with its
          content centred, not as padding around content. The mobile frame
          (662:10346 node 662:10362) drops the gradient/divider entirely and
          just stacks the two blocks with a 20px gap. */}
      <section className="w-full py-[60px] md:bg-cream md:py-10 xl:h-[203px] xl:py-0">
        <div className="mx-auto flex h-full max-w-[1440px] flex-col items-center justify-center gap-[20px] px-6 md:flex-row md:gap-10 md:px-10 xl:gap-[108px]">
          <MissionBlock title="Mission" body="Helping older adults age safely and live with dignity." />
          <span className="hidden h-[45px] w-[2px] bg-[#3E4F69] md:block" />
          <MissionBlock title="Vision" body="to build A community where every senior thrives" />
        </div>
      </section>

      {/* Our Story */}
      {/* Figma 342:838 was redrawn in the 2026-08 pass: 826 -> 594, and it is
          now real padding (py-100) rather than a fixed box — 100 + (chip 47 +
          32 + row 315) + 100. The photo shrank 419x520 -> 253x315 and the copy
          dropped 20 -> 16px, which is what buys the 232px. Mobile frame
          (662:10346 node 662:10502) uses the same wb-100 (#fbf6ee) bg but a
          tighter 23px gap between chip/image/copy, an image cropped to its
          bottom edge, and un-justified body copy — left untouched here. */}
      <section
        className="w-full py-[60px] md:py-14 xl:h-[594px] xl:py-0"
        style={{ backgroundImage: 'linear-gradient(112.416deg, #fff1ed 0%, #fffcf7 100%)' }}
      >
        <div className="mx-auto flex h-full max-w-[1440px] flex-col justify-center gap-[23px] px-6 md:gap-[32px] md:px-10 xl:px-[72px]">
          <SectionChip variant="green-solid" className="self-start">Our Story</SectionChip>
          <div className="flex flex-col gap-[23px] md:gap-8 lg:flex-row lg:items-center lg:gap-[53px]">
            {/* 342:831 carries a rotate(180) + scaleY(-1), i.e. a net
                horizontal mirror of the fill. Verified against the frame
                render: our asset matches mirrored at 4.1 MAD and unmirrored
                at 57.5. This is image orientation like PageHero's flipImage,
                not layout scaling — the no-viewport-scaling rule in CLAUDE.md
                still holds. */}
            <img
              src={aboutStory}
              alt=""
              className="h-[460px] w-full shrink-0 rounded-card object-cover object-bottom md:h-[360px] md:object-center lg:h-[520px] lg:w-[419px] xl:h-[315px] xl:w-[253px] xl:scale-x-[-1]"
            />
            {/* Figma 342:828 sets 16px on a normal (21px) leading and
                separates paragraphs with a single blank line, i.e. one more
                21px line — not an arbitrary gap. 13 line boxes x 21 = its
                273px height. Mobile frame drops the justify (md:text-justify)
                and keeps the body at 20px. */}
            <div className="flex flex-col gap-[20px] font-neulis text-[20px] text-gray-59 md:text-justify md:text-[18px] lg:w-[824px] xl:w-auto xl:min-w-0 xl:flex-1 xl:gap-[21px] xl:text-[16px] xl:leading-[21px]">
              {STORY_PARAGRAPHS.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <StatsBand stats={STATS} bgClassName="bg-m-600" />

      {/* Leadership */}
      {/* Figma 342:964: fixed h-816 box, content centred. */}
      <section className="w-full bg-gradient-to-b from-cream to-bl-100 py-[60px] md:py-14 xl:h-[816px] xl:py-0">
        <div className="mx-auto flex h-full max-w-[1440px] flex-col items-center justify-center gap-[24px] md:gap-8 xl:gap-[38px]">
          {/* 342:933 is 1075 wide (chip 171 + 247 + copy 657) centred in
              1440, i.e. it starts at 182.5 — level with the card row's 184.
              The copy measure had been 857, which widened the row to 1275 and
              slid the chip 100px left of the cards. The 247 gap also has to
              start at xl now: 1075 fits the 1296 content box where 1275 did
              not, so it no longer needs to wait for 2xl.

              Anchored left rather than centred, because Playfair renders the
              chip 184.8 wide against Lettertype's 171: centring splits that
              13.8px and lands the chip at 175.6, visibly ragged against the
              cards below. Pinning the margin puts the chip on 182.5 exactly
              and moves the slack to the copy's right edge, where nothing
              lines up with it. The offset is a margin, not `pl-`, so it can't
              be reset by this element's own `px-` shorthand. */}
          <div className="flex w-full flex-col items-start gap-6 px-[16px] text-left md:items-center md:px-10 md:text-center lg:flex-row lg:justify-center lg:gap-10 lg:text-left xl:justify-start xl:gap-[247px] xl:px-[72px]">
            <SectionChip variant="green-solid" className="shrink-0 xl:ml-[110.5px]">Leadership</SectionChip>
            <p className="font-sans text-[16px] text-gray-59 md:text-[24px] min-w-0 max-w-full lg:max-w-[657px] lg:shrink lg:grow-0 2xl:w-[657px]">
              Meet the leaders of Stephen&apos;s Table
            </p>
          </div>
          {/* 342:963 is three fixed 343.948 columns on a 20 gap, centred in
              1440 (184.08..1255.92) — not the 1296 content box split three
              ways, which is what an even grid gives. */}
          <div className="grid w-full grid-cols-1 gap-6 px-[16px] md:grid-cols-2 md:px-10 lg:grid-cols-3 xl:grid-cols-[repeat(3,343.948px)] xl:justify-center xl:gap-[20px] xl:px-[72px]">
            {LEADERS.map((leader) => (
              <LeaderCard key={leader.name} {...leader} />
            ))}
          </div>
        </div>
      </section>

      {/* 539:3199 carries the redesigned scale: title 40->32, sub 20->16,
          pills 24->20 with the s-300 icon badge dropped (44 tall, not 64).
          Its text column also starts at 78 rather than the 72 every other
          caller uses; the photo still begins at 708. */}
      <CtaBanner
        bg="blue"
        image={ctaBannerBlueImg}
        title="Here When You Need Us..."
        subtitle="Whether you need assistance or want to support our community, we'd love to hear from you."
        titleClassName="lg:text-[32px]"
        subtitleClassName="lg:text-[16px]"
        barePillIcons
        textLeft={78}
        pillTextTransform="normal-case"
      />
    </div>
  );
}

export default About;
