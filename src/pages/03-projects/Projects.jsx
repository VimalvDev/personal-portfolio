import { ScrollTrigger } from "gsap/ScrollTrigger";

function Projects() {
  const projectsData = [
    {
      src: "/imgs/bg/1.jpg",
      type: "creative frontend - motion study",
      heading: "k2z motion study",
      desc: "An animation-heavy K7Z recreation exploring ScrollTrigger pinning, staggered sequences, smooth scrolling, and page transitions to understand modern agency-level frontend architecture.",
      skills: [
        "react",
        "gsap",
        "scrolltrigger",
        "lenis",
        "motion architecture",
      ],
    },
    {
      src: "/imgs/bg/2.jpg",
      type: "creative frontend - portfolio system",
      heading: "personal portfolio",
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
      src: "/imgs/bg/3.jpg",
      type: "full stack - ai platform",
      heading: "ai based learning",
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
    <div className=" bg-very-light min-h-screen w-full flex-col px-[2em]  py-[1em]">
      <div className="project_top_text pt-[5em] mb-[2em]  ">
        <div className="project_number mb-[.5em] ">
          <span className="uppercase text-mid-gray ">[ 03 - projects ]</span>
        </div>
        <div className="project_heading-text flex justify-between items-end ">
          <div className="project_heading">
            <h2 className="text-[clamp(1rem,7vw,8rem)] -tracking-[.07em] leading-[.9em] uppercase font-bold ">
              recent projects
            </h2>
          </div>
          <div className="project_type uppercase flex gap-[3vw] text-mid-gray ">
            <span>all</span>
            <span>frontend</span>
            <span>fullstack</span>
          </div>
        </div>
      </div>

      {projectsData.map((projects, index) => {
        return (
          <div
            key={index}
            className="project_bottom_content sticky_container  h-[70vh] w-full flex border-y border-gray mb-[2em]  "
          >
            <div className="project_left w-[50%]  overflow-hidden ">
              <img
                className="object-cover w-full h-full  "
                src={projects.src}
                alt={projects.heading}
              />
            </div>

            <div className="project_right w-[50%] h-full p-[3em] flex  flex-col justify-between ">
              <div className="project_right_top">
                <div className="project_type  ">
                  <span className="uppercase text-gray text-[clamp(0.3rem,1vw,1.1rem)] ">
                    {projects.type}
                  </span>
                </div>
                <div className="project_title w-full ">
                  <h2 className="uppercase font-bold text-[clamp(1rem,6vw,10rem)] -tracking-[.04em] font-inter leading-[.9em] my-[.2em]  ">
                    {projects.heading}
                  </h2>
                </div>
                <div className="project_desc w-[90%] ">
                  <p className="text-mid-gray text-[clamp(.5rem,1vw,1rem)]  uppercase leading-">
                    {projects.desc}
                  </p>
                </div>
              </div>

              <div className="project_skills uppercase text-[clamp(.5rem,1.3vw,1.3rem)] flex text-mid-gray  gap-x-[1em] flex-wrap ">
                <span>[react]</span>
                <span>[gsap]</span>
                <span>[tailwindCSS]</span>
                <span>[scrolltrigger]</span>
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Projects;
