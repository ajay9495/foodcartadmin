import { Link, Route, Router, Routes, useLocation } from 'react-router-dom';

import Dashboard from '../Dashboard/Main/Dashboard';
import AddProduct from '../AddProduct/AddProduct';
import EditProduct from '../EditProduct/EditProduct';
import ViewProducts from '../ViewProducts/ViewProducts';
import SearchProducts from '../SearchProducts/SearchProducts';
import Category from '../Category/Category';
import EditCategory from '../EditCategory/EditCategory';
import Login from '../Login/Login';
import Register from '../Register/Register';

import StoreKeeper from '../StoreKeeper/StoreKeeper';
import Delivery from '../Delivery/Delivery'

export default function Main(){

    const loc = useLocation();

    return(

        <>
            <Routes location={loc} key={loc.key} >
                <Route path='/' element={<Dashboard />} />
                <Route path='AddProduct' element={<AddProduct />} />
                <Route path='EditProduct' element={<EditProduct />} />
                <Route path='ViewProducts' element={<ViewProducts />} />
                <Route path='SearchProducts' element={<SearchProducts />} />
                <Route path='Category' element={<Category />} />
                <Route path='EditCategory' element={<EditCategory />} />
                <Route path='StoreKeeper' element={<StoreKeeper />} />
                <Route path='Delivery' element={<Delivery />} />
            </Routes> 
        </>
    );

}