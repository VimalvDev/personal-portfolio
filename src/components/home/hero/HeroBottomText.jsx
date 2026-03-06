import React, { useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useClock } from "../../../utils/Time";
import DecryptedText from "../../animation/motion/DecryptedText";
import UpText from "../../animation/UpText";
import Border from "../../common/Border";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function HeroBottomText() {
  const time = useClock("Asia/Kolkata");

  return (
    <div className="hero_bottom w-full flex relative items-end ">
      <div className="hero_clock text-dark-gray text-[clamp(0.694rem,1vw,1.1rem)] leading-[.9em] bottom-[.5em] absolute ">
        {`INDIA ${time ? time : "00:00"}`}
        <span className="time_zone hidden sm:inline ">(GMT+5:30)</span>
      </div>

      <div
        className="hero_scroller max-sm:hidden uppercase w-[60%]"
      >
        <div className="flex justify-end items-start  text-gray text-[clamp(0.694rem,1vw,1rem)]">
          <span>[scroll to explore]</span>
        </div>
      </div>

      <div className="hero_bottom_text w-[70%] h-full overflow-x-hidden text-right max-sm:w-full">
        <div className="hero_bottom_text_container inline-block pl-[20em] max-sm:pl-0 max-sm:w-[65vw] max-sm:mb-[em]  ">
          <div className="top uppercase text-dark-gray text-[clamp(.8rem,1vw,1rem)] inline-block leading-[1.1em] max-sm:mb-[1em] mt-[1em]  cursor-target">
            <UpText delay={0.9} duration={1} animateOnScroll={false} >
              <div className="flex flex-wrap justify-end text-right">
                <DecryptedText
                  text="crafting "
                  speed={120}
                  maxIterations={5}
                  animateOn="hover"
                  revealDirection="center"
                  useOriginalCharsOnly
                />
                <DecryptedText
                  text="modern, "
                  speed={120}
                  maxIterations={5}
                  animateOn="hover"
                  revealDirection="center"
                  useOriginalCharsOnly
                />
                <DecryptedText
                  text="visually "
                  speed={120}
                  maxIterations={5}
                  animateOn="hover"
                  revealDirection="center"
                  useOriginalCharsOnly
                />
                <DecryptedText
                  text="driven "
                  speed={120}
                  maxIterations={5}
                  animateOn="hover"
                  revealDirection="center"
                  useOriginalCharsOnly
                />
                <DecryptedText
                  text="websites "
                  speed={120}
                  maxIterations={5}
                  animateOn="hover"
                  revealDirection="center"
                  useOriginalCharsOnly
                />
                <DecryptedText
                  text="from "
                  speed={120}
                  maxIterations={5}
                  animateOn="hover"
                  revealDirection="center"
                  useOriginalCharsOnly
                />
                <DecryptedText
                  text="concept "
                  speed={120}
                  maxIterations={5}
                  animateOn="hover"
                  revealDirection="center"
                  useOriginalCharsOnly
                />
                <DecryptedText
                  text="to "
                  speed={120}
                  maxIterations={5}
                  animateOn="hover"
                  revealDirection="center"
                  useOriginalCharsOnly
                />
                <DecryptedText
                  text="code "
                  speed={120}
                  maxIterations={5}
                  animateOn="hover"
                  revealDirection="center"
                  useOriginalCharsOnly
                />
                <DecryptedText
                  text="and "
                  speed={120}
                  maxIterations={5}
                  animateOn="hover"
                  revealDirection="center"
                  useOriginalCharsOnly
                />
                <DecryptedText
                  text="deployment."
                  speed={120}
                  maxIterations={5}
                  animateOn="hover"
                  revealDirection="center"
                  useOriginalCharsOnly
                />
              </div>
            </UpText>
          </div>
          <Border />
          <div className="bottom uppercase text-gray cursor-target">
            <div className="text-[clamp(.694rem,1vw,1rem)] leading-[.9em] tracking-tight inline-block">
              <UpText delay={0.9} duration={1} animateOnScroll={false}>
                <div className="side_text flex flex-wrap">
                  <span>I design.</span> <span>I code. </span>
                  <span>I animate.</span> <span> I ship.</span>
                </div>
              </UpText>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroBottomText;
