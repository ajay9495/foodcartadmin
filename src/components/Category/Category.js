import React from 'react'
import './Category.css'
import CategoryLogic from './CategoryLogic'
import Table from './Table/Table';

export default function Category() {

 
    const {form, state,tableState,change,isLoading} = CategoryLogic();
   


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
                            <h3 className="card-title">Add Category</h3>
                        </div>
                        <div className="card-body">
                            <div id='c-wrapper-product-name'  className="form-group">
                                <label >Category Name</label>
                                <label className='c_error'>{state[0].error}</label>
                                <input onChange={form.category} type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter Category Name" />
                            </div>
                            <div className="c-wrapper-product-name">
                                <div id='ap-wrapper-unit' className="form-group ">
                                    <label>Upload Image</label>
                                    <label className='ap_error'>{state[2].error}</label>                                            
                                </div>
                                <input  onChange={(e)=>{ form.onChangeImage(e) }}  type="file" accept="image/png, image/jpeg" />
                            </div>  
                            <div id='c-wrapper-submit' className="d-flex justify-content-center ">
                                <button onClick={change.validateInput} type="submit" className="btn btn-primary">Add</button>
                            </div> 
                            <div className="c-is-loading">
                                {(isLoading)&&"Posting data..."}
                            </div>                              
                        </div>   
                    </div>
                </div>
                <div className="col-6 ">
                    <Table change={change} data={tableState} />
                </div>
            </div>
        </div>
    </div>
  )
}
