import React , { useState, useEffect }from 'react';
import { useNavigate } from 'react-router-dom';
import categories from '../../helper/category';
import HomeCSS from '../../styles/Home.module.css'

const Categories = () => {

    const navigate = useNavigate();

    const handleClick = (cat) => {
        navigate('/CategoryListings', {state: {category: `${cat}`}});
    }

    return (
        <div className='d-flex'>
                    {categories.map((item, index) => 
                        <button key={index} className={HomeCSS.button} onClick={() => handleClick(item)}>
                            <span>{item}</span>
                        </button>
                    )}
        </div>
      );
}
 
export default Categories;