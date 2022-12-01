
export default function useCategoryForm(setState){

    let test = "test var";

    function onChangeImage(e){
        
        setState((value)=>{
            return value.map((item)=>{
                if(item.id == "image"){
                    return {...item, value: e.target.files[0]}
                }
                else{
                    return item;
                }
            });
            
        });
    }

    function category(e){

        setState((prevState)=>{

            return prevState.map((item)=>{
                if(item.id == 'categoryName'){
                    return {...item,value: e.target.value}
                }
                else{
                    return {...item}
                }
            });
        })
    }



    let form ={
        onChangeImage: onChangeImage,
        category: category
    }

    return{     form    }
}



