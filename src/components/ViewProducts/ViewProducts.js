import React from 'react'
import './ViewProducts.css'
import { useNavigate } from "react-router-dom";
import useViewProductsLogic from './useViewProductsLogic';
import Table from './Table'


export default function ViewProducts() {

    const {tableState, change} = useViewProductsLogic();




    let navigateTo = useNavigate();

    function goTo(path){
      let homeWrapperDiv = document.getElementById('HomeWrapper');
      let mainWrapperDiv = document.getElementById('mainWrapper');
      let subscriptionWrapperDiv  = document.getElementById('subscriptionWrapper');
      
  
      navigateTo(path);
    }



  return (
    
    <div className='content-wrapper '> 
        <div className="content-header">
            <h1 className='ml-3'>Products</h1>
        </div>
        <div className="content">
            <div className="card m-1">
                <div className="card-body">

                    <Table data={tableState} change={change} />

                    <div className="row pt-4">
                        <div className="col-md-6 ">
                            Showing 1 to 10 of 57 entries
                        </div>
                        <div className="col-md-6">
                            <div className="dataTables_paginate paging_simple_numbers vp-pagination-wrapper" >
                                <ul className="pagination paint-red">
                                    {
                                        tableState.pagesArr.map((item,index)=>{
                                            return(
                                                    <li key={item.page} className={"paginate_button page-item "+item.isActive}>
                                                        <a onClick={()=>{ change.getTablePage(item.page) }} className="page-link">{item.page}</a>
                                                    </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
  )
}
