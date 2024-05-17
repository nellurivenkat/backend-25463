import React from "react";
import { Link } from "react-router-dom";

const ProductView = ({product}) => {
  return (
    <Link to={`/item/${product._id}`}>
      <div className="mb-4 relative cursor-pointer">
        <img
          src={product?.thumbnail}
          alt=""
          className="w-full object-contain h-[300px]"
        />
        <div className="r overflow-hidden text-ellipsis text-[20px]  text-pink-700 capitalize">
          {product?.title}
        </div>
        <div className="r text-zinc-500"> {product?.brand}</div>{" "}
        <div className="text-bold text-[18px] ">{product?.price}.00</div>
        <div className=" absolute top-2 right-2 rounded bg-pink-400 p-2  h-7 flex items-center justify-center text-[17px] text-white">
          {product?.discountPercentage}% Off
        </div>
      </div>
    </Link>
  );
};

export default ProductView;

