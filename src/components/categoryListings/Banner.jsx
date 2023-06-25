import React from 'react';
import CategoryListingsCSS from '../../styles/CategoryListings.module.css'

const Banner = () => {
    return (
        <img src="http://localhost:3000/1865.jpg" alt="banner" className={CategoryListingsCSS.image}/>
      );
}
 
export default Banner;