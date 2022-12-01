import React from 'react'

export default function Results({data,change,config}) {


    return (

        <div className="row d-flex justify-content-center">
            <div className="col-md-10 mt-4  ">
                    {
                        data.map((item,index)=>{

                            return(

                                <div  key={index}  className="list-group-item  p-4">
                                    <div className="row  ">
                                        <div className="col-auto ">
                                            <img className="img-fluid sp-product-image" src={config.CURRENT_PRODUCT_IMAGE_BASE+item.image_url} alt="Photo"  />
                                        </div>
                                        <div className='col'>
                                            <h3 className=' mt-4'>
                                                <b>{item.name}</b>
                                            </h3>
                                            <div className="row mt-3">
                                                <div className="ml-5 d-flex flex-column align-items-center">
                                                    <b>Category</b>
                                                    <span> {item.category} </span>
                                                </div>
                                                <div className="ml-5 d-flex flex-column align-items-center">
                                                    <b>MRP</b>
                                                    {item.mrp}
                                                </div>  
                                                <div className="ml-5 d-flex flex-column align-items-center">
                                                    <b>Selling Price</b>
                                                    {item.selling_price}
                                                </div> 
                                                <div className="ml-5 d-flex flex-column align-items-center">
                                                    <div className="custom-control custom-switch">
                                                        <input onChange={(e)=>{ change.toggleInStock(item) }} type="checkbox" className="custom-control-input" id={"customSwitch"+item.id}  checked={item.in_stock}/>
                                                        <label className="custom-control-label" htmlFor={"customSwitch"+item.id} >Instock</label>
                                                    </div>                                                    
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <button onClick={(e)=>{ change.goToEditProduct(item.id) }} className='btn btn-primary m-2'>Edit</button>
                                                <button onClick={(e)=>{ change.deleteProductData(item.id) }} className='btn btn-danger m-2'>Delete</button>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            )
                        })
                    }
            </div>
        </div>

  )
}
