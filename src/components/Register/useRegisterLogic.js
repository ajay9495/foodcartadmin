import { useState, useEffect } from "react";
import useRegisterForm from "./useRegisterForm";
import useRegisterApi from "./useRegisterApi";
import {UserStore} from "../../Redux/UserSlice";
import useSharedModules from "../../shared/js/SharedModules/SharedModules";
import useLocalStorage from "../../shared/js/SharedModules/LocalStorage/useLocalStorage";
import { useDispatch } from "react-redux";

export default function useRegisterLogic(){

    let initialState = [
        {id:"name",value:"",error:""},
        {id:"email",value:"",error:""},
        {id:"phone",value:"",error:""},
        {id:"password",value:"",error:""}
    ];

    const [state, setState] = useState(initialState);
    const dispatch = useDispatch();
    const {form} = useRegisterForm(setState);
    const {api} = useRegisterApi();
    const {sharedModules} = useSharedModules();
    const {setLocalUserData, getLocalUserData} = useLocalStorage();

    let civ_isvalid;
    let civ_newState;

    let newUserData;

    function validate(e){

        e.preventDefault();
        civ_isvalid = true;

        setState((prevState)=>{

            civ_newState =  prevState.map((item)=>{

                if(sharedModules.checkIsEmpty(item.value)){

                    civ_isvalid = false;
                    return {...item, error: "Required" };
                }
                else if(item.id == 'phone'){
                    
                    
                    if(sharedModules.isPhoneInValid(item.value)){

                        civ_isvalid = false;
                        return {...item, error: "A valid phone number is required" };
                    }
                    else{
                        return {...item, error: "" }
                    }

                }
                else if(item.id == 'email'){

                    if(sharedModules.isEmailInValid(item.value)){

                        civ_isvalid = false;
                        return {...item, error: "Required" };
                    }
                    else{
                        return {...item, error: "" }
                    }

                }
                else if(item.id == 'password'){

                    if(sharedModules.isPasswordInValid(item.value)){

                        console.log(item.value);
                        civ_isvalid = false;
                        return {...item, error: "Password must be of following format, atleast, 1 lowercase, 1 uppercase, 1 numeric, one special character !@#$%^&*,length eight characters or more." }
                    }
                    else{
                        return {...item, error: "" }
                    }

                    
                }
                else{

                    return {...item, error: "" }
                }
            });

            if(civ_isvalid){

                api.postData(state)
                .then((data)=>{     processApiResponse(data)    })
                .catch((err)=>{     api.processApiError(err)    });

            }


            return(civ_newState);
        });
    }
 
    function processApiResponse(data){

        if(data.status == "success"){
            
            alert("Successfully registered with the website. Your account will be activated shortly.");

            newUserData = {status:'loggedOut',admin_id: data.admin_id,store_id:''};
            setLocalUserData(newUserData);
            dispatch(UserStore.getAction_setUserData(newUserData));

        }
        else{
            alert("Could not enter the data into the database.");
        }

    }


    
    let change = {  validate: validate  };

    return {state,   change,    form};

}