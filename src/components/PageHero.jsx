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
 * - `mobileOverlayGradient` — CSS gradient for the base (<768) scrim, when
 *                    `mobileOverlay` is `'gradient'`. Defaults to the espresso
 *                    top-light/bottom-dark wash every current page uses. The
 *                    home redesign's clean (unscrimmed) hero export needs a
 *                    blue wash instead, so it passes its own value here.
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
 *                    The 803:6011 mobile redraw settles this at **610** on
 *                    every page (803:6013 / 803:6301 / 803:6571 / 803:6894 /
 *                    803:6901 / 803:7105 / 803:7655 / 803:7788 are all 402 ×
 *                    610), down from the near-full-screen 745/746 the first
 *                    mobile pass shipped. That band was taller than the
 *                    viewport once the browser chrome is counted, so the
 *                    bottom of the copy — the CTA row on Home — was pushed
 *                    below the fold. It is unrelated to the page's xl
 *                    `height`; unlike the md tier this is not a proportional
 *                    scale-down. The image rects *inside* those frames are
 *                    still authored 745/746 and simply overflow the 610 box,
 *                    which is what `object-cover` reproduces.
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
 *                    from the top of the hero, not the bottom. The 610-tall
 *                    redraw moves every one of these up: default 394
 *                    (About 803:6903, Services 803:7108), Get Involved 391,
 *                    Nominate 392, Impact Stories 397, Contact 431, Home 274
 *                    (its block also carries the CTA row). Each is the
 *                    frame's own y on "Frame 158", so the copy keeps the
 *                    75–99px of bottom clearance the frames draw instead of
 *                    running past the band.
 * - `mobileTextBottom` — px clearance from the BOTTOM of the hero to the end
 *                    of the text block at base, replacing `mobileTextTop`
 *                    when set. Only Home passes it, and only because it is
 *                    the one mobile block with a CTA row under the copy:
 *                    top-anchored, every extra line the H1 takes at a
 *                    narrower viewport eats that row's clearance instead of
 *                    the empty space above it (3px left at 320 against 65 at
 *                    402). Anchoring from the bottom holds the buttons where
 *                    803:6275 puts them at every base width. Text-only
 *                    heroes have nothing to protect down there and stay on
 *                    `mobileTextTop`, which is what their frames author.
 * - `mobileTextInset`— px left/right gutter for the text block at base
 *                    (default 29; Home 16).
 * - `title`        — H1 copy
 * - `titleSize`    — px H1 size at xl. Defaults to 56, which is what the
 *                    inner-page heroes are drawn at; Home's Figma frame
 *                    (342:22) specifies 48/2.4px tracking, so Home passes
 *                    its own pair. Below xl the H1 keeps its own smaller
 *                    steps.
 * - `titleTracking`— px letter-spacing at xl, paired with `titleSize`
 * - `titleSizeMd` / `titleTrackingMd` — the same pair for the 768–1279 tier,
 *                    defaulting to the 44/2.2 step that scales the old 56px
 *                    H1 down. The four redesigned pages draw their H1 at 36
 *                    at *every* tier above the mobile frames, so they pass
 *                    36/1.8 here too — left on the default, the redesign was
 *                    invisible below 1280 and the tablet step was actually
 *                    *larger* than the desktop design it interpolates.
 * - `mobileTitleSize` / `mobileTitleTracking` — the H1's px size and
 *                    letter-spacing at base (<768), defaulting to the 32/1.6
 *                    step the 803:6011 mobile frames draw. Home's redrawn
 *                    830:11495 is **28 with no tracking**, so it passes its
 *                    own pair rather than moving the default — the other eight
 *                    mobile frames have not been re-fetched.
 * - `mobileCentered` — centre the whole text block at base (<768): the copy,
 *                    the H1, and anything passed as `children`. Home's
 *                    830:11493 is an `items-center` / `text-center` stack
 *                    where every earlier mobile frame is left-aligned, so this
 *                    defaults to false and is explicitly undone from `md` up.
 *                    Note it centres the CTA row too, which is why Home's row
 *                    needs no `justify-*` of its own.
 * - `mobileTitleLeading` — px line box for the H1 at base (<768). Omit to
 *                    keep `leading-[normal]`, which every one-line mobile
 *                    title is fine on. Home passes 41 because 803:6273 is
 *                    the only multi-line one: Playfair stands in for
 *                    Lettertype and draws its `normal` at 43, so four lines
 *                    came out 172 against the frame's 164 — 8px that lands
 *                    straight on the CTA row's clearance. `md:` is held at
 *                    `normal` so the tablet tier is untouched.
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
 * - `titleCapitalize` — same, for ≥768. Defaults to true. Nominate's desktop
 *                    frame (367:771) also has no capitalize on the layer,
 *                    unlike About's 342:817 and Services' 484:3771, so it
 *                    wants "Nominate a Senior" rather than "Nominate A
 *                    Senior" at every tier.
 * - `titleClassName`
 *
 * The H1 is `font-semibold` for every caller. Figma draws it SemiBold —
 * 830:8 names Playfair Display directly, the rest name Lettertype, which we
 * substitute Playfair for — and an unstyled `font-display` heading otherwise
 * inherits `body`'s 400, because Tailwind's preflight resets headings to
 * `font-weight: inherit`. It lives here rather than in eight `titleClassName`
 * props since no caller wants the regular weight. Note the heavier face is
 * wider: any hero whose measure is fitted to a specific word break (Home's
 * base `max-w-[335px]`) had that break re-checked at 600.
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
  mobileOverlayGradient = 'linear-gradient(to bottom, rgba(56,41,31,0.2), rgba(56,41,31,0.9))',
  height = 548,
  mobileHeight = 610,
  flatOverlay = false,
  mobileFlatOverlay = false,
  textLeft = 72,
  textWidth = 618,
  textBottom = 96,
  mobileTextTop = 394,
  mobileTextBottom,
  mobileTextInset = 29,
  title,
  titleSize = 56,
  titleTracking = 2.8,
  titleSizeMd = 44,
  titleTrackingMd = 2.2,
  mobileTitleSize = 32,
  mobileTitleTracking = 1.6,
  mobileCentered = false,
  mobileTitleLeading,
  titleLeading,
  titleCapitalizeBase = true,
  titleCapitalize = true,
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
      {/* Top-anchored, not centred: the mobile frames all keep their image
          rect at its old 745/746 height and pin it to y=0 inside the redrawn
          610 band (803:6895, 803:7107, 803:7657, 803:7790, …), so the 135px
          that no longer fits comes off the bottom. `object-cover`'s default
          centring would take half of it off the top instead and drop the
          framing ~67px. Landscape exports (About's flattened 1440×548) cover
          by height and are unaffected either way. */}
      {mobileImage && (
        <img
          src={mobileImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-top md:hidden"
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
            background: mobileOverlayGradient,
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
          className={`absolute left-[var(--hero-text-inset-base)] right-[var(--hero-text-inset-base)] ${
            mobileTextBottom
              ? 'bottom-[var(--hero-text-bottom-base)]'
              : 'top-[var(--hero-text-top-base)]'
          } flex w-auto flex-col gap-[16px] ${
            mobileCentered ? 'items-center text-center md:items-start md:text-left' : ''
          } md:bottom-0 md:left-10 md:right-10 md:top-auto md:gap-[14px] md:pb-10 xl:left-[var(--hero-text-left)] xl:right-auto xl:w-[var(--hero-text-w)] xl:gap-[16px] xl:pb-[var(--hero-text-pb)]`}
          style={{
            '--hero-text-left': `${textLeft}px`,
            '--hero-text-w': `${textWidth}px`,
            '--hero-text-pb': `${textBottom}px`,
            '--hero-text-top-base': `${mobileTextTop}px`,
            ...(mobileTextBottom
              ? { '--hero-text-bottom-base': `${mobileTextBottom}px` }
              : {}),
            // Number → px. A string is emitted raw, so a caller can make the
            // gutter fluid (Home does, to hold its H1's designed line break
            // below the frame's 402 — see its `mobileTextInset`).
            '--hero-text-inset-base':
              typeof mobileTextInset === 'number' ? `${mobileTextInset}px` : mobileTextInset,
            '--hero-title-size': `${titleSize}px`,
            '--hero-title-track': `${titleTracking}px`,
            '--hero-title-size-md': `${titleSizeMd}px`,
            '--hero-title-track-md': `${titleTrackingMd}px`,
            '--hero-title-size-base': `${mobileTitleSize}px`,
            '--hero-title-track-base': `${mobileTitleTracking}px`,
            ...(titleLeading ? { '--hero-title-leading': `${titleLeading}px` } : {}),
            ...(mobileTitleLeading
              ? { '--hero-title-leading-base': `${mobileTitleLeading}px` }
              : {}),
          }}
        >
          {title && (
            <h1
              className={`font-display font-semibold text-[length:var(--hero-title-size-base)] tracking-[var(--hero-title-track-base)] text-white md:text-[length:var(--hero-title-size-md)] md:tracking-[var(--hero-title-track-md)] xl:text-[length:var(--hero-title-size)] xl:tracking-[var(--hero-title-track)] ${
                titleCapitalizeBase ? 'capitalize' : ''
              } ${titleCapitalize ? 'md:capitalize' : 'md:normal-case'} ${
                mobileTitleLeading
                  ? 'leading-[var(--hero-title-leading-base)] md:leading-[normal]'
                  : ''
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
