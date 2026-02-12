// src/components/AnnounceBar.jsx
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
export default function AnnounceBar() {
  const [open, setOpen] = useState(true);
  const ref = useRef(null);

  useEffect(() => {
    const setH = () => {
      const h = open && ref.current ? ref.current.offsetHeight : 0;
      // include iOS notch safe area
      const safe = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue("--sat") ||
          "0",
        10,
      );
      document.documentElement.style.setProperty(
        "--announce-h",
        `${h + safe}px`,
      );
    };
    setH();
    window.addEventListener("resize", setH);
    return () => window.removeEventListener("resize", setH);
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className="fixed left-0 right-0 top-0 z-[60] bg-[#1a0f12] text-[#F6E9D3] border-b border-[#d4af37]/25"
      role="region"
      aria-label="Valentine announcement"
      style={{
        paddingTop: "env(safe-area-inset-top)", // extra notch padding on iOS
      }}
    >
      <div className="container-custom flex items-center justify-center gap-3 py-2 px-3 text-sm">
        <span className="hidden sm:inline text-[#f3c5cf]">🎀</span>
        <span className="text-center">
          Valentine Special Announcement:{" "}
          <b>Free Delivery on All Orders + Complimentary Gift Wrapping</b>
        </span>
        <Link
          to="/shop"
          className="font-medium text-amber-300 hover:text-amber-200 transition-colors ml-1 underline underline-offset-2 decoration-amber-500/50 hover:decoration-amber-400"
        >
          Shop now →
        </Link>
        <button
          onClick={() => setOpen(false)}
          aria-label="Dismiss announcement"
          className="ml-3 rounded px-2 py-1 text-xs text-[#d4af37]/90 hover:text-[#d4af37]"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
