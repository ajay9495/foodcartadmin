import useSharedConfig from "../../shared/js/SharedConfig/SharedConfig";
  
export default function useAddProductsApi(){

    const {config} = useSharedConfig();

    let request;
    let REQUEST_OPTIONS;
    let END_POINT;
    let BASE_URL = config.CURRENT_BASE_URL;

    function getCategoryList(storeId){
            
        END_POINT = BASE_URL+'getCategoryDataByStoreId?store_id='+storeId;

        REQUEST_OPTIONS = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };

        request = new Request(END_POINT,REQUEST_OPTIONS);

        return fetch(request)
        .then((response) => response.json());

    }



    function postData(state){
        
        END_POINT = BASE_URL+'postProductData';


        var data = new FormData();
        data.append('productName', state[0].value);
        data.append('category', state[1].value.id);
        data.append('description', state[2].value);
        data.append('mrp', state[3].value);
        data.append('sellingPrice', state[4].value);
        data.append('storeId', state[5].value);
        data.append('file', state[6].value,'file.png');


        REQUEST_OPTIONS = {
            method: 'POST',
            body: data
        }

        request = new Request(END_POINT,REQUEST_OPTIONS);

        return fetch(request)
        .then((response) => response.json())
        
    }

    function processError(err){

        alert("Failed to process the request. Server returned following error message: "+err);

    }


    return{
        getCategoryList,
        postData,
        processError
    }


}