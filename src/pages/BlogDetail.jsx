import CtaBanner from '../components/CtaBanner.jsx';

import heroBlog from '../assets/images/hero-blog.png';
import heroBlogMobile from '../assets/mobile/mobile-blogs-hero.png';
import ctaBannerBlueImg from '../assets/images/cta-banner-blue.png';
import blogGallery1 from '../assets/images/blog-gallery-1.png';
import blogGallery2 from '../assets/images/blog-gallery-2.png';
import blogGallery3 from '../assets/images/blog-gallery-3.png';

const PARAGRAPHS = [
  "As we age, home becomes more than just a place to live, it becomes a place filled with memories, comfort, and familiarity. For many older adults, remaining in their own homes represents independence, dignity, and a continued connection to the communities they know and love. However, everyday tasks that once felt effortless can gradually become more challenging, making it important to create an environment that supports both safety and well-being.",
  "A safe home doesn't always require major renovations. Small, thoughtful improvements can significantly reduce the risk of accidents while making daily routines easier to manage. Simple changes such as improving lighting in hallways and staircases, securing loose rugs, organizing frequently used items within easy reach, and installing grab bars in bathrooms can create a safer and more accessible living space. Routine maintenance, including repairing uneven flooring, checking smoke detectors, and ensuring walkways remain clutter-free, also contributes to a more secure home environment.",
  'Practical support extends beyond the home itself. Everyday tasks like grocery shopping, attending medical appointments, seasonal yard work, or organizing household spaces can become difficult without assistance. Having reliable support for these activities not only helps seniors maintain their independence but also provides reassurance to family members and caregivers who may not always be able to help.',
  'Equally important is emotional well-being. Many older adults experience loneliness or social isolation, especially after retirement, the loss of a spouse, or when family members live far away. Staying socially connected through conversations, community events, hobby groups, or simply spending time with others can improve emotional health, increase confidence, and foster a greater sense of belonging. Meaningful relationships often have just as much impact on overall wellness as physical care.',
  "Families and caregivers also play a vital role in supporting seniors. Open communication, regular check-ins, and understanding changing needs can help identify challenges before they become larger concerns. Whether it's arranging transportation to appointments, encouraging participation in community activities, or helping coordinate access to local resources, every small action contributes to improving a loved one's quality of life.",
  "Community organizations play an essential role in bridging the gap between seniors and the support they need. By connecting older adults with practical assistance, trusted volunteers, and valuable local resources, communities can ensure that aging doesn't mean facing life's challenges alone. Collaboration between families, volunteers, healthcare providers, and nonprofit organizations creates a stronger network of care that benefits everyone involved.",
  "At Stephen's Table Colorado, our mission is to help seniors age safely, live with dignity, and remain connected to the communities they call home. Through practical home support, meaningful fellowship, and connections to trusted community resources, we strive to empower older adults to continue living independently while receiving the care and companionship they deserve.",
  "Every act of kindness whether it's helping with household tasks, sharing a conversation, volunteering a few hours, or making a donation creates a lasting impact. Together, we can build a community where every senior feels safe, valued, supported, and never alone.",
  "Need support or want to get involved? Contact us today to learn how Stephen's Table Colorado can help.",
];

// 370:2787 separates every paragraph with a real empty line except one: the
// join between "At Stephen's Table…" (index 6) and "Every act of kindness…"
// (index 7) has none. It reads as an authoring slip rather than intent, but it
// is what the frame draws, and it is load-bearing — with a blank line there the
// article is 797.6 rather than 777 and every landmark below it (gallery, CTA,
// footer) sits 20px low, which takes the gallery from 3.54 to 30.14 MAD against
// the frame render. Collapsed at 2xl only, the one width the 1440 frame governs.
const TIGHT_JOIN_INDEX = 7;

function BlogDetail() {
  return (
    <div>
      {/* Hero. This page has no Figma desktop counterpart in PageHero.jsx —
          it's a hand-coded hero — so the mobile-pass base values (full
          height, vertical scrim, top-anchored text) are pinned to the `sm:`
          breakpoint here rather than `md:`, matching this hero's existing
          sm/xl-only breakpoint scheme (nothing changes ≥640, which already
          covers the whole ≥768 tablet/desktop range untouched). */}
      <section className="relative h-[745px] w-full overflow-hidden sm:h-[340px] xl:h-[470px]">
        <img
          src={heroBlog}
          alt=""
          className="absolute inset-0 hidden h-full w-full object-cover sm:block"
        />
        {/* Base (<640) uses its own 402×746 portrait export. */}
        <img
          src={heroBlogMobile}
          alt=""
          className="absolute inset-0 h-full w-full object-cover sm:hidden"
        />
        {/* Base (mobile) scrim, same wash every other page's mobile hero
            carries. Note this export already ramps 193/104/47/30 top-to-bottom
            on its own, so the gradient stacks on top of a fade that is partly
            in the pixels — kept anyway for consistency with Services / Get
            Involved / Nominate / Contact. The extra black/20 wash this hero
            used to carry stays off; those pages don't have it either. */}
        <div
          className="absolute inset-0 sm:hidden"
          style={{
            background: 'linear-gradient(to bottom, rgba(24,33,45,0.2), rgba(24,33,45,0.9))',
          }}
        />
        {/* Maroon rollout (Figma 790:866): navy scrim, near-solid on the
            left (matching Impact Stories' hand-off point). */}
        <div
          className="absolute inset-0 hidden sm:block"
          style={{
            background:
              'linear-gradient(to right, #18212d 0%, rgba(24,33,45,0.2) 100%)',
          }}
        />
        {/* 370:2587 is 385..468 in a hero that ends at 542, i.e. 74 clear of
            the bottom (was 42). The redraw took the H1 40 → 32 / 2 → 1.6 on a
            41px box and the byline 28 → 20, so the block is 41 + 16 + 26 = 83. */}
        <div className="absolute inset-x-[29px] top-[551px] flex flex-col gap-[16px] sm:inset-x-10 sm:bottom-0 sm:top-auto sm:gap-[10px] sm:pb-8 xl:inset-x-auto xl:left-[82px] xl:w-[738px] xl:gap-[16px] xl:pb-[74px]">
          <h1 className="capitalize font-display text-[32px] tracking-[1.6px] text-white sm:text-[32px] sm:tracking-[1.3px] xl:tracking-[1.6px] xl:leading-[41px]">
            Helping seniors age safely at home
          </h1>
          <p className="font-sans text-[16px] text-wb-400 sm:text-[20px]">
            Published On: July 2026 &bull; Category: Senior Care
          </p>
        </div>
      </section>

      {/* Article body. 370:2787 sits at x=182 y=618 — 76 below the hero — and
          is 1076 wide, so at 2xl the column is capped there and `mx-auto`
          lands it on 182 exactly ((1440 − 1076) / 2). It is a single text
          layer at DM Sans 16 justified, with paragraphs separated by a real
          empty line rather than a CSS gap: at `leading-normal` that line box
          is 20.83px, which is what the gap reproduces. */}
      <section className="w-full py-12 xl:pb-[90px] xl:pt-[76px]">
        {/* `min-h` (not `h`): DM Sans' 20.83px line box accumulates 1.2px
            short of the frame's 777 over ~30 lines, which is enough to pull
            the gallery, CTA and footer a pixel off their frame positions.
            Pinning the box the way the button and caption heights are pinned
            lands them exactly, and can never clip. */}
        <div className="mx-auto flex max-w-[1440px] flex-col gap-[20px] px-6 text-justify font-sans text-[18px] text-gray-59 md:gap-[20.83px] md:px-10 md:text-[16px] xl:px-[72px] 2xl:min-h-[777px] 2xl:max-w-[1076px] 2xl:px-0">
          {PARAGRAPHS.map((paragraph, index) => (
            <p
              key={paragraph.slice(0, 24)}
              className={index === TIGHT_JOIN_INDEX ? '2xl:-mt-[20.83px]' : ''}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Image gallery */}
      {/* Maroon rollout (Figma 790:866): the 4-image masonry becomes a
          single row of three images. */}
      <section className="w-full pb-12 xl:pb-[90px]">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 xl:px-[72px]">
          {/* 2xl (≥1440): pixel-exact row from Figma — three 348x315 tiles
              on 16px gutters, 1076 total (matching the article's measure). */}
          <div className="mx-auto hidden h-[315px] w-[1076px] gap-[16px] 2xl:flex">
            <img src={blogGallery1} alt="" className="h-[315px] w-[348px] rounded-card object-cover" />
            <img src={blogGallery2} alt="" className="h-[315px] w-[348px] rounded-card object-cover" />
            <img src={blogGallery3} alt="" className="h-[315px] w-[348px] rounded-card object-cover" />
          </div>

          {/* <2xl: simple responsive grid, 1-col base up to a 3-col row at sm+ */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 2xl:hidden">
            <img src={blogGallery1} alt="" className="h-[240px] w-full rounded-card object-cover sm:h-[280px]" />
            <img src={blogGallery2} alt="" className="h-[240px] w-full rounded-card object-cover sm:h-[280px]" />
            <img src={blogGallery3} alt="" className="h-[240px] w-full rounded-card object-cover sm:h-[280px]" />
          </div>
        </div>
      </section>

      <CtaBanner
        image={ctaBannerBlueImg}
        bg="blue"
        title="Here When You Need Us..."
        subtitle="Whether you need assistance or want to support our community, we'd love to hear from you."
        // 539:3229/3230 drop to 32/16 with the title on an explicit 41px box,
        // and 539:3232 has the bare 28px glyph rather than the s-300 badge.
        titleClassName="lg:text-[32px] lg:leading-[41px]"
        subtitleClassName="lg:w-[439px] lg:max-w-full lg:text-[16px]"
        barePillIcons
        pillTextTransform="normal-case"
        textLeft={78}
      />
    </div>
  );
}

export default BlogDetail;
