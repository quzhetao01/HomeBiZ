import React from 'react';
import CategoryListingsCSS from '../../styles/CategoryListings.module.css'

const Title = (props) => {
    return (
        <div>
                <h6 className={`text-secondary mb-3 ${CategoryListingsCSS.header}`}>View listings for</h6>
                <div className='d-flex'>
                    <h3 className={`mb-4 me-1 ${CategoryListingsCSS.header}`} style={{fontWeight: 700}}>{props.category} </h3>
                    <h4 className={`text-secondary ${CategoryListingsCSS.number}`} style={{fontWeight: 700}}>({props.numResults})</h4>
                </div>
            </div>
      );
}
 
export default Title;