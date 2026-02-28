import React from "react";
import StickyCards from "../../components/projects/StickyCards";

function Projects() {
  return (
    <>
      <section className="intro min-h-svh bg-light-black text-white ">
        <h1>the intro</h1>
      </section>
      <StickyCards />
      <section className="outro min-h-svh bg-light-black text-white ">
        the outro
      </section>
    </>
  );
}

export default Projects;
