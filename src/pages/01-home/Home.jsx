import React, { useRef } from "react";
import HeroHeading from "../../components/home/HeroHeading";
import HeroBottomText from "../../components/home/HeroBottomText";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);



function Home() {
  const containerPhilo = useRef(null)
  const containerHero = useRef(null)
  const container = useRef(null)

  useGSAP(()=>{
    const hero = containerHero.current
    const philo = containerPhilo.current

    ScrollTrigger.create({
      trigger: philo,
      start: "top 40%",
      onEnter:()=>{
        gsap.to(hero,{
          backgroundColor: "var(--color-light-black)",
          duration:.8,
        })
        gsap.to(philo,{
          backgroundColor: "var(--color-light-black)",
          duration:.8,
        })
      },
      onLeaveBack: ()=>{
        gsap.to(hero,{
          backgroundColor: "var(--color-very-light)",
          duration: .8,
        })
        gsap.to(philo,{
          backgroundColor: "var(--color-very-light)",
          duration: .8,
        })
      }
    })


  },{scope: container})
 
  return (
    <div ref={container} >
      <div ref={containerHero} className="hero_page flex  min-h-screen w-full flex-col px-[2em]  justify-between py-[1em]">
        <HeroHeading />
        <HeroBottomText />
      </div>

      <div ref={containerPhilo} className="philosophy_section min-h-[150vh] text-white text-center flex flex-col items-center justify-center ">
        <div className="approach_text mix-blend-difference ">
          <span className="uppercase text-gray text-[clamp(.5rem,1vw,1rem)] ">
            [ my thinking]
          </span>
        </div>
        <h2 className=" uppercase text-very-light mix-blend-difference text-[clamp(1rem,5vw,10rem)] font-inter font-bold leading-tight ">
          design is not decoration. it is clarity, motion, and experience.
        </h2>
        <p>
          i combine design thinking with technical precision to create digital
          experiences that feel structured and alive
        </p>
      </div>

      <div className="h-screen">
        hi
      </div>
    </div>
  );
}

export default Home;
