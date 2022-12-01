
import { useEffect, useState } from "react";
import useAddProductsApi from './useAddProductApi'
import useAddProductsForm from './useAddProductForm'
import useSharedModules from "../../shared/js/SharedModules/SharedModules";
import useLocalStorage from "../../shared/js/SharedModules/LocalStorage/useLocalStorage"

export default function useAddProductsLogic(){


    const {setLocalUserData,getLocalUserData} = useLocalStorage();
    let localUser = getLocalUserData(); 
    let STORE_ID = localUser.store_id;
    let newState;
    let cin_pattern;

    let pcd_initialArr = [{id:"select",value:"select"}];
    let pcd_newArr = [];

    let pud_initialArr = [{id:"select",name:"select"}];

    const INITIAL_STATE = [ 

        {id:"productName",value: "",error:""},
        {id:"category",value: {id:"",value:""},error:""},
        {id:"description",value: "",error:""},
        {id:"mrp",value: "",error:""},
        {id:"sellingPrice",value: "",error:""},
        {id:"storeId",value: STORE_ID,error:""},
        {id:"image",value:null,error:''}
    ];

    let baseList  = [
        1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90,100
    ];

    const [state,setState] = useState(INITIAL_STATE);
    const [categoryList,setCategoryList] =  useState([]);
    const {form} =  useAddProductsForm(setState);
    const {sharedModules} = useSharedModules();

    const { 
        getCategoryList,    
        postData,   
        processError 
    } = useAddProductsApi();


    let vi_isValid;
    let vi_mrpValueState;
    let vi_sellingPriceState;
    let vi_mrpError;
    let vi_sellingPriceError;
    function validateInput(e){

        e.preventDefault();
        vi_isValid = true;
        vi_mrpError = "";
        vi_sellingPriceError = "";
        vi_mrpValueState = [{quantity:"",price:""}];
        vi_sellingPriceState  = [{quantity:"",price:""}];



        setState((prevState)=>{


            newState = prevState.map((item)=>{

                if(item.id == "image"){
                    
                    if(item.value == null){

                        vi_isValid = false;
                        return({...item,error:"Product image is required"});
                    }
                    else{
                        return({...item,error:""});
                    }
                    
                }
                else if(item.id == "mrp"){
                    
                    if(sharedModules.checkIsNumber(item.value)){

                        return({...item,error:""});

                    }
                    else{

                        vi_isValid = false;
                        return({
                            ...item,
                            error:"Required"
                        });
                    }
                }
                else if(item.id == "sellingPrice"){
                    
                    if(sharedModules.checkIsNumber(item.value)){

                        return({...item,error:""});

                    }
                    else{

                        vi_isValid = false;
                        return({
                            ...item,
                            error:"Required"
                        });
                    }
                }
                else if(item.id == "category"){

                    if(item.value.id == ""){

                        vi_isValid = false;
                        return({...item,error:"Required"});
                    }
                    if(item.value.id == "select"){

                        vi_isValid = false;
                        return({...item,error:"Required"});
                    }
                    else{
                        return({...item,error:""});
                    }

                }
                else{

                    
                    if(sharedModules.checkIsEmpty(item.value)){

                        vi_isValid = false;
                        return({
                            ...item,
                            error:"Required"
                        });
                    }
                    else{
                        return({...item,error:""});
                    }

                
                }

            });

            if(vi_isValid){

                postData(state)
                .then((data) =>{    processPostResponse(data)    })
                .catch((err)=>{     processError(err)           });

            }
            
            return(newState);

        });


    }


    function processPostResponse(data){


        if(data.status == "success"){

            alert("Successfully posted data in the server.");
            sharedModules.refreshPage();
        }
        else{

            alert("Failed to post data in the server.");
        }
    }

    let sellingPriceArr = [];
    let sellingPriceItem = {};
    let sellingPriceId = "";
    function addSellingPriceField(){
        setState((prevState)=>{

            return prevState.map((item)=>{


                if(item.id == "sellingPrice"){


                    if(item.value.length < 10){

                        sellingPriceArr = item.value;
                        sellingPriceId = getNextId(item.value);
                        sellingPriceItem = {id: sellingPriceId, value: {quantity:"",price:"" }};
                        sellingPriceArr.push(sellingPriceItem);
                        
                        return {...item, value: sellingPriceArr};
                    }
                    else{
                        return {...item};
                    }



                }
                else{
                    return {...item};
                }
            });

        });
    }

    let gmi_maxId = 1;
    let gmi_currentId = 1;
    let gmi_splitStrArr = []; 
    function getNextId(sellingPriceArr){

        gmi_maxId = 1;
        gmi_currentId = 1;
        
        sellingPriceArr.forEach(item => {

            gmi_splitStrArr = item.id.split("_");
            gmi_currentId = parseInt(gmi_splitStrArr[1]);

            if(gmi_currentId > gmi_maxId){
                gmi_maxId = gmi_currentId;
            }   
        });

        return "sellingPrice_"+(gmi_maxId+1).toString();

    }

    let rsf_sellingPriceArr = [];
    function removeSellingPriceField(id){

        setState((prevState)=>{

            return prevState.map((item)=>{

                if(item.id == "sellingPrice"){

                    if(item.value.length > 1){

                        rsf_sellingPriceArr = item.value.filter((item)=>{

                            if(id == item.id){
                                return false;
                            }
                            else{
                                return true;
                            }

                        });

                        return {...item,value: rsf_sellingPriceArr};

                    }
                    else{
                        return {...item}
                    }
                }
                else{
                    return {...item}
                }

            });
        });
    }

    


    function processCategoryData(data){
        return new Promise((resolve,reject)=>{


            if(data.status == "success"){

                if(data.payload.length > 0){

                    pcd_initialArr = [{id:"select",value:"select"}];

                    setCategoryList((prevState)=>{
        
                        pcd_newArr = data.payload.map((item)=>{
        
                            return {id:item.id , value: item.name}
            
                        });

                        return pcd_initialArr.concat(pcd_newArr)
                        
                    });
        
                    resolve();
                }
                else{

                    resolve();
                    alert("No categories added in the database. Add category data in the category section.");
                    
                }

            }
            else{
                resolve();
                alert("Could not get categories data from the database. Add categories data in the category section.");
            }


        });
    }




    useEffect(()=>{

        getCategoryList(STORE_ID)
        .then((data)=>{     processCategoryData(data)   })
        .catch((err)=>{     processError(err)           });

    },[])

    return{
        state,  categoryList,   baseList,   
            validateInput,
        form, addSellingPriceField, removeSellingPriceField
    }

}
