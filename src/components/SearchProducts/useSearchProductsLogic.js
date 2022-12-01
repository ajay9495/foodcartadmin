import { useState, useEffect } from "react";
import useLocalStorage from "../../shared/js/SharedModules/LocalStorage/useLocalStorage";
import useSharedConfig from "../../shared/js/SharedConfig/SharedConfig";

export default function useSearchProductsLogic(){


    const {setLocalUserData,getLocalUserData} = useLocalStorage();
    let localUser = getLocalUserData(); 
    let STORE_ID = localUser.store_id;


    const initialState = {
        keyword:"",
        error: ""
    }
    const initialResultState = [];

    const [state,setState] = useState(initialState);
    const [resultState, setResultState] = useState(initialResultState);
    const {config} = useSharedConfig();



    function setKeyWord(e) {
    
        setState((prevState)=>{
           return {...prevState, keyword:e.target.value } 
        });

    }

    let isValid;
    function validate(){

        isValid = true;

        if(state.keyword == ""){

            isValid = false;
        }


        if (isValid) {
            
            setState((prevState)=>{
                return {...prevState,error:""};
            });

            return true;
        }
        else{

            setState((prevState)=>{
                return {...prevState,error:"Required"};
            });

            return false;
        }


    }



    function search(e){
        e.preventDefault();

        if(validate()){
            postData();
        }
        
    }



    let request;
    let REQUEST_OPTIONS;
    let END_POINT;
    let BASE_URL = config.CURRENT_BASE_URL;

    function postData(){
        
        END_POINT = BASE_URL+'searchProduct?search='+state.keyword+'&store_id='+STORE_ID;

        REQUEST_OPTIONS = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }

        request = new Request(END_POINT,REQUEST_OPTIONS);

        fetch(request)
        .then((response) => response.json())
        .then((data) => processPostResponse(data))
        .catch((err)=> processPostError(err));
        
    }

    function processPostResponse(data){

        if(data.status == "success") {

            if(data.payload.length > 0){

                setResultState((prevState)=>{

                    return data.payload.map((item)=>{
                        return {...item};
                    });
        
                }); 
            }
            else{
                alert("No data found for the keyword.")
            }
            
        }
        else{

            alert("Could not fetch data from the server.");
        }

        
    }

    function processPostError(err){

        alert("Could not connect to the server. Server returned following error message: "+err);
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

            alert("Successfully deleted the data.");
            reloadPage();
        }
        else{
            alert("Could not delete the data from the database.")
        }
    }

    function processDeleteError(err){
        alert("Could not delete the data. Server returned following error message: "+err);
    }

    function reloadPage(){
        window.location.assign('./SearchProducts');
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

    function processInstockChangeResponse(data){

        if(data.status == "success"){

 
            setResultState((prevState)=>{

                return prevState.map((item)=>{

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
                
            });


        }
        else{
            alert("Could not change the instock status in the server.");
        }

    }

    function processInstockChangeError(err){
        alert("Could not change the Instock status in the server.")
    }



    function goToEditProduct(id){

        window.location.assign("/EditProduct?id="+id);
    }


    const change = {
        search : search,
        setKeyWord : setKeyWord,
        goToEditProduct:goToEditProduct,
        deleteProductData:deleteProductData,
        toggleInStock: toggleInStock
    }

    return{
        change,
        state,
        resultState,
        config
    }


}