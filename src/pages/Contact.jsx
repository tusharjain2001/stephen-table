import { useState } from 'react';
import PageHero from '../components/PageHero.jsx';
import FormField from '../components/FormField.jsx';
import Button from '../components/Button.jsx';

import heroContact from '../assets/images/hero-contact.png';
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

  return (
    <div className="bg-bl-200">
      <PageHero
        image={heroContact}
        height={548}
        textLeft={76}
        textWidth={420}
        textBottom={12}
        title="Contact Us"
      />

      <section id="contact-form" className="w-full scroll-mt-[96px] py-12 xl:py-[79px]">
        <div className="mx-auto flex max-w-[1440px] justify-center px-6 md:px-10 xl:px-[72px]">
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-[1273px] flex-col gap-[42px] rounded-card bg-white px-6 pb-8 pt-8 sm:px-10 xl:px-[55px] xl:pb-[47px] xl:pt-[52px]"
          >
            <h2 className="capitalize font-sans text-[24px] font-medium text-bl-600 xl:text-[28px]">
              Get in Touch with us
            </h2>

            <div className="flex flex-col gap-[38px]">
              <div className="flex flex-col gap-[6px]">
                <div className="flex flex-col gap-[24px]">
                  <FieldRow>
                    <FormField
                      className="w-full md:flex-1 2xl:w-[566px] 2xl:flex-none"
                      label="First Name"
                      required
                      name="firstName"
                      value={form.firstName}
                      onChange={updateField}
                    />
                    <FormField
                      className="w-full md:flex-1 2xl:w-[566px] 2xl:flex-none"
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

                  <label className="flex flex-col gap-[2px]">
                    <span className="font-form text-[20px] text-gray-94">
                      Write a Message <span className="text-error">*</span>
                    </span>
                    <div className="relative">
                      <textarea
                        className="h-[135px] w-full resize-none rounded-none border border-gray-d9 bg-field px-[16px] py-[16px] font-form text-[16px] text-espresso outline-none"
                        name="message"
                        value={form.message}
                        onChange={updateField}
                      />
                      <img
                        src={iconChevronDown}
                        alt=""
                        aria-hidden="true"
                        className="pointer-events-none absolute right-[66px] top-[51px] h-[9px] w-[18px]"
                      />
                    </div>
                  </label>
                </div>

                <p className="font-sans text-[17px] text-error">Fields marked * are mandatory</p>
              </div>

              <label className="flex w-full max-w-[723px] items-center gap-[14px]">
                <input
                  type="checkbox"
                  name="agree"
                  checked={form.agree}
                  onChange={updateField}
                  className="size-[23px] shrink-0 appearance-none rounded-none border border-gray-c7 bg-field checked:bg-bl-600"
                />
                <span className="flex-1 font-form text-[20px] text-gray-94">
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
