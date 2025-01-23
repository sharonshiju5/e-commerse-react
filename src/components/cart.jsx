import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/cart.css';
import orderVideo from '../assets/truck.webm';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [removing, setRemoving] = useState(null); // Track the item being removed
    const [totals, setTotals] = useState({
        totalPrice: 0,
        totalDiscount: 0,
        deliveryCharge: 50,
    });
    const [showVideo, setShowVideo] = useState(false);
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
                quantity: 1, // Initialize quantity as 1
                finalPrice: total - discount,
            });
        }

        setCartItems(items);
        setTotals({
            totalPrice,
            totalDiscount,
            deliveryCharge: 50,
        });
    }, []);

    const updateTotals = (updatedItems) => {
        let totalPrice = 0;
        let totalDiscount = 0;

        updatedItems.forEach((item) => {
            const discount = Math.round(item.price * (item.discountPercentage / 100)) * item.quantity;
            const total = Math.round(item.price) * item.quantity;

            totalPrice += total;
            totalDiscount += discount;
        });

        setTotals({
            totalPrice,
            totalDiscount,
            deliveryCharge: 50,
        });
    };

    const incrementQuantity = (id) => {
        const updatedItems = cartItems.map((item) =>
            item.id === id
                ? {
                      ...item,
                      quantity: item.quantity + 1, // Increment quantity
                  }
                : item
        );
        setCartItems(updatedItems);
        updateTotals(updatedItems); // Recalculate totals
    };

    const decrementQuantity = (id) => {
        const updatedItems = cartItems.map((item) =>
            item.id === id && item.quantity > 1
                ? {
                      ...item,
                      quantity: item.quantity - 1, // Decrement quantity but not below 1
                  }
                : item
        );
        setCartItems(updatedItems);
        updateTotals(updatedItems); // Recalculate totals
    };

    const removeProd = (id) => {
        setRemoving(id); // Mark the item for removal animation
        setTimeout(() => {
            const updatedItems = cartItems.filter((item) => item.id !== id);
            localStorage.removeItem(id);
            setCartItems(updatedItems);
            updateTotals(updatedItems);
            setRemoving(null); // Reset removing state
        }, 500); // Match the animation duration in CSS
    };

    const handleOrder = () => {
        setShowVideo(true);
    };

    const goToHome = () => {
        navigate('/');
    };

    if (showVideo) {
        return (
            <div className="video-fullscreen">
                <video src={orderVideo} autoPlay loop muted className="video" />
                <button onClick={goToHome} className="home-button">
                    Go to Home
                </button>
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
                        <div
                            className={`cart-section-card ${removing === prod.id ? 'removing' : ''}`}
                            key={index}
                        >
                            <div className="cart-section-imgdiv">
                                <img className="cart-section-img" src={prod.thumbnail} alt={prod.title} />
                                <div className="cart-section-quantity">
                                    <button onClick={() => decrementQuantity(prod.id)}>-</button>
                                    <h6>{prod.quantity}</h6>
                                    <button onClick={() => incrementQuantity(prod.id)}>+</button>
                                </div>
                            </div>
                            <div className="cart-section-info">
                                <h4>{prod.title}</h4>
                                <h5>{prod.description}</h5>
                                <div className="cart-section-seller">
                                    <h5>{prod.brand}</h5>
                                    <img
                                        className="cart-section-assure"
                                        src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png"
                                        alt="Assured"
                                    />
                                </div>
                                <div className="cart-section-prices">
                                    <h5 id="price2">₹{prod.price}</h5>
                                    <h4>₹{prod.finalPrice * prod.quantity}</h4>
                                    <h5>{prod.discountPercentage}% off</h5>
                                    <h5>{prod.offers || 'No offers'}</h5>
                                </div>
                                <div className="cart-section-remove">
                                    <button onClick={() => removeProd(prod.id)}>REMOVE</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-section-order">
                    <button id="order" onClick={handleOrder}>
                        ORDER
                    </button>
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
