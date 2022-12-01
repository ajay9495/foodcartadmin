import useSharedConfig from "../../shared/js/SharedConfig/SharedConfig";

export default function useDeliveryApi(){

    const {config} = useSharedConfig();

    let request;
    var requestPayload;
    let REQUEST_OPTIONS;
    let END_POINT;
    let BASE_URL = config.CURRENT_BASE_URL;


    
    function postData(state){
        
        END_POINT = BASE_URL+'postDeliveryData';

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

    function getDeliveryData(STORE_ID){
        
        END_POINT = BASE_URL+'getDeliveryData?storeId='+STORE_ID;

        REQUEST_OPTIONS = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };

        request = new Request(END_POINT,REQUEST_OPTIONS);

        return fetch(request)
        .then((response) => response.json());
    }

    function sendDeleteDeliveryRequest(DeliveryId){
        END_POINT = BASE_URL+'deleteDeliveryData';

        REQUEST_OPTIONS = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({id:DeliveryId})
        }

        request = new Request(END_POINT,REQUEST_OPTIONS);

        return fetch(request)
        .then((response) => response.json())
    }


    function processApiError(err){
        alert("Could not process request.Server returned the following response: "+err);
    }

    let api ={
        postData: postData,
        getDeliveryData: getDeliveryData,
        sendDeleteDeliveryRequest: sendDeleteDeliveryRequest,
        processApiError: processApiError
    }

    return{     api    }
}
