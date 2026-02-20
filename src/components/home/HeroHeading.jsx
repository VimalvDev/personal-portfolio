import React from "react";

function HeroHeading() {
  return (
    <div className="hero_top h-full w-full uppercase font-space pt-[10em]  ">
      <div className="top_text_top h-full w-full flex items-end gap-3 ">
        <h1 className="text-start text-[clamp(1rem,10vw,10rem)] font-bold leading-[.8] ">
          creative
        </h1>
        <div className="skills flex flex-col text-gray leading-tight relative bottom-[.2em]  text-[clamp(.5rem,1.5vw,3rem)]  ">
          <span className="font-normal  inline-block ">/ Web design</span>
          <span className="font-normal inline-block">/ Web Development</span>
        </div>
      </div>
      <div className="hero_text_bottom text-[clamp(1rem,10vw,10rem)] font-bold leading-[.8] ">
        <h1 className="text-center">frontend</h1>
        <h1 className="text-end">developer</h1>
      </div>
    </div>
  );
}

export default HeroHeading;
