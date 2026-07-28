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
 */
function StatsBand({ stats = [], image, className = '' }) {
  if (image) {
    return (
      <section className={`relative h-[440px] w-full overflow-hidden bg-b-500 ${className}`}>
        <div
          className="absolute flex w-[308px] flex-col gap-[64px]"
          style={{ left: '12.22%', top: 85 }}
        >
          {stats.map((stat) => (
            <div key={stat.caption} className="flex flex-col gap-[8px]">
              <span className="font-display text-[32px] text-white">{stat.value}</span>
              <span className="font-sans text-[16px] text-white">{stat.caption}</span>
            </div>
          ))}
        </div>
        <img
          src={image}
          alt=""
          className="absolute top-0 h-[439px] w-[823px] object-cover"
          style={{ left: 617 }}
        />
      </section>
    );
  }

  return (
    <section
      className={`flex h-[203px] w-full items-center justify-center bg-b-500 ${className}`}
    >
      <div className="flex items-center gap-[108px]">
        {stats.flatMap((stat, index) => {
          const block = (
            <div key={stat.caption} className="flex w-[308px] flex-col gap-[8px]">
              <span className="font-display text-[32px] text-white">{stat.value}</span>
              <span className="font-sans text-[16px] text-white">{stat.caption}</span>
            </div>
          );
          if (index === 0) return [block];
          return [<span key={`divider-${stat.caption}`} className="h-[45px] w-px bg-white" />, block];
        })}
      </div>
    </section>
  );
}

export default StatsBand;
