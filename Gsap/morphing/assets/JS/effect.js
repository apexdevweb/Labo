const allFeat = document.querySelectorAll(".feature");
const allFeatBg = document.querySelectorAll(".feature-bg");

allFeat.forEach((myfeats, index) => {
  const featIdx = allFeat[index];
  allFeatBg.forEach((myfeatsBg, index) => {
    const featBgIdx = allFeatBg[index];
    featIdx.addEventListener("mouseover", () => {
      myfeats.style.color = "#2EC4FF";
    });
    featIdx.addEventListener("mouseleave", () => {
      myfeats.style.color = "#000";
      myfeats.classList.add("transition__add__js");
    });
    featBgIdx.addEventListener("mouseover", () => {
      myfeatsBg.style.backgroundColor = "#000";
    });
    featBgIdx.addEventListener("mouseleave", () => {
      myfeatsBg.style.backgroundColor = "#fff";
      myfeatsBg.classList.add("transitionBg__add__js");
    });
  });
});
