import { useEffect } from "react";

/**
 * Re-implements the single merged IntersectionObserver from script.js.
 * Call once per page (e.g. in each page component) after content mounts.
 */
export function useScrollReveal(deps = []) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;

          if (el.classList.contains("survival-section") || el.classList.contains("who-we-are-section")) {
            el.style.animation = "fadeInUp 0.8s ease-out forwards";
          } else {
            el.classList.add("visible");
          }

          observer.unobserve(el);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const els = document.querySelectorAll(
      ".scroll-fade-in, .scroll-slide-left, .scroll-slide-right, .scroll-zoom, .stagger-item, .survival-section, .who-we-are-section"
    );
    els.forEach((el) => observer.observe(el));

    els.forEach((item, i) => {
      if (item.classList.contains("stagger-item")) {
        item.style.transitionDelay = `${i * 0.1}s`;
      }
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
