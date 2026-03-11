import React, { useEffect, useRef } from "react";
import Nav from "./components/common/Nav";
import Routing from "./routes/Routing";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

import ReactLenis from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PageTransitionProvider } from "./context/PageTransitionContext";
import PageTransition from "./components/common/PageTransition";

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
      <ReactLenis
        root
        options={{
          autoRaf: true,
        }}
        ref={lenisRef}
      >
        <PageTransition />

        <Nav  />
        <Routing />
        <SpeedInsights />
        <Analytics />
      </ReactLenis>
    </PageTransitionProvider>
  );
}

export default App;
