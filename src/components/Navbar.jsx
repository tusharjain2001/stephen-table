import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Button from './Button.jsx';

const NAV_LINKS = [
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Get Involved', to: '/get-involved' },
  { label: 'Impact Stories', to: '/impact-stories' },
  { label: 'Contact', to: '/contact' },
];

/**
 * Site navbar. Figma only defines the ≥1280 desktop layout (Implementation
 * Plan §3.1 "Navbar"); the breakpoint pass (§5, Task 14) adds:
 * - `lg` (1024–1279): full link row kept, gap 41→24, font 24→20.
 * - <1024 (`md`/base): no room for the full link row (5 links + Donate
 *   button), so it collapses to logo + hamburger with a slide-down menu
 *   built from the same tokens (bg wb-200, links DM Sans Medium 20
 *   #38291f, Donate button included) — there is no mobile nav in Figma to
 *   match, per plan §5.
 */
function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-50 w-full bg-wb-200">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-6 py-[15px] md:px-10 lg:px-12 xl:pl-[81px] xl:pr-[80px]">
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

        {/* Hamburger (<1024) */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((prev) => !prev)}
          className="flex size-[32px] flex-col items-center justify-center gap-[6px] lg:hidden"
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

      {/* Mobile slide-down menu */}
      <div
        id="mobile-menu"
        className={`grid w-full overflow-hidden bg-wb-200 transition-[grid-template-rows] duration-300 lg:hidden ${
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
    </header>
  );
}

export default Navbar;
