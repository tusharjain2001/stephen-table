import PageHero from '../components/PageHero.jsx';
import SectionChip from '../components/SectionChip.jsx';
import Button from '../components/Button.jsx';
import FaqSection from '../components/FaqSection.jsx';

import heroDonate from '../assets/images/hero-donate.jpg';
import heroDonateMobile from '../assets/mobile/donate-mobile-image.png';

/**
 * Donate page — Figma `790:386`, 1440 × 2952:
 *
 *   72 navbar + 548 hero + 1075 donation + 814 FAQ + 443.35 footer
 *
 * The donation band (799:5811) is `py-[100px]` around a 745px stack
 * (159 header + 69 + 517 table), then 88 down to the DONATE NOW pill (42).
 *
 * Row order is taken from the frame's y coordinates, not from its layer
 * order — 799:5773 ($50) is authored above 799:5767 ($100) in the layer
 * list but sits below it on the canvas.
 */
const TIERS = [
  { amount: '$5', impact: 'Helps provide everyday essentials for a senior in need.' },
  {
    amount: '$10',
    impact: 'Supports transportation assistance for essential errands or appointments.',
  },
  { amount: '$25', impact: 'Helps fund companionship visits and wellness check-ins.' },
  { amount: '$50', impact: "Helps provide multiple services to support a senior's independence." },
  {
    amount: '$100',
    impact: 'Supports practical home assistance such as yard care or home maintenance.',
  },
  {
    amount: '$250',
    impact: 'Supports ongoing community programs benefiting several older adults.',
  },
  {
    amount: 'Custom Amount',
    impact: 'Every gift, regardless of size, helps make a meaningful difference.',
  },
];

function Donation() {
  return (
    <div className="bg-cream">
      {/* 799:3353 is one of this file's mirrored rects (its reported x equals
          its width), so two things flip. The gradient it reports
          left-to-right — 0.2 → 0.83 @ 88.203% → 0.9 — reads
          0.9 → 0.83 @ 11.797% → 0.2 on the page, and the *photo* is mirrored
          too, hence `flipImage`: composited against a `get_screenshot` of the
          frame the band lands at 2.96 MAD flipped against 26.3 unflipped.
          Its fill is `h-[175.14%] top-[-41.88%]`, i.e. object-position Y
          41.88 / (175.14 − 100) = 55.74% — the same crop maths About's hero
          uses, and a 1px sweep confirms the optimum at 55.8%. */}
      <PageHero
        image={heroDonate}
        // 402 × 610 — exactly the mobile band, so it lands 1:1 at 402 with no
        // cropping, where the desktop 1536 × 1024 landscape had to be covered
        // into a portrait box. `image` now only renders from md up.
        //
        // It is a plain photo, not a flattened export: its luma runs 146 at
        // the top, 73 through the middle and 126 at the bottom, i.e. no
        // top-light/bottom-dark wash in the pixels. So the base scrim stays a
        // live CSS gradient (`mobileOverlay` default) rather than being turned
        // off the way About's flattened mobile export needs.
        mobileImage={heroDonateMobile}
        height={548}
        flipImage
        imagePosition="50% 55.74%"
        overlayGradient="linear-gradient(to right, rgba(24,33,45,0.9) 0%, rgba(24,33,45,0.83) 11.797%, rgba(24,33,45,0.2) 100%)"
        // The 803:6011 mobile redraw has no Donate frame — this is the one
        // route it never got — so the hero rides PageHero's 610 band.
        //
        // Its H1 has to be two lines, and at the inherited 32/1.6 it cannot
        // be at any width a phone has: the shortest possible second line,
        // "Create Lasting Change.", measures ~374px, against the 344 a 29px
        // gutter leaves at 402. Home's redrawn mobile type (28, no tracking)
        // brings that to ~297 and takes line 1 to "Partner With Us To
        // Create" — the same break 799:3356 draws on desktop.
        //
        // 37 is Playfair's `normal` at 28 (37.35), pinned so the two-line
        // block stays exactly 74 and the clearance below can be relied on.
        mobileTitleSize={28}
        mobileTitleTracking={0}
        mobileTitleLeading={37}
        // 29 at 402, giving way below ~358 so the second line keeps its ~300
        // of measure rather than breaking to a third. Same treatment as Home;
        // the 16 floor is where the wrap has to give anyway.
        mobileTextInset="max(16px, min(29px, calc((100vw - 300px) / 2)))"
        // Was 394 — PageHero's default — when the H1 ran three lines and left
        // 87 clear of the band's bottom. At two lines that gap would open to
        // 142 and the title would float high, so the top moves down to hold
        // the same 87 (610 − 87 − 74).
        mobileTextTop={449}
        textLeft={72}
        // 799:3356 is 482 × 92 at y=456 inside the 548 band — a two-line 46px
        // box sitting 72 clear of the hero's bottom edge, with no subtitle.
        textWidth={482}
        textBottom={72}
        title="Partner with us to create lasting change."
        titleSize={36}
        titleTracking={1.8}
        titleSizeMd={36}
        titleTrackingMd={1.8}
        titleLeading={46}
      />

      {/* Donation band — 799:5811, 1075 tall */}
      <section className="w-full px-6 py-14 md:px-10 xl:px-[72px] xl:py-[100px]">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-10 xl:gap-[88px]">
          <div className="flex w-full flex-col items-center gap-10 xl:gap-[69px]">
            {/* 799:5731 — chip 47 + 34 + a three-line 20px lede (78) = 159 */}
            <div className="flex w-full flex-col items-center gap-6 text-center xl:w-[1035px] xl:gap-[34px]">
              <SectionChip variant="green-tint">What are you donating to?</SectionChip>
              <p className="font-sans text-[16px] text-bl-600 md:text-[18px] xl:text-[20px]">
                Your generosity helps Stephen&apos;s Table Colorado provide practical support,
                meaningful companionship, and community resources that empower older adults to age
                safely and live with dignity. Every donation, no matter the amount, helps us create
                lasting impact in the lives of seniors and their families.
              </p>
            </div>

            {/* 799:5805 — 1076 × 517, 1px #3e4f69 stroke on a 16px radius.
                The stroke is drawn *inside* the frame in Figma, so the 517
                covers it: 1 + 67 header + 7 × 64 rows + 1 = 517. Each row
                carries the rule as its own `border-t`, which reproduces
                799:5794–5800 at 68/132/196/260/324/388/452, and the first
                column's `border-r` is the full-height divider (799:5791) at
                x=329.

                Deliberate override of the frame: 799:5767–5773 hug the left
                edge rather than being padded symmetrically — the amount sits
                44 from the card's left edge (43 inside the stroke) and the
                impact copy 87 past the divider — but from `md` up both columns
                are centred instead, so the body rows line up under the two
                centred header labels. Base keeps the left hug; the 803:6011
                mobile section has no Donate frame to check against. */}
            <div className="w-full max-w-[1076px] overflow-hidden rounded-card border border-bl-600">
              <table className="w-full table-fixed border-separate border-spacing-0 text-left">
                <colgroup>
                  <col className="w-[30.54%]" />
                  <col />
                </colgroup>
                <thead>
                  <tr>
                    <th className="h-[52px] border-r border-bl-600 bg-[#e8eaef] text-center font-sans text-[16px] font-semibold capitalize text-bl-600 md:h-[60px] md:text-[20px] xl:h-[67px] xl:text-[24px]">
                      Donation Amount
                    </th>
                    <th className="h-[52px] bg-[#e8eaef] text-center font-sans text-[16px] font-semibold capitalize text-bl-600 md:h-[60px] md:text-[20px] xl:h-[67px] xl:text-[24px]">
                      Impact
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {TIERS.map((tier) => (
                    <tr key={tier.amount}>
                      <td className="h-[52px] border-r border-t border-bl-600 pl-[16px] font-sans text-[14px] font-medium capitalize text-bl-600 md:h-[58px] md:px-[16px] md:text-center md:text-[16px] xl:h-[64px] xl:text-[20px]">
                        {tier.amount}
                      </td>
                      <td className="h-[52px] border-t border-bl-600 px-[16px] font-sans text-[12px] font-medium capitalize text-bl-600 md:h-[58px] md:px-[24px] md:text-center md:text-[14px] xl:h-[64px] xl:px-[40px] xl:text-[16px]">
                        {tier.impact}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 799:5807 — 199 × 42, centred on the 1440 frame */}
          <Button variant="fill-soft">DONATE NOW</Button>
        </div>
      </section>

      <FaqSection compactType />
    </div>
  );
}

export default Donation;
