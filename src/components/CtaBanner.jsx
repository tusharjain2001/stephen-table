import iconEmail from '../assets/icons/icon-email.svg';
import iconPhone from '../assets/icons/icon-phone.svg';

const DEFAULT_PILLS = [
  {
    icon: iconEmail,
    label: 'info@stephenstablecolorado.org',
    href: 'mailto:info@stephenstablecolorado.org',
  },
  { icon: iconPhone, label: '970-375-9179', href: 'tel:9703759179' },
];

/**
 * "Here When You Need Us" style CTA band used on Home, About, Get Involved,
 * Impact Stories and Blog (Implementation Plan §3.1 "CtaBanner").
 *
 * Props:
 * - `image`      — photo shown on the right side of the banner
 * - `bg`         — `'brown'` (default, bg-b-600) | `'blue'` (bg-bl-600)
 * - `title`      — H2 copy
 * - `subtitle`   — optional sub copy under the title
 * - `pillTheme`  — `'sage'` (default, bg-s-200 / text-s-900) | `'white'`
 *                  (bg-white / text-b-800, used on the Blog page)
 * - `pills`      — array of `{ icon, label, href }` rendered as icon+label
 *                  contact pills; defaults to the standard phone/email pair
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
    <section className={`relative h-[421px] w-full overflow-hidden ${bgClass} ${className}`}>
      {image && (
        <img
          src={image}
          alt=""
          className="absolute right-0 top-0 h-full w-[732px] object-cover"
        />
      )}

      {/* Blend strips: fade the banner background color into the photo's
          edges on both sides (Plan §3.1: "two side gradients ... plus
          mirrored 243px right strip"). */}
      <div
        className="pointer-events-none absolute top-0 h-full w-[243px]"
        style={{
          left: 708,
          background: `linear-gradient(to right, ${bgColor} 0%, transparent 100%)`,
        }}
      />
      <div
        className="pointer-events-none absolute right-0 top-0 h-full w-[243px]"
        style={{
          background: `linear-gradient(to left, ${bgColor} 0%, transparent 100%)`,
        }}
      />

      <div
        className="relative z-10 flex h-full flex-col justify-center gap-[36px]"
        style={{ marginLeft: 72, width: 529 }}
      >
        <div className="flex flex-col gap-[8px]">
          {title && (
            <h2 className="font-display text-[40px] capitalize text-white">{title}</h2>
          )}
          {subtitle && <p className="font-sans text-[20px] text-white">{subtitle}</p>}
        </div>

        <div className="flex flex-col gap-[9px]">
          {actions ??
            pills.map((pill) => (
              <a
                key={pill.label}
                href={pill.href}
                className={`flex items-center gap-[24px] rounded-btn px-[32px] py-[8px] font-sans text-[24px] font-semibold capitalize ${pillClasses}`}
              >
                <img src={pill.icon} alt="" className="size-[28px]" aria-hidden="true" />
                {pill.label}
              </a>
            ))}
        </div>
      </div>
    </section>
  );
}

export default CtaBanner;
