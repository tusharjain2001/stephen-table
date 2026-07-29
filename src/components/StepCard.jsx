/**
 * "How it works" step card used on Services and Nominate a Senior
 * (Implementation Plan §3.1 "StepCard").
 *
 * Props:
 * - `icon`          — step icon (37px)
 * - `title`         — step title
 * - `body`          — step description
 * - `borderClassName` — border color; defaults to `border-wb-400`
 *                      (Services uses `border-b-200`)
 * - `className`     — extra classes on the outer wrapper
 */
function StepCard({ icon, title, body, borderClassName = 'border-wb-400', className = '' }) {
  return (
    <div
      className={`flex h-full w-full flex-col items-start gap-[28px] rounded-card border bg-wb-200 px-[20px] py-[36px] text-left xl:min-h-[300px] 2xl:h-[341px] 2xl:w-[306px] 2xl:py-[50px] ${borderClassName} ${className}`}
    >
      {icon && <img src={icon} alt="" className="size-[37px]" aria-hidden="true" />}
      <div className="flex flex-col gap-[8px]">
        {title && (
          <h3 className="font-neulis text-[20px] leading-[30px] text-bl-900">{title}</h3>
        )}
        {body && (
          <p className="font-neulis text-[16px] leading-[21px] text-gray-59">{body}</p>
        )}
      </div>
    </div>
  );
}

export default StepCard;
