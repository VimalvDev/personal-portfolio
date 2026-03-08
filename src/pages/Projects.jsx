import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { MdArrowOutward } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

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

const IMAGE_CLASSES   = "w-full h-full object-cover";
const WRAPPER_CLASSES = "img-wrapper absolute inset-0 w-full h-full";

const SlideIndicator = ({ index, markerRef, numberRef }) => (
  <p data-index={index} className="flex items-center gap-4 text-white">
    <span
      ref={markerRef}
      className="marker relative w-3 h-px bg-white origin-right will-change-transform"
    />
    <span
      ref={numberRef}
      className="number relative w-5 flex justify-end will-change-opacity"
    >
      {(index + 1).toString().padStart(2, "0")}
    </span>
  </p>
);

const Projects = () => {
  const containerRef   = useRef(null);
  const progressBarRef = useRef(null);
  const imageWrapRef   = useRef(null);
  const labelRef       = useRef(null);
  const descRef        = useRef(null);
  const previewRef     = useRef(null);

  const markerRefs = useRef(SLIDES.map(() => React.createRef()));
  const numberRefs = useRef(SLIDES.map(() => React.createRef()));

  useGSAP(
    () => {
      const progressBar = progressBarRef.current;
      const imageWrap   = imageWrapRef.current;
      const label       = labelRef.current;
      const desc        = descRef.current;
      const preview     = previewRef.current;
      if (!progressBar || !imageWrap || !label || !desc || !preview) return;

      let state = { activeIndex: -1, activeSplit: null };

      // Starts from bottom edge, reveals upward
      const closed = "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)";
      const open   = "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)";

      // ── Indicators ──────────────────────────────────────────────────
      function updateIndicators(idx) {
        SLIDES.forEach((_, i) => {
          const marker = markerRefs.current[i].current;
          const number = numberRefs.current[i].current;
          if (!marker || !number) return;
          const isActive = i === idx;
          gsap.to(number, { opacity: isActive ? 1 : 0.5, duration: 0.3, ease: "power2.out" });
          gsap.to(marker, { scaleX: isActive ? 1 : 0,    duration: 0.3, ease: "power2.out" });
        });
      }

      // ── Title ────────────────────────────────────────────────────────
      function animateTitle(idx) {
        if (state.activeSplit) {
          try { state.activeSplit.revert(); } catch (_) {}
          state.activeSplit = null;
        }
        const slide = SLIDES[idx];
        label.textContent = `[ ${slide.label} ]`;
        desc.textContent  = slide.title;
        preview.href      = slide.link;

        state.activeSplit = new SplitText(desc, {
          type: "lines",
          linesClass: "relative block will-change-transform",
          mask: "lines",
        });
        gsap.set(state.activeSplit.lines, { yPercent: 110 });
        gsap.to(state.activeSplit.lines, {
          yPercent: 0,
          duration: 0.75,
          stagger: { amount: 0.4, from: "start" },
          ease: "power4.out",
        });
      }

      function goToSlide(idx) {
        if (idx === state.activeIndex) return;
        state.activeIndex = idx;
        animateTitle(idx);
        updateIndicators(idx);
      }

      // ── Init indicators ──────────────────────────────────────────────
      SLIDES.forEach((_, i) => {
        const marker = markerRefs.current[i].current;
        const number = numberRefs.current[i].current;
        if (!marker || !number) return;
        gsap.set(number, { opacity: i === 0 ? 1 : 0.35 });
        gsap.set(marker, { scaleX: i === 0 ? 1 : 0 });
      });

      // ── Build image wrappers ─────────────────────────────────────────
      const overlay = imageWrap.querySelector(".overlay");
      const wrappers = [];

      SLIDES.forEach((slide, i) => {
        const wrapper = document.createElement("div");
        wrapper.className = WRAPPER_CLASSES;

        const img = document.createElement("img");
        img.src       = slide.image;
        img.alt       = `Slide ${i + 1}`;
        img.className = IMAGE_CLASSES;
        wrapper.appendChild(img);

        // Slide 0 is the base — always fully open underneath everything
        gsap.set(wrapper, { clipPath: i === 0 ? open : closed });

        overlay
          ? imageWrap.insertBefore(wrapper, overlay)
          : imageWrap.appendChild(wrapper);

        wrappers.push(wrapper);
      });

      goToSlide(0);

      // ── Main timeline — one big scrubbed timeline, exactly like Home ──
      // Total scroll = 300% (3 × viewport). Split into 3 equal segments,
      // one per slide transition (slide 0 is already visible at start).
      // Each segment tweens the next wrapper from closed → open.
      // GSAP scrub interpolates the polygon — buttery smooth, same as Home.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          scrub: true,          // same as Home — no numeric scrub lag
          pin: true,
          pinSpacing: true,
                      refreshPriority: 1,


          onUpdate: (self) => {
            gsap.set(progressBar, { scaleY: self.progress });

            // Each slide occupies 1/SLIDES.length of total progress.
            // Fire the swap 25% into each segment so it feels early/responsive.
            const segmentSize = 1 / SLIDES.length;
            const shifted = self.progress + segmentSize * 0.25;
            const nextIndex = Math.min(
              Math.floor(shifted * SLIDES.length),
              SLIDES.length - 1,
            );
            goToSlide(nextIndex);
          },
        },
      });

      // Slides 1, 2, 3 each get one segment of the timeline
      // duration values just need to be equal — GSAP scrub scales them
      SLIDES.slice(1).forEach((_, i) => {
        const idx = i + 1; // actual slide index
        tl.fromTo(
          wrappers[idx],
          { clipPath: closed },
          { clipPath: open, duration: 1, ease: "none" },
        );
      });

      return () => {
        if (state.activeSplit) {
          try { state.activeSplit.revert(); } catch (_) {}
        }
      };
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="slider relative w-full h-screen overflow-hidden"
    >
      <div ref={imageWrapRef} className="absolute inset-0 w-full h-full">
        <div className="overlay absolute inset-0 h-full w-full bg-black/40 z-10" />
      </div>

      <div className="slider_title uppercase relative w-full h-full z-20 text-very-light md:top-[50%] pt-[3em] md:pt-0 md:-translate-y-1/2 md:w-[50%]">
        <div className="flex flex-col py-[5vw] px-[2em] justify-between h-full">
          <div className="numbering">
            <h1 className="text-[10vw] text-bebas " >01</h1>
          </div>
          <div className="texts overflow-hidden">
            <div className="project_heading">
              <span ref={labelRef} className="text-very-light text-[.9em] inline-block" />
            </div>
            <p
              ref={descRef}
              className="desc text-[clamp(1rem,1vw,1rem)] mb-[10em] font-mono leading-[.9em] inline-block"
            />
          </div>
          <div className="preview_link">
            <a
              ref={previewRef}
              href={SLIDES[0].link}
              className="preview flex items-center text-[1em] gap-[.5em] leading-[.9em]"
            >
              <span>[</span>
              <span>preview</span>
              <MdArrowOutward className="w-5 h-5" />
              <span>]</span>
            </a>
          </div>
        </div>
      </div>

      <div className="slider_indicator absolute right-8 bottom-20 z-20 transform-none md:top-[50%] md:right-8 md:-translate-y-1/2 md:bottom-auto">
        <div className="flex flex-col gap-4 px-5 py-4">
          {SLIDES.map((_, i) => (
            <SlideIndicator
              key={i}
              index={i}
              markerRef={markerRefs.current[i]}
              numberRef={numberRefs.current[i]}
            />
          ))}
        </div>

        <div className="slider_progress_bar absolute top-0 right-0 w-px h-full bg-gray">
          <div
            ref={progressBarRef}
            className="absolute top-0 left-[50%] -translate-x-1/2 scale-y-0 w-0.75 h-full bg-very-light will-change-transform origin-top"
          />
        </div>
      </div>
    </section>
  );
};

export default Projects;