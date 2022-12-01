
import { useState, useEffect } from "react";
import useStoreKeeperForm from './useStoreKeeperForm';
import useStoreKeeperApi from './useStoreKeeperApi';
import useSharedModules from "../../shared/js/SharedModules/SharedModules";
import useLocalStorage from "../../shared/js/SharedModules/LocalStorage/useLocalStorage";

export default function useStoreKeeperLogic(){


    const {setLocalUserData,getLocalUserData} = useLocalStorage();
    let localUser = getLocalUserData(); 
    let TABLE_ROW_COUNT = 2;
    let tableIndexStart = 0;
    let tableIndexEnd = 0;
    let gtdd_displayData = [];
    let STORE_ID = localUser.store_id;
    let newState;
    let newTableState;


    let initialState = [    
        {id: 'name' , value: '', error:""},
        {id: 'phone' , value: '', error:""},
        {id:'password',value:'',error:""},
        {id:'storeId',value: STORE_ID, error:""}
    ];

    let initialTableState ={
        totalData:[],
        displayData:[],
        currentPage:0,
        pagesArr:[]
    }

    const [state,setState] = useState(initialState);
    const [tableState,setTableState] = useState(initialTableState);
    const {form} = useStoreKeeperForm(setState);
    const {api} = useStoreKeeperApi();
    const {sharedModules} = useSharedModules();


    useEffect(()=>{
        
        api.getStoreKeeperData(STORE_ID)
        .then((data)=>{     processStoreKeeperData(data)   })
        .catch((err)=>{     api.processApiError(err)    });

    },[]);


    function deleteStoreKeeper(id){

        api.sendDeleteStoreKeeperRequest(id)
        .then((data)=>{ ProcessDeleteResponse(data)   })
        .catch((err)=>{ api.processApiError(err)    });


    }

    let vi_isValid;
    function validateInput(e){

        e.preventDefault();
        vi_isValid = true;

        setState((preState)=>{

            newState = preState.map((item)=>{

                if(sharedModules.checkIsEmpty(item.value)){
                    vi_isValid = false;
                    return {...item,error:'Required'};
                }
                else{
                    return {...item,error:''}
                }

            });

            if (vi_isValid) {

                api.postData(state)
                .then((data) => processPostResponse(data))
                .catch((err)=>{     api.processApiError(err)});
            }
            else{
                console.log("invalid");
            }

            return newState;

        })

        
        

    }

    function getTableDisplayData(totalData,pageNumber){

        gtdd_displayData = [];
        tableIndexStart = (pageNumber - 1)*TABLE_ROW_COUNT;
        tableIndexEnd = tableIndexStart + TABLE_ROW_COUNT;

        totalData.forEach((item, index)=>{

            if(index >=tableIndexStart && index <  tableIndexEnd){
                gtdd_displayData.push(item);
            }
        });

        return gtdd_displayData;

    }

    let gtpa_pageCount;
    let gtpa_pageArr;
    function getTablePaginationArr(data){

        gtpa_pageArr = [];
        gtpa_pageCount = data.length/TABLE_ROW_COUNT;
        for(var i = 0;i<gtpa_pageCount;i++){

            if (i == 0) {
                gtpa_pageArr.push({
                    page:i+1,
                    isActive: "active"
                });
            }
            else{
                gtpa_pageArr.push({
                    page:i+1,
                    isActive: "inactive"
                });
            }

        }

        return gtpa_pageArr;

    }

    let gtp_newPagesArr;
    function getTablePage(pageNumber){


        setTableState((prevState)=>{



            gtp_newPagesArr = prevState.pagesArr.map((item)=>{

                if(item.page == pageNumber){
                    return {...item, isActive:"active"}
                }
                else{
                    return {...item, isActive:"inactive"}
                }
            });

            return {...prevState , displayData: getTableDisplayData(prevState.totalData,pageNumber), pagesArr: gtp_newPagesArr};
        });

    }


    function goToEditPage(id){
        window.location.assign("/EditCategory?id="+id);
    }

    function processPostResponse(data){

        if(data.status == "success"){
            alert("Successfully created data");
            sharedModules.refreshPage();
        }
        else{
            alert("Failed to create data");
            sharedModules.refreshPage();
        }
    }

    function ProcessDeleteResponse(data){
        
        if (data.status == "success") {

            alert("Data has been successfully deleted.")
            sharedModules.refreshPage();

        }
        else{
            alert("Could not delete data from the server.");
        }

    }

    function processStoreKeeperData(data){

        if(data.status == "success"){

            if(data.payload.length > 0){

                setTableState((prevState)=>{

                    newTableState = {
                        ...prevState,
                        totalData:data.payload,
                        displayData: getTableDisplayData(data.payload,1),
                        currentPage: 1,
                        pagesArr: getTablePaginationArr(data.payload)
                    }
                    return newTableState;
                });
            }
            else{
                alert("No storekeeper data found in database.");
            }
        }
        else{

            alert("Could not get data from the database");
        }

    }


    let change = {

        validateInput: validateInput,
        getTablePage:getTablePage,
        goToEditPage: goToEditPage,
        deleteStoreKeeper: deleteStoreKeeper
    }

    return{
        form,
        state,
        change,
        tableState
    }

}



