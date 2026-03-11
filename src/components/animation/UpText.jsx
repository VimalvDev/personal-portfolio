import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import React, { useRef } from "react";

gsap.registerPlugin(SplitText, ScrollTrigger);


const UpText = ({
  children,
  animateOnScroll = true,
  delay = 0,
  duration,
  splitType = "lines",
  staggerFrom = "start",
  disableOnMobile = false,
}) => {
  const containerRef = useRef(null);
  const elementRef = useRef([]);
  const splitRef = useRef([]);
  const lines = useRef([]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const init = () => {
          if (disableOnMobile && window.innerWidth < 768) return; // ← add this, rest unchanged

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

          // ✅ Check if element has actual text content
          const hasText =
            element.textContent?.trim().length > 0 &&
            !(element instanceof SVGElement) &&
            !element.querySelector("svg");

          if (hasText) {
            const split = SplitText.create(element, {
              type: splitType,
              mask: splitType,
              ...(splitType === "chars" && { charsClass: "char++" }),
              ...(splitType === "words" && { wordsClass: "word++" }),
              ...(splitType === "lines" && { linesClass: "line++" }),
            });
            splitRef.current.push(split);
            const splitItems =
              splitType === "chars"
                ? split.chars
                : splitType === "words"
                  ? split.words
                  : split.lines;
            lines.current.push(...splitItems);
          } else {
            // ✅ No text (SVG/icon) — animate the element directly
            lines.current.push(element);
            // Wrap in overflow:hidden so the slide-up is masked
            element.style.overflow = "hidden";
            element.style.display = "inline-flex";
          }
        });

        gsap.set(lines.current, { yPercent: 110 });

        const easeAnim = splitType === "chars" ? "back.out(.7)" : "power4.out"
        const animationProps = {
          yPercent: 0,
          duration: duration,
          stagger: {
            amount: 0.4,
            from: staggerFrom,
          },
          ease: easeAnim,
          delay: delay,
        };

        if (animateOnScroll) {
          gsap.to(lines.current, {
            ...animationProps,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",

              once: true,
              fastScrollEnd: true,
            },
          });
        } else {
          gsap.to(lines.current, animationProps);
        }
      };

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
dependencies: [animateOnScroll, delay, duration, splitType, staggerFrom, disableOnMobile],
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
