import { useEffect, useRef, useState } from 'react';
import FormField from './FormField.jsx';
import Button from './Button.jsx';

/**
 * Volunteer sign-up popup. Fields follow the client's reference form: contact
 * name, email, phone, a news-and-events opt-in, and a full postal address.
 * Submissions go to the backend, which emails them to the site inbox
 * (info@stephenstablecolorado.org) and sends the volunteer a confirmation.
 *
 * A native <dialog> opened with showModal(), so focus trapping, Esc to close
 * and the backdrop come from the browser rather than hand-rolled code.
 */

// Same backend as the contact and nominate forms; see Nominate.jsx for why
// it is hardcoded. This origin must be in the backend's ALLOWED_ORIGINS.
const VOLUNTEER_ENDPOINT = 'https://stephen-backend.vercel.app/api/volunteer';

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  // The reference form arrives with "I'm in!" already selected.
  stayInTouch: true,
  address: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
  country: '',
  // Honeypot — see Nominate.jsx. Never shown, always empty.
  website: '',
};

// Every field here gets real browser validation, not just the asterisk.
const LABEL = { labelSize: 16, labelLeading: 19, enforceRequired: true };

function FieldRow({ children }) {
  return <div className="flex flex-col gap-4 md:flex-row md:gap-[24px]">{children}</div>;
}

function VolunteerDialog({ open, onClose }) {
  const dialogRef = useRef(null);
  const [form, setForm] = useState(INITIAL_FORM);
  // 'idle' | 'sending' | 'sent' | 'error'
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;
    if (!open) {
      if (dialog.open) dialog.close();
      return undefined;
    }

    dialog.showModal();
    // A modal <dialog> doesn't stop the page behind it from scrolling.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  function handleClose() {
    // After a successful sign-up, the next open starts from a blank form
    // rather than the thank-you message.
    if (status === 'sent') setStatus('idle');
    onClose();
  }

  // Clicks on the backdrop land on the <dialog> element itself; clicks inside
  // the panel land on its children.
  function handleBackdropClick(event) {
    if (event.target === dialogRef.current) dialogRef.current.close();
  }

  function updateField(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (status === 'error') setStatus('idle');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (status === 'sending') return;

    setStatus('sending');
    setError('');

    try {
      const response = await fetch(VOLUNTEER_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      setStatus('sent');
      setForm(INITIAL_FORM);
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Something went wrong. Please try again.');
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={handleClose}
      onClick={handleBackdropClick}
      aria-labelledby="volunteer-dialog-title"
      className="m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-[760px] overflow-y-auto rounded-card bg-white p-0 backdrop:bg-[rgba(24,33,45,0.7)]"
    >
      <div className="relative px-6 pb-8 pt-8 sm:px-10 sm:pb-10 sm:pt-10">
        <button
          type="button"
          onClick={() => dialogRef.current.close()}
          aria-label="Close"
          className="absolute right-[12px] top-[12px] flex size-[40px] items-center justify-center rounded-full font-sans text-[28px] leading-none text-bl-600 transition-colors hover:bg-[#e8eaef]"
        >
          &times;
        </button>

        {status === 'sent' ? (
          <div className="flex flex-col items-center gap-4 py-10 text-center" role="status">
            <h2 id="volunteer-dialog-title" className="font-display text-[28px] text-bl-600 md:text-[32px]">
              Thank you for signing up!
            </h2>
            <p className="max-w-[520px] font-sans text-[16px] text-gray-59 md:text-[18px]">
              We&apos;ve received your volunteer sign-up and our team will be in touch soon.
              We&apos;ve emailed you a confirmation for your records.
            </p>
            <Button variant="submit" onClick={() => dialogRef.current.close()} className="mt-4">
              CLOSE
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-[28px]">
            <div className="flex flex-col gap-[8px] pr-10">
              <h2
                id="volunteer-dialog-title"
                className="capitalize font-sans text-[22px] font-medium text-bl-600 md:text-[26px]"
              >
                Sign up to volunteer
              </h2>
              <p className="font-sans text-[15px] text-gray-9c md:text-[17px]">
                Share your details and our team will reach out about volunteer opportunities.
              </p>
            </div>

            <div className="flex flex-col gap-[20px]">
              <h3 className="font-sans text-[20px] font-medium text-bl-800">Contact Information</h3>

              <FieldRow>
                <FormField
                  {...LABEL}
                  className="w-full md:flex-1"
                  label="First Name"
                  required
                  name="firstName"
                  autoComplete="given-name"
                  value={form.firstName}
                  onChange={updateField}
                />
                <FormField
                  {...LABEL}
                  className="w-full md:flex-1"
                  label="Last Name"
                  required
                  name="lastName"
                  autoComplete="family-name"
                  value={form.lastName}
                  onChange={updateField}
                />
              </FieldRow>

              <div className="flex flex-col gap-[6px]">
                <FormField
                  {...LABEL}
                  label="Email"
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={updateField}
                />
                <p className="font-sans text-[13px] text-gray-9c md:text-[14px]">
                  By signing up to volunteer, you agree to receive volunteering emails.
                </p>
              </div>

              <FormField
                {...LABEL}
                label="Phone Number"
                required
                type="tel"
                inputMode="tel"
                name="phone"
                autoComplete="tel"
                placeholder="### ### ####"
                value={form.phone}
                onChange={updateField}
              />

              <fieldset className="flex flex-col gap-[10px]">
                <legend className="mb-[10px] font-sans text-[14px] text-bl-600 md:text-[15px]">
                  Stay in touch with the impact we&apos;re making, upcoming events and more
                  opportunities. You will still get volunteer-related emails.
                </legend>
                <div className="flex flex-col gap-[10px] sm:flex-row sm:gap-[16px]">
                  {[
                    { value: true, label: "I'm in!" },
                    { value: false, label: 'No thanks' },
                  ].map((option) => (
                    <label
                      key={option.label}
                      className={`flex flex-1 cursor-pointer items-center gap-[10px] border px-[16px] py-[14px] font-form text-[15px] text-espresso transition-colors ${
                        form.stayInTouch === option.value
                          ? 'border-bl-600 bg-[#e8eaef]'
                          : 'border-gray-d9 bg-field'
                      }`}
                    >
                      <input
                        type="radio"
                        name="stayInTouch"
                        checked={form.stayInTouch === option.value}
                        onChange={() => setForm((prev) => ({ ...prev, stayInTouch: option.value }))}
                        className="size-[16px] accent-[#3e4f69]"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>

            <div className="flex flex-col gap-[20px]">
              <div className="flex flex-col gap-[4px]">
                <h3 className="font-sans text-[20px] font-medium text-bl-800">Address</h3>
                <p className="font-sans text-[13px] text-gray-9c md:text-[14px]">
                  Please do not abbreviate, for example 123 North Main Street, #12, Denver, CO 80205.
                </p>
              </div>

              <FormField
                {...LABEL}
                label="Street Address"
                required
                name="address"
                autoComplete="address-line1"
                value={form.address}
                onChange={updateField}
              />
              <FormField
                {...LABEL}
                label="Street Address Line 2"
                name="address2"
                autoComplete="address-line2"
                value={form.address2}
                onChange={updateField}
              />
              <FieldRow>
                <FormField
                  {...LABEL}
                  className="w-full md:flex-1"
                  label="City"
                  required
                  name="city"
                  autoComplete="address-level2"
                  value={form.city}
                  onChange={updateField}
                />
                <FormField
                  {...LABEL}
                  className="w-full md:flex-1"
                  label="State"
                  required
                  name="state"
                  autoComplete="address-level1"
                  value={form.state}
                  onChange={updateField}
                />
              </FieldRow>
              <FieldRow>
                <FormField
                  {...LABEL}
                  className="w-full md:flex-1"
                  label="Postal / Zip Code"
                  required
                  name="zip"
                  autoComplete="postal-code"
                  value={form.zip}
                  onChange={updateField}
                />
                <FormField
                  {...LABEL}
                  className="w-full md:flex-1"
                  label="Country"
                  required
                  name="country"
                  autoComplete="country-name"
                  value={form.country}
                  onChange={updateField}
                />
              </FieldRow>

              <p className="font-sans text-[14px] leading-[18px] text-error">
                Fields marked * are mandatory
              </p>
            </div>

            <input
              type="text"
              name="website"
              value={form.website}
              onChange={updateField}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            {status === 'error' && (
              <p className="font-sans text-[16px] text-error" role="alert">
                {error}
              </p>
            )}

            <div className="flex justify-end">
              <Button type="submit" variant="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'SENDING…' : 'SUBMIT'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
}

export default VolunteerDialog;
