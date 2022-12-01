import useSharedConfig from "../../shared/js/SharedConfig/SharedConfig";
  
export default function useCategoryApi(){

    const {config} = useSharedConfig();

    let request;
    var requestPayload;
    let REQUEST_OPTIONS;
    let END_POINT;
    let BASE_URL = config.CURRENT_BASE_URL;

    
    function postData(state){
        
        END_POINT = BASE_URL+'postStoreKeeperData';

        requestPayload = new FormData();
        requestPayload.append('name', state[0].value);
        requestPayload.append('phone', state[1].value);
        requestPayload.append('password', state[2].value);
        requestPayload.append('storeId', state[3].value);

        REQUEST_OPTIONS = {
            method: 'POST',
            body: requestPayload
        }

        request = new Request(END_POINT,REQUEST_OPTIONS);

        return fetch(request)
        .then((response) => response.json());
        
    }
 
    function getStoreKeeperData(STORE_ID){
        
        END_POINT = BASE_URL+'getStoreKeeperData?storeId='+STORE_ID;

        REQUEST_OPTIONS = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };

        request = new Request(END_POINT,REQUEST_OPTIONS);

        return fetch(request)
        .then((response) => response.json());
    }

    function sendDeleteStoreKeeperRequest(storeKeeperId){
        END_POINT = BASE_URL+'deleteStoreKeeper';

        REQUEST_OPTIONS = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({id:storeKeeperId})
        }

        request = new Request(END_POINT,REQUEST_OPTIONS);

        return fetch(request)
        .then((response) => response.json())
    }


    function processApiError(err){
        alert("Could not complete the request. Server returned following message: "+err);
    }

    let api ={
        postData: postData,
        getStoreKeeperData: getStoreKeeperData,
        sendDeleteStoreKeeperRequest: sendDeleteStoreKeeperRequest,
        processApiError: processApiError
    }

    return{     api    }
}
