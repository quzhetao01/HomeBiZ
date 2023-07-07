import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { BsSearch } from "react-icons/bs";
import instance from '../axios.config';


const Searchbar = () => {

  const navigate = useNavigate();

  const [search, setSearch] = useState('');

  const handleClick = () => {
    if (search == '') {
      console.log('no input');
    } else {
      navigate('/SearchListings', {state: {title: search}});
    }
  }
    
  return <div className="mb-3 input-group" style={{width: "30vw"}}>
      <input type="text" className="form-control" placeholder="What do you want to find today?" aria-label="Search" 
      style={{height: 60, display: "inline", borderRadius: '10px 0 0 10px'}} value={search} onChange={e => setSearch(e.target.value)}/>
      <button type="button" className="btn btn-primary" onClick={handleClick}
      style={{height: 60, borderRadius: '0 10px 10px 0', backgroundColor: "#FFBC80", borderColor:"#FFBC80"}}>
        <BsSearch />
      </button>
    </div>
}
 
export default Searchbar;