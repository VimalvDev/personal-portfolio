import React from "react";

const Loader = () => {
  return (
    <div className="loading_screen fixed inset-0 bg-light-black z-100 w-full min-h-svh ">
      <div className="loader">
        <div className="loader_1 bar "></div>
        <div className="loader_2 bar"></div>
      </div>

      <div className="counter">
        <div className="counter_1 digit">
          <div className="num">0</div>
          <div className="num num1offset1 " >1</div>
        </div>
        <div className="counter_2 digit">
          <div className="num">0</div>
          <div className="num num1offset2 ">1</div>
          <div className="num">2</div>
          <div className="num">3</div>
          <div className="num">4</div>
          <div className="num">5</div>
          <div className="num">6</div>
          <div className="num">7</div>
          <div className="num">8</div>
          <div className="num">9</div>
          <div className="num">0</div>
        </div>
        <div className="counter_3 digit"></div>
      </div>
    </div>
  );
};

export default Loader;
