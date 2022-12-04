import React from 'react'
import './EditCategory.css'
import useEditCategoryLogic from './useEditCategoryLogic'

export default function EditCategory() {

    const {state, change, form, isLoading} = useEditCategoryLogic();

    return (
        <div className='content-wrapper '> 

            <div className="container-fluid">
                <div className="row ">
                    <div className="col-12 p-2">
                        <h1>Category</h1>
                    </div>
                    <div className="col-6">
                        <div className="card card-primary ">

                            <div className="card-header">
                                <h3 className="card-title">Edit Category</h3>
                            </div>
                            <div className="card-body">
                                <div id='ec-wrapper-product-name'  className="form-group">
                                    <label >Category id</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" placeholder={state[0].value} disabled/>
                                </div>                            
                                <div id='ec-wrapper-product-name'  className="form-group">
                                    <label >Category Name</label>
                                    <label className='ec_error' >{state[1].error}</label>
                                    <input onChange={(e)=>{ form.categoryInput(e) }} type="email" className="form-control" id="exampleInputEmail1"  placeholder={state[1].value} />
                                </div>

                                <div className="c-wrapper-product-name">
                                    <div id='ap-wrapper-unit' className="form-group ">
                                        <label>Upload Image</label>
                                        <label className='ap_error'>{state[3].error}</label>                                                      
                                    </div>
                                    <input onChange={(e)=>{ form.onChangeImage(e) }} type="file" accept="image/png, image/jpeg" />
                                </div>  

                                <div id='ec-wrapper-submit' className="d-flex justify-content-center ">
                                    <button onClick={(e)=>{ change.validateInput(e) }} type="submit" className="btn btn-primary">Edit</button>
                                </div> 
                                <div className="ec-is-loading">
                                    {(isLoading)&&"Updating data..."}
                                </div>                                 
                            </div>   
                        </div>
                    </div>

                </div>
            </div>



        </div>
    )


}
