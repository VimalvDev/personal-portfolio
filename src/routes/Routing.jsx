import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Projects from "../pages/projects/Projects";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/#about" element={<Home />} />
      <Route path="/#skills" element={<Home />} />
      <Route path="/#connect" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default Routing;
