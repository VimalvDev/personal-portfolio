import React from "react";
import DecryptedText from "../../animation/motion/DecryptedText";
import UpText from "../../animation/UpText";

function HeroHeading() {
  const skillData = ["web design", "web development"];
  return (
    <div className="hero_top relative h-full w-full uppercase flex flex-col    ">
      <div className="project_number  ">
          <UpText delay={0.4} duration={.6} animateOnScroll={false} splitType="chars" staggerFrom="edges" >
          <span className="uppercase text-[clamp(.694rem,1vw,1rem)] leading-tight text-mid-gray ">
            [ 01 - home ]
          </span>
        </UpText>
      </div>

      <div className="hero_text_bottom  text-light-black font-bebas ">
        <div className="hero_text-heading  text-start ">
          <UpText delay={0.4} duration={1} animateOnScroll={false} splitType="chars" >
            <h1 className=" cursor-target md:text-[clamp(10rem,21vw,21rem)] text-[26vw] leading-[.86em] -mb-[1em] inline-block  ">
              creative
            </h1>
          </UpText>
        </div>

        <div className="hero_text-heading text-end overflow-hidden  ">
          <UpText delay={0.4} duration={1} animateOnScroll={false} splitType="chars" staggerFrom="end" >
            <h1 className=" cursor-target md:text-[clamp(10rem,21vw,21rem)] text-[26vw] leading-[.86em] -mb-[1em]  inline-block  ">
              developer
              </h1>
          </UpText>
        </div>

      </div>

      <div className="skills flex flex-col text-dark-gray max-sm:mt-[2em]   ">
        {skillData.map((skill, index) => (
          <UpText key={index} delay={0.4} duration={.6} animateOnScroll={false} splitType="chars" staggerFrom="random" >
            <h2 className="font-normal inline-block font-bebas   leading-[.89] pt-[.1em] text-[clamp(1.728rem,3vw,3rem)] relative ">
              <span>[ {skill} ]</span>
            </h2>
          </UpText>
        ))}
      </div>
    </div>
  );
}

export default HeroHeading;
