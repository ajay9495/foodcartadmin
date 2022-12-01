
import { Link, Route, Router, Routes, useLocation } from 'react-router-dom';
import SuperLogin from "../SuperLogin/SuperLogin";

export default function SuperLoginRouter(){

    const loc = useLocation();

    return(

        <Routes location={loc} key={loc.key} >
            <Route path='/' element={<SuperLogin />} />
        </Routes>         

    );
    
}

