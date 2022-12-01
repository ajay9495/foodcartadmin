import React from 'react'

export default function Table({data,change}) {



  return (

        <table id="example2" className="table table-bordered table-hover ">
            <thead >
                <tr>
                    <th className='vp-column-id' >No</th>
                    <th className='vp-column-name' >Product name</th>
                    <th className='vp-column-category'>Category</th>
                    <th className='vp-column-instock'>Instock</th>
                    <th className='vp-column-actions'>Actions</th>
                </tr>
            </thead>
            <tbody>

            {
                data.displayData.map((item,index)=>{
                    return(
                            <tr key={item.id} >
                                <td>{index+1}</td>
                                <td>{item.name}</td>
                                <td>{item.category_name}</td>
                                <td>
                                    <div className="custom-control custom-switch">
                                        <input onChange={(e)=>{ change.toggleInStock(item) }}  type="checkbox" className="custom-control-input" id={"customSwitch"+item.id}  checked={item.in_stock}/>
                                        <label className="custom-control-label" htmlFor={"customSwitch"+item.id} ></label>
                                    </div>                                 
                                </td>
                                <td className='pl-5'>
                                    <button className='btn btn-primary mr-4' onClick={(e)=>{ change.navigateTo('/EditProduct?id='+item.id) }}  >Edit</button>
                                    <button className='btn btn-danger mr-4' onClick={(e)=>{ change.deleteProductData(item.id) }} >Delete</button>
                                </td>
                            </tr>
                    );
                })
            }
            

                                                      
            </tbody>

        </table>

  )
}
