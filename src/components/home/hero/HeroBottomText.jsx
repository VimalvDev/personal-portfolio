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
  const scrollRef = useRef(null);
  const arrowRef = useRef(null);

  useGSAP(() => {
    // gsap.to(arrowRef.current, {
    //   y: 4,
    //   duration: 0.5,
    //   yoyo: true,
    //   repeat: -1,
    // });

    const handleScroll = () => {
      if (window.scrollY > 50) {
        gsap.to(scrollRef.current, {
          opacity: 0,
          y: 10,
          duration: 0.4,
          ease: "power2.out",
          pointerEvents: "none",
        });
      } else {
        gsap.to(scrollRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
          pointerEvents: "auto",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="hero_bottom w-full flex relative items-end ">
      <div className="hero_clock text-dark-gray text-[clamp(0.694rem,1vw,1.1rem)] leading-[.9em] bottom-[.5em] absolute ">
        {`INDIA ${time ? time : "00:00"}`}
        <span className="time_zone hidden sm:inline ">(GMT+5:30)</span>
      </div>

      <div
        ref={scrollRef}
        className="hero_scroller max-sm:hidden uppercase w-[50%]"
      >
        <div className="flex justify-end items-center gap-[.5em] text-gray text-[clamp(0.694rem,1vw,1rem)]">
          <span ref={arrowRef} className="inline-block">
            <IoIosArrowDown className="w-[1.2em] h-[1.2em] " />
          </span>
          <span>scroll</span>
        </div>
      </div>

      <div className="hero_bottom_text w-[50%] h-full overflow-x-hidden text-right max-sm:w-full">
        <div className="hero_bottom_text_container inline-block pl-[20em] max-sm:pl-0 max-sm:w-[70vw]">
          <div className="top uppercase text-dark-gray text-[clamp(.694rem,1vw,1rem)] inline-block leading-[1.1em] max-sm:mb-[3em] mt-[1em] max-sm:text-[clamp(1.1rem,5vw,5rem)] cursor-target">
            <UpText delay={0.9} duration={1} animateOnScroll={false}>
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
            <div className="text-[clamp(.694rem,1vw,1rem)] leading-[.9em] inline-block">
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
