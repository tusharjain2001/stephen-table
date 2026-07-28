/**
 * Brown stats band (Implementation Plan §3.1 "StatsBand").
 *
 * Props:
 * - `stats`     — array of `{ value, caption }`
 * - `image`     — optional photo; when provided the band renders the Home
 *                 layout (stats stacked, photo bleeds right, h-440).
 *                 Without an image it renders the About layout (stats laid
 *                 out side by side with a divider, h-203).
 * - `className` — extra classes on the outer <section>
 *
 * Breakpoint behavior (plan §5, Task 14): both variants stack to a single
 * column below `lg`/`sm`; the image variant uses the same
 * fixed-column + flexible-photo flex trick as CtaBanner so the photo never
 * overlaps the stat column between 1024–1439px, and is pixel-exact at 1440.
 */
function StatsBand({ stats = [], image, className = '' }) {
  if (image) {
    return (
      <section className={`w-full overflow-hidden bg-b-500 ${className}`}>
        <div className="mx-auto flex max-w-[1440px] flex-col lg:h-[440px] lg:flex-row lg:items-center">
          <div className="flex flex-col gap-8 px-6 py-12 md:px-10 md:py-14 lg:w-[308px] lg:shrink-0 lg:gap-[64px] lg:py-0 lg:pl-12 xl:pl-[176px]">
            {stats.map((stat) => (
              <div key={stat.caption} className="flex flex-col gap-[8px]">
                <span className="font-display text-[28px] text-white xl:text-[32px]">{stat.value}</span>
                <span className="font-sans text-[16px] text-white">{stat.caption}</span>
              </div>
            ))}
          </div>
          <div className="relative h-[220px] w-full md:h-[300px] lg:h-full lg:min-w-0 lg:flex-1">
            <img
              src={image}
              alt=""
              className="absolute right-0 top-0 h-full max-w-full object-cover"
              style={{ width: 823 }}
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`flex w-full items-center justify-center bg-b-500 px-6 py-12 sm:py-14 xl:h-[203px] xl:py-0 ${className}`}
    >
      <div className="flex flex-col items-center gap-8 sm:flex-row sm:gap-14 xl:gap-[108px]">
        {stats.flatMap((stat, index) => {
          const block = (
            <div
              key={stat.caption}
              className="flex w-full max-w-[308px] flex-col items-center gap-[8px] text-center sm:items-start sm:text-left"
            >
              <span className="font-display text-[28px] text-white xl:text-[32px]">{stat.value}</span>
              <span className="font-sans text-[16px] text-white">{stat.caption}</span>
            </div>
          );
          if (index === 0) return [block];
          return [
            <span
              key={`divider-${stat.caption}`}
              className="h-px w-16 bg-white sm:h-[45px] sm:w-px"
            />,
            block,
          ];
        })}
      </div>
    </section>
  );
}

export default StatsBand;
