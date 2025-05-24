import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function TooltipDialog({ targetRef, children }) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef(null);

  useEffect(() => {
    const updatePosition = () => {
      const rect = targetRef.current?.getBoundingClientRect();
      if (rect) {
        setPosition({
          top: rect.top + rect.height / 2 - 30,
          left: rect.left - 160, // to the left of the icon
        });
      }
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [targetRef]);

  return createPortal(
    <div
      ref={tooltipRef}
      style={{
        top: position.top,
        left: position.left,
        position: "fixed",
        zIndex: 9999,
      }}
      className="bg-white border border-gray-200 shadow-xl rounded-xl p-3 w-64"
    >
      {children}
    </div>,
    document.body
  );
}
