import React from 'react';
import CategoryListingsCSS from '../../styles/CategoryListings.module.css'

const Title = (props) => {
    return (
        <div>
                <h6 className={`text-secondary mb-3 ${CategoryListingsCSS.header}`}>View listings for</h6>
                <h3 className={`mb-4 ${CategoryListingsCSS.header}`} style={{fontWeight: 700}}>{props.category}</h3>
            </div>
      );
}
 
export default Title;