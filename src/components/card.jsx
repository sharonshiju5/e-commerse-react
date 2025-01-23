import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/card.css";
import animate from "../assets/ani.webm";

const Card = ({search}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then((out) => {
                setData([...out.products]);
                setLoading(false); 
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false); 
            });
    }, []);

    return (
        <div className="card-container">
            {loading ? (
                <div className="loading-container">
                    <video autoPlay loop muted>
                        <source src={animate} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            ) : (
                data.filter((dt)=>dt.title.toLowerCase().includes(search.toLowerCase())).map((dt) => (
                    <Link to={`/card/${dt.id}`} key={dt.id}>
                        <div className="card">
                            <div className="image">
                                <img src={dt.thumbnail} alt={dt.title} />
                            </div>
                            <div className="text">
                                <h3>{dt.title}</h3>
                                <div className="content">
                                    <h6>{dt.brand}</h6>
                                    <h6>{dt.rating}</h6>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))
            )}
        </div>
    );
};
export default Card;