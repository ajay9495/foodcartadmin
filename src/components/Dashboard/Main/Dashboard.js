import React,{useState} from 'react'
import './Dashboard.css'
import Overview from '../Overview/Overview'
import SalesStats from '../SalesStats/SalesStats'
import VisitorsStats from '../VisitorsStats/VisitorsStats'
import Logic from './Logic'
import { useSelector, useDispatch } from 'react-redux';
import useDashboardLogic from './useDashboardLogic';

export default function Dashboard(){

  const {state} = useDashboardLogic();


      return (
          
            <div className='content-wrapper '> 

              <div className="content-header">
                <h1 className="m-0">Dashboard</h1>
              </div>

              <div className="content">
                <div className="container-fluid">

                  <Overview data={state} />

                  <div className="row">
                    <div className="col-lg-6">
                      <VisitorsStats data={state}  />
                    </div>
                    <div className="col-lg-6">
                      <SalesStats data={state}  />
                    </div>
                  </div>
                </div>
              </div>
            </div>
      )


}
