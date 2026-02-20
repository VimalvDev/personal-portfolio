import React, { useRef } from "react";
import HeroHeading from "../../components/home/HeroHeading";
import HeroBottomText from "../../components/home/HeroBottomText";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);

function Home() {
  const containerPhilo = useRef(null);
  const containerHero = useRef(null);
  const container = useRef(null);
  const bgPhiloContainer = useRef(null)

  useGSAP(
    () => {
      const hero = containerHero.current;
      const philo = containerPhilo.current;
      const bgPhilo = bgPhiloContainer.current


      ScrollTrigger.create({
        trigger: bgPhilo,
        start: "top 40%",
        onEnter: () => {
          gsap.to(hero, {
            backgroundColor: "var(--color-light-black)",
            duration: 0.8,
          });
          gsap.to(bgPhilo, {
            backgroundColor: "var(--color-light-black)",
            duration: 0.8,
          });
        },
        onLeaveBack: () => {
          gsap.to(hero, {
            backgroundColor: "var(--color-very-light)",
            duration: 0.8,
          });
          gsap.to(bgPhilo, {
            backgroundColor: "var(--color-very-light)",
            duration: 0.8,
          });
        },
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: philo,
            start: "top 90%",
            end: "bottom top",
            scrub: true,
          },
        })
        .fromTo(
          philo,
          {
            opacity: 0,
            duration: .6
          },
          { opacity: 1, ease: "none" },
        )
        .to(philo, { opacity:0, ease: "none" });
    },
    { scope: container },
  );

  return (
    <div ref={container}>
      <div
        ref={containerHero}
        className="hero_page flex  min-h-screen w-full flex-col px-[2em]  justify-between py-[1em]"
      >
        <HeroHeading />
        <HeroBottomText />
      </div>

      <div ref={bgPhiloContainer} className="philosophy_section min-h-screen text-white text-center flex flex-col items-center justify-center ">
        <div ref={containerPhilo} className="philo_container">
          <div className="approach_text mix-blend-difference ">
            <span className="uppercase text-gray text-[clamp(.5rem,1vw,1rem)] ">
              [ my thinking]
            </span>
          </div>
          <h2 className=" uppercase text-white mix-blend-difference text-[clamp(1rem,5vw,10rem)] font-inter font-bold leading-tight ">
            design is not decoration. it is clarity, motion, and experience.
          </h2>
          <p>
            i combine design thinking with technical precision to create digital
            experiences that feel structured and alive
          </p>
        </div>
      </div>

      <div className="h-screen">hi</div>
    </div>
  );
}

export default Home;
