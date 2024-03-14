import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import ShopView from '../pages/ShopView';
import ProductView from '../pages/ProductView';
import Cart from '../components/Cart';
import AboutUs from '../pages/AboutUs';
import Contact from '../pages/Contact';
import { useState } from 'react';

function App() {


    const [showCart, setShowCart] = useState(false);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage/>} />
                <Route path="/product/:id" element={<ProductView/>} />
                <Route path="/shop" element={<ShopView/>} />
                <Route path="/about" element={<AboutUs/>} />
                <Route path="/contact" element={<Contact/>} />
                <Route path="/cart" element={<Cart/>} />
            </Routes>
        </Router>
    );
}

export default App;
