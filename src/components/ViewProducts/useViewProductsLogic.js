import {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import useSharedModules from '../../shared/js/SharedModules/SharedModules';
import useLocalStorage from "../../shared/js/SharedModules/LocalStorage/useLocalStorage";
import useSharedConfig from "../../shared/js/SharedConfig/SharedConfig";
 
export default function useViewProductsLogic(){


    const {setLocalUserData,getLocalUserData} = useLocalStorage();
    let localUser = getLocalUserData(); 
    const {config} = useSharedConfig();

    let STORE_ID = localUser.store_id;
    let request;
    let REQUEST_OPTIONS;
    let END_POINT;
    let BASE_URL = config.CURRENT_BASE_URL;


    let TABLE_ROW_COUNT = 5;
    let tableIndexStart = 0;
    let tableIndexEnd = 0;
    let gtdd_displayData = [];

    let initialTableState ={
        totalData:[],
        displayData:[],
        currentPage:0,
        pagesArr:[]
    }
 
    const [tableState,setTableState] = useState(initialTableState);
    const {sharedModules} = useSharedModules();

    let navigateTo = useNavigate();

    function loadProductData(){


        END_POINT = BASE_URL+'getAllProductsDataByStoreId?store_id='+STORE_ID;

        REQUEST_OPTIONS = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };

        request = new Request(END_POINT,REQUEST_OPTIONS);

        fetch(request)
        .then((response) => response.json())
        .then((data) => processGetRequest(data))
        .catch((err)=> processGetError(err));

    }

    function processGetRequest(data){


        if(data.status == "success"){

            if(data.payload.length > 0){

                setTableState((prevState)=>{
    
                    return({
                        ...prevState,
                        totalData:data.payload,
                        displayData: getTableDisplayData(data.payload,1),
                        currentPage: 1,
                        pagesArr: getTablePaginationArr(data.payload)
                    });
                    
                });            
            }
            else{
                alert("No product data found in the database.");
            }
        }
        else{
            alert("Failed to fetch data from the database");
        }

    }

    function processGetError(err){
        alert("Could not get product data from the server. Server returned the following error: "+err);
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

    function deleteProductData(productId){


        END_POINT = BASE_URL+'deleteProductData';

        REQUEST_OPTIONS = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: productId})
        }

        request = new Request(END_POINT,REQUEST_OPTIONS);

        fetch(request)
        .then((response) => response.json())
        .then((data) => processDeleteResponse(data))
        .catch((err)=> processDeleteError(err));
        
    }

    function processDeleteResponse(data){

        if(data.status == "success"){
            alert("Successfully deleted data");
            sharedModules.refreshPage();
        }
        else{
            alert("Failed to delete data");
            sharedModules.refreshPage();
        }
    }

    function processDeleteError(err){
        alert("Could not delete the product from the server. Server returned the following error: "+err);
    }

    function reloadPage(){
        window.location.reload();
    }


    let ti_newInstockValue;
    function toggleInStock(toggleItem){

        ti_newInstockValue = !toggleItem.in_stock;

        END_POINT = BASE_URL+'productInstockChange?product_id='+toggleItem.id+'&in_stock='+ti_newInstockValue;

        REQUEST_OPTIONS = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }

        request = new Request(END_POINT,REQUEST_OPTIONS);

        fetch(request)
        .then((response) => response.json())
        .then((data) => processInstockChangeResponse(data))
        .catch((err)=> processInstockChangeError(err));
    }


    let picr_newTotalData = [];
    let picr_newDisplayData = [];
    function processInstockChangeResponse(data){


        if(data.status == "success"){
 
            setTableState((prevState)=>{

                picr_newTotalData = prevState.totalData.map((item)=>{


                    if(item.id == data.payload.product_id){
        
                        if(data.payload.in_stock == "true"){
    
                            return {...item, in_stock: 1};
                        }
                        else{
                            return {...item, in_stock: 0};
                        }
                    }
                    else{
    
                        return {...item};
                    }
    
                });

                picr_newDisplayData = prevState.displayData.map((item)=>{  

                    if(item.id == data.payload.product_id){
        
                        if(data.payload.in_stock == "true"){
    
                            return {...item, in_stock: 1};
                        }
                        else{
                            return {...item, in_stock: 0};
                        }
                    }
                    else{
    
                        return {...item};
                    }
                });
    

                return({
                    ...prevState,
                    totalData: picr_newTotalData,
                    displayData: picr_newDisplayData,

                });
                
            });


        }
        else{
            alert("Could not change the instock status in the server.");
        }

    }

    function processInstockChangeError(err){
        alert("Could not change the Instock status in the server.")
    }

 
    let change = {
        navigateTo:navigateTo,
        getTablePage:getTablePage,
        deleteProductData: deleteProductData,
        toggleInStock: toggleInStock
    }


    useEffect(()=>{

        loadProductData();

    },[]);

    return{
        tableState,
        change
        
    }

}
