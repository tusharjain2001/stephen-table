import { Link } from 'react-router-dom';
import Button from './Button.jsx';
import iconArrowBadge from '../assets/icons/icon-arrow-badge.svg';

/**
 * Card used for blog posts, impact stories and the Home "How we help" tiles
 * (Implementation Plan §3.1 "StoryCard").
 *
 * Props:
 * - `image`          — card photo
 * - `title`          — card title
 * - `titleClassName` — title color override (defaults to `text-black`;
 *                      use `text-bl-600` on Impact Stories/Blog cards)
 * - `body`           — card body copy
 * - `bodyClassName`  — body color override (defaults to `text-gray-59`;
 *                      Home's "How we help" tiles draw it black per 377:3067)
 * - `ctaLabel`       — CTA button text, defaults to `'learn more'` (Impact
 *                      Stories/Blog cards use `'read More →'`)
 * - `ctaHref`        — internal route for the CTA (rendered as a Link)
 * - `onCtaClick`      — click handler when no `ctaHref` is given
 * - `showArrowBadge` — Home "How we help" variant: adds the circular arrow
 *                      badge over the top-right of the photo
 * - `ctaGap`         — px between the copy block and the CTA at md+. Home's
 *                      frame (377:3065) uses 16; Impact Stories / Blog cards
 *                      (370:2329) use 24, which is what makes their card
 *                      643 tall rather than 635. The mobile frame (662:9459)
 *                      scales both down (14.1 / 21.2 respectively) — see
 *                      `MOBILE_CTA_GAP` below; no page-level prop needed.
 * - `className`       — extra classes on the outer wrapper
 */
// The Figma mobile frame scales every card metric by the same ~0.883 ratio
// (15.2/17.2 padding, 21.2/24 title, 31.8/36 badge, ...); `ctaGap` is the one
// numeric prop pages already pass in explicitly (16 or 24), so its mobile
// counterpart is looked up here rather than requiring a second prop.
const MOBILE_CTA_GAP = { 16: 14.1, 24: 21.2 };

function StoryCard({
  image,
  title,
  titleClassName = 'text-black',
  body,
  bodyClassName = 'text-gray-59',
  ctaLabel = 'learn more',
  ctaHref,
  onCtaClick,
  showArrowBadge = false,
  ctaGap = 16,
  className = '',
}) {
  const mobileCtaGap = MOBILE_CTA_GAP[ctaGap] ?? ctaGap * (15.2 / 17.2);

  return (
    <div
      className={`flex w-full flex-col gap-[18.3px] rounded-[15.2px] bg-cream pb-[15.2px] pl-[3.8px] pr-[3.8px] pt-[3.8px] md:rounded-[17.2px] md:pb-[17.2px] md:pl-[4.3px] md:pr-[4.3px] md:pt-[4.3px] 2xl:w-[418.4px] ${className}`}
    >
      <div className="relative">
        {image && (
          <img
            src={image}
            alt=""
            className="h-[322px] w-full rounded-t-[15.2px] object-cover sm:h-[320px] md:rounded-t-[17.2px] 2xl:h-[364.7px]"
          />
        )}
        {showArrowBadge && (
          <img
            src={iconArrowBadge}
            alt=""
            aria-hidden="true"
            className="absolute right-[19.6px] top-[18.6px] size-[31.8px] md:right-[21px] md:top-[21px] md:size-[36px]"
          />
        )}
      </div>

      {/* Figma 377:3065 stacks title (y17.2) → body (y64.2) → CTA (y143.2)
          with a 16px gap at both joins, inside 17.2px padding. Mobile frame
          (662:9459) uses 15.2px padding and a 14.1px title-body gap. */}
      <div
        className="flex flex-col p-[15.2px] gap-[var(--card-cta-gap-mobile)] md:gap-[var(--card-cta-gap)] md:p-[17.2px]"
        style={{ '--card-cta-gap': `${ctaGap}px`, '--card-cta-gap-mobile': `${mobileCtaGap}px` }}
      >
        <div className="flex flex-col gap-[14.1px] md:gap-[16px]">
          {title && (
            <h3 className={`font-sans text-[21.2px] font-medium md:text-[24px] ${titleClassName}`}>{title}</h3>
          )}
          {body && (
            <p className={`font-sans text-[14.15px] md:text-[16px] ${bodyClassName}`}>{body}</p>
          )}
        </div>

        {ctaHref ? (
          <Button as={Link} to={ctaHref} variant="learn-more" className="self-start">
            {ctaLabel}
          </Button>
        ) : (
          <Button variant="learn-more" onClick={onCtaClick} className="self-start">
            {ctaLabel}
          </Button>
        )}
      </div>
    </div>
  );
}

export default StoryCard;
