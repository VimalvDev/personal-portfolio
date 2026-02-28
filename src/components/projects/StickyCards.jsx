import React from "react";

const StickyCards = () => {
  const stickyCardData = [
    {
      index: "01",
      title: "personal portfolio",
      desc: "A motion-driven portfolio designed to combine bold typography, smooth scrolling, and interactive transitions into a structured, modern web experience.",
      img: "/imgs/portfolio.png",
      skills: [
        "react",
        "gsap",
        "scroll trigger",
        "motion architecture",
        "interaction design",
      ],
    },
    {
      index: "01",
      title: "personal portfolio",
      desc: "A motion-driven portfolio designed to combine bold typography, smooth scrolling, and interactive transitions into a structured, modern web experience.",
      img: "/imgs/portfolio.png",
      skills: [
        "react",
        "gsap",
        "scroll trigger",
        "motion architecture",
        "interaction design",
      ],
    },
    {
      index: "01",
      title: "personal portfolio",
      desc: "A motion-driven portfolio designed to combine bold typography, smooth scrolling, and interactive transitions into a structured, modern web experience.",
      img: "/imgs/portfolio.png",
      skills: [
        "react",
        "gsap",
        "scroll trigger",
        "motion architecture",
        "interaction design",
      ],
    },
    {
      index: "01",
      title: "personal portfolio",
      desc: "A motion-driven portfolio designed to combine bold typography, smooth scrolling, and interactive transitions into a structured, modern web experience.",
      img: "/imgs/portfolio.png",
      skills: [
        "react",
        "gsap",
        "scroll trigger",
        "motion architecture",
        "interaction design",
      ],
    },
    {
      index: "01",
      title: "personal portfolio",
      desc: "A motion-driven portfolio designed to combine bold typography, smooth scrolling, and interactive transitions into a structured, modern web experience.",
      img: "/imgs/portfolio.png",
      skills: [
        "react",
        "gsap",
        "scroll trigger",
        "motion architecture",
        "interaction design",
      ],
    },
  ];

  return <div className="sticky_cards" >
    {stickyCardData.map((cardData,index)=>(
        <div className="sticky_card" key={index} ></div>
    ))}
  </div>;
};

export default StickyCards;
