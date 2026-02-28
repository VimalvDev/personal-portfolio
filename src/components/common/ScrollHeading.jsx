import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { BP } from "../../utils/BreakPoints";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollHeading({ text = "my projects", xPos = 0 }) {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);

  const centerRef = useRef(null);
  const topRef = useRef(null);
  const bottomRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      //desktop
      mm.add(BP.desktop, () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=180%",
            scrub: true,
            pin: true,
            pinSpacing: false,
          },
        });

        // slide inital values
        gsap.set(topRef.current, {
          xPercent: -100,
        });
        gsap.set(centerRef.current, {
          xPercent: 100,
        });
        gsap.set(bottomRef.current, {
          xPercent: -100,
        });

        tl.to([topRef.current, centerRef.current, bottomRef.current], {
          xPercent: 0,
          ease: "none",
          duration: 1,
        });

        tl.to(
          topRef.current,
          {
            yPercent: 100,
            ease: "none",
            duration: 1,
          },
          1,
        );
        tl.to(
          bottomRef.current,
          {
            yPercent: -100,
            ease: "none",
            duration: 1,
          },
          1,
        );

        tl.to(
          wrapperRef.current,
          {
            // opacity: 0,
            xPercent: xPos,
            ease: "none",
            duration: 0.4,
          },
          2,
        );
      });

      mm.add(BP.mobile, () => {
        gsap.set(wrapperRef.current, {
          xPercent: xPos + 6,
        });
        gsap.set(topRef.current, {
          yPercent: 70,
        });
        gsap.set(bottomRef.current, {
          yPercent: -70,
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="min-h-[236svh] max-md:min-h-[5svh]  max-sm:pt-[1em] w-full overflow-hidden pt-[8em]"
    >
      <div
        ref={wrapperRef}
        className="h-full flex flex-col justify-start uppercase"
      >
        <div className="overflow-hidden">
          <h1
            ref={topRef}
            className="w-screen text-center text-[18vw] md:text-[16vw] font-bold pt-[.1em] leading-[0.68]"
          >
            {text}
          </h1>
        </div>

        <div className="overflow-hidden">
          <h1
            ref={centerRef}
            className="w-screen text-center text-[18vw] md:text-[16vw] font-bold pt-[.1em] leading-[0.68]"
          >
            {text}
          </h1>
        </div>

        <div className="overflow-hidden">
          <h1
            ref={bottomRef}
            className="w-screen text-center text-[18vw] md:text-[16vw] font-bold pt-[.1em] leading-[0.68]"
          >
            {text}
          </h1>
        </div>
      </div>
    </section>
  );
}
