import './App.css';
import Home from './Components/Home';
import Products from './Components/Products';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from './Components/CartContext';
import CartPage from './Components/CartPage';
import ProductView from './Components/ProductView';

function App() {

  return (
    <CartProvider>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/Products' element={ <Products/>}></Route>
      <Route path='/Productview/:id' element={ <ProductView/>}></Route>
      <Route path='/Cart' element={ <CartPage/>}></Route>
    </Routes>
    </BrowserRouter>
    </CartProvider>
  )
}

export default App
