import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CiShoppingCart } from "react-icons/ci";
import { CartContext } from './CartContext';
import { useNavigate } from 'react-router-dom';

const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url, { signal: controller.signal });
        setData(response.data);
        setLoading(false);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Request canceled', err.message);
        } else {
          setError('Error fetching data');
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, loading, error };
};

const Products = () => {
  const { addToCart } = useContext(CartContext); 

  const navigate = useNavigate();

  const { data, loading, error } = useFetchData('https://fakestoreapi.com/products');

  const handleAddToCart = (item) => {
    addToCart(item); 
    alert("added to cart")
    navigate('/cart'); 
  };

  const handleView = (id) => {
    navigate(`/ProductView/${id}`)
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1 className='text-center m-3'>Products</h1>
      <div className='container-fluid'>
        <div className='row'>
          {data.map((item) => (
            <div className='col-lg-3 col-md-3 col-sm-6 col-12' key={item.id}>
              <div className='card d-flex flex-column mb-4'>
                <img className='card-img-top' alt={item.title} src={item.image} style={{ maxHeight: '200px', objectFit: 'contain' }} />
                <div className='card-body d-flex flex-column'>
                  <h6 className='card-title'>{item.title.slice(0, 25)}</h6>
                  <div className="mt-auto">
                    <button onClick={() => handleView(item.id)}  className='btn btn-success'>
                      Click to view
                    </button>
                    <button className='btn btn-success m-3' onClick={() => handleAddToCart(item)}><CiShoppingCart /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
