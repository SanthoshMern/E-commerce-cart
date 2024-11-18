import React, { useContext } from 'react';
import { CartContext } from './CartContext'; 

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useContext(CartContext);

  const handleQuantityChange = (e, id) => {
    const newQuantity = parseInt(e.target.value);
    updateQuantity(id, newQuantity);
  };

  return (
    <div>
      <h1 className='text-center'>Your Cart</h1>
      <div className='container'>
        <div className='row'>
          {cartItems.length > 0 ? (
            <>
              {cartItems.map((item, index) => (
                <div className='col-lg-3 col-md-4 col-sm-6 col-12' key={index}>
                  <div className='card d-flex flex-column mb-4'>
                    <img className='card-img-top' alt={item.title} src={item.image} style={{ maxHeight: '200px', objectFit: 'contain' }} />
                    <div className='card-body d-flex flex-column'>
                      <h5 className='card-title'>{item.title.slice(0, 20)}</h5>
                      <h5 className='card-title'>${item.price}</h5>
                      <p className='card-text'>{item.description.slice(0, 50)}</p>
                      <div>
                        <label>Quantity: </label>
                        <input
                          type='number'
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(e, item.id)}
                          min='1'
                          className='form-control mb-2'
                          style={{ width: '60px'}}
                        />
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className='btn btn-danger'>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className='col-12'>
                <h2 className='text-center'>Total: ${getTotalPrice().toFixed(2)}</h2>
              </div>
            </>
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartPage;
