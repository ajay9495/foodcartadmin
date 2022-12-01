import React from 'react'

export default function Overview({data}) {



  return (


            <div className="row">

                <div className="col-lg-3">
                    <div className="small-box bg-info">
                        <div className="inner">
                            <h3>{data.monthlyVisitors}</h3>
                            <p>Visitors</p>
                        </div>
                        <div className="icon">
                            <i className="fas fa-user"></i>
                        </div>
                        <a href="#" className="small-box-footer">
                            visitors data for this month
                        </a>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="small-box bg-info">
                        <div className="inner">
                            <h3>{data.monthlySales}</h3>
                            <p>Sales</p>
                        </div>
                        <div className="icon">
                            <i className="fas fa-user"></i>
                        </div>
                        <a href="#" className="small-box-footer">
                            sales data for this month
                        </a>
                    </div>
                </div>

            </div>

  )
}


