
import { useState, useEffect } from "react";
import useCategoryForm from './useCategoryForm';
import useCategoryApi from './useCategoryApi';
import useSharedModules from "../../shared/js/SharedModules/SharedModules";
import useLocalStorage from "../../shared/js/SharedModules/LocalStorage/useLocalStorage";

export default function CategoryLogic(){

    const {setLocalUserData,getLocalUserData} = useLocalStorage();
    let localUser = getLocalUserData(); 
    let TABLE_ROW_COUNT = 2;
    let tableIndexStart = 0;
    let tableIndexEnd = 0;
    let gtdd_displayData = [];
    let STORE_ID = localUser.store_id;
    let newState;



    let initialState = [    
        {id: 'categoryName' , value: '', error:""},
        {id: 'storeId' , value: STORE_ID, error:""},
        {id:'image',value:null,error:""}
    ];

    let initialTableState ={
        totalData:[],
        displayData:[],
        currentPage:0,
        pagesArr:[]
    }

    const [isLoading,setIsLoading] = useState(false);
    const [state,setState] = useState(initialState);
    const [tableState,setTableState] = useState(initialTableState);
    const {form} = useCategoryForm(setState);
    const {api} = useCategoryApi();
    const {sharedModules} = useSharedModules();

    useEffect(()=>{
        
        api.loadCategoryData(STORE_ID)
        .then((data)=>{     loadTableData(data)   })
        .catch((err)=>{     api.processApiError(err)    });

    },[]);



    let vi_isValid;
    function validateInput(e){

        e.preventDefault();
        vi_isValid = true;

        setState((preState)=>{

            newState = preState.map((item)=>{

                if(item.id == "image"){

                    if(item.value == null){

                        vi_isValid = false;
                        return {...item,error:'Required'};
                    }
                    else{
                        return {...item,error:''}
                    }

                }
                else if(sharedModules.checkIsEmpty(item.value)){
                    vi_isValid = false;
                    return {...item,error:'Required'};
                }
                else{
                    return {...item,error:''}
                }

            });

            if (vi_isValid) {

                setIsLoading(true);

                api.postData(state)
                .then((data) => processPostResponse(data))
                .catch((err)=>{     api.processApiError(err)});
            }


            return newState;

        })

        
        

    }
 
    let newTableState;
    function loadTableData(data){


        if (data.status == "success") {

            if(data.payload.length > 0){

                setTableState((prevState)=>{

                    newTableState = {
                        ...prevState,
                        totalData:data.payload,
                        displayData: getTableDisplayData(data.payload,1),
                        currentPage: 1,
                        pagesArr: getTablePaginationArr(data.payload)
                    }
                    return newTableState;
    
                });                
            }
            else{
                alert("No category data found in the database.")
            }

        }else{
            alert("No categories exists in the database");
        }

    }

    function getTableDisplayData(totalData,pageNumber){

        gtdd_displayData = [];
        tableIndexStart = (pageNumber - 1)*TABLE_ROW_COUNT;
        tableIndexEnd = tableIndexStart + TABLE_ROW_COUNT;

        totalData.forEach((item, index)=>{

            if(index >=tableIndexStart && index <  tableIndexEnd){
                gtdd_displayData.push(item);
            }
        });

        return gtdd_displayData;

    }

    let gtpa_pageCount;
    let gtpa_pageArr;
    function getTablePaginationArr(data){

        gtpa_pageArr = [];
        gtpa_pageCount = data.length/TABLE_ROW_COUNT;
        for(var i = 0;i<gtpa_pageCount;i++){

            if (i == 0) {
                gtpa_pageArr.push({
                    page:i+1,
                    isActive: "active"
                });
            }
            else{
                gtpa_pageArr.push({
                    page:i+1,
                    isActive: "inactive"
                });
            }

        }

        return gtpa_pageArr;

    }

    let gtp_newPagesArr;
    function getTablePage(pageNumber){


        setTableState((prevState)=>{

            gtp_newPagesArr = prevState.pagesArr.map((item)=>{

                if(item.page == pageNumber){
                    return {...item, isActive:"active"}
                }
                else{
                    return {...item, isActive:"inactive"}
                }
            });

            return {...prevState , displayData: getTableDisplayData(prevState.totalData,pageNumber), pagesArr: gtp_newPagesArr};
        });

    }

    function deleteCategory(categoryId){

        api.sendDeleteRequest(categoryId)
        .then((data) => ProcessDeleteResponse(data,categoryId) )
        .catch((err)=> api.processApiError(err));

    }


    function goToEditPage(id){
        window.location.assign("/EditCategory?id="+id);
    }


    function processPostResponse(data){

        setIsLoading(false);

        if(data.status == "success"){
            alert("Successfully post data in the database");
            sharedModules.refreshPage();
        }
        else{
            alert("Failed to post data in the datbase.");
            sharedModules.refreshPage();
        }
    }

    function ProcessDeleteResponse(data,id){
        
        if (data.status == "success") {

            alert("Successfully deleted data");

            api.loadCategoryData(STORE_ID)
            .then((data)=>{     sharedModules.refreshPage()   })
            .catch((err)=>{     api.processApiError(err)    });
        }
        else{
            alert("Failed to delete data");
        }

    }


   


    let change = {

        validateInput: validateInput,
        getTablePage:getTablePage,
        deleteCategory: deleteCategory,
        goToEditPage: goToEditPage,
    }

    return{
        form,
        state,
        change,
        tableState,
        isLoading
    }

}



