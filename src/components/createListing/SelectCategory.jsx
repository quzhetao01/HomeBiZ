import React from "react";
import CategoryOption from "./CategoryOption";
import RequiredIcon from "../RequiredIcon";

const SelectCategory = ({categories, handleCategory}) => {
return <select onChange={e => handleCategory(e.target.value)} className="form-select">
            <option selected> <RequiredIcon /> Select a Category</option>
            {categories.map(category => <CategoryOption value={category}/>)}
        </select>
}

export default SelectCategory;