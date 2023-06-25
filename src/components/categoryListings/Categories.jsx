import React , { useState, useEffect }from 'react';
import { useNavigate } from 'react-router-dom';
import categories from '../../helper/category';
import HomeCSS from '../../styles/Home.module.css'

const Categories = (props) => {

    const navigate = useNavigate();

    const handleClick = (cat) => {
        if (props.selectedCategory) {
            console.log('selected category');
            props.setSelectedCategory(cat);
        } else {
            navigate('/CategoryListings', {state: {category: cat}});
        }
    }

    return (
        <div className='d-flex mb-5'>
                    {categories.map((item, index) => 
                        <button key={index} className={HomeCSS.button} onClick={() => handleClick(item)}>
                            <span>{item}</span>
                        </button>
                    )}
        </div>
      );
}
 
export default Categories;