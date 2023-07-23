import React , { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import instance from '../axios.config';
import Categories from '../components/categoryListings/Categories';
import CategoryListingsCSS from '../styles/CategoryListings.module.css'
import Banner from '../components/categoryListings/Banner';
import Title from '../components/categoryListings/Title';
import Searchbar from '../components/Searchbar';
import PopulateListings from '../components/populateListings/PopulateListings';
import getUser from '../helper/user';

const CategoryListings = () => {
   
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [listings, setListings] = useState([]);
    const [user, setUser] = useState();
    
    useEffect(() => {
        setSelectedCategory(location.state ? location.state.category : null);
    }, [location]);

    useEffect(() => {
        if (selectedCategory == null) {
            navigate('/');
        }

        if (selectedCategory) {
            getUser().then(user => {
                console.log("user object", user);
                setUser(user);
                if (user === "No user found") {
                    navigate("/login");
                } else if (!user.category) {
                    navigate("/selectInterests", {state: {justRegistered: true, id: user._id, loggedIn: true}});
                }
            })
            instance.get(`/listing/category/${selectedCategory}`)
                .then(res => {
                    console.log(res);
                    setListings(res.data);
            })
            .catch(err => console.log(err));
        }
    }, [selectedCategory]);
    
    return (
        <div className={`${CategoryListingsCSS.main}`}>
            <div className={`${CategoryListingsCSS.button}`}>
                <Categories setSelectedCategory={setSelectedCategory} />
            </div>
            <Title category={selectedCategory} numResults={listings.length}/>
            <Banner category={selectedCategory} />
            <hr className="my-5" />
            <div> 
                {listings && user && <PopulateListings listings={listings} user={user}/>}
            </div>
        </div>
      );
}
 
export default CategoryListings;