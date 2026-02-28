import React from "react";
import { MdArrowOutward } from "react-icons/md";
import { usePageTransition } from "../../hooks/usePageTransition";
import DecryptedText from "../animation/motion/DecryptedText";
import Magnet from "../animation/Magnet";

function Nav() {
  const navigateWithTransition = usePageTransition();
  const handleNavClick = (path) => {
    navigateWithTransition(path);
  };

  return (
    <nav className="flex justify-between w-full px-[2em] h-[4.5em] max-sm:px-[1em]   items-center z-10  fixed mix-blend-difference text-gray ">
      {/* Logo - also clickable (goes to home) */}
      <div className="nav_logo text-[clamp(0.694rem,1.1vw,1.4rem)] ">
        <div
          onClick={() => handleNavClick("/")}
          className="cursor-pointer hover:opacity-80 transition-opacity py-[1em] "
        >
          <Magnet
            padding={50}
            magnetStrength={50}
          >

          VIMAL.DEV

          </Magnet>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="nav_link max-sm:hidden ">
        <ul className="uppercase text-[clamp(0.694rem,1vw,1.3rem)] flex gap-[1em] ">
          {/* About Link with animation */}
          <li>
            <div
              className="py-[1.5em] cursor-pointer hover:opacity-80 transition-opacity uppercase"
              onClick={() => handleNavClick("/")}
            >
              <span>[</span>
              <DecryptedText
                text="home"
                speed={120}
                maxIterations={5}
                animateOn="hover"
                revealDirection="center"
                useOriginalCharsOnly
              ></DecryptedText>
              <span>]</span>
            </div>
          </li>
          <li>
            <div
              className="py-[1.5em] cursor-pointer hover:opacity-80 transition-opacity uppercase"
              onClick={() => handleNavClick("/about")}
            >
              <span>[</span>
              <DecryptedText
                text="about me"
                speed={120}
                maxIterations={5}
                animateOn="hover"
                revealDirection="center"
                useOriginalCharsOnly
              ></DecryptedText>
              <span>]</span>
            </div>
          </li>

          {/* Projects Link with animation */}
          <li>
            <div
              className="py-[1.5em] cursor-pointer hover:opacity-80 transition-opacity uppercase"
              onClick={() => handleNavClick("/projects")}
            >
              <span>[</span>
              <DecryptedText
                text="projects"
                speed={120}
                maxIterations={5}
                animateOn="hover"
                revealDirection="center"
                useOriginalCharsOnly
              ></DecryptedText>
              <span>]</span>
            </div>
          </li>

          {/* Skills Link with animation */}
          <li>
            <div
              className="py-[1.5em] cursor-pointer hover:opacity-80 transition-opacity uppercase"
              onClick={() => handleNavClick("/skills")}
            >
              <span>[</span>
              <DecryptedText
                text="skills"
                speed={120}
                maxIterations={5}
                animateOn="hover"
                revealDirection="center"
                useOriginalCharsOnly
              ></DecryptedText>
              <span>]</span>
            </div>
          </li>

          {/* Connect Link with animation */}
          <li>
            <div
              className="py-[1.5em] cursor-pointer hover:opacity-80 transition-opacity uppercase"
              onClick={() => handleNavClick("/connect")}
            >
              <span>[</span>
              <DecryptedText
                text="connect"
                speed={120}
                maxIterations={5}
                animateOn="hover"
                revealDirection="center"
                useOriginalCharsOnly
              ></DecryptedText>
              <span>]</span>
            </div>
          </li>
        </ul>
      </div>

      {/* Contact Link - external, no animation needed */}
      <div className="nav_talk">
        <a
          href="mailto:hello@vimal.dev"
          className="flex py-[1.5em] items-center uppercase text-[clamp(0.694rem,1vw,1.1rem)] "
        >
          <span>[</span>
          <DecryptedText
            text="let's talk"
            speed={120}
            maxIterations={5}
            animateOn="hover"
            revealDirection="center"
            useOriginalCharsOnly
          ></DecryptedText>
          <MdArrowOutward className="ml-1 " />
          <span>]</span>
        </a>
      </div>
    </nav>
  );
}

export default Nav;
