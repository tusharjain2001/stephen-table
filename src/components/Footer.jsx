import { Link } from 'react-router-dom';
import iconFacebook from '../assets/icons/icon-facebook.svg';
import iconInstagram from '../assets/icons/icon-instagram.svg';
import iconEmail from '../assets/icons/icon-email-footer.svg';
import iconPhoneSmall from '../assets/icons/icon-phone-small.svg';
import iconDot from '../assets/icons/dot.svg';

const LINK_COLUMNS = [
  {
    heading: 'NGO',
    items: [
      { label: 'Home', to: '/' },
      { label: 'About Us', to: '/about' },
      { label: 'Volunteer Opportunities', to: '/get-involved' },
      { label: 'Get Involved', to: '/get-involved' },
      { label: 'Impact Stories', to: '/impact-stories' },
    ],
  },
  {
    heading: 'Our Programs',
    items: [
      { label: 'Practical Home Support', to: '/services' },
      { label: 'Fellowship', to: '/services' },
      { label: 'Community Connections', to: '/services' },
      { label: 'Get Help', to: '/nominate' },
    ],
  },
  {
    heading: 'Take Action',
    items: [
      { label: 'Volunteer', to: '/get-involved' },
      { label: 'Donate', to: '/get-involved' },
      { label: 'Nominate a Senior', to: '/nominate' },
      { label: 'Contact Us', to: '/contact' },
      { label: 'FAQs', to: '/#faq' },
    ],
  },
];

const LEGAL_LINKS = [
  { label: 'Terms of Service', to: '#' },
  { label: 'Privacy Policy', to: '#' },
  { label: 'Accessibility', to: '#' },
];

function Footer() {
  return (
    <footer className="w-full bg-espresso">
      <div className="mx-auto max-w-[1440px] px-6 pt-10 md:px-10 md:pt-14 lg:px-16 xl:px-[128px] xl:pt-[80px]">
        <div className="flex flex-col items-start gap-10 md:gap-12 lg:flex-row lg:gap-0">
          {/* Left column: logo + contact info */}
          <div className="flex w-full flex-col gap-[24px] lg:w-[352px]">
            <span className="font-neulis text-[22px] font-normal text-white">
              Stephen&apos;s Table
            </span>
            <div className="flex flex-col gap-[9px]">
              <a
                href="mailto:info@stephenstablecolorado.org"
                className="flex items-center gap-[12px] font-sans text-[18px] leading-[32px] text-white underline"
              >
                <img src={iconEmail} alt="" className="size-[20px]" aria-hidden="true" />
                info@stephenstablecolorado.org
              </a>
              <a
                href="tel:970-375-9179"
                className="flex items-center gap-[12px] font-sans text-[18px] leading-[32px] text-white"
              >
                <img src={iconPhoneSmall} alt="" className="size-[20px]" aria-hidden="true" />
                970-375-9179
              </a>
            </div>
          </div>

          {/* Links block */}
          <div className="grid w-full grid-cols-1 gap-8 pb-10 sm:grid-cols-3 sm:gap-6 lg:ml-[124px] lg:flex lg:flex-1 lg:gap-[72px] lg:pb-[80px]">
            {LINK_COLUMNS.map((column) => (
              <div key={column.heading} className="flex flex-col gap-[16px]">
                <h3 className="font-sans text-[20px] font-bold text-white">
                  {column.heading}
                </h3>
                <ul className="flex flex-col gap-[8px]">
                  {column.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        to={item.to}
                        className="font-sans text-[18px] leading-[32px] text-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto h-px w-[calc(100%-48px)] max-w-[1365px] bg-white md:w-[calc(100%-80px)] 2xl:w-[1365px]" />

      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-4 p-6 md:flex-row md:p-8 xl:h-[99px] xl:p-[32px]">
        <div className="flex items-center gap-[12px]">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <img src={iconFacebook} alt="Facebook" className="size-[44px]" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <img src={iconInstagram} alt="Instagram" className="size-[44px]" />
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-[24px] gap-y-2">
          {LEGAL_LINKS.map((link) => (
            <span key={link.label} className="flex items-center gap-[24px]">
              <a href={link.to} className="font-sans text-[20px] leading-[20px] text-white">
                {link.label}
              </a>
              <img src={iconDot} alt="" className="size-[4px]" aria-hidden="true" />
            </span>
          ))}
          <span className="text-center font-sans text-[20px] leading-[20px] text-white">
            © 2026 Stephen&apos;s Table Colorado. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
