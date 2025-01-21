import Card from "./components/card"
import Nav from "./components/nav"
import './App.css'
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Product from "./components/product"
import Cart from "./components/cart"

function App() {

  return (
    <div className="main">
      <BrowserRouter>
      <Nav/>
          <Routes>
            <Route path="/" Component={Card}/>
            <Route path="/card/:id" Component={Product}/>
            <Route path="/cart/:id" Component={Cart}/>
            <Route path="/cart" Component={Cart}/>
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
