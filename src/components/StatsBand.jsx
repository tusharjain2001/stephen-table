/**
 * Brown stats band (Implementation Plan §3.1 "StatsBand").
 *
 * Props:
 * - `stats`     — array of `{ value, caption }`
 * - `image`     — optional photo; when provided the band renders the Home
 *                 layout (stats stacked, photo bleeds right, h-440).
 *                 Without an image it renders the About layout (stats laid
 *                 out side by side with a divider, h-203).
 * - `mobileImage` — optional separate photo for base (<768). The mobile frame
 *                 crops this band's photo to its own 402×439 box rather than
 *                 reusing a slice of the wide desktop landscape, so Home ships
 *                 `mobile/mobile-home-third.png`. Only applies to the image
 *                 layout; `image` still renders from md up.
 * - `className` — extra classes on the outer <section>
 *
 * Breakpoint behavior (plan §5, Task 14): both variants stack to a single
 * column below `lg`/`sm`; the image variant uses the same
 * fixed-column + flexible-photo flex trick as CtaBanner so the photo never
 * overlaps the stat column between 1024–1439px, and is pixel-exact at 1440.
 */
function StatsBand({ stats = [], image, mobileImage, className = '' }) {
  if (image) {
    return (
      <section className={`w-full overflow-hidden bg-b-500 ${className}`}>
        {/* Full-bleed row (not a capped 1440 container): the stat column is
            offset by the design container's gutter so it stays aligned with
            the sections above/below, while the photo takes whatever is left
            and keeps bleeding to the right edge at any width. At 1440 the
            gutter is 0, so this is Figma-exact: 176 + 308 + 133 = 617 with an
            823px photo (342:173 / 342:240). Mobile frame (662:9459) puts the
            photo FIRST — `order` flips the visual stacking below `lg` without
            touching the DOM (so the `lg:flex-row` desktop row keeps its
            original stat-column-then-photo order untouched). */}
        <div className="flex w-full flex-col lg:h-[440px] lg:flex-row lg:items-center">
          <div className="order-2 flex flex-col gap-[64px] px-[48px] py-[60px] md:order-none md:gap-8 md:px-10 md:py-14 lg:ml-[calc(var(--gutter)+48px)] lg:mr-[80px] lg:w-[308px] lg:shrink-0 lg:gap-[64px] lg:px-0 lg:py-0 xl:ml-[calc(var(--gutter)+176px)] xl:mr-[133px]">
            {stats.map((stat) => (
              // 342:174 puts 10px between the figure and its caption at 1440
              // (93 = 41 + 10 + 42); only the md tablet step uses 8.
              <div key={stat.caption} className="flex flex-col items-center gap-[10px] text-center md:gap-[8px] lg:gap-[10px]">
                <span className="font-display text-[28px] text-white xl:text-[32px]">{stat.value}</span>
                <span className="font-sans text-[16px] text-white">{stat.caption}</span>
              </div>
            ))}
          </div>
          <div className="order-1 relative h-[439px] w-full md:order-none md:h-[300px] lg:h-full lg:min-w-0 lg:flex-1">
            <img
              src={image}
              alt=""
              className={`h-full w-full object-cover ${mobileImage ? 'hidden md:block' : ''}`}
            />
            {mobileImage && (
              <img
                src={mobileImage}
                alt=""
                className="absolute inset-0 h-full w-full object-cover md:hidden"
              />
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`flex w-full items-center justify-center bg-b-500 px-[48px] py-[60px] md:px-6 md:py-14 xl:h-[203px] xl:py-0 ${className}`}
    >
      <div className="flex flex-col items-center gap-[64px] md:flex-row md:gap-14 xl:gap-[108px]">
        {stats.flatMap((stat, index) => {
          const block = (
            <div
              key={stat.caption}
              className="flex w-full max-w-[308px] flex-col items-center gap-[8px] text-center"
            >
              <span className="font-display text-[28px] text-white xl:text-[32px]">{stat.value}</span>
              <span className="font-sans text-[16px] text-white">{stat.caption}</span>
            </div>
          );
          if (index === 0) return [block];
          return [
            <span
              key={`divider-${stat.caption}`}
              className="hidden h-px w-16 bg-white sm:block sm:h-[45px] sm:w-px"
            />,
            block,
          ];
        })}
      </div>
    </section>
  );
}

export default StatsBand;
