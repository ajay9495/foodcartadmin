import {useState, useEffect} from "react";
import useEditProductForm from "./useEditProductForm";
import useEditProductsApi from "./useEditProductApi";
import useSharedModules from "../../shared/js/SharedModules/SharedModules";
import useLocalStorage from "../../shared/js/SharedModules/LocalStorage/useLocalStorage";
 
export default function useEditProductLogic(){
 
    const {setLocalUserData,getLocalUserData} = useLocalStorage();
    let localUser = getLocalUserData(); 
    let STORE_ID = localUser.store_id;
    let newState;

    let vi_isValid;
    let vi_mrpValueState;
    let vi_sellingPriceState;
    let vi_mrpError;
    let vi_sellingPriceError;

    let sellingPriceArr = [];
    let sellingPriceItem = {};
    let sellingPriceId = "";

    let gmi_maxId = 1;
    let gmi_currentId = 1;
    let gmi_splitStrArr = []; 

    let rsf_sellingPriceArr = [];

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
        {id:"productId",value: "",error:""},
        {id:"image",value:null,error:""},
        {id:"image_url",value:"",error:""}
    ];

    const [state,setState] = useState(INITIAL_STATE);
    const [categoryList,setCategoryList] =  useState([]);
    const [unitList, setUnitList] = useState([]);
    const {form} =  useEditProductForm(setState);
    const {api} = useEditProductsApi();
    const {sharedModules} = useSharedModules();
    const params = sharedModules.getUrlParameters();


 
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

            pcd_initialArr = [{id:"select",value:"select"}];

            if(data.status == "success"){

                setCategoryList((prevState)=>{

                    if(data.payload.length > 0){
    
                        pcd_newArr =  data.payload.map((item)=>{
    
                            return {id:item.id , value: item.name};
                        });
    
                        return pcd_initialArr.concat(pcd_newArr);
    
    
                    }
                    else{
                        return [...prevState];
                    }
                });
            }
            else{

                alert("Failed to get the category data from the server.");
            }


            resolve();

        });


    }

    function processUnitData(data){

        return new Promise((resolve,reject)=>{

            if(data.status == "success"){

                setUnitList((prevState)=>{
                    return pud_initialArr.concat(data.payload);
                });

            }
            else{

                alert("Failed to get the category data from the server.");
            }

            resolve("helllo unitData success");

        });

    }

    function processProductData(data){

        if(data.status == "success"){

            setState((prevState)=>{

                return prevState.map((item)=>{

                    if(item.id == "productName"){
                        return {...item,value: data.payload.name};
                    }
                    else if(item.id == "category"){
                        return {...item, value: {id:data.payload.category_id, value: data.payload.category_name}}
                    }
                    else if(item.id == "description"){
                        return {...item, value: data.payload.description}
                    }
                    else if(item.id == "mrp"){
                        return {...item, value: data.payload.mrp}
                    }
                    else if(item.id == "sellingPrice"){
                        return {...item, value: data.payload.selling_price}
                    }
                    else if(item.id == "productId"){
                        return {...item, value: data.payload.id}
                    }
                    else if(item.id == "image_url"){
                        return {...item, value: data.payload.image_url}
                    }
                    else{
                        return {...item}
                    }

                    
                });

            });

        }
        else{

            alert("Failed to get product data from the server.");
        }

      





    }

    function validateInput(e){

        e.preventDefault();
        vi_isValid = true;
        vi_mrpError = "";
        vi_sellingPriceError = "";
        vi_mrpValueState = [{quantity:"",price:""}];
        vi_sellingPriceState  = [{quantity:"",price:""}];



        setState((prevState)=>{ 


            newState = prevState.map((item)=>{

                if(item.id == "mrp"){
    
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
                else if(item.id == "image"){

                    return({...item,error:""});
                }
                else if(item.id == "category"){

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

                console.log("valid");

                api.postData(state)
                .then((data)=>{     processPostResponse(data)   })
                .catch((err)=>{     api.processError(err)       });
            }
            else{

                console.log("invalid");
            }

            return(newState);

        });


    }

    function processPostResponse(data){
        
        if(data.status == "success"){
            alert("Successfully updated data");
            sharedModules.refreshPage();
        }
        else{
            alert("Failed to update data");
            sharedModules.refreshPage();
        }

    }




    useEffect(()=>{

        api.getCategoryList(STORE_ID)
        .then((data)=>{     return processCategoryData(data)        })
        .then((data)=>{     return api.getProductData(params.id)    })
        .then((data)=>{     processProductData(data)                })
        .catch((err)=>{     api.processError(err)                   });

    },[]);


    return{
        state,
        categoryList,
        unitList,
        validateInput,
        form,
        addSellingPriceField, 
        removeSellingPriceField
    }



}
