"use client";

import { useEffect, useState } from "react";

export default function ScrollCollapse({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;

      if (window.innerWidth < 768) {
        if (currentY > lastY && currentY > 100) {
          setCollapsed(true);
        } else if (currentY < lastY) {
          setCollapsed(false);
        }
      } else {
        setCollapsed(false);
      }

      lastY = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="sticky top-0 z-40">
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          collapsed ? "max-h-0 opacity-0 -translate-y-2" : "max-h-[500px] opacity-100 translate-y-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}