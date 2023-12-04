const standardProperties = "px-4 py-2";

/**
 * Secondary button variant
 * @param {Element} children button content
 * @param {...import("react").ButtonHTMLAttributes} buttonProps - other button props, such as actions
 */
function SecondaryButton({ children, ...buttonProps }) {
  return (
    <button className={`${standardProperties} bg-neutral-900`} {...buttonProps}>
      {children}
    </button>
  );
}

/**
 * Handles button variants
 * @author @drew-beamer
 *
 * @param {Object} props
 * @param {string.<optional>} props.variant "default" | "secondary"
 * @param {Element} children button content
 * @param {...import("react").ButtonHTMLAttributes} buttonProps - other button props, such as actions
 *
 * @returns
 */
export default function Button({ variant, children, ...buttonProps }) {
  switch (variant) {
    case "secondary":
      return <SecondaryButton {...buttonProps}>{children}</SecondaryButton>;
    default:
      return <button {...buttonProps}>{children}</button>;
  }
}
