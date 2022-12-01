
export default function useAddProductsForm(setState){



    function productName(e){


        setState((value)=>{
            return value.map((item)=>{
                if(item.id == "productName"){
                    return {...item, value: e.target.value}
                }
                else{
                    return item;
                }
            });
            
        });

    }

    function description(e){

        setState((value)=>{
            return value.map((item)=>{
                if(item.id == "description"){
                    return {...item, value: e.target.value}
                }
                else{
                    return item;
                }
            });
        });
    }

    let c_id = "";
    function category(e){

        c_id = e.target[e.target.selectedIndex].id;
        setState((value)=>{
            return value.map((item)=>{
                if(item.id == "category"){
                    return {...item, value: {id: c_id, value: e.target.value}}
                }
                else{
                    return item;
                }
            });
            
        });
        
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

    let mrpId;
    let mrpArr;

    function mrp(e){

        setState((previousState)=>{

            return  previousState.map((item)=>{
                if(item.id == "mrp"){
                    return {...item, value: e.target.value}
                }
                else{
                    return item;
                }
            });
        });
    }


    let sellingPriceId;
    let sellingPriceArr;

    function sellingPrice(e){

        setState((previousState)=>{

            return  previousState.map((item)=>{
                if(item.id == "sellingPrice"){
                    return {...item, value: e.target.value}
                }
                else{
                    return item;
                }
            });           
        });
    }



    let form = {

        productName,
        description,
        category,
        onChangeImage,
        mrp,
        sellingPrice
    }

    return{ form }
}