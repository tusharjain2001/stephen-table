import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Button from './Button.jsx';
import iconMenu from '../assets/icons/icon-menu.svg';

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
 * (Batch 1 Task 2). The breakpoint pass (§5, Task 14) adds:
 * - `lg` (1024–1279): full link row kept, gap 41→24, font 24→20.
 * - `md` (768–1023, tablet): no Figma frame exists for this width, so it
 *   keeps the pre-mobile-pass hamburger + full-width slide-down menu
 *   verbatim (logo + hamburger, bg wb-200, links DM Sans Medium 20
 *   #38291f, Donate button included) — untouched by the mobile pass.
 * - base (<768, true mobile): the Figma dropdown card — small absolute
 *   panel hanging flush off the bar's bottom edge, right-aligned with the
 *   hamburger, DM Sans Medium 24 links with an active-route highlight,
 *   Donate button below.
 */
function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-wb-200">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-[16px] py-[10px] md:px-10 md:py-[15px] lg:px-12 xl:pl-[81px] xl:pr-[80px]">
        <Link
          to="/"
          className="shrink-0 font-sans text-[20px] font-medium capitalize text-espresso xl:text-[24px]"
          onClick={() => setOpen(false)}
        >
          Stephen&apos;s Table
        </Link>

        {/* Desktop nav (≥1024) */}
        <div className="hidden items-center gap-6 lg:flex xl:gap-[41px]">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-sans text-[20px] font-medium capitalize text-espresso transition-colors xl:text-[24px] ${
                  isActive ? 'underline underline-offset-8' : ''
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <Button as={Link} to="/get-involved" variant="donate-nav">
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
        className={`hidden w-full overflow-hidden bg-wb-200 transition-[grid-template-rows] duration-300 md:grid lg:hidden ${
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
              to="/get-involved"
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
            to="/get-involved"
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
