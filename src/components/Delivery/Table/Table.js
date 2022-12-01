import React from 'react'

export default function Table({data,change}) {

    let pageNumberArr = [1];
 

  return (

    <div className="card card-primary  c-test">
        <div className="card-header">
            <h3 className="card-title">Delivery Partner List</h3>
        </div>
        <div className="card-body">
            <table id="example2" className="table table-bordered table-hover ">
                <thead >
                    <tr>
                        <th className='c-column-id' > No</th>
                        <th className='c-column-name' >Delivery Partner Name</th>
                        <th className='c-column-actions'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.displayData.map((item,index)=>{
                            return(

                                <tr key={item.id}>
                                    <td>{index+1}</td>
                                    <td>{item.name}</td>
                                    <td className='pl-5'>
                                        <button onClick={(e)=>{ change.deleteDelivery(item.id) }} className='btn btn-danger mr-4'>Delete</button>
                                    </td>
                                </tr>

                            );
                        })
                    }
                                          
                </tbody>

            </table>

            <div className="row pt-4">
                <div className="col-md-6 ">
                    Total of {data.totalData.length} entries
                </div>
                <div className="col-md-6">
                    <div className="dataTables_paginate paging_simple_numbers c-pagination-wrapper" >
                        <ul className="pagination paint-red">
                            {
                                data.pagesArr.map((item, index)=>{
                                    return(
                                            <li  key={index} className={"paginate_button page-item "+item.isActive}>
                                                <a onClick={()=>{ change.getTablePage(item.page) }}  className="page-link">{item.page}</a>
                                            </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

  )
}
