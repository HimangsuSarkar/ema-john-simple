import React from 'react';

import './Cart.css'


const Cart = (props) => {
    const cart = props.cart;
    const total = cart.reduce((total, prd) => total + prd.price * prd.quantity, 0)
    debugger

    // let total = 0;
    // for (let i = 0; i < cart.length; i++) {
    //     const product = cart[i];
    //     total = total + product.price * product.quantity;

    // }

    let shipping = 0;
    if (total > 35) {
        shipping = 0;
    } else if (total > 15) {
        shipping = 4.99;
    } else if (total > 0) {
        shipping = 12.90;
    }
    const tax = Math.round(total / 10);

    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }


    return (
        <div>
            <h3 className="text-primary">Order Summary</h3>
            <h5>Items Ordered: {cart.length}</h5>
            <p>Product Price:{formatNumber(total)}</p>
            <p><small>Shipping Cost:{shipping}</small></p>
            <p><small>VAT+Tax:{tax}</small></p>
            <p>Total Price:{total + shipping + tax}</p>
            <br />
            {
                props.children
            }
        </div >
    );
};

export default Cart;
