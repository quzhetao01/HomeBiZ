import React from 'react';
import Categories from '../components/categoryListings/Categories';
import CategoryListingsCSS from '../styles/CategoryListings.module.css'
import Banner from '../components/categoryListings/Banner';

const CategoryListings = () => {
   
    
    
    return (
        <div className={CategoryListingsCSS.main}>
            <Categories />
            <div className='p-4'>Search bar goes here</div>
            <div>
                <h6 className={`text-secondary ${CategoryListingsCSS.header}`}>Fashion > Women's Clothing</h6>
                <h3 className={`mb-4 ${CategoryListingsCSS.header}`}>Blouses (525)</h3>
            </div>
            <Banner />
            <div className="d-flex pt-4 justify-content-start ms-auto">
                <div className="card col-4">yo</div>
                <div className="card col-8">
                    <div>hi</div> 
                    <div>sample</div>
                    <div>works?</div>
                    <div>listings</div>
                </div>
            </div>
        </div>
      );
}
 
export default CategoryListings;