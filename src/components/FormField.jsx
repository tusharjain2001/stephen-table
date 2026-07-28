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
    <label className={`flex flex-col gap-[2px] ${className}`}>
      {label && (
        <span className="font-form text-[20px] text-gray-94">
          {label}
          {required && <span className="text-error"> *</span>}
        </span>
      )}

      <div className="relative">
        <Component
          className={`w-full rounded-none border border-gray-d9 bg-field px-[16px] font-form text-[16px] text-espresso outline-none ${
            isTextarea ? 'h-[135px] resize-none py-[16px]' : 'h-[60px]'
          } ${isSelect ? 'appearance-none pr-[90px]' : ''} ${fieldClassName}`}
          {...props}
        >
          {children}
        </Component>

        {isSelect && (
          <img
            src={iconChevronDown}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute right-[66px] top-1/2 h-[9px] w-[18px] -translate-y-1/2"
          />
        )}
      </div>
    </label>
  );
}

export default FormField;
