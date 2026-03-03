import { FaArrowRight } from "react-icons/fa";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { BP } from "../../../utils/BreakPoints";
import UpText from "../../animation/UpText";
gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    src: "/imgs/portfolio.png",
    type: "creative frontend - portfolio system",
    heading1: "personal",
    heading2: "portfolio",
    desc: "A motion-driven portfolio designed to combine bold typography, smooth scrolling, and interactive transitions into a structured, modern web experience.",
    skills: [
      "react",
      "gsap",
      "scrolltrigger",
      "motion architecture",
      "interaction design",
    ],
  },
  {
    src: "/imgs/screen.png",
    type: "full stack - ai platform",
    heading1: "Learnova",
    heading2: false,
    desc: "A PERN-based AI learning platform integrating RAG pipelines and LLM APIs to transform study materials into contextual Q&A, flashcards, and adaptive learning workflows.",
    skills: [
      "postgresql",
      "express",
      "react",
      "node.js",
      "typescript",
      "rag pipeline",
      "llm integration",
      "rest apis",
      "team project",
    ],
  },
];

function ProjectsOverview() {
  const headingSecRef = useRef(null);
  const wrapperRef = useRef(null);

  const centerRef = useRef(null);
  const topRef = useRef(null);
  const bottomRef = useRef(null);

  const projectsContainer = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      //desktop
      mm.add(BP.desktop, () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: headingSecRef.current,
            start: "top top",
            end: "+=300%",
            scrub: true,
            pin: true,
            refreshPriority: 0, // Pin this has higher priority than hero (default 0)
          },
        });

        // slide inital values
        gsap.set(topRef.current, {
          xPercent: -100,
        });
        gsap.set(centerRef.current, {
          xPercent: 100,
        });
        gsap.set(bottomRef.current, {
          xPercent: -100,
        });
        gsap.set(projectsContainer.current, {
          yPercent: 0,
        });

        tl.to([topRef.current, centerRef.current, bottomRef.current], {
          xPercent: 0,
          ease: "none",
          duration: 1,
        });

        tl.to(
          topRef.current,
          {
            yPercent: 100,
            ease: "none",
            duration: 1,
          },
          1,
        );
        tl.to(
          bottomRef.current,
          {
            yPercent: -100,
            ease: "none",
            duration: 1,
          },
          1,
        );

        tl.to(wrapperRef.current, {
          scale: 1.33,
          ease: "none",
          duration: 0.6,
        });
        tl.to(
          projectsContainer.current,
          {
            yPercent: -20,
            duration: 0.6,
          },
          2,
        );
      });
    },
    { scope: wrapperRef },
  );

  return (
    <section ref={headingSecRef} className="bg-very-light overflow-x-hidden ">
      <div className="min-h-screen max-sm:min-h-[5svh]  max-sm:pt-[1em] w-full overflow-hidden pt-[8em]">
        <div
          ref={wrapperRef}
          className="h-full flex flex-col mb-[5em] justify-start uppercase"
        >
          <div className="overflow-hidden">
            <h1
              ref={topRef}
              className="w-screen text-center text-[18vw] max-sm:text-[16vw] font-bold pt-[.1em] leading-[0.68]"
            >
              my projects
            </h1>
          </div>

          <div className="overflow-hidden">
            <h1
              ref={centerRef}
              className="w-screen text-center text-[18vw] max-sm:text-[16vw] font-bold pt-[.1em] leading-[0.68]"
            >
              my projects{" "}
            </h1>
          </div>

          <div className="overflow-hidden">
            <h1
              ref={bottomRef}
              className="w-screen text-center text-[18vw] max-sm:text-[16vw] font-bold pt-[.1em] leading-[0.68]"
            >
              my projects{" "}
            </h1>
          </div>
        </div>
      </div>

      <div
        ref={projectsContainer}
        className="project_container  min-h-screen w-full flex-col px-[2em] max-sm:px-[1em]  py-[1em]   "
      >
        <div className="project_top_text pt-[1em] max-sm:pt-0 mb-[2em]  ">
          <div className="page_project_number mb-[.5vw] flex  justify-between items-center ">
            <UpText delay={1} duration={1}>
              <span className="uppercase text-mid-gray text-[clamp(.694rem,1vw,1rem)]  ">
                [ 03 - selected projects ]
              </span>
            </UpText>
            <div className="project_heading-text flex justify-between bo items-center ">
              <a
                href="/projects"
                className="project_type uppercase py-[1em] items-center flex gap-[1em] text-mid-gray "
              >
                <span>show all</span>
                <FaArrowRight />
              </a>
            </div>
          </div>
        </div>

        {projectsData.map((projects, index) => {
          return (
            <div
              key={index}
              className={`project_bottom_content sticky_container h-[70vh] w-full max-md:flex-col flex ${!index % 2 ? "flex-row" : "flex-row-reverse"}  border-y border-gray mb-[2em]`}
            >
              <div className="project_img w-[50%] max-md:w-full relative  overflow-hidden ">
                <div className="overlay absolute bg-black inset-0 opacity-[.1] "></div>
                <div
                  onClick={() => handleNavClick("/projects")}
                  className="cursor-pointer overflow-hidden"
                >
                  <img
                    className="object-cover object-center w-full h-full  "
                    src={projects.src}
                    alt={projects.heading1}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>

              <div className="project_text w-[50%] h-full p-[3em] flex  flex-col justify-between ">
                <div className="project_right_top">
                  <div className="project_type  ">
                    <span className="uppercase text-gray text-[clamp(0.3rem,1vw,1.1rem)] ">
                      {projects.type}
                    </span>
                  </div>
                  <div className="project_title w-full ">
                    <div className="uppercase font-bold text-[clamp(1rem,6vw,10rem)] -tracking-[.04em] font-inter leading-[.9em] my-[.2em] cursor-target inline-block  ">
                      <h2>{projects.heading1}</h2>
                      <h2>{projects.heading2}</h2>
                    </div>
                  </div>
                  <div className="project_desc w-[90%] ">
                    <p className="text-mid-gray text-[clamp(.5rem,1vw,1rem)]  uppercase leading-">
                      {projects.desc}
                    </p>
                  </div>
                </div>

                <div className="project_skills uppercase text-[clamp(.5rem,1.3vw,1.3rem)] flex text-mid-gray  gap-x-[1em] flex-wrap ">
                  {projects.skills.map((skill, index) => (
                    <span key={index}>[{skill}]</span>
                  ))}
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ProjectsOverview;
