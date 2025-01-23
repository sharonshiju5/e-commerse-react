import Card from "./components/card"
import Nav from "./components/nav"
import './App.css'
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Product from "./components/product"
import Cart from "./components/cart"
import { useState } from "react"

function App() {
const [search,setSearch]=useState("")

console.log(`search ${search}`);

  return (
    <div className="main">
      <BrowserRouter>
      <Nav setSearch={setSearch}/>
          <Routes>
            <Route path="/" element={<Card search={search}/>}/>
            <Route path="/card/:id" Component={Product}/>
            <Route path="/cart/:id" Component={Cart}/>
            <Route path="/cart" Component={Cart}/>
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
