import React from "react";
import UpText from "../animation/UpText";
import TextAnimation from "../animation/TextAnimation";


const PhilosphySec = () => {
  return (
    <section className="relative md:min-h-screen z-10 py-[8em] md:py-0 text-white px-[2em] bg-very-light overflow-hidden flex items-center justify-center">
      <div className="philo_container  ">
        <UpText delay={0.5} duration={1}>
        <span className="uppercase text-start text-mid-gray inline-block text-[clamp(.694rem,1vw,1rem)]">
          [ MY PHILOSOPHY ]
        </span>
        </UpText>

        <TextAnimation>
          <p className="uppercase text-white text-[clamp(4.5em,10vw,10rem)] md:pr-[1em] font-bebas leading-[.85] text-left pt-[.1em]">
            design is not decoration it is clarity, motion, and experience.{" "}
          </p>
        </TextAnimation>
      </div>
    </section>
  );
};

export default PhilosphySec;
