document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const features = document.querySelectorAll(".feature");
  const featureBgs = document.querySelectorAll(".feature-bg");

  /* =========================
     POSITIONS INITIALES
  ========================= */
  const featureStartPosition = [
    { top: 25, left: 15 },
    { top: 12.5, left: 50 },
    { top: 22.5, left: 75 },
    { top: 33, left: 82.5 },
    { top: 50, left: 20 },
    { top: 80, left: 20 },
    { top: 75, left: 75 },
  ];

  features.forEach((feature, index) => {
    const pos = featureStartPosition[index];
    if (!pos) return;

    gsap.set(feature, {
      top: `${pos.top}%`,
      left: `${pos.left}%`,
    });
  });

  /* =========================
     DIMENSIONS INITIALES
  ========================= */
  const featureStartDimensions = [];
  featureBgs.forEach((bg) => {
    const rect = bg.getBoundingClientRect();
    featureStartDimensions.push({
      width: rect.width,
      height: rect.height,
    });
  });

  const remInPixels = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );
  const targetWidth = 3 * remInPixels;
  const targetHeight = 3 * remInPixels;

  /* =========================
     SEARCH BAR
  ========================= */
  const getSearchBarFinalWidth = () =>
    window.innerWidth < 1000 ? 20 : 25;

  let searchBarFinalWidth = getSearchBarFinalWidth();

  window.addEventListener("resize", () => {
    searchBarFinalWidth = getSearchBarFinalWidth();
    ScrollTrigger.refresh();
  });

  /* =========================
     SCROLLTRIGGER
  ========================= */
  ScrollTrigger.create({
    trigger: ".spotlight",
    start: "top",       
    end: `+=${window.innerHeight * 1.3}px`,           
    pin: true,
    pinSpacing: true,
    scrub: 0.8,                     
    markers: true,
    onUpdate: (self) => {
      const progress = self.progress;

      /* =========================
         SPOTLIGHT CONTENT
      ========================= */
      if (progress <= 0.3333) {
        gsap.set(".spotlight-content", {
          y: `${-100 * (progress / 0.3333)}%`,
        });
      } else {
        gsap.set(".spotlight-content", { y: "-100%" });
      }

      /* =========================
         FEATURES → CENTRE
      ========================= */
      let featureProgress = 0;
      if (progress <= 1.85) {
        featureProgress = progress / 0.2;
      }

      features.forEach((feature, index) => {
        const original = featureStartPosition[index];
        if (!original) return;

        const currentTop =
          original.top + (50 - original.top) * featureProgress;
        const currentLeft =
          original.left + (50 - original.left) * featureProgress;

        gsap.set(feature, {
          top: `${currentTop}%`,
          left: `${currentLeft}%`,
        });
      });

      /* =========================
         FEATURE BACKGROUNDS
      ========================= */
      featureBgs.forEach((bg, index) => {
        const dim = featureStartDimensions[index];
        if (!dim) return;

        const currentWidth =
          dim.width + (targetWidth - dim.width) * featureProgress;
        const currentHeight =
          dim.height + (targetHeight - dim.height) * featureProgress;

        const currentBorderRadius =
          0.5 + (25 - 0.5) * featureProgress;
        const currentBorderWidth =
          0.125 + (0.35 - 0.125) * featureProgress;

        gsap.set(bg, {
          width: `${currentWidth}px`,
          height: `${currentHeight}px`,
          borderRadius: `${currentBorderRadius}rem`,
          borderWidth: `${currentBorderWidth}rem`, // ✅ corrigé
        });
      });

      /* =========================
         FEATURE TEXT FADE
      ========================= */
      if (progress <= 0.1) {
        gsap.set(".feature-content", {
          opacity: 1 - progress / 0.1,
        });
      } else {
        gsap.set(".feature-content", { opacity: 0 });
      }

      /* =========================
         FEATURES / SEARCH BAR
      ========================= */
      gsap.set(".features", { opacity: progress >= 0.5 ? 0 : 1 });
      gsap.set(".search-bar", { opacity: progress >= 0.5 ? 1 : 0 });

      /* =========================
         SEARCH BAR MORPH
      ========================= */
      if (progress >= 0.5 && progress <= 0.75) {
        const p = (progress - 0.5) / 0.25;
        const width = 3 * (searchBarFinalWidth - 3) * p;
        const height = 3 * (5 - 3) * p;
        const translateY = -50 + (200 + 50) * p;

        gsap.set(".search-bar", {
          width: `${width}rem`,
          height: `${height}rem`,
          transform: `translate(-50%, ${translateY}%)`,
        });

        gsap.set(".search-bar img", { opacity: 0 });
      }

      if (progress > 0.75) {
        gsap.set(".search-bar", {
          width: `${searchBarFinalWidth}rem`,
          height: "5rem",
          transform: "translate(-50%, 50%)",
        });
      }

      /* =========================
         FINAL HEADER
      ========================= */
      if (progress >= 0.75) {
        const p = (progress - 0.75) / 0.25;

        gsap.set(".search-bar img", { opacity: p });
        gsap.set(".header-content", {
          y: -50 + 50 * p,
          opacity: p,
        });
      } else {
        gsap.set(".search-bar img", { opacity: 0 });
        gsap.set(".header-content", { y: -50, opacity: 0 });
      }
    },
  });
});






// document.addEventListener("DOMContentLoaded", () => {
//   gsap.registerPlugin(ScrollTrigger);

//   const features = document.querySelectorAll(".feature");
//   const featureBgs = document.querySelectorAll(".feature_bg");

//   const featureStartPosition = [
//     { top: 25, left: 15 },
//     { top: 12.5, left: 50 },
//     { top: 22.5, left: 75 },
//     { top: 33, left: 82.5 },
//     { top: 50, left: 20 },
//     { top: 80, left: 20 },
//     { top: 75, left: 75 },
//   ];

//   features.forEach((feature, index) => {
//     const featurePos = featureStartPosition[index];

//     gsap.set(feature, {
//       top: `${featurePos.top}%`,
//       left: `${featurePos.left}%`,
//     });
//   });

//   const featureStartDimensions = [];
//   featureBgs.forEach((bg) => {
//     const rect = bg.getBoundingClientRect();
//     featureStartDimensions.push({
//       width: rect.width,
//       height: rect.height,
//     });
//   });

//   const remInPixels = parseFloat(
//     getComputedStyle(document.documentElement).fontSize
//   );
//   const targetWidth = 3 * remInPixels;
//   const targetHeight = 3 * remInPixels;

//   const getSearchBarFinalWidth = () => {
//     return window.innerWidth < 1000 ? 20 : 25;
//   };

//   let searchBarFinalWidth = getSearchBarFinalWidth();

//   window.addEventListener("resize", () => {
//     searchBarFinalWidth = getSearchBarFinalWidth();
//     ScrollTrigger.refresh();
//   });

//   ScrollTrigger.create({
//     trigger: ".spotlight",
//     start: "top",
//     end: `+=${window.innerHeight * 1.2}px`,
//     pin: true,
//     pinSpacing: true,
//     scrub: 2,
//     markers: true,
//     onUpdate: (self) => {
//       const progress = self.progress;

//       if (progress <= 0.3333) {
//         const spotlightHeaderProgress = progress / 0.3333;
//         gsap.set(".spotlight-content", {
//           y: `${-100 * spotlightHeaderProgress}`,
//         });
//       } else {
//         gsap.set(".spotlight-content", {
//           y: "-100%",
//         });
//       }

//       if (progress >= 0 && progress <= 0.5) {
//         const featureProgress = progress / 0.5;

//         features.forEach((feature, index) => {
//           const original = featureStartPosition[index];

//           const currentTop =
//             original.top + (50 - original.top) * featureProgress;

//           const currentLeft =
//             original.left + (50 - original.left) * featureProgress;

//           gsap.set(feature, {
//             top: `${currentTop}%`,
//             left: `${currentLeft}%`,
//           });
//         });
//       }
//       featureBgs.forEach((bg, index) => {
//         const featureDim = featureStartDimensions[index];
//         const currentWidth =
//           featureDim.width + (targetWidth - featureDim.width) * featureProgress;
//         const currentHeight =
//           featureDim.height +
//           (targetHeight - featureDim.height) * featureProgress;

//         const currentBorderRadius = 0.5 + (25 - 0.5) * featureProgress;
//         const currentBorderWidth = 0.125 + (0.35 - 0.125) * featureProgress;

//         gsap.set(bg, {
//           width: `${currentWidth}px`,
//           height: `${currentHeight}px`,
//           borderRadius: `${currentBorderRadius}rem`,
//           borderWidht: `${currentBorderWidth}rem`,
//         });
//       });

//       if (progress >= 0 && progress <= 0.1) {
//         const featureTextProgress = progress / 0.1;
//         gsap.set(".feature-content", {
//           opacity: 1 - featureTextProgress,
//         });
//       } else if (progress > 0.1) {
//         gsap.set(".feature-content", {
//           opacity: 0,
//         });
//       }
//       if (progress >= 0.5) {
//         gsap.set(".features", {
//           opacity: 0,
//         });
//       } else {
//         gsap.set(".features", {
//           opacity: 1,
//         });
//       }
//       if (progress >= 0.5) {
//         gsap.set(".search-bar", {
//           opacity: 1,
//         });
//       } else {
//         gsap.set(".search-bar", {
//           opacity: 0,
//         });
//       }

//       if (progress >= 0.5 && progress <= 0.75) {
//         const searBarProgress = (progress - 0.5) / 0.25;
//         const width = 3 * (searchBarFinalWidth - 3) * searBarProgress;
//         const height = 3 * (5 - 3) * searBarProgress;
//         const translateY = -50 + (200 - -50) * searBarProgress;

//         gsap.set(".search-bar", {
//           width: `${width}rem`,
//           height: `${height}rem`,
//           Transform: `translate(-50%, ${translateY}%)`,
//         });
//         gsap.set(".search-bar img", {
//           opacity: 0,
//         });
//       } else if (progress > 0.75) {
//         gsap.set(".search-bar", {
//           width: `${searchBarFinalWidth}rem`,
//           height: "5rem",
//           Transform: "translate(-50%, 200%)",
//         });
//       }
//       if (progress >= 0.75) {
//         const finalHeaderProgress = (progress - 0.75) / 0.25;
//         gsap.set(".search-bar img", {
//           opacity: finalHeaderProgress,
//         });
//         gsap.set(".header-content", {
//           y: -50 + 50 * finalHeaderProgress,
//           opacity: finalHeaderProgress,
//         });
//       } else {
//         gsap.set(".search-bar img", {
//           opacity: 0,
//         });
//         gsap.set(".header-content", {
//           y: -50,
//           opacity: 0,
//         });
//       }
//     },
//   });
// });
