import useSharedConfig from "../../shared/js/SharedConfig/SharedConfig";

export default function useRegisterApi(){

    const {config} = useSharedConfig();

    let request;
    let REQUEST_OPTIONS;
    let END_POINT;
    let BASE_URL = config.CURRENT_BASE_URL;


    function postData(state){
        
        END_POINT = BASE_URL+'Register';

        REQUEST_OPTIONS = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(state)
        }

        request = new Request(END_POINT,REQUEST_OPTIONS);

        return fetch(request)
        .then((response) => response.json())
        
    }

    function processApiError(err){
        alert("An error occured.Could not register the user.Server returned the following message: "+err);
    }



    let api ={
        postData: postData,
        processApiError: processApiError
    }

    return { api };

}



