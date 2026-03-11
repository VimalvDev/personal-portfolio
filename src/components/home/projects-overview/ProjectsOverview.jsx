import { FaArrowRight } from "react-icons/fa";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { BP } from "../../../utils/BreakPoints";
import UpText from "../../animation/UpText";
import Projects from "../../../pages/Projects";

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
            refreshPriority: 2, // Pin this has higher priority than hero (default 0)
          },
        });

        // slide inital values
        gsap.set(topRef.current, {
          xPercent: -100,
          clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
        });
        gsap.set(centerRef.current, {
          xPercent: 100,
          clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
        });
        gsap.set(bottomRef.current, {
          xPercent: -100,
          clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
        });
        tl.set(wrapperRef.current, {
          yPercent: 30,
        });

        tl.to([topRef.current, centerRef.current, bottomRef.current], {
          xPercent: 0,
          ease: "none",
          duration: 1,
        });
        tl.to(
          wrapperRef.current,
          {
            yPercent: 0,
            ease: "none",
            duration: 1,
          },
          0.1,
        );

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
          scale: 1.2,
          ease: "none",
          duration: 0.6,
        });

        tl.to([topRef.current, centerRef.current, bottomRef.current], {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          ease: "none",
          duration: 0.8,
        }, 2.3);
      });
    },
    { scope: wrapperRef },
  );

  return (
    <section
      ref={headingSecRef}
      className="headingSection  bg-light-black text-white overflow-hidden "
    >
      <div className="md:min-h-screen min-h-[20svh] pt-[8em] w-full overflow-hidden md:pt-[6em]">
        <div className="small_project_heading md:hidden w-full  h-full ">
          <UpText duration={1} delay={0.5} splitType="chars">
            <h1 className=" text-[32vw] text-center leading-[0.83]">
              projects
            </h1>
          </UpText>
        </div>

        <div
          ref={wrapperRef}
          className="h-full hidden md:flex flex-col text-[20vw] uppercase"
        >
          <div className="overflow-hidden w-full">
            <h1
              ref={topRef}
              className=" text-center leading-[0.65em]    pt-[.1em]"
            >
              my projects
            </h1>
          </div>

          <div className="overflow-hidden">
            <h1
              ref={centerRef}
              className=" text-center leading-[0.65] pt-[.1em]"
            >
              my projects{" "}
            </h1>
          </div>

          <div className="overflow-hidden">
            <h1
              ref={bottomRef}
              className=" text-center leading-[0.65] pt-[.1em]"
            >
              my projects{" "}
            </h1>
          </div>
        </div>
      </div>

      <div
        className="project_container  flex h-full w-full flex-col md:px-[2em] px-[1em]    "
      >
        <div className="page_project_number flex mb-[3em] justify-between items-center ">
          <UpText delay={1} duration={1}>
            <span className="uppercase text-gray text-[clamp(.694rem,1vw,1rem)]  ">
              [ 03 - selected projects ]
            </span>
          </UpText>
          {/* <div className="project_heading-text flex justify-between bo items-center ">

            <a
              href="/projects"
              className="project_type uppercase items-center flex gap-[1em] text-mid-gray "
            >
              <span>show all</span>
              <FaArrowRight />
            </a>
          </div> */}
        </div>
        <div className="projects_showcase">

        </div>
      </div>
    </section>
  );
}

export default ProjectsOverview;
