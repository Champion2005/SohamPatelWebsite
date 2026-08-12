import { useEffect } from 'react';

/**
 * Responsive Scroll Animation Controller:
 * - Desktop: Scroll-tied progress that stays 100% visible across 90%+ of screen height.
 * - Mobile: Time-based smooth fade-in that triggers early and stays 100% visible until far off-screen.
 */
export function useScrollReveal() {
  useEffect(() => {
    const isMobile = window.innerWidth < 1024;

    if (isMobile) {
      // MOBILE: Time-based IntersectionObserver with generous 250px off-screen buffer
      const observerCallback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else {
            const rect = entry.target.getBoundingClientRect();
            // Only unmark if completely off-screen beyond 200px buffer
            if (rect.bottom < -200 || rect.top > window.innerHeight + 200) {
              entry.target.classList.remove('is-visible');
            }
          }
        });
      };

      const observer = new IntersectionObserver(observerCallback, {
        root: null,
        rootMargin: '200px 0px 200px 0px', // Ensures elements trigger early and never vanish while reading
        threshold: 0.01
      });

      const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-zoom');
      revealElements.forEach((el) => {
        // Trigger initial visibility for elements already in or near viewport
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
      // DESKTOP: Scroll position tied progress with extended visibility duration
      let ticking = false;

      const updateScrollProgress = () => {
        const windowHeight = window.innerHeight;
        const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-zoom');

        revealElements.forEach((el) => {
          const rect = el.getBoundingClientRect();

          // Quick entry: Reaches 1.0 full visibility in bottom 18% of screen
          const entryDistance = windowHeight * 0.45;
          const entryFromBottom = windowHeight - rect.top;
          let entryProgress = entryFromBottom / entryDistance;
          entryProgress = Math.max(0, Math.min(1, entryProgress));

          // Extended stay: Only begins exit fade in top 5% of screen
          const exitDistance = windowHeight * 0.05;
          let exitProgress = rect.bottom / exitDistance;
          exitProgress = Math.max(0, Math.min(1, exitProgress));

          const effectiveProgress = Math.min(entryProgress, exitProgress);

          el.style.setProperty('--scroll-p', effectiveProgress.toFixed(3));
          
          if (effectiveProgress > 0.01) {
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

      updateScrollProgress();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });

      return () => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      };
    }
  }, []);
}
