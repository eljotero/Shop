import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import Cart from '../components/Cart';
import '../css/Navbar.css'

function Navbar() {

    const [showCart, setShowCart] = useState(false);
    const products = useSelector((state: RootState) => state.cart.root);
    const sumOfProducts = products.reduce((acc, product) => acc + product.quantity, 0);

    function navigateTo(path: string) { 
        window.location.href = path;
    }

    return (
        <div className='NavbarContainer'>
            <div className='NavbarSectionLeft'>
                <button onClick={() => navigateTo('/shop')}>SHOP</button>
                <button onClick={() => navigateTo('/about')}>ABOUT US</button>
                <button onClick={() => navigateTo('/contact')}>CONTACT</button>
            </div>
            <div onClick={() => navigateTo('/')}className='NavbarSectionCenter'>
                <div className="waviy">
                    <span style={{ '--i': 1 } as React.CSSProperties}>S</span>
                    <span style={{ '--i': 2 } as React.CSSProperties}>W</span>
                    <span style={{ '--i': 3 } as React.CSSProperties}>E</span>
                    <span style={{ '--i': 4 } as React.CSSProperties}>E</span>
                    <span style={{ '--i': 5 } as React.CSSProperties}>T</span>
                    <br />
                    <span style={{ '--i': 6 } as React.CSSProperties}>T</span>
                    <span style={{ '--i': 5 } as React.CSSProperties}>R</span>
                    <span style={{ '--i': 4 } as React.CSSProperties}>E</span>
                    <span style={{ '--i': 3 } as React.CSSProperties}>A</span>
                    <span style={{ '--i': 2 } as React.CSSProperties}>T</span>
                    <span style={{ '--i': 1 } as React.CSSProperties}>S</span>
                </div>
            </div>
            <div className='NavbarSectionRight'>
                <button className='SearchButton'></button>
                <button className='AccountButton'></button>
                <div className='VerticalLine'>
                    <button className='CartButton' onClick={() => setShowCart(!showCart)}><p className='numberOfProducts'>{sumOfProducts}</p></button>
                </div>
                {showCart && <Cart />}
            </div>
        </div>
    );
}

export default Navbar;