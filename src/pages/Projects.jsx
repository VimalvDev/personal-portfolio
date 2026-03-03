import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { MdArrowOutward } from "react-icons/md";

// ── Register all GSAP plugins once at module level ──────────────────────────
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

// ── Slide data lives outside the component so it's never recreated ──────────
const SLIDES = [
  {
    label: "01 - Portfolio",
    title:
      "A motion-driven portfolio designed to combine bold typography, smooth scrolling, and interactive transitions into a structured, modern web experience",
    image: "/imgs/portfolio.png",
    link: "https://vimalvdev.vercel.app/",
  },
  {
    label: "02 - Learnova",
    title:
      "A PERN-based AI learning platform integrating RAG pipelines and LLM APIs to transform study materials into contextual Q&A, flashcards, and adaptive learning workflows.",
    image: "/imgs/learnova.png",
    link: "https://learnova.vercel.app/",
  },
  {
    label: "03 - Project",
    title:
      "A motion-driven portfolio designed to combine bold typography, smooth scrolling, and interactive transitions into a structured, modern web experience",
    image: "/imgs/3.png",
    link: "#",
  },
  {
    label: "04 - Project",
    title:
      "A PERN-based AI learning platform integrating RAG pipelines and LLM APIs to transform study materials into contextual Q&A, flashcards, and adaptive learning workflows.",
    image: "/imgs/4.png",
    link: "#",
  },
];

const TITLE_CLASSES =
  "desc text-[clamp(1rem,1vw,1rem)] mb-[10em] font-mono leading-[.9em] inline-block";

const IMAGE_CLASSES =
  "w-full h-full object-cover absolute inset-0 origin-center will-change-auto";

// ─────────────────────────────────────────────────────────────────────────────

const Projects = () => {
  // Refs point to DOM nodes that GSAP will read and animate.
  // We never store animation state in React state because that would cause
  // re-renders and fight with GSAP.
  const containerRef = useRef(null); // the pinned <section> — also the useGSAP scope
  const progressBarRef = useRef(null); // the thin vertical fill line
  const imageWrapRef = useRef(null); // holds the stacked <img> elements
  const titleWrapRef = useRef(null); // holds the animated <h1>
  const indicesWrapRef = useRef(null); // holds the 01 / 02 indicators

  useGSAP(
    () => {
      // ── Grab DOM nodes from refs ─────────────────────────────────────────
      const progressBar = progressBarRef.current;
      const imageWrap = imageWrapRef.current;
      const titleWrap = titleWrapRef.current;
      const indicesWrap = indicesWrapRef.current;

      // Bail early if any node is missing (e.g. during SSR or fast unmount)
      if (!progressBar || !imageWrap || !titleWrap || !indicesWrap) return;

      // ── Mutable animation state (lives inside useGSAP, not in React state) ─
      let activeSlideIndex = 0;
      let activeSplit = null; // holds the current SplitText instance

      // ── Build the 01 / 02 index indicators ──────────────────────────────
      function buildIndicators() {
        indicesWrap.innerHTML = "";

        SLIDES.forEach((_, i) => {
          const label = (i + 1).toString().padStart(2, "0");

          // Each indicator = a marker line  +  a number
          const row = document.createElement("p");
          row.dataset.index = i;
          row.className = "flex items-center gap-4 text-white";

          const marker = document.createElement("span");
          marker.className =
            "marker relative w-3 h-px bg-white origin-right will-change-transform";

          const number = document.createElement("span");
          number.className =
            "number relative w-5 flex justify-end will-change-opacity";
          number.textContent = label;

          row.appendChild(marker);
          row.appendChild(number);
          indicesWrap.appendChild(row);

          // First indicator starts active, rest start hidden
          gsap.set(number, { opacity: i === 0 ? 1 : 0.35 });
          gsap.set(marker, { scaleX: i === 0 ? 1 : 0 });
        });
      }

      // ── Update which indicator looks "active" ────────────────────────────
      function updateIndicators(activeIndex) {
        indicesWrap.querySelectorAll("p").forEach((row, i) => {
          const marker = row.querySelector(".marker");
          const number = row.querySelector(".number");
          const isActive = i === activeIndex;

          gsap.to(number, {
            opacity: isActive ? 1 : 0.5,
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(marker, {
            scaleX: isActive ? 1 : 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      }

      // ── Swap in a new title with a line-by-line reveal ───────────────────
      function animateTitle(index) {
        // Revert the previous SplitText before overwriting innerHTML,
        // otherwise SplitText leaves orphaned wrapper divs in the DOM.
        if (activeSplit) activeSplit.revert();

        const slide = SLIDES[index];
        titleWrap.innerHTML = `
          <div class="flex flex-col py-[5vw] px-[2em] justify-between h-full">
          <div class="texts  ">
          <div class="project_heading">
            <span class="text-very-light text-[.9em] inline-block">
              [ ${slide.label} ]
            </span>
          </div>
              <p class="${TITLE_CLASSES}  ">
                ${slide.title}
              </p>
            </div>
            <div class="preview_link">
              <a href="${slide.link}" class="preview flex items-center text-[1em] gap-[.5em] leading-[.9em]">
                <span>[</span>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M5 13c0 .55.45 1 1 1h5v5c0 .55.45 1 1 1s1-.45 1-1v-5h5c.55 0 1-.45 1-1s-.45-1-1-1h-5V7c0-.55-.45-1-1-1s-1 .45-1 1v5H6c-.55 0-1 .45-1 1z"/></svg>
                <span>preview</span>
                <span>]</span>
              </a>
            </div>
          </div>
        `;

        activeSplit = new SplitText(titleWrap.querySelector("p"), {
          type: "lines",
          linesClass: "relative block will-change-transform",
          mask: "lines", // clips overflow so lines slide up from behind
        });

        // Start lines below the mask, then tween them up into view
        gsap.set(activeSplit.lines, { yPercent: 100, opacity: 0 });
        gsap.to(activeSplit.lines, {
          yPercent: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
        });
      }

      // ── Cross-fade a new slide image in over the previous one ────────────
      function animateSlide(index) {
        const overlay = imageWrap.querySelector(".overlay");
        const lastImg = imageWrap.querySelector("img:last-of-type");

        // Skip if the correct image is already on top
        if (lastImg?.src.includes(SLIDES[index].image)) return;

        const newImg = document.createElement("img");
        newImg.src = SLIDES[index].image;
        newImg.alt = `Slide ${index + 1}`;
        newImg.className = IMAGE_CLASSES;

        // Start slightly zoomed in — will scale down to 1 during the fade
        gsap.set(newImg, { opacity: 0, scale: 1.1 });

        // Insert below the overlay so the dark tint always sits on top
        overlay
          ? imageWrap.insertBefore(newImg, overlay)
          : imageWrap.appendChild(newImg);

        gsap.to(newImg, { opacity: 1, duration: 0.5, ease: "power2.out" });
        gsap.to(newImg, { scale: 1, duration: 1, ease: "power2.out" });

        // Keep the DOM tidy — never let more than 3 images stack up
        const allImgs = Array.from(imageWrap.querySelectorAll("img"));
        if (allImgs.length > 3) {
          allImgs
            .slice(0, allImgs.length - 3)
            .forEach((img) => imageWrap.removeChild(img));
        }

        // Sync the title and indicators to the new slide
        animateTitle(index);
        updateIndicators(index);
      }

      // ── Initialise the first slide ────────────────────────────────────────
      // This replaces the static <h1> that used to live in JSX.
      // GSAP now owns all title rendering from frame 0.
      buildIndicators();
      animateTitle(0);

      // ── ScrollTrigger — pins the section and drives the slider ───────────
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        // Total scroll distance = one viewport height per slide
        // end: () => `+=${window.innerHeight * SLIDES.length}px`,
        end: "+=300%",
        scrub: 1,
        pin: true,
        pinSpacing: true,

        onUpdate: (self) => {
          // Drive the progress bar by mapping scroll progress → scaleY
          gsap.set(progressBar, { scaleY: self.progress });

          // Map scroll progress to a slide index and fire animateSlide only
          // when the index actually changes (avoids redundant re-renders)
          const nextIndex = Math.min(
            Math.floor(self.progress * SLIDES.length),
            SLIDES.length - 1,
          );

          if (nextIndex !== activeSlideIndex) {
            activeSlideIndex = nextIndex;
            animateSlide(activeSlideIndex);
          }
        },
      });

      // ── Cleanup ──────────────────────────────────────────────────────────
      // useGSAP automatically kills all tweens and ScrollTriggers created
      // inside this callback when the component unmounts.
      // We only need to manually revert SplitText because it mutates the DOM
      // in a way GSAP's own cleanup doesn't cover.
      return () => {
        if (activeSplit) {
          try {
            activeSplit.revert();
          } catch (_) {}
        }
      };
    },
    { scope: containerRef }, // scopes all gsap.to / gsap.set calls to containerRef
  );

  return (
    <>

      <section
        ref={containerRef}
        className="slider relative w-full h-screen overflow-hidden"
      >
        <div ref={imageWrapRef} className="absolute inset-0 w-full h-full">
          <img className={IMAGE_CLASSES} src={SLIDES[0].image} alt="Slide 1" />
          <div className="overlay absolute inset-0 h-full w-full bg-black/40" />
        </div>

        <div
          ref={titleWrapRef}
          className="slider_title uppercase relative w-full h-full  text-very-light md:top-[50%] md:-translate-y-1/2 md:w-[50%]"
        ></div>

        {/* ── Scroll indicators (right side) ───────────────────────────────── */}
        <div className="slider_indicator absolute right-8 bottom-20 transform-none md:top-[50%] md:right-8 md:-translate-y-1/2 md:bottom-auto">
          {/* Index numbers (01, 02…) — built by buildIndicators() */}
          <div ref={indicesWrapRef} className="flex flex-col gap-4 px-5 py-4" />

          {/* Vertical progress bar track + fill */}
          <div className="slider_progress_bar absolute top-0 right-0 w-px h-full bg-gray">
            <div
              ref={progressBarRef}
              className="absolute top-0 left-[50%] -translate-x-1/2 scale-y-0 w-0.75 h-full bg-very-light will-change-transform origin-top"
            />
          </div>
        </div>

        {/* ── Outro section ─────────────────────────────────────────────────── */}
      </section>
    </>
  );
};

export default Projects;
