import { useLayoutEffect } from 'react';

export function useBioClamp(containerRef, deps) {
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const update = (bio) => {
      const card = bio.closest('.tutor-card');
      if (card) {
        card.classList.toggle('has-more', bio.scrollHeight > bio.clientHeight + 1);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            update(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '200px' }
    );

    const bios = container.querySelectorAll('.tutor-card__bio');
    bios.forEach((bio) => observer.observe(bio));

    const onResize = () => {
      bios.forEach((bio) => observer.observe(bio));
    };

    window.addEventListener('resize', onResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, deps);
}