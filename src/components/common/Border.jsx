import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Border = ({ 
  delay = 0.5, 
  duration = 1,
  animateOnScroll = false,
  hoverable = false, // ← add this
  hoverTriggerRef = null, // ← ref of the element that triggers hover
}) => {
  const borderRef = useRef(null);

  useGSAP(() => {
    gsap.set(borderRef.current, { 
      scaleX: 0, 
      transformOrigin: "right center",
    });

    const animProps = {
      scaleX: 1,
      delay: delay,
      duration: duration,
      ease: "power3.out",
    };

    // entrance animation
    if (animateOnScroll) {
      gsap.to(borderRef.current, {
        ...animProps,
        scrollTrigger: {
          trigger: borderRef.current,
          start: "top 80%",
          once: true,
        },
      });
    } else {
      gsap.to(borderRef.current, animProps);
    }

    // hover animation
    if (hoverable && hoverTriggerRef?.current) {
      hoverTriggerRef.current.addEventListener("mouseenter", () => {
        gsap.to(borderRef.current, {
          scaleX: 0,
          transformOrigin: "left center", // ← exit to left
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            gsap.to(borderRef.current, {
              scaleX: 1,
              transformOrigin: "right center", // ← re-enter from right
              duration: 0.4,
              ease: "power2.out",
            });
          },
        });
      });
    }
  });

  return (
    <div className="w-full overflow-hidden mb-[.1em] mt-[.3em]">
      <div
        ref={borderRef}
        className="border_line w-full h-[.1em] bg-mid-gray"
      />
    </div>
  );
};

export default Border;