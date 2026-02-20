import React from "react";
import { MdArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="flex justify-between w-full px-[2em] h-[4.5em] items-center z-50  fixed mix-blend-difference text-gray ">
      <div className="nav_logo text-[clamp(.5rem,1.1vw,1.4rem)] ">
        <Link to={"/"}>VIMAL.DEV</Link>
      </div>

      <div className="nav_link">
        <ul className="uppercase text-[clamp(.5rem,1vw,1.3rem)] flex gap-[1em] ">
          <li>
            <Link to={"/about"}>[ about me]</Link>
          </li>
          <li>
            <Link to={"/projects"}>[ projects ]</Link>
          </li>
          <li>
            <Link to={"/skills"}>[ skills ]</Link>
          </li>
          <li>
            <Link to={"/connect"}>[ connect ]</Link>
          </li>
        </ul>
      </div>

      <div className="nav_talk">
        <a href="mailto:hello@vimal.dev" className="flex items-center uppercase text-[clamp(.5rem,1vw,1.1rem)] ">
          [ let's talk <MdArrowOutward className="ml-1" />
        </a>
      </div>
    </nav>
  );
}

export default Nav;
