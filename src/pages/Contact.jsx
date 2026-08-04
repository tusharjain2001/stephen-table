import { useState } from 'react';
import PageHero from '../components/PageHero.jsx';
import FormField from '../components/FormField.jsx';
import Button from '../components/Button.jsx';

import heroContact from '../assets/images/hero-contact.png';
import heroContactMobile from '../assets/mobile/mobile-contact-hero.png';
import iconChevronDown from '../assets/icons/icon-chevron-down.svg';

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  reason: '',
  message: '',
  agree: false,
};

function FieldRow({ children }) {
  return <div className="flex flex-col gap-4 md:flex-row md:gap-[29px]">{children}</div>;
}

function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  function updateField(event) {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    // No backend wired up yet — stub submit handler; real submissions go to
    // info@stephenstablecolorado.org for review and follow-up.
    console.log('Contact message submitted', form);
    setSubmitted(true);
  }

  // 790:1488 repaints the form band BL/200 → BL/400 (#8099b3), a value that
  // sits between the existing bl-300 and bl-500. Only Contact used bl-200, so
  // the old token is now unreferenced but left in the palette.
  return (
    <div className="bg-bl-400">
      <PageHero
        image={heroContact}
        // Base (<768) gets its own 402×745 portrait export, matching the
        // default `mobileHeight` exactly. Raw photo, not a flattened one (luma
        // runs 63/118/89 top/mid/bottom — no baked scrim), so `mobileOverlay`
        // stays on its gradient default. `image` becomes md-and-up only once
        // this is set, so the desktop hero is untouched.
        mobileImage={heroContactMobile}
        height={548}
        // The scrim is no longer warm. 790:1490 draws it in `bl-900` #18212d
        // rather than espresso, and takes the dark end 0.84 → 0.92. It is
        // still one of this file's mirrored rects (x = width), so the
        // 0.2→0.92 it reports reads 0.92→0.2 across the band.
        overlayGradient="linear-gradient(to right, rgba(24,33,45,0.92) 0%, rgba(24,33,45,0.2) 100%)"
        mobileTextTop={587}
        // 377:3036 sits at x=76 y=500 w=789 h=54 inside the 72..620 band, so
        // the title box ends 66px above the bottom edge (was 65 at h=72).
        textLeft={76}
        textWidth={789}
        textBottom={66}
        // 377:3037 is the one H1 the redraw did *not* take to 36 — it is 42 /
        // 2.1 tracking on a 54px box. Playfair's `normal` at 42 is 55.9, and
        // the block is anchored from the bottom, so the box is pinned.
        title="Contact Us"
        titleSize={42}
        titleTracking={2.1}
        titleSizeMd={42}
        titleTrackingMd={2.1}
        titleLeading={54}
      />

      <section id="contact-form" className="w-full scroll-mt-[96px] py-12 xl:py-[79px]">
        <div className="mx-auto flex max-w-[1440px] justify-center px-6 md:px-10 xl:px-[72px]">
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-[1273px] flex-col gap-[42px] rounded-card bg-white px-6 pb-8 pt-8 sm:px-10 xl:px-[55px] xl:pb-[51px] xl:pt-[52px] 2xl:max-w-[1076px] 2xl:px-[46.489px]"
          >
            {/* 381:5531 is 849 tall; its content frame (381:5532) is 746 and
                sits at 52 from the top, so the bottom pad is 51, not 47.
                The redraw narrows the card 1273 → 1076 (centred, so x=182)
                and its side padding 55 → 46.489, leaving a 983.023 content
                measure. Held to `2xl`: below 1440 the card just fills the
                container, and nothing inside it re-wraps at either width, so
                the card stays 849 and the section 1007. */}
            {/* 381:5533 h=36 */}
            <h2 className="capitalize font-sans text-[24px] font-medium text-bl-600 xl:text-[28px] xl:leading-[36px]">
              Get in Touch with us
            </h2>

            <div className="flex flex-col gap-[38px]">
              <div className="flex flex-col gap-[6px]">
                <div className="flex flex-col gap-[24px]">
                  <FieldRow>
                    <FormField
                      className="w-full md:flex-1 2xl:w-[477.011px] 2xl:flex-none"
                      label="First Name"
                      required
                      name="firstName"
                      value={form.firstName}
                      onChange={updateField}
                    />
                    <FormField
                      className="w-full md:flex-1 2xl:w-[477.011px] 2xl:flex-none"
                      label="Last Name"
                      required
                      name="lastName"
                      value={form.lastName}
                      onChange={updateField}
                    />
                  </FieldRow>
                  <FormField
                    label="Email ID"
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={updateField}
                  />
                  <FormField
                    as="select"
                    label="Reason for Contact"
                    required
                    name="reason"
                    value={form.reason}
                    onChange={updateField}
                  >
                    <option value="" disabled>
                      Select a reason
                    </option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Request Support">Request Support</option>
                    <option value="Volunteering">Volunteering</option>
                    <option value="Donations">Donations</option>
                    <option value="Nominate a Senior">Nominate a Senior</option>
                    <option value="Media/Press">Media / Press</option>
                    <option value="Other">Other</option>
                  </FormField>

                  {/* Not FormField: 381:5553 carries a chevron over the
                      textarea as well as over the select. It is almost
                      certainly a copy-paste of 381:5552 in the design file,
                      but it is in the frame, so it is drawn here. */}
                  <label className="flex flex-col gap-[2px]">
                    <span className="font-form text-[20px] leading-[24px] text-gray-94">
                      Write a Message <span className="text-error">*</span>
                    </span>
                    <div className="relative">
                      <textarea
                        // `block` matters: a textarea is inline-block by
                        // default, so its wrapper picked up 5px of descender
                        // space under the box and the field measured 166
                        // instead of the 161 in 381:5553.
                        className="block h-[135px] w-full resize-none rounded-none border border-gray-d9 bg-field px-[16px] py-[16px] font-form text-[16px] text-espresso outline-none"
                        name="message"
                        value={form.message}
                        onChange={updateField}
                      />
                      {/* 381:5556 sits at x=1097 y=51.5 in the 1163-wide field
                          frame; the field frame starts 26px above the box. */}
                      <img
                        src={iconChevronDown}
                        alt=""
                        aria-hidden="true"
                        className="pointer-events-none absolute right-[48px] top-[25.5px] h-[9px] w-[18px]"
                      />
                    </div>
                  </label>
                </div>

                {/* 381:5557 h=21 */}
                <p className="font-sans text-[17px] leading-[21px] text-error">
                  Fields marked * are mandatory
                </p>
              </div>

              {/* 381:5558 is 723.145 x 24 */}
              <label className="flex w-full max-w-[723.145px] items-center gap-[14px]">
                <input
                  type="checkbox"
                  name="agree"
                  checked={form.agree}
                  onChange={updateField}
                  className="size-[23px] shrink-0 appearance-none rounded-none border border-gray-c7 bg-field checked:bg-bl-600"
                />
                <span className="flex-1 font-form text-[20px] leading-[24px] text-gray-94">
                  I agree to be contacted regarding my inquiry.
                </span>
              </label>
            </div>

            <div className="flex justify-end">
              <Button type="submit" variant="submit">
                SEND MESSAGE
              </Button>
            </div>

            {submitted && (
              <p className="font-sans text-[16px] text-s-800">
                Thank you — your message has been sent to our team and we&apos;ll be in touch
                soon.
              </p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}

export default Contact;
