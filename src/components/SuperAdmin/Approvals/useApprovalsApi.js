export default function useApproalsApi(){

    let request;
    let REQUEST_OPTIONS;
    let END_POINT;
    let BASE_URL = "https://homeshope.xyz/public/api/";

    function getApprovalsData(){

        END_POINT = BASE_URL+'getApprovalsData';

        REQUEST_OPTIONS = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };

        request = new Request(END_POINT,REQUEST_OPTIONS);

        return fetch(request)
        .then((response) => response.json());
    }

    function postApprovalData(payLoad){

        END_POINT = BASE_URL+'approveAdmin';

        REQUEST_OPTIONS = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(payLoad)
        }

        request = new Request(END_POINT,REQUEST_OPTIONS);

        return fetch(request)
        .then((response) => response.json());

    }


    function processError(err){

        console.log(err);
    }



    let api = {
        getApprovalsData: getApprovalsData,
        postApprovalData: postApprovalData,
        processError: processError
    }

    return{
        api
    }

}