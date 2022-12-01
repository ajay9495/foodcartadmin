
import { useEffect, useState } from "react";
import useApproalsApi from "./useApprovalsApi";
import useSharedModules from "../../../shared/js/SharedModules/SharedModules";

export default function useApprovalsLogic(){

    let initialTableState ={
        totalData:[],
        displayData:[],
        currentPage:0,
        pagesArr:[]
    }
 
    const [tableState,setTableState] = useState(initialTableState);
    const {api} = useApproalsApi();
    const {sharedModules} = useSharedModules();

    function approve(item){
        api.postApprovalData(item)
        .then((data)=>{     processAppovalRequest(data)    })
        .catch((err)=>{     processApiError(err)     });
    }

    function processAppovalRequest(data){

        if(data.status == "success"){

            alert('Successfully approved the admin');
            sharedModules.refreshPage();
        }
        else{
            alert('Failed to approve the admin');
            sharedModules.refreshPage();
        }

    }

    function processApiError(err){
        alert("Could not connect to the server. Server returned following message: "+err);
    }

    function processApprovalData(data){

        if(data.status == "success"){

            if(data.payload.length > 0){

                setTableState((prevState)=>{
                    return {...prevState,displayData: data.payload}
                });
            }
            else{
                alert("No new admin added in the database.")
            }

        }
        else{
            alert("Failed to get data from the database.")
        }




    }


    useEffect(()=>{

        api.getApprovalsData()
        .then((data)=>{     processApprovalData(data)   })
        .catch((err)=>{     processApiError(err)            });

        
    },[]);


    let change = {
        approve: approve
    }

    return{
        tableState,
        setTableState,
        change
    }


}