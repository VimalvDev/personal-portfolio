import { useRef, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLocation } from "react-router-dom";
gsap.registerPlugin(ScrollTrigger);

import HeroHeading from "../components/home/hero/HeroHeading";
import HeroBottomText from "../components/home/hero/HeroBottomText";

import ProjectsOverview from "../components/home/projects-overview/ProjectsOverview";
import Footer from "../components/common/Footer";

import UpText from "../components/animation/UpText";

function Home() {
  const stickyContainer = useRef(null);
  const clipContainer = useRef(null);
  const clipHeroSec = useRef(null);
  const aboutHeading = useRef(null);
  const aboutContainer = useRef(null);
  const location = useLocation();

  useGSAP(
    () => {
      // We need aboutContainer height to extend the pin duration
      const aboutH = aboutContainer.current.offsetHeight;
      const vh = window.innerHeight;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: clipContainer.current,
          start: "top top",
          end: () => `+=${vh * 3 + aboutH}`,
          scrub: true,
          pin: true,
          pinSpacing: true,
          refreshPriority: 1,
        },
      });

      tl.set(clipHeroSec.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      });
      tl.set(aboutHeading.current, {
        scale: 1,
        color: "white",
      });
      tl.set(aboutContainer.current, {
        yPercent: 0,
      });

      tl.to(clipHeroSec.current, {
        clipPath: "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)",
        duration: 1,
      });

      tl.to(aboutHeading.current, {
        scale: 1.5,
        duration: 0.6,
        color: "#4b4852",
      });
      tl.to(
        aboutContainer.current,
        {
          yPercent: -100,
          duration: 1,
        },
        1,
      );
    },
    { scope: aboutContainer },
  );
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
      <div ref={stickyContainer} className="relative">
        <div ref={clipContainer} className="hero_container relative">
          <section ref={clipHeroSec} className="relative z-20 w-full">
            <div
              className="hero_page flex relative overflow-x-hidden pb-[1.5em]
                      pt-[6em] bg-very-light min-h-svh w-full flex-col
                      px-[2em] max-sm:px-[1em] justify-between"
            >
              <HeroHeading />
              <HeroBottomText />
            </div>
          </section>

          <div
            className="absolute inset-0 w-full h-screen bg-light-black
                    flex items-center justify-center pointer-events-none z-10"
          >
            <div
              ref={aboutHeading}
              className="uppercase relative text-white flex justify-center flex-col"
            >
              <h2 className="text-[30vw] font-bebas font-bold leading-[0.7em] pt-[0.1em]">
                about
              </h2>
            </div>
          </div>
        </div>

        <section
          ref={aboutContainer}
          className="about_container absolute w-full overflow-hidden z-30 
               text-2xl text-white px-[10em] py-[4em] flex flex-col gap-5"
          // style={{ marginTop: "-100vh" }}
        >
          <h1>My name is vimal</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur
            et, corporis repellendus velit voluptatem inventore doloribus
            dolorum impedit maiores alias architecto, repellat, molestias
            quisquam odio! Molestias quas officia debitis deserunt!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur
            et, corporis repellendus velit voluptatem inventore doloribus
            dolorum impedit maiores alias architecto, repellat, molestias
            quisquam odio! Molestias quas officia debitis deserunt!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur
            et, corporis repellendus velit voluptatem inventore doloribus
            dolorum impedit maiores alias architecto, repellat, molestias
            quisquam odio! Molestias quas officia debitis deserunt!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur
            et, corporis repellendus velit voluptatem inventore doloribus
            dolorum impedit maiores alias architecto, repellat, molestias
            quisquam odio! Molestias quas officia debitis deserunt!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur
            et, corporis repellendus velit voluptatem inventore doloribus
            dolorum impedit maiores alias architecto, repellat, molestias
            quisquam odio! Molestias quas officia debitis deserunt!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur
            et, corporis repellendus velit voluptatem inventore doloribus
            dolorum impedit maiores alias architecto, repellat, molestias
            quisquam odio! Molestias quas officia debitis deserunt!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur
            et, corporis repellendus velit voluptatem inventore doloribus
            dolorum impedit maiores alias architecto, repellat, molestias
            quisquam odio! Molestias quas officia debitis deserunt!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur
            et, corporis repellendus velit voluptatem inventore doloribus
            dolorum impedit maiores alias architecto, repellat, molestias
            quisquam odio! Molestias quas officia debitis deserunt!
          </p>

          {/* ...all your content */}
        </section>
      </div>

      {/* ========== PHILOSPHY SECTION ========== */}
      <section
        id="about"
        className="relative min-h-svh z-10 text-white overflow-hidden flex items-center justify-center"
      >
        <div className="philo_container   ">
          <UpText delay={0.1} duration={1} animateOnScroll={true}>
            <span className="uppercase text-center text-gray text-[clamp(.5rem,1vw,1rem)]">
              [ 02 - about me ]
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
      </section>

      {/* ========== PROJECT SECTION ========== */}
      <ProjectsOverview />

      {/* ========== SKILLS SECTION ========== */}
      <section
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
      </section>

      {/* ========== CONNECT SECTION ========== */}
      <section
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
      </section>

      {/* ========== FOOTER SECTION ========== */}
      <Footer />
    </>
  );
}

export default Home;
