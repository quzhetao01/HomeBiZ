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
    const [listings, setListings] = useState([]);
    
    useEffect(() => {
        setSelectedCategory(location.state ? location.state.category : null);
    }, [location]);

    useEffect(() => {
        if (selectedCategory == null) {
            navigate('/');
        }

        if (selectedCategory) {
            instance.get(`/listing/category/${selectedCategory}`)
                .then(res => {
                    console.log(res);
                    setListings(res.data);
                    console.log("set")
                    // setListings([]);
            })
            .catch(err => console.log(err));
        }
    }, [selectedCategory]);
    
    return (
        <div className={`${CategoryListingsCSS.main} mb-5`}>
            <Categories setSelectedCategory={setSelectedCategory}/>
            <Searchbar />
            <Title category={selectedCategory} />
            <Banner category={selectedCategory} />
            <hr className="my-5" />
            <div> 
                {listings && <PopulateListings listings={listings}/>}
            </div>
           
        </div>
      );
}
 
export default CategoryListings;