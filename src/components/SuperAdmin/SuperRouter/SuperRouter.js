
import { Link, Route, Router, Routes, useLocation } from 'react-router-dom';
import SuperLogin from "../SuperLogin/SuperLogin";

import SuperDashboard from '../SuperDashboard/SuperDashboard';
import Approvals from '../Approvals/Approvals';

import TopNavigation from '../TopNavigation/TopNavigation';
import SideBar from '../SideBar/SideBar';
import Footer from '../../Footer/Footer';

export default function SuperRouter(){

    const loc = useLocation();

    return(
        <>
            <TopNavigation />
            <SideBar />

            <Routes location={loc} key={loc.key} >
                <Route path='/' element={<SuperDashboard />} />
                <Route path='Approvals' element={<Approvals />} />
            </Routes> 

            <Footer /> 
        </>
       

    );
    
}
