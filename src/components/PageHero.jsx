/**
 * Full-bleed hero photo used at the top of every page
 * (Implementation Plan §3.1 "PageHero").
 *
 * Props:
 * - `image`        — imported hero photo
 * - `height`       — px height of the hero band. Figma uses 746 (Home,
 *                    Services), 548 (About, Nominate, Get Involved,
 *                    Impact, Contact) or 470 (Blog detail)
 * - `flatOverlay`  — adds the extra flat `rgba(0,0,0,0.2)` wash used on the
 *                    Impact Stories hero, on top of the base gradient
 * - `textLeft`     — px left offset of the text block (72–82 per page)
 * - `textWidth`    — px width of the text block (485–821 per page)
 * - `textBottom`   — px padding from the bottom edge of the hero to the
 *                    start of the text block (default 96)
 * - `title`        — H1 copy
 * - `titleClassName`
 * - `subtitle`     — optional sub copy under the title
 * - `subtitleClassName`
 * - `children`     — optional extra content under the subtitle (e.g. the
 *                    Home hero's GET HELP / DONATE button row)
 * - `className`    — extra classes on the outer <section>
 */
function PageHero({
  image,
  height = 548,
  flatOverlay = false,
  textLeft = 72,
  textWidth = 618,
  textBottom = 96,
  title,
  titleClassName = '',
  subtitle,
  subtitleClassName = '',
  children,
  className = '',
}) {
  return (
    <section
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height }}
    >
      {image && (
        <img
          src={image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Base gradient: dark side on the left, behind the text block */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(56,41,31,0.9) 0%, rgba(56,41,31,0.2) 100%)',
        }}
      />
      {flatOverlay && <div className="absolute inset-0 bg-black/20" />}

      <div
        className="absolute bottom-0 flex flex-col gap-[16px]"
        style={{ left: textLeft, width: textWidth, paddingBottom: textBottom }}
      >
        {title && (
          <h1
            className={`font-display text-[56px] capitalize tracking-[2.8px] text-white ${titleClassName}`}
          >
            {title}
          </h1>
        )}
        {subtitle && (
          <p className={`font-sans text-[20px] text-white ${subtitleClassName}`}>
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}

export default PageHero;
