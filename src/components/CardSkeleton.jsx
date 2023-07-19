import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import PopulateListingsCSS from '../styles/PopulateListings.module.css';


const CardSkeleton = () => {
    return (
        <div className={PopulateListingsCSS.skeleton}>
            <div className={PopulateListingsCSS.top}>
                <Skeleton height={220} />
            </div>
            <div className={PopulateListingsCSS.bot}>
                <Skeleton height={100} />
            </div>
            
        </div>
      );
}

export default CardSkeleton;