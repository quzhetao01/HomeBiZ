import React from 'react';
import categories from '../../helper/category';
import HomeCSS from '../../styles/Home.module.css'

const Categories = () => {
    return (
        <div className='d-flex'>
                    {categories.map((item, index) => 
                        <div key={index} className={HomeCSS.cat}>{item}</div>
                    )}
        </div>
      );
}
 
export default Categories;