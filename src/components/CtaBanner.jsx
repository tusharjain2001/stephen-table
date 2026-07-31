import { Link } from 'react-router-dom';
import iconEmail from '../assets/icons/icon-email.svg';
import iconPhone from '../assets/icons/icon-phone.svg';

const DEFAULT_PILLS = [
  {
    icon: iconEmail,
    label: 'info@stephenstablecolorado.org',
    href: 'mailto:info@stephenstablecolorado.org',
  },
  { icon: iconPhone, label: '970-375-9179', href: 'tel:970-375-9179' },
];

/**
 * "Here When You Need Us" style CTA band used on Home, About, Get Involved,
 * Impact Stories and Blog (Implementation Plan §3.1 "CtaBanner").
 *
 * Breakpoint behavior (plan §5, Task 14):
 * - `lg`+ (≥1024): side-by-side text column + photo, matching Figma
 *   exactly at 1440 via fixed pixel widths on a flex row (the row's own
 *   flex-shrink keeps text and photo from overlapping as the viewport
 *   narrows through the 1024–1439 range instead of jumping straight to
 *   the mobile treatment).
 * - <lg (768 and below): the photo becomes a full-bleed background with a
 *   dark overlay and the text/pills stack centered on top.
 *
 * Props:
 * - `image`      — photo shown on the right side of the banner
 * - `bg`         — `'brown'` (default, bg-b-600) | `'blue'` (bg-bl-600)
 * - `title`      — H2 copy
 * - `subtitle`   — optional sub copy under the title
 * - `pillTheme`  — `'sage'` (default, bg-s-200 / text-s-900) | `'white'`
 *                  (bg-white / text-b-800, used on the Blog page)
 * - `pills`      — array of `{ icon, label, href, to }` rendered as icon+label
 *                  contact pills; defaults to the standard phone/email pair.
 *                  Use `to` for an in-app route (rendered as a <Link>) and
 *                  `href` for external/mailto/tel targets.
 * - `actions`    — optional custom node rendered instead of `pills` (covers
 *                  the Home hero banner's "Get in touch" Button and Get
 *                  Involved's single white "Sign up for Volunteering" pill)
 * - `className`  — extra classes on the outer <section>
 */
function CtaBanner({
  image,
  bg = 'brown',
  title,
  subtitle,
  pillTheme = 'sage',
  pills = DEFAULT_PILLS,
  actions,
  className = '',
}) {
  const bgClass = bg === 'blue' ? 'bg-bl-600' : 'bg-b-600';
  const bgColor = bg === 'blue' ? '#3e4f69' : '#886b56';
  const pillClasses =
    pillTheme === 'white' ? 'bg-white text-b-800' : 'bg-s-200 text-s-900';

  return (
    <section className={`relative w-full overflow-hidden ${bgClass} ${className}`}>
      {/* <lg: photo as a full-bleed background wash */}
      {image && (
        <>
          <img
            src={image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover lg:hidden"
          />
          <div
            className="absolute inset-0 lg:hidden"
            style={{
              background: `linear-gradient(to bottom, ${bgColor}b3 0%, ${bgColor}e6 100%)`,
            }}
          />
        </>
      )}

      {/* Full-bleed row (not a capped 1440 container): the text column is
          offset by the design container's gutter so it stays aligned with the
          sections above/below, while the photo takes the remainder and keeps
          bleeding to the right edge at any width. At 1440 the gutter is 0, so
          this is Figma-exact: 72 + 529 + 107 = 708 with a 732px photo
          (342:1000 / 342:997). */}
      <div className="relative z-10 flex w-full flex-col gap-10 px-6 py-14 md:px-10 md:py-16 lg:h-[421px] lg:flex-row lg:items-center lg:gap-0 lg:px-0 lg:py-0">
        <div className="flex flex-col gap-9 lg:ml-[calc(var(--gutter)+72px)] lg:mr-[107px] lg:w-[529px] lg:shrink lg:gap-[36px]">
          <div className="flex flex-col gap-[8px]">
            {title && (
              <h2 className="font-display text-[32px] capitalize text-white md:text-[36px] lg:text-[40px]">
                {title}
              </h2>
            )}
            {subtitle && <p className="font-sans text-[18px] text-white lg:text-[20px]">{subtitle}</p>}
          </div>

          <div className="flex flex-wrap gap-3 lg:flex-col lg:items-start lg:gap-[9px]">
            {actions ??
              pills.map((pill) => {
                const PillTag = pill.to ? Link : 'a';
                const target = pill.to ? { to: pill.to } : { href: pill.href };

                return (
                  <PillTag
                    key={pill.label}
                    {...target}
                    className={`flex items-center gap-[16px] rounded-btn px-[24px] py-[8px] font-sans text-[18px] font-semibold capitalize lg:gap-[24px] lg:px-[32px] lg:text-[24px] ${pillClasses}`}
                  >
                    <span className="flex shrink-0 items-center justify-center rounded-[10px] bg-s-300 p-[8px] lg:rounded-[12px] lg:p-[10px]">
                      <img src={pill.icon} alt="" className="size-[24px] lg:size-[28px]" aria-hidden="true" />
                    </span>
                    {pill.label}
                  </PillTag>
                );
              })}
          </div>
        </div>

        {/* ≥lg: photo pinned to the right, blended into the banner color */}
        {image && (
          <div className="relative hidden h-full min-w-0 flex-1 overflow-hidden lg:block">
            <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
            {/* Blend strips (Figma 342:998 / 342:999): the photo fades into
                the banner colour across its full width on the left, and a
                243px strip pins it back to solid at the right edge. Both are
                anchored to the photo box, so the math holds both as the box
                shrinks in the lg range and as it grows past 1440. */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `linear-gradient(90deg, ${bgColor} 0%, ${bgColor}d9 16.79%, ${bgColor}00 100%)`,
              }}
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-[243px] max-w-full"
              style={{
                background: `linear-gradient(270deg, ${bgColor} 0%, ${bgColor}d9 34.14%, ${bgColor}a8 60.58%, ${bgColor}00 100%)`,
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default CtaBanner;
