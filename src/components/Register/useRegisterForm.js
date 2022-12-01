
export default function useRegisterLogic(setState){

    function nameChange(e){
        setState((prevState)=>{
            return prevState.map((item)=>{

                if(item.id == 'name'){
                    return {...item, value: e.target.value};
                }
                else{
                    return {...item};
                }
            });
        })
    }

    function emailChange(e){
        setState((prevState)=>{
            return prevState.map((item)=>{

                if(item.id == 'email'){
                    return {...item, value: e.target.value};
                }
                else{
                    return {...item};
                }
                

            });
        })
    }

    function phoneChange(e){
        setState((prevState)=>{
            return prevState.map((item)=>{

                if(item.id == 'phone'){
                    return {...item, value: e.target.value};
                }
                else{
                    return {...item};
                }
                

            });
        })
    }

    function passwordChange(e){
        setState((prevState)=>{
            return prevState.map((item)=>{

                if(item.id == 'password'){
                    return {...item, value: e.target.value};
                }
                else{
                    return {...item};
                }
                

            });
        })
    }


    let form = {
        nameChange: nameChange,
        emailChange: emailChange,
        phoneChange: phoneChange,
        passwordChange: passwordChange
    }

    return{
        form
    }

}











