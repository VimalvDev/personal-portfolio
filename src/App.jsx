import React, { useEffect, useRef } from "react";
import Nav from "./components/common/Nav";
import Routing from "./routes/Routing";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ReactLenis from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PageTransitionProvider } from "./context/PageTransitionContext";
import PageTransition from "./components/common/PageTransition";
import TargetCursor from "../src/components/animation/TargetCursor";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef();

  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;
    lenis.on("scroll", ScrollTrigger.update);
    return () => {
      lenis.off("scroll", ScrollTrigger.update);
    };
  }, []);

  return (
    <PageTransitionProvider>
      <ReactLenis root options={{ autoRaf: true }} ref={lenisRef}>
        <TargetCursor
          spinDuration={10}
          hideDefaultCursor
          parallaxOn
          hoverDuration={0.2}
        />

        <PageTransition />

        <Nav />
        <Routing />
        <SpeedInsights />
      </ReactLenis>
    </PageTransitionProvider>
  );
}

export default App;
