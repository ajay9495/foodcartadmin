import { useEffect } from "react";
import { useState } from "react"
import useSuperDashboardApi from './useSuperDashboardApi'

export default function useSuperDashboardLogic(){

    let initialState = {
        uniqueMonthlyVisits: 0,
        monthlyVisitors:0,
        monthlySales:0,
        DailyUniqueVisitorsBreakDown: [],
        dailySalesBreakdown: [],
        dailyVisitorsBreakdown: [],
    }

    const [state,setState] = useState(initialState);
    const {api} = useSuperDashboardApi();

    useEffect(()=>{

        api.getDashboardData()
        .then((data)=>{

            setState(data);

            if(data.monthlyVisitors == 0){

                alert("No activity found for this period");
            }


        });

    },[]);


    return{
        state
    }


}



