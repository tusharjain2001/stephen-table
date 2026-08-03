import { useState } from 'react';
import PageHero from '../components/PageHero.jsx';
import SectionChip from '../components/SectionChip.jsx';
import StepCard from '../components/StepCard.jsx';
import EligibilityBand from '../components/EligibilityBand.jsx';
import FormField from '../components/FormField.jsx';
import Button from '../components/Button.jsx';
import FaqSection from '../components/FaqSection.jsx';

import heroNominate from '../assets/images/hero-nominate.png';
import heroNominateMobile from '../assets/mobile/mobile-nominate-hero.png';
import iconStepReview from '../assets/icons/icon-step-review.svg';
import iconStepChat from '../assets/icons/icon-step-chat.svg';
import iconStepSpeak from '../assets/icons/icon-step-speak.svg';
import iconStepSupport from '../assets/icons/icon-step-support.svg';

const STEPS = [
  {
    icon: iconStepReview,
    title: 'Step 1: Submit a Request',
    body: 'Complete the Get Help form with your details and the type of support you need.',
  },
  {
    icon: iconStepChat,
    title: "Step 2: We'll Review Your Request",
    body: 'Our team reviews your information to understand your needs and determine the best support available.',
  },
  {
    icon: iconStepSpeak,
    title: 'Step 3: We Get in Touch',
    body: 'A team member will contact you to discuss your situation, answer questions, and confirm the next steps.',
  },
  {
    icon: iconStepSupport,
    title: 'Step 4: Receive Personalized Support',
    body: "Based on your needs, we'll connect you with practical home support, fellowship opportunities, or community resources.",
  },
];

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  need: '',
  relationship: '',
  seniorName: '',
  age: '',
  phone: '',
  seniorEmail: '',
  address: '',
  city: '',
  zip: '',
};

// 381:5711 — the redraw takes every field label to 16 on a 19px box, which
// is what makes each field frame 19 + 2 + 60 = 81 rather than 86.
const LABEL = { labelSize: 16, labelLeading: 19 };

function FieldRow({ children }) {
  return <div className="flex flex-col gap-4 md:flex-row md:gap-[29px]">{children}</div>;
}

function Nominate() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    // No backend wired up yet — stub submit handler.
    console.log('Nomination submitted', form);
    setSubmitted(true);
  }

  return (
    <div>
      <PageHero
        image={heroNominate}
        // Base (<768) gets its own 402×744 portrait export — 1px under the
        // default `mobileHeight`, which `object-cover` absorbs. Raw photo, not
        // a flattened one (luma runs 68/73/110 top/mid/bottom, brightest at the
        // bottom), so `mobileOverlay` stays on its gradient default. `image`
        // becomes md-and-up only once this is set, so desktop is untouched.
        mobileImage={heroNominateMobile}
        height={548}
        // 367:770 is now 313..427 in the 548 hero, i.e. 121 clear of the
        // bottom, not 85: the redraw took the H1 to 36/1.8 on a 46 line box
        // and the subtitle to 20, which wraps to 2 lines on the 798 measure
        // where 24px took 3. 46 + 16 + 52 = its 114 height.
        textLeft={82}
        textWidth={798}
        textBottom={121}
        titleSize={36}
        titleTracking={1.8}
        titleSizeMd={36}
        titleTrackingMd={1.8}
        titleLeading={46}
        title="Nominate a Senior"
        // Unlike About's 342:817 and Services' 484:3771, this layer carries no
        // capitalize at any tier — the frame reads "Nominate a Senior".
        titleCapitalizeBase={false}
        titleCapitalize={false}
        // subtitleClassName intentionally omitted — see About.jsx: the old
        // unprefixed "text-[24px]" never won at md/xl anyway (18px/20px),
        // so dropping it keeps ≥768 byte-identical and lands the mobile
        // default (16px) for the Figma mobile frame.
        subtitle="Explore the practical support, companionship, and community resources we provide to help seniors live safely and independently."
      />

      {/* 378:3220 runs the intro at 20 like Services, but 378:3222 also
          drops the bullets to 20 — Services keeps those at 24. */}
      <EligibilityBand introSize={20} bulletSize={20} />

      {/* How it works */}
      <section className="w-full py-14 xl:py-[102px]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-8 xl:gap-[53px]">
          {/* 367:774 is an explicit h-62 box; the chip is 47 and the 20px lede
                52, so letting it hug would cost the section 10px. */}
          <div className="flex w-full flex-col items-center gap-6 px-6 text-center md:px-10 lg:flex-row lg:justify-center lg:gap-10 lg:text-left xl:h-[62px] xl:gap-16 2xl:gap-[226px] xl:px-[72px]">
            <SectionChip className="shrink-0">how it works</SectionChip>
            <p className="font-sans text-[18px] text-gray-59 md:text-[20px] min-w-0 max-w-full lg:max-w-[857px] lg:shrink lg:grow-0 2xl:w-[857px]">
              Supporting seniors and their families with practical care, community connections, and
              compassionate assistance.
            </p>
          </div>
          <div className="grid w-full grid-cols-1 gap-4 px-6 sm:grid-cols-2 md:px-10 lg:grid-cols-4 xl:px-[72px] 2xl:flex 2xl:w-auto 2xl:gap-[24px]">
            {STEPS.map((s) => (
              <StepCard key={s.title} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* Nomination form */}
      <section className="w-full bg-bl-300 py-12 xl:py-[69px]">
        {/* 381:5698 puts the narrowed card at x=181 in the 1440 frame, which
            is 2px left of centre (1440 − 1074 = 366 → 183). Small, but it is
            an explicit frame coordinate and matching it halves the card's
            pixel diff against the render (2.46 → 1.17 MAD), so the column is
            anchored rather than centred at 2xl. */}
        <div className="mx-auto flex max-w-[1440px] justify-center px-6 md:px-10 xl:px-0 2xl:justify-start 2xl:pl-[181px]">
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-[1273px] flex-col gap-[36px] rounded-card bg-white px-6 pb-8 pt-8 sm:px-10 xl:gap-[68px] xl:px-[55px] xl:pb-[47px] xl:pt-[48px] 2xl:max-w-[1074px] 2xl:px-[46.402px]"
          >
            {/* Figma 381:5701 nests the gaps rather than spacing everything
                evenly: 11 inside the header, 51 below it, 36 under "Your
                Information", 24 between rows, 11 before the mandatory note,
                then 68 down to the step button. The frame leaves a bare 100px
                void there and drops the note entirely — see the note below,
                which is kept inside that void so the card still lands on
                849 (48 + 640 + 68 + 46 + 47). */}
            <div className="flex flex-col gap-[36px] xl:gap-[51px]">
            <div className="flex flex-col gap-[11px]">
              {/* Figma 381:5703 h=31 — DM Sans Medium 24 */}
              <h2 className="capitalize font-sans text-[24px] font-medium text-bl-600">
                fill the form to nominate a senior
              </h2>
              {/* 381:5704 still carries the old 1009 measure inside a frame
                  the redraw narrowed to 981.196 — a stale hug, and 1009 now
                  overflows the card. It wraps to the frame's two lines at
                  either width, so the narrowed card just takes the full
                  content measure. */}
              <p className="font-sans text-[18px] text-gray-9c xl:w-[1009px] xl:text-[20px] 2xl:w-full">
                if you are aware of any senior around you, who might benefit from our service, you can
                fill the form below to nominate them and our team will get in touch with them
              </p>
            </div>

            <div className="flex flex-col gap-[24px] xl:gap-[36px]">
              <h3 className="font-sans text-[24px] font-medium text-bl-800">
                {step === 1 ? 'Your Information' : "Senior's Information"}
              </h3>
              <div className="flex flex-col gap-[24px] xl:gap-[11px]">
            {step === 1 ? (
              <div className="flex flex-col gap-[24px]">
                <FieldRow>
                  <FormField
                    {...LABEL}
                    className="w-full md:flex-1 2xl:w-[476.098px] 2xl:flex-none"
                    label="First Name"
                    required
                    name="firstName"
                    value={form.firstName}
                    onChange={updateField}
                  />
                  <FormField
                    {...LABEL}
                    className="w-full md:flex-1 2xl:w-[476.098px] 2xl:flex-none"
                    label="Last Name"
                    required
                    name="lastName"
                    value={form.lastName}
                    onChange={updateField}
                  />
                </FieldRow>
                <FormField
                    {...LABEL}
                  label="Email ID"
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={updateField}
                />
                <FormField
                    {...LABEL}
                  label="Tell us about the need"
                  required
                  name="need"
                  value={form.need}
                  onChange={updateField}
                />
                <FormField
                    {...LABEL}
                  as="select"
                  label="Relationship to the Senior"
                  required
                  name="relationship"
                  value={form.relationship}
                  onChange={updateField}
                >
                  <option value="" disabled>
                    Select relationship
                  </option>
                  <option value="Family member">Family member</option>
                  <option value="Friend">Friend</option>
                  <option value="Neighbor">Neighbor</option>
                  <option value="Caregiver">Caregiver</option>
                  <option value="Other">Other</option>
                </FormField>
              </div>
            ) : (
              <div className="flex flex-col gap-[24px]">
                <FieldRow>
                  <FormField
                    {...LABEL}
                    className="w-full md:flex-1 2xl:w-[476.098px] 2xl:flex-none"
                    label="Senior's Full Name"
                    required
                    name="seniorName"
                    value={form.seniorName}
                    onChange={updateField}
                  />
                  <FormField
                    {...LABEL}
                    className="w-full md:flex-1 2xl:w-[476.098px] 2xl:flex-none"
                    label="Enter Age"
                    required
                    type="number"
                    name="age"
                    value={form.age}
                    onChange={updateField}
                  />
                </FieldRow>
                <FieldRow>
                  <FormField
                    {...LABEL}
                    className="w-full md:flex-1 2xl:w-[476.098px] 2xl:flex-none"
                    label="Phone Number"
                    required
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={updateField}
                  />
                  <FormField
                    {...LABEL}
                    className="w-full md:flex-1 2xl:w-[476.098px] 2xl:flex-none"
                    label="Email Address"
                    required
                    type="email"
                    name="seniorEmail"
                    value={form.seniorEmail}
                    onChange={updateField}
                  />
                </FieldRow>
                <FormField
                    {...LABEL}
                  label="Home Address"
                  required
                  name="address"
                  value={form.address}
                  onChange={updateField}
                />
                <FieldRow>
                  <FormField
                    {...LABEL}
                    className="w-full md:flex-1 2xl:w-[476.098px] 2xl:flex-none"
                    label="City"
                    required
                    name="city"
                    value={form.city}
                    onChange={updateField}
                  />
                  <FormField
                    {...LABEL}
                    className="w-full md:flex-1 2xl:w-[476.098px] 2xl:flex-none"
                    label="Zip Code"
                    required
                    name="zip"
                    value={form.zip}
                    onChange={updateField}
                  />
                </FieldRow>
              </div>
            )}

                {/* Figma 381:5723 h=21 */}
                <p className="font-sans text-[17px] leading-[21px] text-error">
                  Fields marked * are mandatory
                </p>
              </div>
            </div>
            </div>

            <div className="flex justify-end">
              {step === 1 ? (
                <button
                  type="submit"
                  // Figma 381:5724 frames this at 134.145 x 46; the stroke is
                  // inside on both axes, so neither the height nor the width
                  // may be built out of padding + border — `px-[32px]` drew it
                  // 144.58. Pinned like `learn-more` and `outline-soft` are.
                  className="flex h-[46px] items-center justify-center rounded-btn border-2 border-[#709585] px-[32px] font-sans text-[20px] font-semibold text-black 2xl:w-[134.145px] 2xl:px-0"
                >
                  Step 1/2
                </button>
              ) : (
                <Button type="submit" variant="submit">
                  SUBMIT
                </Button>
              )}
            </div>

            {submitted && (
              <p className="font-sans text-[16px] text-s-800">
                Thank you — we&apos;ve received the nomination and will be in touch soon.
              </p>
            )}
          </form>
        </div>
      </section>

      <FaqSection compactType />
    </div>
  );
}

export default Nominate;
