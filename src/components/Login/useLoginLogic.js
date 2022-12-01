import { useState, useEffect } from "react";
import useLocalStorage from "../../shared/js/SharedModules/LocalStorage/useLocalStorage";
import { useDispatch } from "react-redux";
import {UserStore} from "../../Redux/UserSlice";
import useSharedConfig from "../../shared/js/SharedConfig/SharedConfig";
  
export default function useLoginLogic(){

    let initialState = [
        {id:"password", value: "", error: "" }
    ];

    const [state, setState] = useState(initialState);
    const {setLocalUserData, getLocalUserData} = useLocalStorage();
    const dispatch = useDispatch();
    const {config} = useSharedConfig();

    let localUserData = getLocalUserData();
    let newUserData = {};
    let v_payload = {};

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



    let civ_isvalid;
    let civ_newState;
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

                v_payload = {admin_id: localUserData.admin_id, password: state[0].value};          
                postData(v_payload);
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


    let request;
    let REQUEST_OPTIONS;
    let END_POINT;
    let BASE_URL = config.CURRENT_BASE_URL;

    function postData(payload){
        
        END_POINT = BASE_URL+'Login';

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
            
            newUserData = {status:'loggedIn',admin_id: payload.data.id ,store_id: payload.data.store_id};
            setLocalUserData(newUserData);
            dispatch(UserStore.getAction_setUserData(newUserData));

        }
        else if(payload.status == "failed"){
            alert("Could not login to the website. "+payload.message);
        } 
        else{

            alert("Could not login to the website. Password is incorrect.");
        }

    }

    function processPostError(err){
        alert("Could not complete the request. Server responded with the following message: "+err);
    }


    
    let change = {
        
        passwordChange : passwordChange,
        validate: validate
    }

    return{
        state,
        change
    };

}

