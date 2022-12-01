import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";


export default function SideBar() {

    let navigateTo = useNavigate();

    function goTo(path){
      let homeWrapperDiv = document.getElementById('HomeWrapper');
      let mainWrapperDiv = document.getElementById('mainWrapper');
      let subscriptionWrapperDiv  = document.getElementById('subscriptionWrapper');
      
  
      navigateTo(path);
    }


    let imageUrl = "https://i0.wp.com/www.mobileworldlive.com/wp-content/uploads/2015/10/Dorsey-iamge.png";
    let logoUrl = "https://about.twitter.com/content/dam/about-twitter/en/brand-toolkit/brand-download-img-1.jpg.twimg.1920.jpg";


  return (

    <aside className="main-sidebar sidebar-dark-primary elevation-4">

        <a href="index3.html" className="brand-link">
        <img src={logoUrl} alt="AdminLTE Logo" className="brand-image img-circle elevation-3"  />
        <span className="brand-text font-weight-light">AdminLTE 3</span>
        </a>

        <div className="sidebar">

            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                <div className="image">
                    <img  src={imageUrl}  className="img-circle elevation-2" alt="User Image" />
                </div>
                <div className="info">
                <a href="#" className="d-block">Alexander Pierce</a>
                </div>
            </div>

            <nav className="mt-2">
                <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                    <li className="nav-item menu-open"  onClick={event => goTo("/")} >
                        <a href="#" className="nav-link active">
                            <i className="nav-icon fas fa-tachometer-alt"></i>
                            <p>
                                Dashboard
                            </p>
                        </a>
                    </li>
                    <li className="nav-item" onClick={event => goTo("AddProduct")} >
                        <a className="nav-link">
                            <i className="nav-icon fas fa-plus"></i>
                            <p>Add Product</p>
                        </a>
                    </li>
                    <li className="nav-item" onClick={event => goTo("ViewProducts")} >
                        <a className="nav-link">
                            <i className="nav-icon fas fa-eye"></i>
                            <p>View Products</p>
                        </a>
                    </li>
                    <li className="nav-item"  onClick={event => goTo("SearchProducts")} >
                        <a className="nav-link">
                            <i className="nav-icon fas fa-search"></i>
                            <p>Search Products</p>
                        </a>
                    </li>
                    <li className="nav-item"  onClick={event => goTo("Category")} >
                        <a className="nav-link">
                            <i className="nav-icon fas fa-wrench"></i>
                            <p>Category</p>
                        </a>
                    </li> 
                    <li className="nav-item"  onClick={event => goTo("StoreKeeper")} >
                        <a className="nav-link">
                            <i className="nav-icon fas fa-wrench"></i>
                            <p>StoreKeeper</p>
                        </a>
                    </li> 
                    <li className="nav-item"  onClick={event => goTo("Delivery")} >
                        <a className="nav-link">
                            <i className="nav-icon fas fa-wrench"></i>
                            <p>Delivery</p>
                        </a>
                    </li>                        

                </ul>  
            </nav>            

        </div>
    </aside>
   
  )
}
