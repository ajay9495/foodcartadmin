import { useEffect, useState } from "react";
import useLocalStorage from "../../../shared/js/SharedModules/LocalStorage/useLocalStorage";
import useSharedConfig from "../../../shared/js/SharedConfig/SharedConfig";


export default function useDashboardLogic(){

    let initialState =  {
        monthlyVisitors: 0,
        monthlySales: 0,    
        dailyVisitorsBreakdown: [],
        dailySalesBreakdown: []
    }

    const {setLocalUserData,getLocalUserData} = useLocalStorage();
    const {config} = useSharedConfig();
    const [state,setState] = useState(initialState);
    let localUser = getLocalUserData(); 



    let STORE_ID = localUser.store_id;    
    let END_POINT ="";
    let BASE_URL = config.CURRENT_BASE_URL;
    let request;
    let newState;


    useEffect(()=>{

        getData();

    },[]);


    function getData(){

        END_POINT = BASE_URL+'getAdminDashboardData?'+'store_id='+STORE_ID;
        request = new Request(END_POINT);
    
        fetch(request)
        .then((response) => response.json())
        .then((data) => {
            processApiResponse(data);
        })
        .catch((err)=>{
            processApiError(err);
        });

   
    }

    function processApiResponse(data){

        console.log("processApiResponse");
        console.log(data);

        // if(data.status == "success"){

        //     if(data.payload.monthlyVisitors > 0){

        //         newState =  {
        //             monthlyVisitors: data.payload.monthlyVisitors,
        //             monthlySales: data.payload.monthlySales,    
        //             dailyVisitorsBreakdown: data.payload.dailyVisitorsBreakdown,
        //             dailySalesBreakdown:  data.payload.dailySalesBreakdown
        //         }

        //         setState(newState);
        //     }
        //     else{
        //         alert("No Dashboard activity found for this account");
        //     }

        // }
        // else{

        //     alert("Could not get data from the server");
        // }

    }
    
    function processApiError(err){

        alert("Could not connect to the server. Server returned following error message: "+err);

    }
    


    return{
        state
    };

}