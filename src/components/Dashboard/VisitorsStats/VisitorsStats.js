import React from 'react'
import { Bar } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

export default function VisitorsStats({data}) {


    let labels = data.dailyVisitorsBreakdown.map((item,index)=>{
        return item.date;
    });
    let values = data.dailyVisitorsBreakdown.map((item,index)=>{
        return item.visitors;
    });
    



    let customData = {
        labels,
        datasets:[
            {
                label:'Unique Store Visitors',
                data:values,
                backgroundColor: 'rgb(75, 83, 172)'
            }
        ]
    }

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
      );


  return (

            <div className="card">
                <div className="card-header border-0">
                    <div className="d-flex justify-content-between">
                        <h3 className="card-title">Store Visitors Overview</h3>
                    </div>
                </div>
                <div className="card-body">
                    <div className="position-relative mb-4">
                        <Bar data={customData}/>
                    </div>
                </div>
            </div>

  )
}
