import React from 'react'

export default function Table({data,change}) {



  return (

        <table id="example2" className="table table-bordered table-hover ">
            <thead >
                <tr>
                    <th className='vp-column-id' >admin id</th>
                    <th className='vp-column-name' >Admin name</th>
                    <th className='vp-column-actions'>Actions</th>
                </tr>
            </thead>
            <tbody>

            {
                data.displayData.map((item)=>{
                    return(
                            <tr key={item.id} >
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td className='pl-5'>
                                    <button className='btn btn-primary mr-4' onClick={(e)=>{ change.approve(item) }}  >aprove</button>
                                </td>
                            </tr>
                    );
                })
            }
            

                                                      
            </tbody>

        </table>

  )
}
