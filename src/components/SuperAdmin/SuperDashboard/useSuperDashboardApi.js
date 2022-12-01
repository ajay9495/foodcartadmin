export default function useSuperDashboardApi(){

    let END_POINT;
    let REQUEST_OPTIONS;
    let request;
    let BASE_URL = "https://homeshope.xyz/public/api/";


    function getDashboardData(){
        END_POINT = BASE_URL+'getDashboardData';

        REQUEST_OPTIONS = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };

        request = new Request(END_POINT,REQUEST_OPTIONS);

        return fetch(request)
        .then((response) => response.json());
    }

    function processApiError(err){

        console.log("There was an api error");
        console.log(err);
    }

    const api ={
        getDashboardData: getDashboardData,
        processApiError: processApiError
    }

    return {api};

}