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
import ctaBannerImg from '../assets/images/cta-banner.png';
import iconArrowPrev from '../assets/icons/icon-arrow-prev.svg';
import iconArrowNext from '../assets/icons/icon-arrow-next.svg';

const STORIES = [
  {
    title: 'Helping Seniors Age Safely at Home',
    body: 'Simple tips and practical advice to create a safer, more comfortable living environment for older adults.',
    ctaHref: '/stories/helping-seniors-age-safely',
  },
  {
    title: 'The Power of Community and Companionship',
    body: 'Discover how meaningful relationships and social connections improve the well-being of seniors.',
  },
  {
    title: 'Supporting a Loved One Through Aging',
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
        flatOverlay
        textLeft={76}
        textWidth={789}
        textBottom={100}
        title="Impact Stories"
        subtitleClassName="text-[24px]"
        subtitle="Read inspiring stories of how our volunteers, partners, and supporters are making a meaningful difference in the lives of seniors."
      />

      {/* Real World stories */}
      <section className="w-full bg-gradient-to-b from-cream to-bl-100 py-[108px]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-[64px]">
          <SectionHeader
            chipVariant="blue"
            chipLabel="Real World stories"
            lede="hear it from the anecdotal record."
            ledeWidth={877}
            gap={159}
          />
          <div className="flex flex-col items-center gap-[24px]">
            <div className="flex gap-[20px]">
              {STORIES.map((story, index) => (
                <StoryCard
                  key={story.title}
                  image={REAL_WORLD_IMAGES[index]}
                  title={story.title}
                  titleClassName="text-bl-600"
                  body={story.body}
                  ctaLabel="read More →"
                  ctaHref={story.ctaHref}
                />
              ))}
            </div>
            <Pagination />
          </div>
        </div>
      </section>

      {/* Blogs */}
      <section className="w-full bg-bl-100 py-[108px]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-[64px]">
          <SectionHeader
            chipVariant="blue"
            chipLabel="Blogs"
            lede="be updated with all our latest activities here!"
            ledeWidth={877}
            gap={310}
          />
          <div className="flex flex-col items-center gap-[24px]">
            <div className="flex gap-[20px]">
              {STORIES.map((story, index) => (
                <StoryCard
                  key={story.title}
                  image={BLOG_IMAGES[index]}
                  title={story.title}
                  titleClassName="text-bl-600"
                  body={story.body}
                  ctaLabel="read More →"
                  ctaHref={story.ctaHref}
                />
              ))}
            </div>
            <Pagination />
          </div>
        </div>
      </section>

      <CtaBanner
        image={ctaBannerImg}
        bg="blue"
        title="Here When You Need Us..."
        subtitle="Whether you need assistance or want to support our community, we'd love to hear from you."
      />
    </div>
  );
}

export default ImpactStories;
