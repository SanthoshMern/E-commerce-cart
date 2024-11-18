import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from './CartContext';

const ProductView = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching product details');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const { addToCart } = useContext(CartContext); 

  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(product); 
    alert("added to cart")
    navigate('/cart'); 
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='container mt-4'>
      <div className='row'>
        <div className='card mb-3'>
        <div class="row g-0">
        <div class="col-md-4">
          <img class="img-fluid rounded-start" src={product.image} alt={product.title} style={{ maxWidth: '100%', maxHeight:"250px" }} />
        </div>
        <div className='col-md-8'>
        <div class="card-body">
          <h3 className='card-title'>{product.title.slice(0, 20)}</h3>
          <p className='card-text'>{product.description.slice(0, 150)}</p>
          <h3 className='card-title'>Price :$ {product.price}</h3>
          <h3 className='card-title'>Rating : {product.rating.rate}</h3>
          <button onClick={handleAddToCart} className='btn btn-success mt-2'>add to cart</button>
        </div>
        </div>
      </div>
      </div>
      </div>
    </div>
  );
};

export default ProductView;
