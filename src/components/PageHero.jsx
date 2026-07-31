/**
 * Full-bleed hero photo used at the top of every page
 * (Implementation Plan §3.1 "PageHero").
 *
 * Props:
 * - `image`        — imported hero photo
 * - `imagePosition`— CSS `object-position` for the photo. The default centres
 *                    the crop; Home needs `50% 34%` because its 548px band
 *                    shows a higher slice of hero-main.png than centring
 *                    gives (verified against the Figma render: at 34% the
 *                    column luminances match to ~1/255, at 50% they are off
 *                    by 33px vertically).
 * - `overlay`      — `'gradient'` (default) dark left-to-right scrim, or
 *                    `'none'`. Home's Figma frame has no scrim at all — the
 *                    dark left side there is the photograph, not a wash — so
 *                    Home opts out. Pages with bright hero photos keep it,
 *                    otherwise the white H1 loses contrast.
 * - `height`       — px height of the hero band at ≥1280 (xl). Figma uses
 *                    746 (Home, Services), 548 (About, Nominate, Get
 *                    Involved, Impact, Contact) or 470 (Blog detail). Below
 *                    xl the band scales down proportionally (plan §5,
 *                    Task 14) so the hero never eats the whole viewport on
 *                    a phone.
 * - `flatOverlay`  — adds the extra flat `rgba(0,0,0,0.2)` wash used on the
 *                    Impact Stories hero, on top of the base gradient
 * - `textLeft`     — px left offset of the text block at xl (72–82 per page)
 * - `textWidth`    — px width of the text block at xl (485–821 per page).
 *                    Below xl the block is full-bleed (left/right gutters)
 *                    instead of this fixed width.
 * - `textBottom`   — px padding from the bottom edge of the hero to the
 *                    start of the text block at xl (default 96)
 * - `title`        — H1 copy
 * - `titleSize`    — px H1 size at xl. Defaults to 56, which is what the
 *                    inner-page heroes are drawn at; Home's Figma frame
 *                    (342:22) specifies 48/2.4px tracking, so Home passes
 *                    its own pair. Below xl the H1 keeps its own smaller
 *                    steps (mobile is out of scope for now).
 * - `titleTracking`— px letter-spacing at xl, paired with `titleSize`
 * - `titleClassName`
 * - `subtitle`     — optional sub copy under the title
 * - `subtitleClassName`
 * - `children`     — optional extra content under the subtitle (e.g. the
 *                    Home hero's GET HELP / DONATE button row)
 * - `className`    — extra classes on the outer <section>
 */
function PageHero({
  image,
  imagePosition = '50% 50%',
  overlay = 'gradient',
  height = 548,
  flatOverlay = false,
  textLeft = 72,
  textWidth = 618,
  textBottom = 96,
  title,
  titleSize = 56,
  titleTracking = 2.8,
  titleClassName = '',
  subtitle,
  subtitleClassName = '',
  children,
  className = '',
}) {
  const heightBase = Math.round(height * 0.52);
  const heightMd = Math.round(height * 0.76);

  return (
    <section
      className={`relative w-full overflow-hidden h-[var(--hero-h-base)] md:h-[var(--hero-h-md)] xl:h-[var(--hero-h-xl)] ${className}`}
      style={{
        '--hero-h-base': `${heightBase}px`,
        '--hero-h-md': `${heightMd}px`,
        '--hero-h-xl': `${height}px`,
      }}
    >
      {image && (
        <img
          src={image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: imagePosition }}
        />
      )}

      {/* Base gradient: dark side on the left, behind the text block */}
      {overlay === 'gradient' && (
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(56,41,31,0.9) 0%, rgba(56,41,31,0.2) 100%)',
          }}
        />
      )}
      {flatOverlay && <div className="absolute inset-0 bg-black/20" />}

      {/* The photo and its overlay stay full-bleed at any width, but the copy
          is anchored to the same centered 1440 design container every other
          section uses — so above 1440 the headline keeps lining up with the
          navbar and the sections below instead of hugging the viewport edge. */}
      <div className="absolute inset-0 mx-auto w-full max-w-[1440px]">
        <div
          className="absolute bottom-0 left-6 right-6 flex w-auto flex-col gap-[10px] pb-8 md:left-10 md:right-10 md:gap-[14px] md:pb-10 xl:left-[var(--hero-text-left)] xl:right-auto xl:w-[var(--hero-text-w)] xl:gap-[16px] xl:pb-[var(--hero-text-pb)]"
          style={{
            '--hero-text-left': `${textLeft}px`,
            '--hero-text-w': `${textWidth}px`,
            '--hero-text-pb': `${textBottom}px`,
            '--hero-title-size': `${titleSize}px`,
            '--hero-title-track': `${titleTracking}px`,
          }}
        >
          {title && (
            <h1
              className={`font-display text-[32px] capitalize tracking-[1.6px] text-white md:text-[44px] md:tracking-[2.2px] xl:text-[length:var(--hero-title-size)] xl:tracking-[var(--hero-title-track)] ${titleClassName}`}
            >
              {title}
            </h1>
          )}
          {subtitle && (
            <p className={`font-sans text-[16px] text-white md:text-[18px] xl:text-[20px] ${subtitleClassName}`}>
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}

export default PageHero;
