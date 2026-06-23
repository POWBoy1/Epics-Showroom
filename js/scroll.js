let currentScroll = window.scrollY;
let targetScroll = window.scrollY;
let isScrolling = false;

window.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();

    targetScroll += e.deltaY;
    targetScroll = Math.max(
      0,
      Math.min(
        targetScroll,
        document.documentElement.scrollHeight - window.innerHeight
      )
    );

    if (!isScrolling) {
      isScrolling = true;
      requestAnimationFrame(smoothScroll);
    }
  },
  { passive: false }
);

function smoothScroll() {
  currentScroll += (targetScroll - currentScroll) * 0.08;

  if (Math.abs(targetScroll - currentScroll) < 0.5) {
    currentScroll = targetScroll;
    isScrolling = false;
  } else {
    requestAnimationFrame(smoothScroll);
  }

  window.scrollTo(0, currentScroll);
}

const progressBar = document.querySelector(".scroll-progress");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const height =
    document.documentElement.scrollHeight -
    window.innerHeight;

  const progress = (scrollTop / height) * 100;

  progressBar.style.width = `${progress}%`;
});