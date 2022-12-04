import React from 'react'
import './EditProduct.css'
import useEditProductLogic from './useEditProductLogic';

export default function EditProduct() {

    const {form,state,categoryList,validateInput,isLoading} = useEditProductLogic();

 

  return (

        <div className='content-wrapper '> 

            <div className="content">
                <div className="container-fluid ap-main-Container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Add Product</h3>
                                </div>  
                                <form>
                                    <div className="card-body">
                                        <div className="row ">
                                            <div id='ap-section-left' className="col-sm-6 px-4 ">
                                                <div id='ap-wrapper-product-name'  className="form-group">
                                                    <label >Product Name</label>
                                                    <label className='ap_error'>{state[0].error}</label>
                                                    <input id="product_name" onChange={form.productName} type="text" className="form-control"  placeholder={state[0].value} />
                                                </div>
                                                <div id='ap-wrapper-description' className="form-group">
                                                    <label>Product Description</label>
                                                    <label className='ap_error'>{state[2].error}</label>
                                                    <textarea  onChange={form.description}  className="form-control" rows="3" placeholder={state[2].value}  ></textarea>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div id='ap-wrapper-category' className="form-group ">
                                                            <label>Category</label>
                                                            <label className='ap_error'>{state[1].error}</label>
                                                            <select onChange={(e)=>{ form.category(e) }} value={state[1].value.value}  className="form-control"  >
                                                                {
                                                                    categoryList.map((item,index)=> <option id={item.id} key={index} >{item.value}</option> )
                                                                }
                                                            </select>                                                        
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div id='ap-wrapper-unit' className="form-group ">
                                                            <label>Upload Image</label>
                                                            <label className='ap_error'>{state[7].error}</label>
                                                            <input onChange={(e)=>{ form.onChangeImage(e) }} type="file" accept="image/png, image/jpeg" />                                                      
                                                        </div>
                                                    </div>                                                    
                                                </div>
                                                <div id='ap-wrapper-submit' className="ap-submit-wrapper py-4">
                                                    <button onClick={validateInput} type="submit" className="btn btn-primary btn-lg btn-block">Add</button>
                                                </div> 
                                                <div className="ep-is-loading">
                                                    {(isLoading)&&"Updating data..."}
                                                </div> 
                                            </div>
                                            <div id='ap-right-section' className="col-sm-6 px-4 ">     
                                                <div id='ap-wrapper-mrp' className="form-group">
                                                    <label>MRP</label>
                                                    <label className='ap_error'>{state[3].error}</label>
                                                    <div className="row ">

                                                        <div  className="col-sm-3 ap-box">
                                                            <div className="form-group">
                                                                <label   className='text-secondary'>Price</label>
                                                                <input  id={'mrp1_price'} onChange={(e)=>{ form.mrp(e) }} type="email" className="form-control"  placeholder={state[3].value} />
                                                            </div>                                                        
                                                        </div>

                                                    </div>
                                                </div>
                                                <div id='ap-wrapper-selling-price' className="form-group">
                                                    <label>Selling Price</label>
                                                    <label className='ap_error'>{state[4].error}</label>
                                                    <div className="row ">
                                                        <div  className="col-sm-3 ap-box">                                                                         
                                                            <div className="form-group">
                                                                <label className='text-secondary'>Price</label>
                                                                <input id={'sellingPrice1_price'} onChange={(e)=>{form.sellingPrice(e)}}  type="email" className="form-control"  placeholder={state[4].value} />
                                                            </div>                                                     
                                                        </div> 
                                                    </div>
                                                </div>                                                                                              
                                            </div>
                                        </div>
                                    </div>

                                </form>

                            </div>
                        </div>


                    </div>

                </div>
            </div>
            
        </div>

  )    
    
}
