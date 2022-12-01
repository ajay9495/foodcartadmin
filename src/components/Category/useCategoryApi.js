import useSharedConfig from "../../shared/js/SharedConfig/SharedConfig";

export default function useCategoryApi(){

    const {config} = useSharedConfig();
    
    let request;
    var requestPayload;
    let REQUEST_OPTIONS;
    let END_POINT;
    let BASE_URL = config.CURRENT_BASE_URL;

    function loadCategoryData(storeId){

        END_POINT = BASE_URL+'getCategoryDataByStoreId?store_id='+storeId;

        REQUEST_OPTIONS = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };

        request = new Request(END_POINT,REQUEST_OPTIONS);

        return fetch(request)
        .then((response) => response.json());

    }

    function sendDeleteRequest(categoryId){
        END_POINT = BASE_URL+'deleteCategory';

        REQUEST_OPTIONS = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({id:categoryId})
        }

        request = new Request(END_POINT,REQUEST_OPTIONS);

        return fetch(request)
        .then((response) => response.json())
    }

    
    function postData(state){
        
        END_POINT = BASE_URL+'postCategoryData';

        requestPayload = new FormData();
        requestPayload.append('categoryName', state[0].value);
        requestPayload.append('storeId', state[1].value);
        requestPayload.append('file', state[2].value,'file.png');

        REQUEST_OPTIONS = {
            method: 'POST',
            body: requestPayload
        }

        request = new Request(END_POINT,REQUEST_OPTIONS);

        return fetch(request)
        .then((response) => response.json());
        
    }


    function processApiError(err){
        alert("Failed to process the request. Server returned following error message: "+err);
    }

    let api ={
        loadCategoryData: loadCategoryData,
        sendDeleteRequest: sendDeleteRequest,
        postData: postData,
        processApiError: processApiError
    }

    return{     api    }
}
