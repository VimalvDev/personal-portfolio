import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { stagger } from "motion";
import React, { useRef } from "react";

gsap.registerPlugin(SplitText, ScrollTrigger);

const UpText = ({ children, animateOnScroll = true, delay = 0, duration, yPos=110 }) => {
  const containerRef = useRef(null);
  const elementRef = useRef([]);
  const splitRef = useRef([]);
  const lines = useRef([]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const init = () => {
        splitRef.current = [];
        elementRef.current = [];
        lines.current = [];

        let elements = [];
        if (containerRef.current.hasAttribute("data-copy-wrapper")) {
          elements = Array.from(containerRef.current.children);
        } else {
          elements = [containerRef.current];
        }

        elements.forEach((element) => {
          elementRef.current.push(element);

          const split = SplitText.create(element, {
            type: "lines",
            mask: "lines",
            linesClass: "line++",
          });

          splitRef.current.push(split);
          lines.current.push(...split.lines);
        });

        gsap.set(lines.current, { yPercent: yPos });

        const animationProps = {
          yPercent: 0,
          duration: duration,
          stagger: 0.1,
          ease: "power4.out",
          delay: delay,
        };

        if (animateOnScroll) {
          gsap.to(lines.current, {
            ...animationProps,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              once: true,
            },
          });
        } else {
          gsap.to(lines.current, animationProps);
        }
      };

      // 🔥 WAIT FOR FONTS
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(init);
      } else {
        init();
      }

      return () => {
        splitRef.current.forEach((split) => split?.revert());
      };
    },
    {
      scope: containerRef,
      dependencies: [animateOnScroll, delay, duration],
    },
  );
  if (React.Children.count(children) === 1) {
    return React.cloneElement(children, { ref: containerRef });
  }

  return (
    <div className="" ref={containerRef} data-copy-wrapper="true">
      {children}
    </div>
  );
};

export default UpText;
