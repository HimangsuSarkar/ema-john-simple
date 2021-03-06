import React from 'react';
import './Product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = (props) => {
    // console.log(props);
    const { name, img, seller, price, stock, key } = props.product;

    return (
        <div className="single-product">
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className='product-name'><Link to={"/product/" + key}> {name}</Link ></h4>
                < p > <small>By:{seller}</small></p>
                <p>${price}</p>
                <p><small>Only {stock} left in stock- Order soon</small></p>
                {props.showAddToCart &&
                    < button className='cart-button'
                        onClick={() => props.handlerAddProduct(props.product)}>
                        <FontAwesomeIcon icon={faShoppingCart} />  add to cart
                </button>
                }
            </div>

        </div >
    );
};

export default Product;
