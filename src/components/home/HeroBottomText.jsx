import React from "react";
import { IoIosArrowDown } from "react-icons/io";

function HeroBottomText() {
  return (
    <div className="hero_bottom flex-wrap flex w-full justify-between items-end ">
      <div className="hero_clock text-dark-gray ">INDIA__19:42 (GMT+5:30)</div>
      <div className="hero_scroller uppercase ">
        <span className="flex items-center gap-[.5em] text-gray text-[clamp(.5rem,1vw,2rem)] ">
          <IoIosArrowDown />
          scroll
        </span>
      </div>
      <div className="hero_bottom_text w-[20vw] text-right ">
        <div className="bottom uppercase text-gray  ">
          <span className="text-[clamp(.5rem,.9vw,1rem)]">
            I design. I code. I animate. I ship.
          </span>
        </div>
        <div className="top uppercase text-dark-gray leading-tight mt-[1em] ">
          <span>
            Designing and building modern web experiences from concept to
            deployment.
          </span>
        </div>
      </div>
    </div>
  );
}

export default HeroBottomText;
