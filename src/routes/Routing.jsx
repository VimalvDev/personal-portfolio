import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/01-home/Home";
import About from "../pages/02-about/About";
import Skills from "../pages/04-skills/Skills";
import Projects from "../pages/03-projects/Projects";



function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/skills" element={<Skills />} />
      <Route path="/projects" element={<Projects/>} />
      <Route path="/connect" element={<Home />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default Routing;
