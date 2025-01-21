import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/cart.css';
import orderVideo from '../assets/truck.webm';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [totals, setTotals] = useState({
        totalPrice: 0,
        totalDiscount: 0,
        deliveryCharge: 0,
    });
    const [showVideo, setShowVideo] = useState(false); // State to control video display
    const navigate = useNavigate();

    useEffect(() => {
        let items = [];
        let totalPrice = 0;
        let totalDiscount = 0;

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const prod = JSON.parse(localStorage.getItem(key));

            const discount = Math.round(prod.price * (prod.discountPercentage / 100));
            const total = Math.round(prod.price);
            totalPrice += total;
            totalDiscount += discount;

            items.push({
                ...prod,
                finalPrice: total - discount,
            });
        }

        setCartItems(items);
        setTotals({
            totalPrice,
            totalDiscount,
            deliveryCharge: 50, // Example static delivery charge
        });
    }, []);

    const removeProd = (id) => {
        localStorage.removeItem(id);
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const handleOrder = () => {
        setShowVideo(true); // Show the video
    };

    const goToHome = () => {
        navigate('/'); // Navigate to the home page
    };

    if (showVideo) {
        return (
            <div className="video-fullscreen">
                <video src={orderVideo} autoPlay loop muted className="video" />
                <button onClick={goToHome} className="home-button">Go to Home</button>
            </div>
        );
    }


    

    return (
        <div className="cart-section">
            <div className="cart-section-main">
                <div className="cart-section-add">
                    <p>From saved address</p>
                    <button className="cart-section-btn1">Enter delivery pincode</button>
                </div>

                <div className="cart-section-container">
                    {cartItems.map((prod, index) => (
                        <div className="cart-section-card" key={index}>
                            <div className="cart-section-imgdiv">
                                <img className="cart-section-img" src={prod.thumbnail} alt={prod.title} />
                                <div className="cart-section-quantity">
                                    <button>-</button>
                                    <h6>1</h6>
                                    <button>+</button>
                                </div>
                            </div>
                            <div className="cart-section-info">
                                <h4>{prod.title}</h4>
                                <h5>{prod.description}</h5>
                                <div className="cart-section-seller">
                                    <h5>{prod.brand}</h5>
                                    <img className="cart-section-assure" src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="Assured" />
                                </div>
                                <div className="cart-section-prices">
                                    <h5 id="price2">₹{prod.price}</h5>
                                    <h4>₹{prod.finalPrice}</h4>
                                    <h5>{prod.discountPercentage}% off</h5>
                                    <h5>{prod.offers || "No offers"}</h5>
                                </div>
                                <div className="cart-section-remove">
                                    <button onClick={() => removeProd(prod.id)}>REMOVE</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-section-order">
                    <button id="order" onClick={handleOrder}>ORDER</button>
                </div>
            </div>

            <div className="cart-section-bill">
                <div className="cart-section-div">
                    <h4 className="cart-section-h4">Price details</h4>
                    <div className="cart-section-div2">
                        <div className="cart-section-p">
                            <p className="cart-section-price">Price</p>
                            <p>₹{totals.totalPrice}</p>
                        </div>
                        <div className="cart-section-p">
                            <p>Discount</p>
                            <p>₹{totals.totalDiscount}</p>
                        </div>
                        <div className="cart-section-p">
                            <p>Delivery charge</p>
                            <p>₹{totals.deliveryCharge}</p>
                        </div>
                        <hr />
                        <div className="cart-section-p">
                            <h2>Total amount</h2>
                            <p>₹{totals.totalPrice - totals.totalDiscount + totals.deliveryCharge}</p>
                        </div>
                        <hr />
                        <div className="cart-section-p">
                            <p>You will save ₹{totals.totalDiscount} on this order</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
