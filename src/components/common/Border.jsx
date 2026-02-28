import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";

const Border = () => {
    const borderRef = useRef(null)
    useGSAP(()=>{
        gsap.set(borderRef.current,{
            xPercent: 100
        })
        gsap.to(borderRef.current,{
            xPercent: 0,
            delay: .5,
            duration:1,
            ease: "power3.out"
        })

    })
  return <div ref={borderRef} className="border_line w-full h-[.1em] bg-gray mb-[.1em] mt-[.3em] "></div>;
};

export default Border;
