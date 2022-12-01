
export default function useEditCategoryForm(setState){


    function categoryInput(e){

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

    let form = {
        categoryInput: categoryInput,
        onChangeImage: onChangeImage
    };

    return {form};


}


