export default function useSharedModules(){

    let cin_pattern = "";

    
    function checkIsEmpty(item){
        if(item == ""){
            return true;
        }
        else{
            return false;
        }
        
    }

    function checkIsNumber(item){

        cin_pattern = /^[0-9]+$/;
        return cin_pattern.test(item);
    }

    function getUrlParameters(){
        return new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
        });
    }

    function refreshPage(){
        window.location.reload();
    }

    let ipi_phoneStr;
    let ipi_regularExpression;
    function isPhoneInValid(input){

        ipi_regularExpression = /^[0-9]{10}$/;

        if(ipi_regularExpression.test(input)){
            return false;
        }
        else{
            return true;
        }
    
    }

    let iei_regex;
    function isEmailInValid(input){

        iei_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if(iei_regex.test(input)){
            return false;
        }
        else{
            return true;
        }
    
    }

    let ipi_regex
    function isPasswordInValid(input){

        //atleast 1 lowercase, 1 uppercase, 1 numeric, one special character !@#$%^&*,length eight characters or more 
        ipi_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        


        if(ipi_regex.test(input)){
            return false;
        }
        else{
            return true;
        }
    }



    const sharedModules = {
        checkIsEmpty : checkIsEmpty,
        checkIsNumber :checkIsNumber,
        getUrlParameters: getUrlParameters,
        refreshPage: refreshPage,
        isPhoneInValid: isPhoneInValid,
        isEmailInValid: isEmailInValid,
        isPasswordInValid: isPasswordInValid
    }

    return{
        sharedModules
    }
}