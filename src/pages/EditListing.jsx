import React, { useEffect, useState } from 'react';
import instance from '../axios.config';
import getUser from '../helper/user';
// components
import Button from '@mui/material/Button'
import Title from '../components/createListing/Title';
import Description from '../components/createListing/Description';
import Location from '../components/createListing/Location';
import FileUpload from '../components/createListing/FileUpload';
import SelectCategory from '../components/createListing/SelectCategory';
import CreateMenu from '../components/createListing/CreateMenu';
import Contact from '../components/createListing/Contact';
import MultipleFileUpload from '../components/createListing/MultipleFileUpload';
import Modal from "react-modal";
import { TbAlertCircleFilled } from "react-icons/tb";

//others
import categories from "../helper/category";
import { useNavigate, useLocation } from 'react-router-dom';
import styles from "../styles/CreateListing.module.css"

const EditListing = () => {
    return <div>
        editListing
    </div>
}

export default EditListing;