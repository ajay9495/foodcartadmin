
export default function useDeliveryForm(setState){

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

    function onChangePhone(e){
        setState((prevState)=>{

            return prevState.map((item)=>{
                if(item.id == 'phone'){
                    return {...item,value: e.target.value}
                }
                else{
                    return {...item}
                }
            });
        })
    }

    function onChangeName(e){
        setState((prevState)=>{

            return prevState.map((item)=>{
                if(item.id == 'name'){
                    return {...item,value: e.target.value}
                }
                else{
                    return {...item}
                }
            });
        })
    }

    function onChangePassword(e){
        setState((prevState)=>{

            return prevState.map((item)=>{
                if(item.id == 'password'){
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
        onChangeName: onChangeName,
        onChangePhone: onChangePhone,
        onChangePassword: onChangePassword,
        category: category
    }

    return{     form    }
}



