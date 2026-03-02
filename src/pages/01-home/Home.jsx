import { useRef, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLocation } from "react-router-dom";
gsap.registerPlugin(ScrollTrigger);

import HeroHeading from "../../components/home/hero/HeroHeading";
import HeroBottomText from "../../components/home/hero/HeroBottomText";
import ProjectsOverview from "../../components/home/projects-overview/ProjectsOverview";
import UpText from "../../components/animation/UpText";
import ScrollHeading from "../../components/animation/ScrollHeading";

function Home() {
  // Refs for controlling different animation sections
  const container = useRef(null); // Main container that will be PINNED
  const clipCont = useRef(null); // Controls the hero section's clipPath animation
  const aboutText = useRef(null); // The "about me" heading text that scales up
  const location = useLocation(); // Get current URL including hash

  /**
   * CLIPPATH SHOWCASE ANIMATION FLOW:
   *
   * ========== STAGE 1: HERO PINNED (User scrolls but hero stays) ==========
   * - Hero section stays locked in viewport (pin: true)
   * - clipPath animates: fully visible → shrinks to middle line
   * - As hero "cuts away", it reveals ABOUT heading underneath
   * - About text scales up, coming into focus
   *
   * ========== STAGE 2: REVEAL TRANSITION ==========
   * - clipPath continues to shrink
   * - About heading grows and becomes fully visible
   * - User sees smooth transition between hero and about
   *
   * ========== STAGE 3: PIN ENDS, PHILO APPEARS ==========
   * - Once pin animation completes, pin releases
   * - Normal scrolling resumes
   * - Philo section enters viewport naturally
   * - UpText animations trigger as philo comes into view
   *
   * KEY STRUCTURE:
   * 1. Pinned container (hero + about) - animation showcase
   * 2. Philo section outside pin - normal scroll animations
   */

  // HERO CLIPPATH ANIMATION: Pin hero and reveal about through clipPath shrinking
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top", // Start animation when hero reaches viewport top
          end: "+=300%", // Animation lasts through 300% viewport scroll
          scrub: true, // Tie directly to scroll position
          pin: true, // IMPORTANT: Pin this container while animation plays
          /**
           * REFRESHPRIORITY EXPLANATION:
           * 
           * When multiple ScrollTrigger animations with pin: true run,
           * they can conflict. refreshPriority tells GSAP which pin to prioritize.
           * 
           * Lower number = lower priority
           * - Hero pin: refreshPriority: 0 (default, lower priority)
           * - ScrollHeading pin: refreshPriority: 1 (higher priority)
           * 
           * Result: If ScrollHeading is active, its pin takes control.
           * Hero pin gracefully yields, preventing position conflicts.
           */
          refreshPriority: 0, // Lower priority than ScrollHeading (priority: 1)
        },
      });

      // ========== INITIAL STATE: Hero fully visible ==========
      tl.set(clipCont.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Full rectangle - completely visible
      });
      tl.set(aboutText.current, {
        scale: 1, // About text at normal size
      });

      // ========== ANIMATION: Shrink hero clipPath to reveal about ==========
      // Hero collapses from top and bottom, creating a shrinking effect
      tl.to(clipCont.current, {
        clipPath: "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)", // Shrink to middle line
        duration: 1, // Extend duration so it's smooth across the long scroll
      });

      // About heading grows as hero shrinks away
      tl.to(aboutText.current, {
        scale: 1.5, // Grows to 150% - draws user attention to the revealed content
        duration: 0.8,
      });
    },
    { scope: container },
  );

  // Handle hash-based scrolling when URL changes
  useEffect(() => {
    // Extract hash from URL (e.g., "#about" from "/#about")
    const hash = location.hash;

    if (hash) {
      // Wait a bit for DOM to be ready, then scroll to element
      const timer = setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [location.hash]); // Re-run when hash changes

  return (
    <>
      {/*
        PINNED CONTAINER: While scrolling, this stays locked in viewport.
        The animation happens WITHIN this pinned space, creating the
        showcase/transition effect between hero and about.
      */}
      <div ref={container} className="relative">
        {/* ========== HERO SECTION ========== */}
        {/*
          Hero with clipPath animation.
          As user scrolls while pinned, clipPath shrinks from full view → middle line.
          This creates the illusion of hero "cutting away" to reveal what's underneath.
        */}
        <div ref={clipCont} className="relative z-20 w-full">
          <div className="hero_page flex relative overflow-x-hidden bg-very-light min-h-svh w-full flex-col px-[2em] max-sm:px-[1em] justify-between py-[1em]">
            {/* Hero heading: "creative developer" + skills */}
            <HeroHeading />
            {/* Hero bottom: Additional text and images */}
            <HeroBottomText />
          </div>
        </div>

        {/* ========== ABOUT SECTION (BEHIND HERO) ========== */}
        {/*
          About section positioned absolutely - it sits BEHIND the hero.
          As clipPath shrinks, this section becomes visible through the shrinking clipPath.
          The "about me" text scales up to emphasize the reveal.
          
          pointer-events-none: Allows clicks to pass through to content below
          inset-0: Positions it to match the hero's viewport space
        */}
        <div className="absolute inset-0 w-full h-full bg-light-black text-white flex items-center justify-center pointer-events-none">
          <div
            ref={aboutText}
            className="uppercase text-white flex justify-center flex-col"
          >
            <span className="uppercase text-[clamp(.694rem,1vw,1rem)] text-center leading-tight text-mid-gray">
              [ 02 - about ]
            </span>
            <h2 className="text-[20vw] font-bebas font-bold leading-[0.7em] pt-[0.1em]">
              about me
            </h2>
          </div>
        </div>
      </div>

      {/* ========== PHILOSOPHY SECTION ========== */}
      {/*
        This section is OUTSIDE the pinned container.
        
        Why outside? 
        - Pin effect ends after the container
        - Philo section naturally enters the viewport
        - UpText animations trigger correctly as user scrolls to this section
        
        Each text element uses animateOnScroll={true}:
        - When the text element comes into view (75% down viewport)
        - It animates up from below (SplitText by lines)
        - Creates a smooth reveal effect as user scrolls
      */}

      <div id="about" className="relative min-h-svh bg-light-black z-10 text-white flex items-center justify-center">

        <div className="philo_container">
          <UpText delay={0.1} duration={1} animateOnScroll={true}>
            <span className="uppercase text-center text-gray text-[clamp(.5rem,1vw,1rem)]">
              [ my thinking ]
            </span>
          </UpText>

          <UpText delay={0.2} duration={1} animateOnScroll={true}>
            <h2 className="uppercase text-white text-[clamp(1rem,8vw,8rem)] font-bebas leading-[.85] px-[1em] text-center pt-[.1em]">
              design is not decoration. it is clarity, motion, and experience.
            </h2>
          </UpText>

          <UpText delay={0.2} duration={1} animateOnScroll={true}>
            <p className="uppercase text-gray text-center">
              i combine design thinking with technical precision to create
              digital experiences that feel structured and alive
            </p>
          </UpText>
        </div>
      </div>

      {/* ========== SKILLS SECTION ========== */}
      {/* 
        This section can be accessed via nav using #skills hash link.
        Add your skills content here.
      */}
      <div
        id="skills"
        className="relative min-h-svh bg-very-light z-10 text-light-black flex items-center justify-center px-[2em] max-sm:px-[1em]"
      >
        <div className="skills_container text-center">
          <span className="uppercase text-[clamp(.694rem,1vw,1rem)] text-center leading-tight text-mid-gray">
            [ 04 - skills ]
          </span>
          <h2 className="text-[clamp(1rem,8vw,8rem)] font-bebas font-bold leading-[0.7em] pt-[0.5em]">
            my expertise
          </h2>
          {/* Add your skills content here */}
        </div>
      </div>

      {/* ========== CONNECT SECTION ========== */}
      {/* 
        This section can be accessed via nav using #connect hash link.
        Add your contact/connect content here.
      */}
      <div
        id="connect"
        className="relative min-h-svh bg-light-black z-10 text-white flex items-center justify-center px-[2em] max-sm:px-[1em]"
      >
        <div className="connect_container text-center">
          <span className="uppercase text-[clamp(.694rem,1vw,1rem)] text-center leading-tight text-mid-gray">
            [ 05 - connect ]
          </span>
          <h2 className="text-[clamp(1rem,8vw,8rem)] font-bebas font-bold leading-[0.7em] pt-[0.5em]">
            let's connect
          </h2>
          {/* Add your contact/social links here */}
        </div>
      </div>

      {/* Commented out sections for future use */}
      {/* <ProjectsOverview /> */}
      {/* <ScrollHeading text="my skills" /> */}
    </>
  );
}

export default Home;
