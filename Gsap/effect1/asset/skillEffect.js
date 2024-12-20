let selection = Splitting();
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  const Cbe = document.querySelectorAll(".cube");
  Cbe.forEach((nwCbe, index) => {
    const randomY = Math.random() * 200 - 100;
    const randomX = Math.random() * 200 - 100;
    const randomZ = Math.random() * -200 - 100;
    const randomRotate = Math.random() * 200 - 100;
    const randomScale = Math.random() * 3.5 + 1;
    const randomDuration = Math.random() * 1 + 0.5;
    const randomDelay = Math.random() * 0.5;
    gsap.from(nwCbe, {
      z: randomZ,
      y: randomY,
      x: 100,
      rotate: randomRotate,
      scale: 0,
      duration: 20,
      delay: randomDelay,
      opacity: 0,
      stagger: 0.000001,
      scrollTrigger: {
        trigger: nwCbe,
        start: "top 70%",
        end: "40% bottom",
        markers: true,
        scrub: 2,
      },
    });
  });
  gsap.from(selection[0].chars, {
    x: -500,
    z: 300,
    scale: 2,
    duration: 15,
    rotation: 120,
    opacity: 0,
    stagger: 0.01,
    scrollTrigger: {
      trigger: "",
      start: "45% 50%",
      end: "90% 90%",
      scrub: 1,
      markers: true,
    },
  });
});

//script pour la compatibilité avec GSAP
const lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 500);
});

gsap.ticker.lagSmoothing(0);

//script pour la compatibilité sans GSAP

// const lenis = new Lenis();

// lenis.on("scroll", (e) => {
//   console.log(e);
// });

// function raf(time) {
//   lenis.raf(time);
//   requestAnimationFrame(raf);
// }

// requestAnimationFrame(raf);
