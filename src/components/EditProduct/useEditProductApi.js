import useSharedConfig from "../../shared/js/SharedConfig/SharedConfig";

export default function useEditProductsApi(){

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

    function getUnitList(){

        END_POINT = BASE_URL+'getUnitData';

        REQUEST_OPTIONS = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };

        request = new Request(END_POINT,REQUEST_OPTIONS);

        return fetch(request)
        .then((response) => response.json());
    }

    function getProductData(id){
        
        END_POINT = BASE_URL+'getProductById?id='+id;

        REQUEST_OPTIONS = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };

        request = new Request(END_POINT,REQUEST_OPTIONS);

        return fetch(request)
        .then((response) => response.json());

    }

    function postData(state){
        
        END_POINT = BASE_URL+'editProductData';

        var data = new FormData();
        data.append('productName', state[0].value);
        data.append('categoryId', state[1].value.id);
        data.append('description', state[2].value);
        data.append('mrp', state[3].value);
        data.append('sellingPrice', state[4].value);
        data.append('storeId', state[5].value);
        data.append('productId', state[6].value);
        data.append('imageUrl',state[8].value);

        if(state[7].value == null){
            data.append('file', "");
        }
        else{
            data.append('file', state[7].value,'file.png');
        }

        REQUEST_OPTIONS = {
            method: 'POST',
            body: data
        }

        request = new Request(END_POINT,REQUEST_OPTIONS);

        return fetch(request)
        .then((response) => response.json())
        
    }

    function processError(err){

        alert("Could not process the request. Server returned the following error: "+err);
    }

    const api = {
        getCategoryList : getCategoryList,
        getUnitList : getUnitList,
        postData : postData,
        getProductData : getProductData,
        processError :processError
    };

    return{  api  };


}