/**
 * Full-bleed hero photo used at the top of every page
 * (Implementation Plan §3.1 "PageHero").
 *
 * Props:
 * - `image`        — imported hero photo
 * - `mobileImage`  — optional separate photo for base (<768). The Figma mobile
 *                    frames crop their heroes portrait rather than reusing the
 *                    desktop landscape slice, so Home ships a 402×746 export
 *                    (`mobile/mobile-hone-hero.png`) that fills the mobile band
 *                    exactly. When present, `image` only renders from md up.
 * - `mobileOverlay`— `'gradient'` (default) or `'none'` for the base (<768)
 *                    vertical scrim. Like About's desktop export, Home's mobile
 *                    export is *flattened* — the scrim is already baked into the
 *                    pixels (top ~165 luma, bottom ~56), so layering the CSS
 *                    wash on top would double-darken it to near-solid brown.
 * - `imagePosition`— CSS `object-position` for the photo. The default centres
 *                    the crop; Home needs `50% 34%` because its 548px band
 *                    shows a higher slice of hero-main.png than centring
 *                    gives (verified against the Figma render: at 34% the
 *                    column luminances match to ~1/255, at 50% they are off
 *                    by 33px vertically).
 * - `flipImage`    — mirror the photo horizontally. hero-services.png ships
 *                    mirrored relative to its Figma frame (363:152), which
 *                    puts the mower on the left and the porch on the right;
 *                    flipping lands the dark end of the scrim on the lawn
 *                    rather than on the white house behind the headline.
 * - `overlayGradient` — CSS gradient for the ≥768 scrim, when `overlay` is
 *                    `'gradient'`. Defaults to the plain 0.9→0.2 left-to-right
 *                    wash. About's redrawn 342:785 holds 0.9 to 4.097% and
 *                    passes through 0.83 at 21.618% before reaching 0.2, which
 *                    is worth spelling out: against a `get_screenshot` of the
 *                    frame the exact stops land at 2.84 MAD where the plain
 *                    two-stop default gives 5.25.
 * - `overlay`      — `'gradient'` (default) dark left-to-right scrim, or
 *                    `'none'`. Home's Figma frame has no scrim at all — the
 *                    dark left side there is the photograph, not a wash — so
 *                    Home opts out. Pages with bright hero photos keep it,
 *                    otherwise the white H1 loses contrast. This only
 *                    governs the ≥768 horizontal scrim — the base (mobile)
 *                    vertical scrim below always renders regardless.
 * - `height`       — px height of the hero band at ≥1280 (xl). Figma uses
 *                    746 (Home, Services), 548 (About, Nominate, Get
 *                    Involved, Impact, Contact) or 470 (Blog detail). Below
 *                    xl the band scales down proportionally (plan §5,
 *                    Task 14) so the hero never eats the whole viewport on
 *                    a tablet.
 * - `mobileHeight` — px height of the hero band at base (<768, true mobile).
 *                    The Figma mobile frames run the hero near full-screen
 *                    on every page (745, or 746 for Home) regardless of the
 *                    page's xl `height` — unlike the md tier, this is not a
 *                    proportional scale-down of `height`.
 * - `flatOverlay`  — extra flat `rgba(0,0,0,0.2)` wash on top of the base
 *                    (≥768) gradient. Currently unused: it was applied to
 *                    Impact Stories, but that frame (535:2545) carries only
 *                    the standard scrim — the wash put our render 10.4 MAD
 *                    off the Figma view, and removing it brought that to 1.4.
 * - `mobileFlatOverlay` — same extra `rgba(0,0,0,0.2)` wash, but for the base
 *                    (mobile) vertical scrim. Impact Stories and the Blog
 *                    detail hero carry this in their Figma mobile frames.
 * - `textLeft`     — px left offset of the text block at xl (72–82 per page)
 * - `textWidth`    — px width of the text block at xl (485–821 per page).
 *                    Below xl the block is full-bleed (left/right gutters)
 *                    instead of this fixed width.
 * - `textBottom`   — px padding from the bottom edge of the hero to the
 *                    start of the text block at xl (default 96)
 * - `mobileTextTop`  — px offset from the TOP of the hero to the text block
 *                    at base (mobile). The mobile frames anchor the copy
 *                    from the top of the hero, not the bottom (default 499;
 *                    Get Involved 516, Contact 587, Home 410).
 * - `mobileTextInset`— px left/right gutter for the text block at base
 *                    (default 29; Home 16).
 * - `title`        — H1 copy
 * - `titleSize`    — px H1 size at xl. Defaults to 56, which is what the
 *                    inner-page heroes are drawn at; Home's Figma frame
 *                    (342:22) specifies 48/2.4px tracking, so Home passes
 *                    its own pair. Below xl the H1 keeps its own smaller
 *                    steps.
 * - `titleTracking`— px letter-spacing at xl, paired with `titleSize`
 * - `titleLeading` — px line box for the H1 at xl. Omit to keep
 *                    `leading-[normal]`, which is what most heroes want.
 *                    Contact passes 72 because its title frame (377:3036) is
 *                    exactly 72 tall while Playfair's `normal` at 56px is
 *                    74.7 — and its text block is anchored from the bottom,
 *                    so the extra 2.7px would push the headline up off the
 *                    designed baseline.
 * - `titleCapitalizeBase` — whether the H1 gets `capitalize` at base
 *                    (mobile). Defaults to true; Nominate passes false since
 *                    its mobile frame keeps "Nominate a Senior" lowercase-a.
 *                    ≥768 always keeps `capitalize`, unaffected by this prop.
 * - `titleClassName`
 * - `subtitle`     — optional sub copy under the title
 * - `subtitleClassName`
 * - `children`     — optional extra content under the subtitle (e.g. the
 *                    Home hero's GET HELP / DONATE button row)
 * - `className`    — extra classes on the outer <section>
 */
function PageHero({
  image,
  mobileImage,
  imagePosition = '50% 50%',
  flipImage = false,
  overlay = 'gradient',
  overlayGradient = 'linear-gradient(to right, rgba(56,41,31,0.9) 0%, rgba(56,41,31,0.2) 100%)',
  mobileOverlay = 'gradient',
  height = 548,
  mobileHeight = 745,
  flatOverlay = false,
  mobileFlatOverlay = false,
  textLeft = 72,
  textWidth = 618,
  textBottom = 96,
  mobileTextTop = 499,
  mobileTextInset = 29,
  title,
  titleSize = 56,
  titleTracking = 2.8,
  titleLeading,
  titleCapitalizeBase = true,
  titleClassName = '',
  subtitle,
  subtitleClassName = '',
  children,
  className = '',
}) {
  const heightMd = Math.round(height * 0.76);

  return (
    <section
      className={`relative w-full overflow-hidden h-[var(--hero-h-base)] md:h-[var(--hero-h-md)] xl:h-[var(--hero-h-xl)] ${className}`}
      style={{
        '--hero-h-base': `${mobileHeight}px`,
        '--hero-h-md': `${heightMd}px`,
        '--hero-h-xl': `${height}px`,
      }}
    >
      {image && (
        <img
          src={image}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover ${
            mobileImage ? 'hidden md:block' : ''
          } ${flipImage ? 'scale-x-[-1]' : ''}`}
          style={{ objectPosition: imagePosition }}
        />
      )}
      {mobileImage && (
        <img
          src={mobileImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover md:hidden"
        />
      )}

      {/* Base (mobile) scrim: every Figma mobile frame carries this
          top-light/bottom-dark vertical wash regardless of what the ≥768
          `overlay` prop says — Home's desktop frame has no scrim at all, but
          its mobile frame still wants one. Pages shipping a flattened mobile
          export (scrim already in the pixels) pass `mobileOverlay="none"`. */}
      {mobileOverlay === 'gradient' && (
        <div
          className="absolute inset-0 md:hidden"
          style={{
            background: 'linear-gradient(to bottom, rgba(56,41,31,0.2), rgba(56,41,31,0.9))',
          }}
        />
      )}
      {mobileFlatOverlay && <div className="absolute inset-0 bg-black/20 md:hidden" />}

      {/* ≥768 gradient: dark side on the left, behind the text block */}
      {overlay === 'gradient' && (
        <div className="absolute inset-0 hidden md:block" style={{ background: overlayGradient }} />
      )}
      {/* ≥768 only, as documented: `mobileFlatOverlay` is the base-tier
          equivalent, and leaving this one unscoped would darken mobile too.
          It had no callers, so nothing moves by scoping it now. */}
      {flatOverlay && <div className="absolute inset-0 hidden bg-black/20 md:block" />}

      {/* The photo and its overlay stay full-bleed at any width, but the copy
          is anchored to the same centered 1440 design container every other
          section uses — so above 1440 the headline keeps lining up with the
          navbar and the sections below instead of hugging the viewport edge. */}
      <div className="absolute inset-0 mx-auto w-full max-w-[1440px]">
        <div
          className="absolute left-[var(--hero-text-inset-base)] right-[var(--hero-text-inset-base)] top-[var(--hero-text-top-base)] flex w-auto flex-col gap-[16px] md:bottom-0 md:left-10 md:right-10 md:top-auto md:gap-[14px] md:pb-10 xl:left-[var(--hero-text-left)] xl:right-auto xl:w-[var(--hero-text-w)] xl:gap-[16px] xl:pb-[var(--hero-text-pb)]"
          style={{
            '--hero-text-left': `${textLeft}px`,
            '--hero-text-w': `${textWidth}px`,
            '--hero-text-pb': `${textBottom}px`,
            '--hero-text-top-base': `${mobileTextTop}px`,
            '--hero-text-inset-base': `${mobileTextInset}px`,
            '--hero-title-size': `${titleSize}px`,
            '--hero-title-track': `${titleTracking}px`,
            ...(titleLeading ? { '--hero-title-leading': `${titleLeading}px` } : {}),
          }}
        >
          {title && (
            <h1
              className={`font-display text-[32px] tracking-[1.6px] text-white md:text-[44px] md:tracking-[2.2px] md:capitalize xl:text-[length:var(--hero-title-size)] xl:tracking-[var(--hero-title-track)] ${
                titleCapitalizeBase ? 'capitalize' : ''
              } ${titleLeading ? 'xl:leading-[var(--hero-title-leading)]' : ''} ${titleClassName}`}
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
