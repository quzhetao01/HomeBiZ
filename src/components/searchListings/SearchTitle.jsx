import React from 'react';
import CategoryListingsCSS from '../../styles/CategoryListings.module.css'

const SearchTitle = (props) => {
    return (
        <div>
                <h6 className={`text-secondary mb-3 ${CategoryListingsCSS.header}`}>Displaying search results for</h6>
                <div className='d-flex'>
                    <h3 className={`mb-4 me-1 ${CategoryListingsCSS.header}`} style={{fontWeight: 700}}>{props.searchName} </h3>
                    <h4 className={`text-secondary ${CategoryListingsCSS.number}`} style={{fontWeight: 700}}>({props.numResults})</h4>
                </div>
            </div>
      );
}
 
export default SearchTitle;