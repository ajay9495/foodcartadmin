import useSharedConfig from "../../shared/js/SharedConfig/SharedConfig";

export default function useEditCategoryApi(){

    const {config} = useSharedConfig();

    let END_POINT;
    let REQUEST_OPTIONS;
    let request;
    let requestPayload = {};
    let BASE_URL = config.CURRENT_BASE_URL;

    function loadCategoryData(id){

 
        END_POINT = BASE_URL+'getCategoryById?id='+id;

        
        REQUEST_OPTIONS = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };

        request = new Request(END_POINT,REQUEST_OPTIONS);

        return fetch(request)
        .then((response) => response.json())


    }

    function postData(state){
        
        END_POINT = BASE_URL+'editCategoryData';

        requestPayload = new FormData();
        requestPayload.append('categoryId', state[0].value);
        requestPayload.append('categoryName', state[1].value);
        requestPayload.append('storeId', state[2].value);
        requestPayload.append('imageUrl', state[4].value);

        if(state[3].value != ""){
            requestPayload.append('file', state[3].value,'file.png');
        }
        else{
            requestPayload.append('file', state[3].value);
        }


        REQUEST_OPTIONS = {
            method: 'POST',
            body: requestPayload
        }

        request = new Request(END_POINT,REQUEST_OPTIONS);

        return fetch(request)
        .then((response) => response.json());

        
    }


    function processApiError(err){

        alert("Could not process the request. Server responded with the following message: "+err);
    }

    let api = {
        loadCategoryData: loadCategoryData ,
        processApiError: processApiError,
        postData: postData
    }

    return {api}
}