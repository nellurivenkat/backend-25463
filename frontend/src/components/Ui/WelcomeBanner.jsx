import React from "react";

const WelcomeBanner = () => {
  return (
    <div className="w-full h-[50vh] banner bg-no-repeat flex items-center">
      <div className="container mx-auto">
        <div className="w-[500px] ">
          <h1 className=" text-[55px] font-light text-white">Welcome to Dan</h1>
          <p className=" text-white">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
            nemo, quos voluptatibus, eos quam laborum, voluptatem minus magni
            impedit tenetur ullam doloremque debitis sequi. Corporis adipisci id
            dignissimos voluptatum nisi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
