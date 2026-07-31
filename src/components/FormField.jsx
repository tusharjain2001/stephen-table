import iconChevronDown from '../assets/icons/icon-chevron-down.svg';

/**
 * Shared form field (label + input/textarea/select) used on the Nominate
 * and Contact forms (Implementation Plan §3.1 "FormField").
 *
 * Props:
 * - `as`          — `'input'` (default) | `'textarea'` | `'select'`
 * - `label`       — field label text
 * - `required`    — shows a red `*` next to the label (default false)
 * - `className`   — extra classes on the outer <label> wrapper
 * - `fieldClassName` — extra classes on the input/textarea/select itself
 * - `children`    — `<option>` elements when `as="select"`
 * - all other props are forwarded to the input/textarea/select
 *   (e.g. `name`, `value`, `onChange`, `placeholder`, `rows`)
 */
function FormField({
  as = 'input',
  label,
  required = false,
  className = '',
  fieldClassName = '',
  children,
  ...props
}) {
  const Component = as;
  const isSelect = as === 'select';
  const isTextarea = as === 'textarea';

  return (
    <label className={`flex flex-col gap-[1.4px] md:gap-[2px] ${className}`}>
      {label && (
        // Figma draws every field label as a 24px box (381:5541 / 381:5711) and
        // the field frame as 24 + 2 + 60 = 86. Acumin Pro is substituted by
        // Inter, whose `normal` leading is 24.2 at 20px, so each field crept
        // 0.2px past its frame — pinned rather than left to the fallback.
        // Mobile frame (662:9459) shrinks the label to 14px.
        <span className="font-form text-[14px] text-gray-94 md:text-[20px] md:leading-[24px]">
          {label}
          {required && <span className="text-error"> *</span>}
        </span>
      )}

      <div className="relative">
        <Component
          className={`w-full rounded-none border-[0.71px] border-gray-d9 bg-field px-[16px] font-form text-[14px] text-espresso outline-none md:border md:text-[16px] ${
            isTextarea ? 'block h-[91.6px] resize-none py-[16px] md:h-[135px]' : 'h-[42.4px] md:h-[60px]'
          } ${isSelect ? 'appearance-none pr-[40px] md:pr-[90px]' : ''} ${fieldClassName}`}
          {...props}
        >
          {children}
        </Component>

        {isSelect && (
          <img
            src={iconChevronDown}
            alt=""
            aria-hidden="true"
            // Figma puts the chevron at x=1097 in a 1163-wide field on both
            // forms (381:5552 Contact, 381:5722 Nominate) — 48px in from the
            // right edge, not the 66 that was here. Mobile frame shrinks it
            // to 12.7x6.35 at right-16.
            className="pointer-events-none absolute right-[16px] top-1/2 h-[6.35px] w-[12.7px] -translate-y-1/2 md:right-[48px] md:h-[9px] md:w-[18px]"
          />
        )}
      </div>
    </label>
  );
}

export default FormField;
