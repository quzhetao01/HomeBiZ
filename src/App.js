import React from 'react';
import './App.css';
import {
  Route,
  createBrowserRouter, 
  createRoutesFromElements, 
  RouterProvider 
} from 'react-router-dom';

// pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateListing from './pages/CreateListing';
import ViewListing from './pages/ViewListing';
import CategoryListings from './pages/CategoryListings';
import SelectInterests from './pages/SelectInterests';
import EditListing from './pages/EditListing';

//layouts
import RootLayout from './layouts/RootLayout';




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />}/>
      <Route path='createListing' element={<CreateListing/>}/>
      <Route path="viewListing" element={<ViewListing />}/>
      <Route path="categoryListings" element={<CategoryListings />}/>
      <Route path="selectInterests" element={<SelectInterests />}/>
      <Route path="editListing" element={<EditListing />}/>


    </Route>
  )

);

const App = () => {
  
  return ( 
    <RouterProvider router={router} />
  )
}

export default App;
