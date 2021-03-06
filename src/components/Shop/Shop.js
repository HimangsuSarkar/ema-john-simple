import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData'
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    console.log(products);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        const previousCart = productKeys.map(existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey);
            product.quantity = saveCart[existingKey];
            return product;
        })
        setCart(previousCart);
    }, [])

    const handlerAddProduct = (addProduct) => {
        console.log(addProduct)
        const toBeAdded = addProduct.key;
        const sameProduct = cart.find(pd => pd.key === toBeAdded);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAdded);
            newCart = [...others, sameProduct];
        } else {
            addProduct.quantity = 1;
            newCart = [...cart, addProduct];
        }
        setCart(newCart);
        addToDatabaseCart(addProduct.key, count)
    }
    return (
        <div className='shop-container'>

            <div className="product-container">

                {
                    products.map(product => <Product
                        key={product.key}
                        showAddToCart={true}
                        handlerAddProduct={handlerAddProduct}
                        product={product}>

                    </Product>)
                }

            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to='/review'>
                        <button className="btn btn-primary">Review Order</button>
                    </Link>
                </Cart>

            </div >
        </div >
    );
};

export default Shop;
