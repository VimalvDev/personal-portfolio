import React from "react";
import { MdArrowOutward } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { usePageTransition } from "../../hooks/usePageTransition";
import DecryptedText from "../animation/motion/DecryptedText";

function Nav() {
  const navigateWithTransition = usePageTransition();
  const location = useLocation(); // Get current page location

  /**
   * NAVIGATION HANDLER EXPLANATION:
   * Different navigation types require different handlers:
   *
   * 1. PAGES (Cross-page navigation):
   *    - Home page ("/") - uses page transition animation
   *    - Projects page ("/projects") - uses page transition animation
   *
   * 2. HASH LINKS (Same-page scroll):
   *    - About ("#about") - scroll to element, no page change
   *    - Skills ("#skills") - scroll to element, no page change
   *    - Connect ("#connect") - scroll to element, no page change
   */

  // Handle cross-page navigation with transition animation
  const handlePageNavigation = (path) => {
    navigateWithTransition(path);
  };

  // Handle hash navigation - checks if on home page, then scrolls to element
  const handleHashNavigation = (hash) => {
    // If not on home page, navigate to home first with the hash
    if (location.pathname !== "/") {
      navigateWithTransition(`/${hash}`); // Navigate to home with hash (e.g., "/#about")
      return;
    }

    // If already on home page, scroll smoothly to the element
    setTimeout(() => {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100); // Small delay to ensure DOM is ready
  };

  return (
    <nav className="flex justify-between w-full px-[2em] h-[4.5em] max-sm:px-0    items-center z-50  fixed mix-blend-difference text-white ">
      {/* Logo - also clickable (goes to home) */}
      <div className="nav_logo text-[clamp(0.694rem,1.1vw,1.4rem)] max-sm:hidden ">
        <div
          onClick={() => handlePageNavigation("/")}
          className="cursor-pointer hover:opacity-80 transition-opacity py-[1em] "
        >
          VIMAL.DEV
        </div>
      </div>

      {/* Navigation Links */}
      <div className="nav_link ">
        <ul className="uppercase text-[clamp(0.694rem,1vw,1.3rem)] flex gap-[1em] ">
          {/* HOME: Page navigation - goes to home page */}
          <li>
            <div
              className="py-[1.5em] cursor-pointer hover:opacity-80 transition-opacity uppercase"
              onClick={() => handlePageNavigation("/")}
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

          {/* ABOUT: Hash navigation - scrolls to #about on home page */}
          <li>
            <div
              className="py-[1.5em] cursor-pointer hover:opacity-80 transition-opacity uppercase"
              onClick={() => handleHashNavigation("#about")}
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

          {/* PROJECTS: Page navigation - goes to /projects page */}
          <li>
            <div
              className="py-[1.5em] cursor-pointer hover:opacity-80 transition-opacity uppercase"
              onClick={() => handlePageNavigation("/projects")}
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

          {/* SKILLS: Hash navigation - scrolls to #skills on home page */}
          <li>
            <div
              className="py-[1.5em] cursor-pointer hover:opacity-80 transition-opacity uppercase"
              onClick={() => handleHashNavigation("#skills")}
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

          {/* CONNECT: Hash navigation - scrolls to #connect on home page */}
          <li>
            <div
              className="py-[1.5em] cursor-pointer hover:opacity-80 transition-opacity uppercase"
              onClick={() => handleHashNavigation("#connect")}
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
      {/* <div className="nav_talk">
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
      </div> */}
    </nav>
  );
}

export default Nav;
