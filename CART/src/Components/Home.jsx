import React from 'react';
import './../App.css';
import {useNavigate} from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    function Nextpage(){
        navigate("/Products")
    };

  return (
    <div className='text-center bg-img'>
        <h1>Welcome to Purchase a Products</h1>
        <button className='btn btn-success' onClick={Nextpage}>View Products</button>
    </div>
  )
}

export default Home