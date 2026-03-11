import React from "react";
import { useRef } from "react";

// GSAP
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);

// Components
import HeroHeading from "../hero/HeroHeading";
import HeroBottomText from "../hero/HeroBottomText";
import UpText from "../../animation/UpText";

// Utilities & Icons
import { BP } from "../../../utils/BreakPoints";
import { FiArrowDownRight } from "react-icons/fi";

const AboutStickyContainer = () => {
  const stickyContainer = useRef(null);
  const clipContainer = useRef(null);
  const clipHeroSec = useRef(null);
  const aboutHeading = useRef(null);
  const aboutContainer = useRef(null);

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
            refreshPriority: 50,
          },
        });

        tl.set(clipHeroSec.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        });
        tl.set(aboutHeading.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        });
        tl.set(aboutContainer.current, {
          yPercent: 100,
        });

        tl.to(clipHeroSec.current, {
          clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
          duration: 1,
        });

        tl.to(aboutHeading.current, {
          duration: 1,
          clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
        });

        tl.to(
          aboutContainer.current,
          {
            yPercent: 0,
            duration: 1,
            onComplete: () => {
              gsap.delayedCall(0.1, () => {
                ScrollTrigger.refresh();
              });
            },
          },
          0.9,
        );
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
            refreshPriority: 50,
          },
        });

        tl.set(clipHeroSec.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        });
        tl.set(aboutHeading.current, {
          xPercent: 0,
        });
        tl.set(aboutContainer.current, {
          yPercent: 100,
        });

        tl.to(clipHeroSec.current, {
          clipPath: "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)",
          duration: 1,
        });

        tl.to(
          aboutContainer.current,
          {
            yPercent: 0,
            duration: 1,
            onComplete: () => {
              gsap.delayedCall(0.1, () => {
                ScrollTrigger.refresh();
              });
            },
          },
          0.8,
        );
      });
    },
    { scope: stickyContainer },
  );
  return (
    <div ref={stickyContainer} className="relative">
      <div
        ref={clipContainer}
        className="hero_container h-[50vh] md:h-0 w-full relative"
      >
        <section
          ref={clipHeroSec}
          className="  hero  bg-very-light relative z-20 w-full"
        >
          <div
            className="hero_page flex relative overflow-x-hidden pb-[1.5em]
                      md:pt-[6em] pt-[10em] min-h-svh w-full flex-col
                      md:px-[2em] px-[1em] justify-between"
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
        <div className="about_text relative flex flex-col px-[1.5em] md:px-[15em] md:pt-[25em]  md:pb-[13em] pb-[8em] pt-[5em] uppercase gap-[2em] md:gap-[4em]  ">
          <div className="about_heading self-center w-full leading-[.9em] overflow-hidden   ">
            <div className="project_number absolute md:left-[2%]  ">
              <UpText delay={0.4} duration={1}>
                <UpText delay={0.5} duration={1} splitType="lines">
                  <span className="uppercase text-[clamp(.694rem,1vw,1rem)] leading-tight text-gray ">
                    [ 02 - about me ]
                  </span>
                </UpText>
              </UpText>
            </div>

            <h2 className="leading-[.9em] text-right md:text-center w-full text-[clamp(1rem,2vw,2rem)]  tracking-tight flex-col flex gap-[.4em]    ">
              <UpText duration={0.5} splitType="chars">
                <span>hello!</span>
              </UpText>
              <UpText delay={0.3} duration={0.5} splitType="chars">
                <span>i'm vimal verma</span>
              </UpText>
            </h2>
          </div>

          <div className="about_para1 md:w-[65%] w-full self-start  ">
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
                  creating interfaces that feel clear, responsive, and visually
                  balanced.
                </p>
              </UpText>
              <UpText delay={0.9} duration={1}>
                <p className="text-left ">
                  Most of my work involves translating ideas into structured
                  interfaces and interactive elements. I like building websites
                  that feel thoughtful and intentional rather than simply
                  functional.
                </p>
              </UpText>
            </div>
          </div>

          <div className="about_para2 md:w-[65%] w-full self-end    md:p-[.5em]  ">
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
                  digital experiences are built. Over time that curiosity turned
                  into a deeper focus on frontend development, interface
                  structure, and interaction.
                </p>
              </UpText>{" "}
              <UpText delay={0.9} duration={1}>
                <p className=" mb-[.5em] ">
                  Today I work mainly with React, GSAP, and modern frontend
                  tools to create interactive websites. At the same time, I’m
                  expanding into full stack development using the PERN stack to
                  understand how complete web systems are designed and built.
                </p>
              </UpText>{" "}
            </div>
          </div>
          <div className="about_para3 md:w-[65%] w-full self-start       ">
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
                  gradually evolve into functional systems. My goal is to create
                  work that feels engaging for users while remaining stable,
                  clean, and scalable under the hood.
                </p>
              </UpText>{" "}
            </div>
          </div>
          <div className="about_para4 hidden md:block  md:w-[65%] w-full self-end       ">
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
                  When I work on a project, I usually begin by understanding the
                  idea and defining the structure of the interface. Once the
                  foundation is clear, I focus on interactions and how the
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
  );
};

export default AboutStickyContainer;
