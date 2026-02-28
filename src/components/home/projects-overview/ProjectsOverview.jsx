import SplitText from "../../animation/SplitText";
import { FaArrowRight } from "react-icons/fa";
import ScrollHeading from "../../common/ScrollHeading";
import UpText from "../../animation/UpText";

function Projects() {
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

  return (
    <>
      <ScrollHeading text="my projects" xPos={-16}  />

      <div className=" bg-very-light min-h-screen w-full flex-col px-[2em] max-sm:px-[1em]  py-[1em]   ">
        <div className="project_top_text pt-[1em] max-sm:pt-0 mb-[2em]  ">
          <div className="page_project_number mb-[.5vw] ">
            <span className="uppercase text-mid-gray text-[clamp(.694rem,1vw,1rem)]  ">
              [ 03 - selected projects ]
            </span>
          </div>

          <div className="project_heading-text flex justify-between bo items-center ">

            <a
              href="#"
              className="project_type uppercase py-[1em] items-center flex gap-[1em] text-mid-gray "
            >
              <span>show all</span>
              <FaArrowRight />
            </a>
          </div>
        </div>

        {projectsData.map((projects, index) => {
          return (
            <div
              key={index}
              className={`project_bottom_content sticky_container h-[70vh] w-full flex ${!index % 2 ? "flex-row" : "flex-row-reverse"}  border-y border-gray mb-[2em]`}
            >
              <div className="project_left w-[50%] relative overflow-hidden ">
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

              <div className="project_right w-[50%] h-full p-[3em] flex  flex-col justify-between ">
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
    </>
  );
}

export default Projects;
