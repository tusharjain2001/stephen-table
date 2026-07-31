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

  // Mobile pills (plan §4.7) are always sage regardless of `pillTheme` — the
  // Blog page keeps white pills at md+ via `pillTheme` but wants sage ones on
  // its mobile frame, so hardcoding sage here makes that page-level prop
  // already "responsive-capable" with zero call-site changes.
  const mobilePills =
    actions ??
    pills.map((pill, index) => {
      const PillTag = pill.to ? Link : 'a';
      const target = pill.to ? { to: pill.to } : { href: pill.href };
      // Every current caller orders pills as [email, phone]; the first pill
      // is the 19px underlined email treatment, the rest are bare 18px icons.
      const isEmail = index === 0;

      return (
        <PillTag
          key={pill.label}
          {...target}
          className="flex w-[319px] max-w-[calc(100%-52px)] items-center gap-[10px] rounded-[8px] bg-s-200 px-[32px] py-[8px] font-sans text-[14px] font-semibold text-s-900"
        >
          <img
            src={pill.icon}
            alt=""
            aria-hidden="true"
            className={isEmail ? 'size-[19px] shrink-0' : 'size-[18px] shrink-0'}
          />
          <span className={isEmail ? 'underline' : ''}>{pill.label}</span>
        </PillTag>
      );
    });

  return (
    <section className={`relative w-full overflow-hidden ${bgClass} ${className}`}>
      {/* Mobile (<768): Figma-exact block (plan §4.7) — centered header,
          full-width photo with top/bottom blend gradients, pills anchored to
          the photo's bottom edge. `md:` below fully restores the previous
          tablet/desktop markup, untouched. */}
      <div className="flex w-full flex-col gap-[48px] py-[60px] md:hidden">
        <div className="flex flex-col items-center gap-[8px] px-[16px] text-center">
          {title && <h2 className="font-display text-[28px] capitalize text-white">{title}</h2>}
          {subtitle && (
            <p className="w-[318px] max-w-full font-sans text-[16px] text-white">{subtitle}</p>
          )}
        </div>

        {image ? (
          <div className="relative w-full">
            <img src={image} alt="" className="h-[455px] w-full object-cover" />
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-[89px]"
              style={{
                background: `linear-gradient(to bottom, ${bgColor} 0%, ${bgColor}d9 34.1%, ${bgColor}a8 60.6%, ${bgColor}00 100%)`,
              }}
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[111px]"
              style={{
                background: `linear-gradient(to top, ${bgColor} 0%, ${bgColor}d9 34.1%, ${bgColor}a8 60.6%, ${bgColor}00 100%)`,
              }}
            />
            {/* Figma anchors the pills inside the photo's bottom fade
                (644/689 of a 784px section), not below the photo — pulling
                the row up with a negative margin lands it there regardless
                of how tall the header text above happens to wrap. */}
            <div className="relative z-10 -mt-[28px] flex flex-col items-center gap-[12px] px-[16px]">
              {mobilePills}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-[12px] px-[16px]">{mobilePills}</div>
        )}
      </div>

      {/* >=md: previous tablet/desktop markup, byte-identical, now scoped
          behind `hidden md:*` instead of always-on. */}
      {/* md-lg: photo as a full-bleed background wash */}
      {image && (
        <>
          <img
            src={image}
            alt=""
            className="absolute inset-0 hidden h-full w-full object-cover md:block lg:hidden"
          />
          <div
            className="absolute inset-0 hidden md:block lg:hidden"
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
      <div className="relative z-10 hidden w-full flex-col gap-10 px-6 py-14 md:flex md:px-10 md:py-16 lg:h-[421px] lg:flex-row lg:items-center lg:gap-0 lg:px-0 lg:py-0">
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
