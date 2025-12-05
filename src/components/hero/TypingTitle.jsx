import { useEffect, useState, useRef } from "react";

/**
 * Type → pause → delete → next
 * - texts: array of strings
 * - typeSpeed/deleteSpeed in ms per char
 * - pauseMs: pause after finishing a word
 */
export default function TypingTitle({
  texts = ["Happy Holidays from EmrickScents", "Shop Scents of the Season"],
  typeSpeed = 70,
  deleteSpeed = 40,
  pauseMs = 1200,
  className = "",
}) {
  const [i, setI] = useState(0); // which string
  const [txt, setTxt] = useState(""); // currently displayed
  const [del, setDel] = useState(false); // deleting?
  const timer = useRef();

  useEffect(() => {
    const full = texts[i % texts.length];

    const step = () => {
      if (!del) {
        // typing
        if (txt.length < full.length) {
          setTxt(full.slice(0, txt.length + 1));
          timer.current = setTimeout(step, typeSpeed);
        } else {
          // pause at full word then start deleting
          timer.current = setTimeout(() => {
            setDel(true);
            step();
          }, pauseMs);
        }
      } else {
        // deleting
        if (txt.length > 0) {
          setTxt(full.slice(0, txt.length - 1));
          timer.current = setTimeout(step, deleteSpeed);
        } else {
          setDel(false);
          setI((p) => (p + 1) % texts.length);
          timer.current = setTimeout(step, typeSpeed);
        }
      }
    };

    timer.current = setTimeout(step, typeSpeed);
    return () => clearTimeout(timer.current);
  }, [i, del, txt, texts, typeSpeed, deleteSpeed, pauseMs]);

  return (
    <span className={`typing-title ${className}`}>
      {txt}
      <span className="typing-caret" aria-hidden="true" />
    </span>
  );
}
