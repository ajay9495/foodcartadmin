
var  componentState;
var componentSetState;

let newState = {};
let request;

let initialState =  {
    monthlyVisitors: 0,
    monthlySales: 0,    
    dailyVisitorsBreakdown: [],
    dailySalesBreakdown: []
}
let END_POINT = 'http://localhost/projects/home-shope/public/api/getDashboardData';

const Logic = {

    innitialize : innitialize,
    initialState: initialState,
    getData: getData,
    getState: getState
}
export default Logic;


function innitialize(component){

    newState =  {
        monthlyVisitors: 111,
        monthlySales: 111,    
        dailyVisitorsBreakdown: [],
        dailySalesBreakdown:  []
    }

    // component.setState(newState);


}



function getData(){

    request = new Request(END_POINT);

    fetch(request)
    .then((response) => response.json())
    .then((data) => {
        processApiResponse(data);

    })
    .catch((err)=>{
        processApiError(err);
    });

}

function processApiResponse(data){

    newState =  {
        monthlyVisitors: data.monthlyVisitors,
        monthlySales: data.monthlySales,    
        dailyVisitorsBreakdown: data.dailyVisitorsBreakdown,
        dailySalesBreakdown:  data.dailySalesBreakdown
    }

}

function processApiError(err){
    console.log("there was an error !");
    console.log(err);
}

function getState(state){
    return state.main;
}


