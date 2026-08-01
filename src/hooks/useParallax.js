import { useEffect } from "react";

const throttle = (fn, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export function useParallax() {
  useEffect(() => {
    const updateParallax = throttle(() => {
      document.querySelectorAll(".parallax-element").forEach((el) => {
        const dist = window.scrollY - el.offsetTop;
        if (dist > -500 && dist < 500) {
          el.style.transform = `translateY(${dist * 0.5}px)`;
        }
      });
    }, 16);

    window.addEventListener("scroll", updateParallax, { passive: true });
    return () => window.removeEventListener("scroll", updateParallax);
  }, []);
}
