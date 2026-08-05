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

// 830:11072 keeps the two name fields **side by side** at 402 — each a
// 158.16 half on a 19.68 gutter — where this used to stack them below md.
function FieldRow({ children }) {
  return <div className="flex gap-[19.68px] md:gap-[29px]">{children}</div>;
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
  // sits between the existing bl-300 and bl-500 — but only on desktop.
  // 830:11064 keeps the *mobile* band on bl-200 #cbd7e4, so the two frames
  // genuinely disagree and bl-200 is referenced again rather than dead.
  // The hero above is opaque, so this colour only ever shows behind the form.
  return (
    <div className="bg-bl-200 sm:bg-bl-400">
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
        // 830:11063 is still a bare title (no subtitle) on the 34px gutter
        // this page uses rather than the shared 29, but the redraw moved it
        // down: 334 × 43 at y=500 in the 610 band, i.e. 67 clear of the bottom
        // edge where 803:7791 sat at 431. One line at any phone width — "Contact
        // Us" needs a 200px measure — so no fluid gutter is required here.
        mobileTextTop={500}
        mobileTextInset={34}
        mobileTitleTracking={0}
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

      {/* 830:11064 draws the mobile band 402 × 645.418: `px-16 py-60` around a
          368-wide card that pads 16 all round and stacks on a 28.502 gap.
          Every value below is base-only; `md:` hands each one back to the
          desktop number, which is unchanged. */}
      {/* The restore tier here is `sm:` (640), not `md:` — the card already
          carried an `sm:px-10` that a `md:` override would lose to below 768.
          640 is clear of every phone, so the base values are the mobile frame's
          and everything from `sm` up is byte-identical to what shipped. */}
      <section id="contact-form" className="w-full scroll-mt-[96px] py-[60px] sm:py-12 xl:py-[79px]">
        <div className="mx-auto flex max-w-[1440px] justify-center px-[16px] sm:px-6 md:px-10 xl:px-[72px]">
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-[1273px] flex-col gap-[28.502px] rounded-[8px] bg-white p-[16px] sm:gap-[42px] sm:rounded-card sm:px-10 sm:py-8 xl:px-[55px] xl:pb-[51px] xl:pt-[52px] 2xl:max-w-[1076px] 2xl:px-[46.489px]"
          >
            {/* 381:5531 is 849 tall; its content frame (381:5532) is 746 and
                sits at 52 from the top, so the bottom pad is 51, not 47.
                The redraw narrows the card 1273 → 1076 (centred, so x=182)
                and its side padding 55 → 46.489, leaving a 983.023 content
                measure. Held to `2xl`: below 1440 the card just fills the
                container, and nothing inside it re-wraps at either width, so
                the card stays 849 and the section 1007. */}
            {/* 381:5533 h=36 */}
            {/* 830:11067 draws the mobile heading at 20 on its own 26 box. */}
            <h2 className="capitalize font-sans text-[20px] font-medium text-bl-600 sm:text-[24px] xl:text-[28px] xl:leading-[36px]">
              Get in Touch with us
            </h2>

            {/* 830:11069 spaces the field stack from the consent row by 25.788
                and 830:11071 spaces the fields themselves by 16.287. */}
            <div className="flex flex-col gap-[25.788px] sm:gap-[38px]">
              <div className="flex flex-col gap-[6px]">
                <div className="flex flex-col gap-[16.287px] sm:gap-[24px]">
                  <FieldRow>
                    <FormField
                      className="min-w-0 flex-1 2xl:w-[477.011px] 2xl:flex-none"
                      fieldHeightBase={40.717}
                      label="First Name"
                      required
                      name="firstName"
                      value={form.firstName}
                      onChange={updateField}
                    />
                    <FormField
                      className="min-w-0 flex-1 2xl:w-[477.011px] 2xl:flex-none"
                      fieldHeightBase={40.717}
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
                    fieldHeightBase={40.717}
                    name="email"
                    value={form.email}
                    onChange={updateField}
                  />
                  <FormField
                    as="select"
                    label="Reason for Contact"
                    required
                    fieldHeightBase={40.717}
                    hideChevronBase
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
                  <label className="flex flex-col gap-[1.357px] sm:gap-[2px]">
                    {/* 830:11087 sets the mobile label to 14, matching what
                        FormField already does at base for the others. */}
                    <span className="font-form text-[14px] text-gray-94 sm:text-[20px] sm:leading-[24px]">
                      Write a Message <span className="text-error">*</span>
                    </span>
                    <div className="relative">
                      <textarea
                        // `block` matters: a textarea is inline-block by
                        // default, so its wrapper picked up 5px of descender
                        // space under the box and the field measured 166
                        // instead of the 161 in 381:5553.
                        // 830:11088 is 91.614 tall at base — the same step
                        // FormField's own textarea already takes.
                        className="block h-[91.614px] w-full resize-none rounded-none border border-gray-d9 bg-field px-[16px] py-[16px] font-form text-[14px] text-espresso outline-none sm:h-[135px] sm:text-[16px]"
                        name="message"
                        value={form.message}
                        onChange={updateField}
                      />
                      {/* 381:5556 sits at x=1097 y=51.5 in the 1163-wide field
                          frame; the field frame starts 26px above the box.
                          Hidden below `sm`: 830:11089 keeps this stray chevron
                          at x=744 in a 336-wide field, i.e. off the canvas, so
                          the mobile frame does not show one over the message
                          box at all. Desktop still draws it. */}
                      <img
                        src={iconChevronDown}
                        alt=""
                        aria-hidden="true"
                        className="pointer-events-none absolute right-[48px] top-[25.5px] hidden h-[9px] w-[18px] sm:block"
                      />
                    </div>
                  </label>
                </div>

                {/* 381:5557 h=21. Hidden at base: 830:11069 runs the field
                    stack straight into the consent row on a 25.788 gap with no
                    note between them, and there is no void left for it the way
                    Nominate's frame leaves one. The red asterisks still mark
                    every required field, and desktop is unchanged. */}
                <p className="hidden font-sans text-[17px] leading-[21px] text-error sm:block">
                  Fields marked * are mandatory
                </p>
              </div>

              {/* 381:5558 is 723.145 x 24; 830:11090 draws the mobile row as a
                  15.608 box on a 9.501 gap with 14px copy. */}
              <label className="flex w-full max-w-[723.145px] items-center gap-[9.501px] sm:gap-[14px]">
                <input
                  type="checkbox"
                  name="agree"
                  checked={form.agree}
                  onChange={updateField}
                  className="size-[15.608px] shrink-0 appearance-none rounded-none border-[0.679px] border-gray-c7 bg-field checked:bg-bl-600 sm:size-[23px] sm:border"
                />
                <span className="flex-1 font-form text-[14px] text-gray-94 sm:text-[20px] sm:leading-[24px]">
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
