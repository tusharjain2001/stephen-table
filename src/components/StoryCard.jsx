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
 * - `ctaLabel`       — CTA button text, defaults to `'learn more'` (Impact
 *                      Stories/Blog cards use `'read More →'`)
 * - `ctaHref`        — internal route for the CTA (rendered as a Link)
 * - `onCtaClick`      — click handler when no `ctaHref` is given
 * - `showArrowBadge` — Home "How we help" variant: adds the circular arrow
 *                      badge over the top-right of the photo
 * - `ctaGap`         — px between the copy block and the CTA. Home's frame
 *                      (377:3065) uses 16; Impact Stories / Blog cards
 *                      (370:2329) use 24, which is what makes their card
 *                      643 tall rather than 635.
 * - `className`       — extra classes on the outer wrapper
 */
function StoryCard({
  image,
  title,
  titleClassName = 'text-black',
  body,
  ctaLabel = 'learn more',
  ctaHref,
  onCtaClick,
  showArrowBadge = false,
  ctaGap = 16,
  className = '',
}) {
  return (
    <div
      className={`flex w-full flex-col gap-[18.3px] rounded-[17.2px] bg-cream pb-[17.2px] pl-[4.3px] pr-[4.3px] pt-[4.3px] 2xl:w-[418.4px] ${className}`}
    >
      <div className="relative">
        {image && (
          <img
            src={image}
            alt=""
            className="h-[280px] w-full rounded-t-[17.2px] object-cover sm:h-[320px] 2xl:h-[364.7px]"
          />
        )}
        {showArrowBadge && (
          <img
            src={iconArrowBadge}
            alt=""
            aria-hidden="true"
            className="absolute right-[21px] top-[21px] size-[36px]"
          />
        )}
      </div>

      {/* Figma 377:3065 stacks title (y17.2) → body (y64.2) → CTA (y143.2)
          with a 16px gap at both joins, inside 17.2px padding. */}
      <div
        className="flex flex-col p-[17.2px] gap-[var(--card-cta-gap)]"
        style={{ '--card-cta-gap': `${ctaGap}px` }}
      >
        <div className="flex flex-col gap-[16px]">
          {title && (
            <h3 className={`font-sans text-[24px] font-medium ${titleClassName}`}>{title}</h3>
          )}
          {body && <p className="font-sans text-[16px] text-gray-59">{body}</p>}
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
