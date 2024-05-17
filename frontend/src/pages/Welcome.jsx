import React from "react";
import ProductList from "../components/ProductList";

const Welcome = () => {
  return (
    <div>
      <div className="w-full h-[50vh] banner bg-no-repeat flex items-center">
        <div className="container mx-auto">
          <div className="w-[500px] ">
            <h1 className=" text-[55px] font-light text-white">
              Welcome to Vencant Store
            </h1>
            <p className=" text-white">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
              nemo, quos voluptatibus, eos quam laborum, voluptatem minus magni
              impedit tenetur ullam doloremque debitis sequi. Corporis adipisci
              id dignissimos voluptatum nisi.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <ProductList />
      </div>
    </div>
  );
};

export default Welcome;
