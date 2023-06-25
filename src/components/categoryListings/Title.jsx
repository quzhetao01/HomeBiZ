import React from 'react';
import CategoryListingsCSS from '../../styles/CategoryListings.module.css'

const Title = (props) => {
    return (
        <div>
                <h6 className={`text-secondary ${CategoryListingsCSS.header}`}>View listings for</h6>
                <h3 className={`mb-4 ${CategoryListingsCSS.header}`}>{props.category}</h3>
            </div>
      );
}
 
export default Title;