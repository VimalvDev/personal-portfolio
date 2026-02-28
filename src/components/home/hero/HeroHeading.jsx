import React from "react";
import DecryptedText from "../../animation/motion/DecryptedText";
import UpText from "../../animation/UpText";

function HeroHeading() {
  const skillData = ["web design", "web development"];
  return (
    <div className="hero_top relative h-full w-full uppercase font-space pt-[7em] flex flex-col max-sm:pt-[10em]    ">
      <div className="project_number  ">
        <UpText delay={0.4} duration={1} animateOnScroll={false}>
          <span className="uppercase text-[clamp(.694rem,1vw,1rem)] leading-tight text-mid-gray ">
            [ 01 - home ]
          </span>
        </UpText>
      </div>

      <div className="hero_text_bottom text-[clamp(10rem,20vw,20rem)] max-sm:text-[25vw] leading-[.83em] font-bebas ">
        <div className="hero_text-heading overflow-hidden text-start ">
          <UpText delay={0.4} duration={1} animateOnScroll={false}>
            <h1 className=" mt-[.05em] cursor-target inline-block ">
              creative
            </h1>
          </UpText>
        </div>

        <div className="hero_text-heading text-end overflow-hidden  ">
          <UpText delay={0.6} duration={1} animateOnScroll={false}>
            <h1 className=" cursor-target inline-block ">developer</h1>
          </UpText>
        </div>
      </div>

      <div className="skills flex flex-col text-dark-gray   ">
        {skillData.map((skill, index) => (
          <UpText key={index} delay={0.5 + index * .2} duration={1} animateOnScroll={false}>
            <h2 className="font-normal inline-block font-bebas  leading-[.89] pt-[.1em] text-[clamp(1.728rem,3vw,3rem)] relative ">
              <span>[ {skill} ]</span>
            </h2>
          </UpText>
        ))}
      </div>
    </div>
  );
}

export default HeroHeading;
