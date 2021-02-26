import React, { useState } from 'react';
import fakeData from '../../../fakeData'
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);

    const handlerAddProduct = (addProduct) => {
        console.log(addProduct)
        const newCart = [...cart, addProduct];
        setCart(newCart);
    }
    return (
        <div className='shop-container'>

            <div className="product-container">

                {
                    products.map(product => <Product
                        handlerAddProduct={handlerAddProduct}
                        product={product}>

                    </Product>)
                }

            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div >
        </div >
    );
};

export default Shop;
