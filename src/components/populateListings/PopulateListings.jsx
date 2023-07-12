import { ListItemSecondaryAction } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import ListingPreview from './ListingPreview';
import PopulateListingsCSS from '../../styles/PopulateListings.module.css'

const PopulateListings = (props) => {

    return ( 
        <div>
            <div className={`mb-4 ${PopulateListingsCSS.title}`}>
                <h1>{props.title}</h1>
            </div>
            <div className={PopulateListingsCSS.listingContainer}>
                {props.listings.map((item, index) => {
                        return <ListingPreview key={index} title={item.title} reviews={item.reviews} 
                                location={item.township} image={item.displayImage} link={item._id} 
                                created={item.created_on} category={item.category}/> }
                )}
            </div>
        </div>
    );
}

export default PopulateListings;