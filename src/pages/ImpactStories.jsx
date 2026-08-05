import PageHero from '../components/PageHero.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import StoryCard from '../components/StoryCard.jsx';
import CtaBanner from '../components/CtaBanner.jsx';

import heroImpact from '../assets/images/hero-impact.png';
import story1 from '../assets/images/story-1.png';
import story2 from '../assets/images/story-2.png';
import story3 from '../assets/images/story-3.png';
import story4 from '../assets/images/story-4.png';
import story5 from '../assets/images/story-5.png';
import story6 from '../assets/images/story-6.png';
import ctaBannerBlueImg from '../assets/images/cta-banner-blue.png';
import iconArrowPrev from '../assets/icons/icon-arrow-prev.svg';
import iconArrowNext from '../assets/icons/icon-arrow-next.svg';

// `titleWidth` is the frame's own per-card measure (370:2330 / 2337 / 2344).
// All three titles are two lines / 52px tall in the design; at the redrawn
// 20px only the middle one wraps there unaided, so the other two carry the
// measure that reproduces the break.
const STORIES = [
  {
    title: 'Helping Seniors Age Safely at Home',
    titleWidth: 286,
    body: 'Simple tips and practical advice to create a safer, more comfortable living environment for older adults.',
    ctaHref: '/stories/helping-seniors-age-safely',
  },
  {
    title: 'The Power of Community and Companionship',
    titleWidth: 332,
    // 790:1331 authors this one paragraph at 360 inside the 375.4 column —
    // that measure is what keeps it three lines / 63px like its neighbours.
    bodyWidth: 360,
    body: 'Discover how meaningful relationships and social connections improve the well-being of seniors.',
  },
  {
    title: 'Supporting a Loved One Through Aging',
    titleWidth: 285,
    body: 'Helpful guidance for families and caregivers navigating the challenges of aging with confidence and compassion.',
  },
];

const REAL_WORLD_IMAGES = [story1, story2, story3];
const BLOG_IMAGES = [story4, story5, story6];

function Pagination() {
  return (
    <div className="flex items-center justify-center gap-[13px]">
      <button type="button" aria-label="Previous">
        <img src={iconArrowPrev} alt="" className="size-[32px]" aria-hidden="true" />
      </button>
      <button type="button" aria-label="Next">
        <img src={iconArrowNext} alt="" className="size-[32px]" aria-hidden="true" />
      </button>
    </div>
  );
}

function ImpactStories() {
  return (
    <div className="bg-[#fffffe]">
      <PageHero
        image={heroImpact}
        height={548}
        mobileFlatOverlay
        // Maroon rollout (Figma 790:1291): navy scrim, near-solid on the
        // left. NOTE: the plan called for also setting `flatOverlay` here,
        // but that prop is deliberately unused on this page — PageHero's own
        // doc comment records it was tried on Impact Stories and reverted
        // because it put the render 10.4 MAD off the Figma frame (vs 1.4
        // without it), so it's intentionally omitted to avoid reintroducing
        // that regression. `mobileFlatOverlay` (the base-tier wash) is
        // unaffected and stays as before.
        overlayGradient="linear-gradient(to right, #18212d 0%, rgba(24,33,45,0.2) 100%)"
        // 803:6306 sits at y=397 in the redrawn 610-tall band, 93 clear of
        // its bottom edge.
        mobileTextTop={397}
        textLeft={76}
        textWidth={628}
        // 371:2948 sits at y=313 h=140 inside the 548 hero, i.e. 95 up from
        // its bottom edge. The block is the 46px title box + 16 + a 3-line
        // 20px subtitle (78) on the redrawn 628 measure.
        textBottom={95}
        title="Impact Stories"
        titleSize={36}
        titleTracking={1.8}
        titleSizeMd={36}
        titleTrackingMd={1.8}
        titleLeading={46}
        // subtitleClassName intentionally omitted — see About.jsx: the old
        // unprefixed "text-[24px]" never won at md/xl anyway (18px/20px),
        // so dropping it keeps ≥768 byte-identical and lands the mobile
        // default (16px) for the Figma mobile frame.
        subtitle="Read inspiring stories of how our volunteers, partners, and supporters are making a meaningful difference in the lives of seniors."
      />

      {/* Real World stories */}
      <section className="flex w-full flex-col justify-center bg-gradient-to-b from-cream to-[#fff1ed] py-14 xl:min-h-[981px] xl:py-16">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-10 xl:gap-[64px]">
          <SectionHeader
            chipVariant="blue"
            chipLabel="Real World stories"
            lede="Impact stories shared by our clients, partners, sponsors and volunteers."
            ledeWidth={877}
            ledeSize={20}
            gap={159}
          />
          <div className="flex w-full flex-col items-center gap-[24px] px-6 md:px-10 xl:px-[72px]">
            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:w-[1294px] xl:max-w-full xl:gap-[20px]">
              {STORIES.map((story, index) => (
                <StoryCard
                  key={story.title}
                  image={REAL_WORLD_IMAGES[index]}
                  title={story.title}
                  titleClassName="text-bl-600"
                  titleSize={20}
                  titleWidth={story.titleWidth}
                  body={story.body}
                  bodyWidth={story.bodyWidth}
                  ctaLabel="read More →"
                  ctaHref={story.ctaHref}
                  ctaGap={24}
                />
              ))}
            </div>
            <Pagination />
          </div>
        </div>
      </section>

      {/* Blogs */}
      <section className="flex w-full flex-col justify-center bg-[#fff1ed] py-14 xl:min-h-[981px] xl:py-16">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-10 xl:gap-[64px]">
          <SectionHeader
            chipVariant="blue"
            chipLabel="Blogs"
            lede="Be updated with all our latest activities here!"
            ledeWidth={877}
            ledeSize={20}
            gap={310}
          />
          <div className="flex w-full flex-col items-center gap-[24px] px-6 md:px-10 xl:px-[72px]">
            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:w-[1294px] xl:max-w-full xl:gap-[20px]">
              {STORIES.map((story, index) => (
                <StoryCard
                  key={story.title}
                  image={BLOG_IMAGES[index]}
                  title={story.title}
                  titleClassName="text-bl-600"
                  titleSize={20}
                  titleWidth={story.titleWidth}
                  body={story.body}
                  bodyWidth={story.bodyWidth}
                  ctaLabel="read More →"
                  ctaHref={story.ctaHref}
                  ctaGap={24}
                />
              ))}
            </div>
            <Pagination />
          </div>
        </div>
      </section>

      <CtaBanner
        image={ctaBannerBlueImg}
        bg="blue"
        title="Here When You Need Us..."
        subtitle="Whether you need assistance or want to support our community, we'd love to hear from you."
        // 734:183/184 drop to 32/16 with the title on an explicit 41px box,
        // and 734:186 has the bare 28px glyph rather than the s-300 badge —
        // which is what keeps the pills 44 tall and the block 224, centred in
        // the 421 band (the frame's 99/98 split).
        titleClassName="lg:text-[32px] lg:leading-[41px]"
        // 734:181 is a 439 column, not the component's 529 — at 16px that is
        // what breaks the sub copy after "support our" rather than after
        // "we'd". Both are two lines, so only the wrap moves.
        subtitleClassName="lg:w-[439px] lg:max-w-full lg:text-[16px]"
        barePillIcons
        textLeft={78}
        pillTextTransform="normal-case"
      />
    </div>
  );
}

export default ImpactStories;
