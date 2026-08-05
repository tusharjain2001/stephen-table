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
 * (Batch 1 Task 2). `830:15` re-drew the desktop bar again: the mark is now
 * the crest **plus** the "STEPHEN’S / TABLE" wordmark as one 152.946 × 49.153
 * lockup (was the 85 × 58.128 crest alone), the gutters go back to a plain
 * 72/72, and the link row is a centred `flex-1` rather than the pair of
 * literal 208/155 margins the narrower mark needed. Type is unchanged
 * throughout — DM Sans Medium 20 links on a 41 gap, and the same 180 × 37
 * `donate-nav` pill. See the notes inline.
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
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-[16px] md:px-10 lg:px-12 xl:px-[72px]">
        {/* 830:15 puts the bar back on the ordinary 72px gutter (830:16 is
            1296 wide at x=72) — the 81/66 pair the previous frame needed is
            gone, so this is `xl:px-[72px]` like every other section.
            830:2035 is the crest + wordmark lockup, 152.946 × 49.153: the
            71.876-wide crest, a 7.07 gap, then "STEPHEN’S / TABLE" set in
            Cormorant Garamond Bold 14.563/14.871. All of that is baked into
            `newlogonavbar.svg`, so it ships as one image rather than a crest
            plus live text — the wordmark is a vectorised export, not a font
            the project loads.
            Rendered at the SVG's own 153 × 50 rather than the frame's
            152.946 × 49.153: Figma rounds the export box up but leaves the
            artwork in place (ink sits at 7.41…151.19 × 3.39…46.53 in both),
            so the extra 0.05/0.85 is empty padding and the ink lands where
            the frame puts it. This is the same treatment the old 85 × 58.128
            crest and the 125 × 86 footer mark already get; scaling back down
            to 49.153 would squash it instead.
            Both axes are pinned only at `xl`. Below that `w-auto` keeps the
            lockup's 3.06:1 aspect — pinning `w` against a `h` it no longer
            matches is what flattened the crest into an oval when the asset
            was swapped from the 85 × 59 mark to this one. */}
        <Link
          to="/"
          className="shrink-0"
          onClick={() => setOpen(false)}
        >
          <img
            src={logoCrest}
            alt="Stephen's Table"
            className="h-[40px] w-auto md:h-[44px] xl:h-[50px] xl:w-[153px]"
          />
        </Link>

        {/* Desktop nav (≥1024). 830:89 is `flex-[1_0_0] justify-center`: the
            link row takes whatever the lockup and the button leave and
            centres its content inside it, so the two slacks come out equal
            rather than being authored. At 1440 that is
            1296 − 152.946 − 180 = 963.054 for the row, and centring its
            665-wide content in it puts "About us" at
            72 + 152.946 + 149.027 = 373.97 — the frame's x to the pixel.
            This replaces the `2xl:ml-[208px]` / `2xl:ml-[155px]` pair the
            old 85px mark needed. Those were literal frame coordinates that
            only added up at exactly 1440 and had to be held at `2xl`;
            `flex-1` reproduces them there and keeps the row centred as the
            bar narrows, so it needs no breakpoint of its own.
            `min-w-0` because a flex item defaults to `min-width: auto` — with
            `whitespace-nowrap` labels the row would refuse to shrink and push
            the button off the gutter instead of overflowing visibly.
            `whitespace-nowrap` stops a squeezed row from breaking a label in
            half ("About / Us") before the hamburger tier takes over. */}
        <div className="hidden items-center gap-5 lg:flex lg:min-w-0 lg:flex-1 lg:justify-center xl:gap-[41px]">
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

        {/* 830:95 is the 180 × 37 pill on the right gutter, ending at
            1368 = 1440 − 72. It needs no margin of its own now that the link
            row above is `flex-1` — that absorbs the slack and leaves the
            button hugging the gutter at every width. `shrink-0` keeps it at
            its designed 180 rather than letting the row squeeze it. */}
        <div className="hidden shrink-0 lg:block">
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
