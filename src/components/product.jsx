import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../css/product.css";
import animate from "../assets/ani.webm";
import animate2 from "../assets/add.webm";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(false); // State for showing the video

  function addToCart(id) {
    console.log(data);
    localStorage.setItem(id, JSON.stringify(data));
    console.log("Item added to cart");
    // Show the video for 10 seconds
    setShowVideo(true);
    setTimeout(() => {
      setShowVideo(false); // Hide the video after 10 seconds
    }, 2200
  
  );
  }

  function goToCart(id) {
    console.log("Navigating to cart with ID:", id);
    navigate(`/cart/${id}`);
  }

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((out) => {
        setTimeout(() => {
          setData(out);
          setIsLoading(false);
        }, 700);
      })
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <video src={animate} autoPlay muted loop></video>
      </div>
    );
  }

  if (!data) {
    return <p>Product not found</p>;
  }

  const discountedPrice = (
    data.price -
    (data.price * data.discountPercentage) / 100
  ).toFixed(2);

  return (
    <div className="main">
      {/* Show video overlay when showVideo is true */}
      {showVideo && (
        <div className="video-overlay">
          <video  src={animate2} autoPlay muted></video>
        </div>
      )}

      <div className="container" id="container">
        <div className="imgs">
          {[...Array(6)].map((_, index) => (
            <img key={index} className="img" src={data.thumbnail} alt={`Thumbnail ${index + 1}`} />
          ))}
        </div>

        <div className="product">
          <img className="img" src={data.thumbnail} alt="Product Thumbnail" />
          <div className="cart">
            <div className="add">
              {localStorage.getItem(data.id) ? (
                <button onClick={() => goToCart(data.id)} className="btn1">
                  {localStorage.length} GO TO CART
                </button>
              ) : (
                <button onClick={() => addToCart(data.id)} className="btn1">
                  ADD TO CART
                </button>
              )}
            </div>
            <div className="buy">
              <button className="btn2">BUY NOW</button>
            </div>
          </div>
        </div>

        <div className="info">
          <div className="path">
            Home &gt; {data.tags?.join(", ")} &gt; {data.brand} &gt; {data.category} &gt; {data.title}
          </div>
          <div className="name">
            <h3>{data.title}</h3>
            <div className="description">
              <p>{data.description}</p>
            </div>
            <p id="name">Special Price</p>
            <div className="price">
              <h2>${discountedPrice}</h2>
              <p className="price2" style={{ color: "grey" }}>
                ${data.price}
              </p>
              <p id="name2">{data.discountPercentage}% off</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
