import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Button from './Button.jsx';
import iconMenu from '../assets/icons/icon-menu.svg';
import logoCrest from '../assets/images/newlogonavbar.svg';

const NAV_LINKS = [
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Get Involved', to: '/get-involved' },
  { label: 'Impact Stories', to: '/impact-stories' },
  { label: 'Contact', to: '/contact' },
];

/**
 * Site navbar. Figma defines the ≥1280 desktop layout (Implementation Plan
 * §3.1 "Navbar") and, as of the mobile pass, the 402px mobile dropdown menu
 * (Batch 1 Task 2). `799:2935` re-drew the desktop bar: the background moved
 * wb-200 → cream (#fffcf7) and the text wordmark became the crest mark
 * (`logo-crest.png`, 85 × 58.128). The link row and the Donate pill are
 * unchanged in type — only their x positions moved, see the notes inline.
 * The breakpoint pass (§5, Task 14) adds:
 * - `lg` (1024–1279): full link row kept, gap 41→24. The redesigned frame
 *   (342:773) sets logo and links to 20px at 1440 too, so the type no longer
 *   steps up at `xl` — only the gap does.
 * - `md` (768–1023, tablet): no Figma frame exists for this width, so it
 *   keeps the pre-mobile-pass hamburger + full-width slide-down menu
 *   (logo + hamburger, links DM Sans Medium 20
 *   #38291f, Donate button included) — untouched by the mobile pass.
 * - base (<768, true mobile): the Figma dropdown card — small absolute
 *   panel hanging flush off the bar's bottom edge, right-aligned with the
 *   hamburger, DM Sans Medium 24 links with an active-route highlight,
 *   Donate button below.
 */
function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-cream">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-[16px] md:px-10 lg:px-12 xl:pl-[81px] xl:pr-[80px] 2xl:pr-[66px]">
        {/* 799:2937 replaces the old text wordmark with the crest mark, an
            85 × 58.128 box sitting on the 81px left gutter. It is taller than
            the bar's own 15px padding allows (58.128 in a 42 content box), so
            the bar centres it on the full 72 instead — which is exactly what
            the frame does: y=6.936, i.e. 6.94 clear top and bottom.
            The mark is 85 wide against the old wordmark's 150, so nothing
            below 1440 is tighter than before.
            Rendered at the SVG's own 85 × 59 rather than the frame's 58.128:
            the export rounds the box up, but the artwork inside still sits at
            y 4.0–55.1, so the extra 0.87 is empty padding at the bottom and
            the ink lands where Figma puts it. Scaling to 58.128 would squash
            it 1.5% instead. */}
        <Link
          to="/"
          className="shrink-0"
          onClick={() => setOpen(false)}
        >
          <img
            src={logoCrest}
            alt="Stephen's Table"
            className="h-[44px] w-auto md:h-[52px] xl:h-[59px] xl:w-[85px]"
          />
        </Link>

        {/* Desktop nav (≥1024). 799:2936 sets a literal 208px gap between the
            mark and the link row, putting "About us" at x=374; the remaining
            slack then falls between "Contact" and Donate, so the links sit
            near the centre of the bar and the button alone is pinned to the
            right gutter — they are not one right-hugging group.
            The 208 is `2xl:` because it does not fit below the design width:
            at 1280 the bar has 1119 to spend against 208 + 665 + 155 + 180 +
            85 = 1293. Between 1024 and 1439 the `ml-auto` pair splits the
            slack instead, which keeps the row centred as it narrows.
            `whitespace-nowrap` stops a squeezed row from breaking a label in
            half ("About / Us") before the hamburger tier takes over. */}
        <div className="hidden items-center gap-5 lg:ml-auto lg:flex xl:gap-[41px] 2xl:ml-[208px]">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `whitespace-nowrap font-sans text-[20px] font-medium capitalize text-espresso transition-colors ${
                  isActive ? 'underline underline-offset-8' : ''
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* 799:3008 is a 1000px frame holding a 779-wide link row (the labels
            themselves only measure 665) + a 41 gap + the 180 button, so the
            gap that actually renders between "Contact" and Donate is 155.
            Fixed at 2xl so the whole bar lands on its frame coordinates
            (85 + 208 + 665 + 155 + 180 = 1293 inside 81/66 gutters); below
            that the `ml-auto` shares the slack with the link row. */}
        <div className="ml-auto hidden lg:block 2xl:ml-[155px]">
          <Button as={Link} to="/donation" variant="donate-nav">
            Donate Now
          </Button>
        </div>

        {/* Mobile hamburger (<768, true mobile) — Figma icon glyph */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-dropdown"
          onClick={() => setOpen((prev) => !prev)}
          className="flex size-[30px] items-center justify-center md:hidden"
        >
          <img src={iconMenu} alt="" className="size-[30px]" aria-hidden="true" />
        </button>

        {/* Tablet hamburger (768–1023) — pre-mobile-pass hand-drawn icon,
            kept byte-identical; only the visibility classes moved from
            `lg:hidden` (base+md) to `hidden md:flex lg:hidden` (md only) so
            base can render the new Figma button above instead. */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((prev) => !prev)}
          className="hidden size-[32px] flex-col items-center justify-center gap-[6px] md:flex lg:hidden"
        >
          <span
            className={`block h-[2px] w-[26px] bg-espresso transition-transform ${
              open ? 'translate-y-[8px] rotate-45' : ''
            }`}
          />
          <span
            className={`block h-[2px] w-[26px] bg-espresso transition-opacity ${
              open ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-[2px] w-[26px] bg-espresso transition-transform ${
              open ? '-translate-y-[8px] -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {/* Tablet slide-down menu (768–1023) — pre-mobile-pass markup, kept
          byte-identical; only gated to `md` (was base+md, now md only) so
          base can render the new Figma dropdown card instead. */}
      <div
        id="mobile-menu"
        className={`hidden w-full overflow-hidden bg-cream transition-[grid-template-rows] duration-300 md:grid lg:hidden ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="min-h-0">
          <div className="flex flex-col gap-[24px] px-6 py-8 md:px-10">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `font-sans text-[20px] font-medium capitalize text-espresso ${
                    isActive ? 'underline underline-offset-4' : ''
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Button
              as={Link}
              to="/donation"
              variant="donate-nav"
              onClick={() => setOpen(false)}
              className="w-fit"
            >
              Donate Now
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown (<768, true mobile) — Figma "Dropdown" card.
          `top-full` (not a hardcoded 76px) hangs it off the bar's own bottom
          edge so no strip of hero photo shows between the two and the panel
          reads as part of the navbar; its right edge lines up with the
          hamburger's because both use the bar's 16px gutter. Only the bottom
          corners are rounded — the top ones meet the bar.
          Click-outside overlay is fully transparent and only mounted for
          this breakpoint; the tablet slide-down above has no equivalent
          (pre-existing behavior, left untouched). */}
      <div
        className={`fixed inset-0 z-40 md:hidden ${open ? '' : 'pointer-events-none invisible'}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div
        id="mobile-dropdown"
        className={`absolute right-[16px] top-full z-50 w-[261px] origin-top-right rounded-b-[8px] bg-cream px-[16px] py-[24px] transition-all duration-200 ease-out md:hidden ${
          open ? 'visible scale-100 opacity-100' : 'invisible scale-95 opacity-0'
        }`}
      >
        <div className="flex w-full flex-col gap-[16px]">
          <div className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `whitespace-nowrap rounded-[8px] px-[32px] py-[8px] font-sans text-[24px] font-medium capitalize text-[#38291f] ${
                    isActive ? 'bg-s-200' : ''
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          <Button
            as={Link}
            to="/donation"
            variant="donate-nav"
            onClick={() => setOpen(false)}
            className="w-full justify-center"
          >
            Donate Now
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
