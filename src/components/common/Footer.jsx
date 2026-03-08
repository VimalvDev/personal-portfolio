import React, { useRef } from "react";
import { useClock } from "../../utils/Time";
import UpText from "../animation/UpText";
import Border from "./Border";

const Footer = () => {
  const linkRef1 = useRef(null);
  const linkRef2 = useRef(null);
  const linkRef3 = useRef(null);
  const time = useClock("Asia/Kolkata");

  return (
    <footer className="bg-very-light min-h-[70vh] flex justify-end p-[1em]  md:py-[1.5em] md:px-[2em] flex-col border ">
      <div className="footer_social_link  ">
        <div className="email font-bold text-[clamp(1.5rem,3vw,3rem)] text-end mb-[.5em] ">
          <a href="mailto:vimalverma8287@gmail.com">vimalverma8287@gmail.com</a>
        </div>

        <div className="social_media flex w-full uppercase justify-end mb-[1em] gap-[5em] ">
          <div className="github  overflow-hidden  ">
            <a
              ref={linkRef1}
              className="text-[clamp(1rem,2vw,2rem)] leading-[.85em]  "
              href="#"
            >
              github
            </a>
            <Border
              animateOnScroll={true}
              ho
              hoverable={true}
              hoverTriggerRef={linkRef1}
            />
          </div>
          <div className="linkedin">
            <a
              ref={linkRef2}
              className="text-[clamp(1rem,2vw,2rem)] leading-[.85em]   "
              href="#"
            >
              linkedin
            </a>
            <Border
              animateOnScroll={true}
              ho
              hoverable={true}
              hoverTriggerRef={linkRef2}
            />
          </div>
          <div className="twitter">
            <a
              ref={linkRef3}
              className="text-[clamp(1rem,2vw,2rem)] leading-[.85em]  "
              href="#"
            >
              x/twitter
            </a>
            <Border
              animateOnScroll={true}
              ho
              hoverable={true}
              hoverTriggerRef={linkRef3}
            />
          </div>
        </div>
      </div>
      <div className="footer_nav_link w-full h-full uppercase ">
        <ul className="text-[clamp(0.694rem,1vw,1rem)] flex justify-between">
          <li>
            <a href="/home#about">[ about me ]</a>
          </li>
          <li>
            <a href="/home#work">[ projects ]</a>
          </li>
          <li>
            <a href="/home#skill">[ skills ]</a>
          </li>
          <li>
            <a href="/home#skill">[ connects ]</a>
          </li>
        </ul>
      </div>

      <div className="footer_name  w-full ">
        <UpText
          duration={1}
          splitType="chars"
          delay={0.5}
          staggerFrom="random"
          disableOnMobile
        >
          <h1 className="leading-[.83] md:text-[clamp(1rem,23vw,23rem)] text-[clamp(1rem,22vw,25rem)] text-light-black  uppercase text-center w-full whitespace-nowrap  pt-[.1em]">
            vimal verma
          </h1>
        </UpText>
      </div>
      <div className="footer_bottom h-full w-full grid md:grid-cols-3 items-end  ">
        <div className="footer_time hidden md:inline-block text-[clamp(0.694rem,1vw,1rem)] ">
          {`INDIA ${time ? time : "00:00"}`}
          <span className="time_zone hidden sm:inline ">(GMT+5:30)</span>
        </div>
        <div className="footer_dev text-center  ">
          <span className=" text-[clamp(0.694rem,1vw,1rem)] inline-block leading-[.97] pt-[.1em]  uppercase ">
            design & development
          </span>
        </div>
        <div className="copyright">
          <div className="copyright_container w-full flex  justify-end ">
            <p className="md:w-[70%] w-full text-[clamp(0.5rem,.5vw,1rem)]  capitalize leading-tight ">
              2026 all rights reserved. any reproduction, distribution, or use
              of the materials without permission is prohibited
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
