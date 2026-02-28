import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);

import HeroHeading from "../../components/home/hero/HeroHeading";
import HeroBottomText from "../../components/home/hero/HeroBottomText";
import ProjectsOverview from "../../components/home/projects-overview/ProjectsOverview";
import ScrollHeading from "../../components/common/ScrollHeading";
import UpText from "../../components/animation/UpText";

function Home() {
  const containerPhilo = useRef(null);
  const container = useRef(null);
  const bgPhiloContainer = useRef(null);

  // Philosphy container animation

  return (
    <>
      <div ref={container}>
        <div className="hero_page flex relative overflow-x-hidden  min-h-svh w-full flex-col px-[2em] max-sm:px-[1em]  justify-between py-[1em]">
          <HeroHeading />
          <HeroBottomText />
        </div>

        <div
          ref={bgPhiloContainer}
          className="philosophy_section min-h-svh bg-light-black text-white text-center flex flex-col items-center justify-center "
        >
          <div ref={containerPhilo} className="philo_container">
            <div className="approach_text mix-blend-difference ">
              <UpText delay={0.1} duration={1}>
                <span className="uppercase text-gray text-[clamp(.5rem,1vw,1rem)] ">
                  [ my thinking]
                </span>
              </UpText>
            </div>
            <UpText delay={0.2} duration={1}>
              <h2 className=" uppercase text-white text-[clamp(1rem,8vw,8rem)] font-bebas leading-[.85] px-[1em] text-center pt-[.1em] ">
                design is not decoration. it is clarity, motion, and experience.
              </h2>
            </UpText>
            <UpText delay={0.2} duration={1}>
              <p className="uppercase text-gray ">
                i combine design thinking with technical precision to create
                digital experiences that feel structured and alive
              </p>
            </UpText>
          </div>
        </div>
        <ProjectsOverview />
        <ScrollHeading text="my skills" />
      </div>
    </>
  );
}

export default Home;
