import { Link, NavLink } from 'react-router-dom';
import Button from './Button.jsx';

const NAV_LINKS = [
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Get Involved', to: '/get-involved' },
  { label: 'Impact Stories', to: '/impact-stories' },
  { label: 'Contact', to: '/contact' },
];

function Navbar() {
  return (
    <header className="w-full bg-wb-200">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between pl-[81px] pr-[80px] py-[15px]">
        <Link
          to="/"
          className="font-sans text-[24px] font-medium capitalize text-espresso"
        >
          Stephen&apos;s Table
        </Link>

        <div className="flex items-center gap-[41px]">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-sans text-[24px] font-medium capitalize text-espresso transition-colors ${
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
      </div>
    </header>
  );
}

export default Navbar;
