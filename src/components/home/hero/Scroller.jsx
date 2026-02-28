import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { IoIosArrowDown } from "react-icons/io";

const scrollRef = useRef(null);
const arrowRef = useRef(null);

// arrow bounce animation
useGSAP(() => {
  gsap.to(arrowRef.current, {
    y: 4,
    duration: 0.8,
    ease: "power1.inOut",
    yoyo: true,
    repeat: -1,
  });
}, []);

// hide on scroll
useGSAP(() => {
  const handleScroll = () => {
    if (window.scrollY > 50) {
      gsap.to(scrollRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.4,
        ease: "power2.out",
        pointerEvents: "none",
      });
    } else {
      gsap.to(scrollRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        pointerEvents: "auto",
      });
    }
  };

  window.addEventListener("scroll", handleScroll);
  
  return () => window.removeEventListener("scroll", handleScroll);
}, []);