import React from 'react';
import CategoryListingsCSS from '../../styles/CategoryListings.module.css'

const SearchTitle = (props) => {
    return (
        <div>
                <h6 className={`text-secondary mb-3 ${CategoryListingsCSS.header}`}>Displaying search results for</h6>
                <h3 className={`mb-4 ${CategoryListingsCSS.header}`} style={{fontWeight: 700}}>{props.searchName}</h3>
            </div>
      );
}
 
export default SearchTitle;