import React, { useEffect, useRef } from "react";
import Nav from "./components/common/Nav";
import Routing from "./routes/Routing";
import ReactLenis from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    <ReactLenis root options={{ autoRaf: true }} ref={lenisRef}>
        <Nav />
        <Routing />
    </ReactLenis>
  );
}

export default App;
