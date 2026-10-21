/* Pet.Picks light motion (GSAP). Hero box settles in, then cards fade up as they scroll into view.
   Anything already on screen at load stays visible, so the page is never blank. */
(() => {
  if (!window.gsap) return;
  const mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    gsap.timeline({ defaults: { ease: "power3.out", duration: 0.6 } })
      .from(".hero-box", { y: 18, autoAlpha: 0, duration: 0.7 })
      .from(".hero-box > *", { y: 14, autoAlpha: 0, stagger: 0.08 }, "-=0.45");

    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      gsap.to(e.target, { y: 0, autoAlpha: 1, duration: 0.55, ease: "power2.out" });
    }), { rootMargin: "0px 0px -8% 0px" });

    window.ppReveal = (root) => {
      (root || document).querySelectorAll("[data-reveal]:not([data-seen])").forEach((el) => {
        el.setAttribute("data-seen", "");
        if (el.getBoundingClientRect().top < innerHeight) return;
        gsap.set(el, { y: 20, autoAlpha: 0 });
        io.observe(el);
      });
    };
    window.ppReveal();
  });
})();
