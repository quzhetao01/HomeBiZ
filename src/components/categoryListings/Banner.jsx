import React from 'react';
import CategoryListingsCSS from '../../styles/CategoryListings.module.css'
import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from 'react-loading-skeleton';
import { useState, useEffect } from 'react';

const Banner = (props) => {

const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [])

  return (
    <div className={`mb-4`}>
      {isLoading && <Skeleton className={CategoryListingsCSS.image} />}
      {!isLoading && <img src={`http://localhost:3000/${props.category}.jpg`} alt="banner" className={CategoryListingsCSS.image}/>}
    </div>
  )  
}
 
export default Banner;