import React , { useState, useEffect }from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import instance from '../axios.config';
import Categories from '../components/categoryListings/Categories';
import CategoryListingsCSS from '../styles/CategoryListings.module.css'
import Banner from '../components/categoryListings/Banner';
import Title from '../components/categoryListings/Title';
import Searchbar from '../components/Searchbar';
import PopulateListings from '../components/populateListings/PopulateListings';

const CategoryListings = () => {
   
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [listings, setListings] = useState(null);
    
    useEffect(() => {
        console.log(location);
        setSelectedCategory(location.state.category);
    }, [location]);

    useEffect(() => {
        console.log(location);

        const category = location.state ? location.state.category : null;
        if (category == null) {
            navigate('/CategoryListings');
        } else {
            instance.get(`/listing/category/${category}`)
                .then(res => {
                    console.log(res);
                    setListings(res.data);
            })
            .catch(err => console.log(err));
        }
    }, [location]);
    
    return (
        <div className={CategoryListingsCSS.main}>
            <Categories />
            <Searchbar />
            <Title category={selectedCategory} />
            <Banner category={selectedCategory} />
            <div> 
                {listings && <PopulateListings listings={listings}/>}
            </div>
           
        </div>
      );
}
 
export default CategoryListings;