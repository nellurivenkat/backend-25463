import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductView from "../components/Ui/ProductView";
import { useNavigate } from "react-router-dom";
import { getProductById } from "../functions/Product";
import { useDispatch } from "react-redux";
import { addItem } from "../functions/redux/cart/cartSlice";

const ViewProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(
    "https://th.bing.com/th/id/R.174d1d09fe1b5f15f427ea8411fe2a21?rik=1RMC%2bFU5tvWuRQ&pid=ImgRaw&r=0"
  );

  const dispatch = useDispatch()
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(id);
        setProduct(productData);
        setImage(productData?.thumbnail);
      } catch (error) {
        setError("Error fetching product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);


  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (error)
    return <div className="text-center mt-20 text-red-500">{error}</div>;

  const handleAddToCart = () => {
    dispatch(addItem(product));
  };

  return (
    <div className="pt-10">
      <div className="container mx-auto mt-10 flex flex-col items-center justify-center">
        <div className="w-full shadow rounded p-5 max-w-[1200px] ">
          <div className="block md:flex gap-3 ">
            <div className="w-[30%]">
              <img
                src={image}
                alt=""
                className="w-full h-[300px] object-cover"
              />
              <div className="grid grid-cols-5 gap-2 mt-2">
                <img
                  src={product?.thumbnail}
                  className="w-[50px] h-[50px] object-cover rounded cursor-pointer"
                  onClick={() => setImage(product?.thumbnail)}
                  alt=""
                />
                {product?.images.length > 0 &&
                  product?.images.map((item, i) => (
                    <img
                      key={i}
                      src={item}
                      className="w-[50px] h-[50px] object-cover rounded cursor-pointer"
                      onClick={() => setImage(item)}
                      alt=""
                    />
                  ))}
              </div>
            </div>
            <div className="w-[70%]">
              <div className="">
                <div className="text-[30px] capitalize">{product?.title}</div>
                <div className="flex items-center gap-3">
                  <div className="">
                    {" "}
                    <b>Brand: </b>
                    {product?.brand}
                  </div>
                  <div className="">
                    <b>Category: </b>
                    {product?.category}
                  </div>
                  <div className="">
                    <b>Rating: </b>
                    {product?.rating}
                  </div>
                </div>
                <div className="">
                  We have <b>{product?.stock}</b> left in the store
                </div>
                <div className="">
                  <b>
                    Price: <span className="text-red-500">$ 1,000</span>{" "}
                    <span className="font-normal bg-orange-100 p-1 rounded text-orange-600">
                      {product?.discountPercentage}
                    </span>
                  </b>
                </div>
                <div className="">
                  <b>Details</b> {product?.description}
                </div>
                <button
                  onClick=  {handleAddToCart}
                  className="bg-pink-400 text-white p-2 mt-3 rounded"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProductDetails;
