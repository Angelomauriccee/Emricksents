import { Link, useNavigate } from "react-router-dom";

export default function SmartLink({
  to,
  children,
  className = "",
  replace = false,
  state,
  scrollTop = true,
  onClick,
  onTouchEnd,
  ...rest
}) {
  const navigate = useNavigate();

  // Treat absolute/external links normally
  const isExternal =
    typeof to === "string" &&
    (/^([a-z]+:)?\/\//i.test(to) ||
      to.startsWith("mailto:") ||
      to.startsWith("tel:"));

  const go = (e) => {
    onClick?.(e);
    if (e.defaultPrevented || isExternal) return;
    e.preventDefault();
    navigate(to, { replace, state });
    if (scrollTop) window.scrollTo(0, 0);
  };

  const goTouch = (e) => {
    onTouchEnd?.(e);
    if (e.defaultPrevented || isExternal) return;
    e.preventDefault();
    navigate(to, { replace, state });
    if (scrollTop) window.scrollTo(0, 0);
  };

  // External: normal <a>, Internal: react-router <Link> with iOS-safe handlers
  return isExternal ? (
    <a href={to} className={className} {...rest}>
      {children}
    </a>
  ) : (
    <Link
      to={to}
      className={className}
      onClick={go}
      onTouchEnd={goTouch} // ← iOS helper
      {...rest}
    >
      {children}
    </Link>
  );
}
