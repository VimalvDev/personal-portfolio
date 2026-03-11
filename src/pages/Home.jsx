import AboutStickyContainer from "../components/home/about/AboutStickyContainer";
import PhilosphySec from "../components/home/PhilosphySec";
import ProjectsOverview from "../components/home/projects-overview/ProjectsOverview";
import Projects from "./Projects";
import Footer from "../components/common/Footer";
import { Skills } from "../components/home/skills/Skills";
import { Connect } from "../components/home/Connect";

function Home() {
  return (
    <main className="smooth-content" >
      <AboutStickyContainer />

      <PhilosphySec />

      <ProjectsOverview />
      <Projects />

      {/* <Skills /> */}

      {/* <Connect /> */}

      <Footer />
    </main>
  );
}

export default Home;
