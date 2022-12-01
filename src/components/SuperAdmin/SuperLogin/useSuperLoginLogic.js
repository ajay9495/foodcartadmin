import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import useLocalStorage from "../../../shared/js/SharedModules/LocalStorage/useLocalStorage";
import { UserStore } from "../../../Redux/UserSlice";

export default function useSuperLoginLogic(){



    let newUserData = {};
    let v_payload = {};

    let request;
    let REQUEST_OPTIONS;
    let END_POINT;
    let BASE_URL = "https://homeshope.xyz/public/api/";

    let civ_isvalid;
    let civ_newState;

    let initialState = [
        {id:"password", value: "", error: "" },
        {id:"phone", value: "", error: "" }
    ];

    const [state, setState] = useState(initialState);
    const {setLocalUserData, getLocalUserData} = useLocalStorage();
    const dispatch = useDispatch();

    
    let localUserData = getLocalUserData();


    function passwordChange(e){
        setState((prevState)=>{

            return prevState.map((item)=>{
                
                if(item.id == "password")
                {
                    return({...item, value: e.target.value});
                }
                else{
                    return(
                        {...item}
                    );
                }
            });

        });
    }

    function phoneChange(e){
        setState((prevState)=>{

            return prevState.map((item)=>{
                
                if(item.id == "phone")
                {
                    return({...item, value: e.target.value});
                }
                else{
                    return(
                        {...item}
                    );
                }
            });

        });
    }  

    function validate(e){

        e.preventDefault();
        civ_isvalid = true;

        setState((prevState)=>{

            civ_newState =  prevState.map((item)=>{

                if(checkIsNull(item.value)){
                    civ_isvalid = false
                    return {...item, error: "Required" }
                }
                else{
                    return {...item, error: "" }
                }
            });

            if(civ_isvalid){

                v_payload = {phone: state[1].value, password: state[0].value};          
                postData(v_payload);
            }
            else{
                console.log("non valid entries");
            }

            return(civ_newState);
        });
    }

    function checkIsNull(value){
        if(value == ""){
            return true;
        }
        else{
            return false;
        }
    }

    function postData(payload){
        
        END_POINT = BASE_URL+'SuperLogin';

        REQUEST_OPTIONS = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(payload)
        }

        request = new Request(END_POINT,REQUEST_OPTIONS);

        fetch(request)
        .then((response) => response.json())
        .then((data) => processPostResponse(data))
        .catch((err)=> processPostError(err));
        
    }

    function processPostResponse(payload){

        if(payload.status == "success"){

            
            newUserData = {status:'superAdminLoggedIn',admin_id: payload.data.id ,store_id: ""};

            setLocalUserData(newUserData);
            dispatch(UserStore.getAction_setUserData(newUserData));

        }
        else{
            console.log("request failed");
            console.log(payload);
        }

    }

    function processPostError(err){
        console.log("there was an error !");
        console.log(err);
    }


    
    let change = {
        
        passwordChange : passwordChange,
        phoneChange: phoneChange,
        validate: validate
    }

    return{
        state,
        change
    };




}

