import { useState } from "react"
import useLocalStorage from "../../shared/js/SharedModules/LocalStorage/useLocalStorage";
import { useDispatch } from "react-redux";
import {UserStore} from "../../Redux/UserSlice";

export default function useTopNavigationLogic(){

    const [isModalVisible,setIsModalVisible] = useState(false);
    const {setLocalUserData, getLocalUserData} = useLocalStorage();
    const dispatch = useDispatch();

    function closeModal(){
        setIsModalVisible(false);
    }

    function openModal() {
        setIsModalVisible(true);
    }

    let currentUserData = {};
    let newUserData = {};

    function logout(){

        currentUserData = getLocalUserData();
        newUserData = {...currentUserData, status:'loggedOut'};
        setLocalUserData(newUserData);
        dispatch(UserStore.getAction_setUserData(newUserData));
        closeModal();

    }


    return{
        logout,
        isModalVisible,
        closeModal,
        openModal
    }
}





