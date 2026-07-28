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
  className = '',
}) {
  return (
    <div
      className={`w-[418.4px] rounded-[17.2px] bg-cream pb-[17.2px] pl-[4.3px] pr-[4.3px] pt-[4.3px] ${className}`}
    >
      <div className="relative">
        {image && (
          <img
            src={image}
            alt=""
            className="h-[364.7px] w-full rounded-t-[17.2px] object-cover"
          />
        )}
        {showArrowBadge && (
          <img
            src={iconArrowBadge}
            alt=""
            aria-hidden="true"
            className="absolute size-[36px]"
            style={{ left: 361, top: 21 }}
          />
        )}
      </div>

      <div className="flex flex-col gap-[16px] p-[17.2px]">
        {title && (
          <h3 className={`font-sans text-[24px] font-medium ${titleClassName}`}>{title}</h3>
        )}
        {body && <p className="font-sans text-[16px] text-gray-59">{body}</p>}

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
