import { useRef, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLocation } from "react-router-dom";
gsap.registerPlugin(ScrollTrigger);

import HeroHeading from "../components/home/hero/HeroHeading";
import HeroBottomText from "../components/home/hero/HeroBottomText";
import { BP } from "../utils/BreakPoints";

import ProjectsOverview from "../components/home/projects-overview/ProjectsOverview";
import Projects from '../pages/Projects'
import Footer from "../components/common/Footer";

import UpText from "../components/animation/UpText";
import { FiArrowDownRight } from "react-icons/fi";

function Home() {
  const stickyContainer = useRef(null);
  const clipContainer = useRef(null);
  const clipHeroSec = useRef(null);
  const aboutHeading = useRef(null);
  const aboutContainer = useRef(null);
  const location = useLocation();
  const aboutText = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(BP.desktop, () => {
        
        const aboutH = aboutContainer.current.offsetHeight;
        const vh = window.innerHeight;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: clipContainer.current,
            start: "top top",
            end: () => `+=${vh * 2 + aboutH}`,
            scrub: true,
            pin: true,
            pinSpacing: true,
            refreshPriority: 3,
          },
        });

        tl.set(clipHeroSec.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        });
        tl.set(aboutHeading.current, {
          scale: 1,
          opacity: 1,
          xPercent: 140,
        });

        tl.to(clipHeroSec.current, {
          clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
          duration: 1,
        });

        tl.to(
          aboutHeading.current,
          {
            xPercent: 0,
            duration: 0.6,
          },
          0.4,
        );
        tl.to(aboutHeading.current, {
          scale: 1.2,
          duration: 0.2,
          opacity: 0.1,
        });
        
      });
      mm.add(BP.mobile, () => {
        const vh = window.innerHeight;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: clipContainer.current,
            start: "top top",
            end: () => `+=${vh * 2}`,
            scrub: true,
            pin: true,
            pinSpacing: true,
                        refreshPriority: 3,

          },
        });

        tl.set(clipHeroSec.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        });
        tl.set(aboutHeading.current, {
          scale: 1,
          opacity: 1,
          xPercent: 0,
        });

        tl.to(clipHeroSec.current, {
          clipPath: "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)",
          duration: 1,
        });

        tl.to(aboutHeading.current, {
          scale: 1.2,
          duration: 0.3,
          opacity: 0.1,
        });
      });

    // project section: starts black, turns white when about section ends
    
    },
    { scope: stickyContainer },
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
        <div
          ref={clipContainer}
          className="hero_container h-[50vh] md:h-0 w-full relative"
        >
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
            className="absolute overflow-hidden inset-0 w-full  min-h-screen  bg-light-black
                    flex items-center justify-center pointer-events-none z-10"
          >
            <div
              ref={aboutHeading}
              className="uppercase relative text-very-light flex justify-center flex-col"
            >
              <h2 className="text-[40vw] font-bebas  leading-[0.7em] pt-[0.1em]">
                about
              </h2>
            </div>
          </div>
        </div>

        <section
          ref={aboutContainer}
          className="about_container h-full w-full 
               text-very-light "
        >
          <div
            ref={aboutText}
            className="about_text relative flex flex-col px-[1.5em] md:px-[15em] pt-[5em] pb-[13em] uppercase gap-[2em] md:gap-[4em]  "
          >
    
            <div className="about_heading self-center w-full leading-[.9em] overflow-hidden   ">
              <div className="project_number absolute left-[5%]  ">
                <UpText delay={0.4} duration={1} animateOnScroll={false}>
                  <UpText
                    delay={0.5}
                    duration={1}
                    splitType="lines"
                    disableOnMobile
                  >
                    <span className="uppercase text-[clamp(.694rem,1vw,1rem)] leading-tight text-gray ">
                      [ 02 - about me ]
                    </span>
                  </UpText>
                </UpText>
              </div>

              <h2 className="leading-[.9em] text-right md:text-center w-full text-[clamp(1rem,2vw,2rem)]  tracking-tight flex-col flex    ">
                <UpText duration={0.5} splitType="chars">
                  <span>hello!</span>
                </UpText>
                <UpText delay={0.3} duration={0.5} splitType="chars">
                  <span>i'm vimal verma</span>
                </UpText>
              </h2>
            </div>

            <div className="about_para1 md:w-[65%] w-full self-start  cursor-target m:p-[.5em] ">
              <div className="about_para_heading  leading-[.9em] text-dark-light overflow-hidden mb-[1em] ">
                <h2 className="leading-[.9em] flex items-center gap-[1em] text-left text-[clamp(0.9rem,2vw,2rem)] tracking-tight">
                  <UpText delay={0.5} duration={1} splitType="chars">
                    <span>intro</span>
                  </UpText>
                  <UpText delay={0.8} duration={1}>
                    <FiArrowDownRight className="text-[1.1em]" />
                  </UpText>
                </h2>
              </div>

              <div className="about_text text-[clamp(0.694rem,1vw,1rem)] ">
                <UpText delay={0.7} duration={1}>
                  <p className=" mb-[.5em] ">
                    I’m a creative developer who enjoys building modern web
                    experiences that combine design and engineering. I focus on
                    creating interfaces that feel clear, responsive, and
                    visually balanced.
                  </p>
                </UpText>
                <UpText delay={0.9} duration={1}>
                  <p className="text-left ">
                    Most of my work involves translating ideas into structured
                    interfaces and interactive elements. I like building
                    websites that feel thoughtful and intentional rather than
                    simply functional.
                  </p>
                </UpText>
              </div>
            </div>

            <div className="about_para2 md:w-[65%] w-full self-end  cursor-target m:p-[.5em]  ">
              <div className="about_para_heading  leading-[.9em] text-dark-light overflow-hidden mb-[1em] ">
                <h2 className="leading-[.9em] flex items-center gap-[1em] text-left text-[clamp(0.9rem,2vw,2rem)] tracking-tight">
                  <UpText delay={0.5} duration={1} splitType="chars">
                    <span>my journey</span>
                  </UpText>
                  <UpText delay={0.7} duration={1}>
                    <FiArrowDownRight className="text-[1.1em]" />
                  </UpText>
                </h2>
              </div>

              <div className="about_text text-[clamp(0.694rem,1vw,1rem)] ">
                <UpText delay={0.7} duration={1}>
                  <p className=" mb-[.5em] ">
                    My interest in development started with curiosity about how
                    digital experiences are built. Over time that curiosity
                    turned into a deeper focus on frontend development,
                    interface structure, and interaction.
                  </p>
                </UpText>{" "}
                <UpText delay={0.9} duration={1}>
                  <p className=" mb-[.5em] ">
                    Today I work mainly with React, GSAP, and modern frontend
                    tools to create interactive websites. At the same time, I’m
                    expanding into full stack development using the PERN stack
                    to understand how complete web systems are designed and
                    built.
                  </p>
                </UpText>{" "}
              </div>
            </div>
            <div className="about_para3 md:w-[65%] w-full self-start  cursor-target m:p-[.5em]  ">
              <div className="about_para_heading  leading-[.9em] text-dark-light overflow-hidden mb-[1em] ">
                <h2 className="leading-[.9em] flex items-center gap-[1em] text-left text-[clamp(0.9rem,2vw,2rem)]  tracking-tight    ">
                  <UpText delay={0.5} duration={1} splitType="chars">
                    <span>what i build</span>
                  </UpText>
                  <UpText delay={0.7} duration={1}>
                    <FiArrowDownRight className="text-[1.1em]" />
                  </UpText>
                </h2>
              </div>

              <div className="about_text text-[clamp(0.694rem,1vw,1rem)] ">
                <UpText delay={0.5} duration={1}>
                  <p className=" mb-[.5em] ">
                    I mostly build modern websites and interactive interfaces
                    where layout, motion, and user interaction work together.
                    These projects allow me to explore both visual thinking and
                    technical structure.
                  </p>
                </UpText>{" "}
                <UpText delay={0.5} duration={1}>
                  <p className=" mb-[.5em] ">
                    I enjoy building products that start from a design idea and
                    gradually evolve into functional systems. My goal is to
                    create work that feels engaging for users while remaining
                    stable, clean, and scalable under the hood.
                  </p>
                </UpText>{" "}
              </div>
            </div>
            <div className="about_para4 hidden md:block  md:w-[65%] w-full self-end  cursor-target m:p-[.5em]  ">
              <div className="about_para_heading  leading-[.9em] text-dark-light overflow-hidden mb-[1em] ">
                <h2 className="leading-[.9em] flex items-center gap-[1em] text-left text-[clamp(0.9rem,2vw,2rem)]  tracking-tight    ">
                  <UpText delay={0.2} duration={1} splitType="chars">
                    <span>my approach</span>
                  </UpText>
                  <UpText delay={0.4} duration={1}>
                    <FiArrowDownRight className="text-[1.1em]" />
                  </UpText>
                </h2>
              </div>

              <div className="about_text text-[clamp(0.694rem,1vw,1rem)] ">
                <UpText delay={0.6} duration={1}>
                  <p className=" mb-[1em] ">
                    When I work on a project, I usually begin by understanding
                    the idea and defining the structure of the interface. Once
                    the foundation is clear, I focus on interactions and how the
                    experience will feel for the user.
                  </p>
                </UpText>
                <UpText delay={0.8} duration={1}>
                  <p className=" ">
                    From there, the project moves toward refinement and
                    performance. I aim to keep the code organized, the
                    interactions purposeful, and the final result consistent
                    across different devices.
                  </p>
                </UpText>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ========== PROJECT SECTION ========== */}
      <ProjectsOverview />
      <Projects/>


      {/* ========== SKILLS SECTION ========== */}
      <section
        id="skills"
        className="relative min-h-svh z-10 text-light-black flex items-center justify-center px-[2em] bg-red-500 shrink max-sm:px-[1em]"
      >
        <div className="section border flex w-50% h-full p-5 shrink ">
          <div className="h-50 w-30 border hover:grow-2 "></div>
          <div className="h-50 w-30 border  "></div>
          <div className="h-50 w-30 border  "></div>
          <div className="h-50 w-30 border  "></div>
          <div className="h-50 w-30 border  "></div>
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
      {/* ========== PHILOSPHY SECTION ========== */}
      <section className="relative min-h-svh z-10 grain text-white overflow-hidden flex items-center justify-center">
        <div className="philo_container  ">
          <UpText delay={0.1} duration={1}>
            <span className="uppercase text-center text-gray text-[clamp(.5rem,1vw,1rem)]">
              [ MY PHILOSOPHY ]
            </span>
          </UpText>

          <UpText delay={0.2} duration={1}>
            <h2 className="uppercase text-white text-[clamp(1rem,10vw,10rem)] font-bebas leading-[.85] text-center pt-[.1em]">
              <div>design is not decoration</div>
              <div> it is clarity, </div>
              <div> motion, and experience.</div>
            </h2>
          </UpText>

          <UpText delay={0.2} duration={1}>
            <p className="uppercase text-gray text-center">
              i combine design thinking with technical precision to create
              digital experiences that feel structured and alive
            </p>
          </UpText>
        </div>
      </section>

      {/* ========== FOOTER SECTION ========== */}
      <Footer />
    </>
  );
}

export default Home;
