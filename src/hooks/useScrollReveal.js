import { useEffect } from 'react';

/**
 * Responsive Scroll Animation Controller:
 * - Desktop: Scroll-tied progress that stays 100% visible across 90%+ of screen height.
 * - Mobile: Time-based smooth fade-in that triggers early and stays 100% visible until far off-screen.
 */
export function useScrollReveal(triggerDep) {
  useEffect(() => {
    const isMobile = window.innerWidth < 1024;

    if (isMobile) {
      const observerCallback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else {
            const rect = entry.target.getBoundingClientRect();
            if (rect.bottom < -200 || rect.top > window.innerHeight + 200) {
              entry.target.classList.remove('is-visible');
            }
          }
        });
      };

      const observer = new IntersectionObserver(observerCallback, {
        root: null,
        rootMargin: '200px 0px 200px 0px',
        threshold: 0.01
      });

      const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-zoom');
      revealElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 200) {
          el.classList.add('is-visible');
        }
        observer.observe(el);
      });

      return () => {
        revealElements.forEach((el) => observer.unobserve(el));
      };
    } else {
      let ticking = false;

      const updateScrollProgress = () => {
        const windowHeight = window.innerHeight;
        const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-zoom');

        revealElements.forEach((el) => {
          const rect = el.getBoundingClientRect();

          const entryDistance = windowHeight * 0.45;
          const entryFromBottom = windowHeight - rect.top;
          let entryProgress = entryFromBottom / entryDistance;
          entryProgress = Math.max(0, Math.min(1, entryProgress));

          const exitDistance = windowHeight * 0.05;
          let exitProgress = rect.bottom / exitDistance;
          exitProgress = Math.max(0, Math.min(1, exitProgress));

          const effectiveProgress = Math.min(entryProgress, exitProgress);

          el.style.setProperty('--scroll-p', effectiveProgress.toFixed(3));
          
          if (effectiveProgress > 0.01 || rect.top < windowHeight * 0.85) {
            el.classList.add('is-visible');
          } else {
            el.classList.remove('is-visible');
          }
        });

        ticking = false;
      };

      const onScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(updateScrollProgress);
          ticking = true;
        }
      };

      // Run immediately on mount and after DOM updates
      setTimeout(updateScrollProgress, 50);
      updateScrollProgress();

      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });

      return () => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      };
    }
  }, [triggerDep]);
}
