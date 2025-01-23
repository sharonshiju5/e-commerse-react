import "../css/nav.css"
import cart from "../assets/cart.webm"
import cart1 from "../assets/cart1.webm"
import search from "../assets/search.webm"
import Animation from "./animation"
import { Link } from "react-router-dom"
function Nav({setSearch}){
    return(
        <div className="nav-container">
            <div className="nav">
                <div className="nav-logo">
                    <h1>E-COM</h1>
                </div>
                <div className="nav-div">
                    <div className="nav-search">
                        <input onChange={(e)=>{setSearch(e.target.value)}} type="text" placeholder="search...."/>
                        <div className="nav-input-div">
                        </div>
                        <video src={search} autoPlay muted loop className="nav-input-div-video"></video>

                    </div>
                    <div className="nav-info">
                        <ul>
                            <li>home</li>
                            <li>about</li>
                            <li>contact</li>
                        </ul>
                    </div>
                    <div className="nav-cart">
                        <Link to={`/cart`}>
                        <Animation/>
                        </Link>
                        <span className="animate-cart">{localStorage.length==0 ? "":localStorage.length}</span>
                        {/* this video has to chainge when  in product page */}
                        {/* <video src={cart} autoPlay muted loop></video> */}
                    </div>
                </div>
            </div>
            <div className="filter-nav">
                <div className="ul-div">
                    <ul>
                        <li>beauty</li>
                        <li>smartphone</li>
                        <li>fragrence</li>
                        <li>grocery</li>
                        <li>toys</li>
                        <li>furniture</li>
                        <li>electronics</li>
                        <li>fashion</li>
                        <li>home decor</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Nav