import { useState } from 'react';
import PageHero from '../components/PageHero.jsx';
import SectionChip from '../components/SectionChip.jsx';
import StepCard from '../components/StepCard.jsx';
import EligibilityBand from '../components/EligibilityBand.jsx';
import FormField from '../components/FormField.jsx';
import Button from '../components/Button.jsx';
import FaqSection from '../components/FaqSection.jsx';

import heroNominate from '../assets/images/hero-nominate.jpg';
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

function FieldRow({ children }) {
  return <div className="flex gap-[29px]">{children}</div>;
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
        height={548}
        textLeft={82}
        textWidth={798}
        textBottom={68}
        title="Nominate a Senior"
        subtitleClassName="text-[24px]"
        subtitle="Explore the practical support, companionship, and community resources we provide to help seniors live safely and independently."
      />

      <EligibilityBand />

      {/* How it works */}
      <section className="w-full py-[102px]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-[53px]">
          <div className="flex items-center justify-center gap-[226px] px-[72px]">
            <SectionChip className="shrink-0 whitespace-nowrap">how it works</SectionChip>
            <p className="w-[857px] shrink-0 font-sans text-[24px] text-gray-59">
              Supporting seniors and their families with practical care, community connections, and
              compassionate assistance.
            </p>
          </div>
          <div className="flex gap-[17px]">
            {STEPS.map((s) => (
              <StepCard key={s.title} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* Nomination form */}
      <section className="w-full bg-bl-300 py-[69px]">
        <div className="mx-auto flex max-w-[1440px] justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex w-[1273px] flex-col gap-[36px] rounded-card bg-white px-[55px] pb-[47px] pt-[48px]"
          >
            <div className="flex flex-col gap-[11px]">
              <h2 className="capitalize font-sans text-[28px] font-medium text-bl-600">
                fill the form to nominate a senior
              </h2>
              <p className="w-[1009px] font-sans text-[20px] text-gray-9c">
                if you are aware of any senior around you, who might benefit from our service, you can
                fill the form below to nominate them and our team will get in touch with them
              </p>
            </div>

            {step === 1 ? (
              <div className="flex flex-col gap-[24px]">
                <h3 className="font-sans text-[24px] font-medium text-bl-800">Your Information</h3>
                <FieldRow>
                  <FormField
                    className="w-[566px]"
                    label="First Name"
                    required
                    name="firstName"
                    value={form.firstName}
                    onChange={updateField}
                  />
                  <FormField
                    className="w-[566px]"
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
                  label="Tell us about the need"
                  required
                  name="need"
                  value={form.need}
                  onChange={updateField}
                />
                <FormField
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
                <h3 className="font-sans text-[24px] font-medium text-bl-800">
                  Senior&apos;s Information
                </h3>
                <FieldRow>
                  <FormField
                    className="w-[566px]"
                    label="Senior's Full Name"
                    required
                    name="seniorName"
                    value={form.seniorName}
                    onChange={updateField}
                  />
                  <FormField
                    className="w-[566px]"
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
                    className="w-[566px]"
                    label="Phone Number"
                    required
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={updateField}
                  />
                  <FormField
                    className="w-[566px]"
                    label="Email Address"
                    required
                    type="email"
                    name="seniorEmail"
                    value={form.seniorEmail}
                    onChange={updateField}
                  />
                </FieldRow>
                <FormField
                  label="Home Address"
                  required
                  name="address"
                  value={form.address}
                  onChange={updateField}
                />
                <FieldRow>
                  <FormField
                    className="w-[566px]"
                    label="City"
                    required
                    name="city"
                    value={form.city}
                    onChange={updateField}
                  />
                  <FormField
                    className="w-[566px]"
                    label="Zip Code"
                    required
                    name="zip"
                    value={form.zip}
                    onChange={updateField}
                  />
                </FieldRow>
              </div>
            )}

            <p className="font-sans text-[17px] text-error">Fields marked * are mandatory</p>

            <div className="flex justify-end">
              {step === 1 ? (
                <button
                  type="submit"
                  className="rounded-btn border-2 border-[#709585] px-[32px] py-[10px] font-sans text-[20px] font-semibold text-black"
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

      <FaqSection />
    </div>
  );
}

export default Nominate;
