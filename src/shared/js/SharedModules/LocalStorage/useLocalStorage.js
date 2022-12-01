import { useState } from "react";

export default function useLocalStorage(){

    let userDataStr = "";


    function setLocalUserData(data){

        window.localStorage.setItem("adminData",JSON.stringify(data))
    }

    function getLocalUserData(){

        userDataStr = window.localStorage.getItem("adminData");

        if(userDataStr){
            return JSON.parse(userDataStr);
        }
        else{
            return {admin_id:"",store_id:"",status:"toRegister"};
        }
        
    }


    return{
        setLocalUserData,
        getLocalUserData
    }


}
