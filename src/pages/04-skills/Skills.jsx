import React from "react";
import UpText from "../../components/animation/UpText";

const Skills = () => {
  return (
    <div className="p-10 uppercase ">
      <section className="h-screen flex justify-center items-center text-9xl ">
        <h1>hello foundation</h1>
        <div className="header">
          <h1>1</h1>
        </div>
      </section>

      <section className="h-screen flex justify-center items-center">
        <div className="philos text-2xl ">
          <span>
            {" "}
            design is not decoration. it is clarity, motion, and experience.
          </span>
          <p className="uppercase">
            i combine design thinking with technical precision to create digital
            experiences that feel structured and alive
          </p>
        </div>
      </section>

      <section className="h-screen flex justify-center items-center flex-col ">
        <div className="col text-9xl mb-19 ">
          <h1>its an animation practice</h1>
        </div>
        <div className="col">
          <UpText delay={.5}>

          <p className="text-2xl w-[50%] text- inline-block mb-20 ">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste,
            odio? Tempora suscipit repellendus quisquam adipisci accusantium
            dolor placeat tempore pariatur!
          </p>
          </UpText>
          <UpText delay={.5}>

          <p className="text-2xl w-[50%] text- inline-block mb-20 ">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste,
            odio? Tempora suscipit repellendus quisquam adipisci accusantium
            dolor placeat tempore pariatur!
          </p>
          </UpText>
          <UpText delay={.5}>

          <p className="text-2xl w-[50%] text- inline-block mb-20 ">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste,
            odio? Tempora suscipit repellendus quisquam adipisci accusantium
            dolor placeat tempore pariatur!
          </p>
          </UpText>
          <UpText delay={.5}>

          <p className="text-2xl w-[50%] text- inline-block mb-20 ">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste,
            odio? Tempora suscipit repellendus quisquam adipisci accusantium
            dolor placeat tempore pariatur!
          </p>
          </UpText>
          
        </div>
      </section>
    </div>
  );
};

export default Skills;
