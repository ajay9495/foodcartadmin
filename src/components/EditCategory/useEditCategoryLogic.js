import { useState, useEffect } from "react";
import useEditCategoryForm from './useEditCategoryForm';
import useEditCategoryApi from './useEditCategoryApi';
import useSharedModules from "../../shared/js/SharedModules/SharedModules";
import useLocalStorage from "../../shared/js/SharedModules/LocalStorage/useLocalStorage";

export default function useEditCategoryLogic(){

    const {setLocalUserData,getLocalUserData} = useLocalStorage();
    let localUser = getLocalUserData(); 
    let STORE_ID = localUser.store_id;
    
    let vi_isValid;
    let vi_newState;

    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });

    let initialState = [    
        {id: 'categoryId' , value: '', error:""},
        {id: 'categoryName' , value: '', error:""},
        {id: 'storeId' , value: STORE_ID, error:""},
        {id:'image',value:"",error:""},
        {id:'imageUrl',value:"",error:""}
    ];

    const [state,setState] = useState(initialState);
    const {form} = useEditCategoryForm(setState);
    const {api} = useEditCategoryApi();
    const {sharedModules} = useSharedModules();

    useEffect(()=>{

        api.loadCategoryData(params.id)
        .then((data)=>{     processGetRequest(data)     })
        .catch((err)=>{      api.processApiError(err)     });

    },[]);


    function validateInput(e){


        e.preventDefault();
        vi_isValid = true;

        setState((preState)=>{

            vi_newState = preState.map((item)=>{

                if(item.id == "image"){
                    return {...item};
                }
                else if(sharedModules.checkIsEmpty(item.value)){
                    vi_isValid = false;
                    return {...item,error:'Required'};
                }
                else{
                    return {...item,error:''}
                }

            });

            if (vi_isValid) {
                api.postData(state)
                .then((data)=>{     processPostResponse(data)           })
                .catch((err)=>{     api.processApiError(err)    });
            }


            return vi_newState;

        })

    }


    function processGetRequest(data){


        if(data.status == "success"){
            
            setState((prevState)=>{
                return prevState.map((item)=>{
                    if(item.id == 'categoryId'){
                        return {...item,value:data.payload[0].id};
                    }
                    else if(item.id == 'imageUrl'){
                        return {...item,value:data.payload[0].image_url};
                    }
                    else if(item.id == 'categoryName'){
                        return {...item,value: data.payload[0].name};
                    }
                    else{
                        return {...item}
                    }
                })
            });
        }
        else{
            alert("could not fetch category data from the server.")
        }



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

     

    let change = {
        validateInput: validateInput,
    }

    return{
        state,
        change,
        form
    }

}
