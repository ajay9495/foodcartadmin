import React from 'react'
import './Category.css'
import useStoreKeeperLogic from './useStoreKeeperLogic'
import Table from './Table/Table';

export default function StoreKeeper() {


    const {form, state,tableState,change} = useStoreKeeperLogic();



  return (
    <div className='content-wrapper '> 

        <div className="container-fluid">
            <div className="row ">
                <div className="col-12 p-2">
                    <h1>Store Keeper</h1>
                </div>
                <div className="col-6">
                    <div className="card card-primary ">

                        <div className="card-header">
                            <h3 className="card-title">Store Keeper</h3>
                        </div>
                        <div className="card-body">
                            <div id='c-wrapper-product-name'  className="form-group">
                                <label >Name</label>
                                <label className='c_error'>{state[0].error}</label>
                                <input onChange={form.onChangeName} className="form-control" id="exampleInputEmail1" placeholder="Name" />
                            </div> 
                            <div id='c-wrapper-product-name'  className="form-group">
                                <label >Phone</label>
                                <label className='c_error'>{state[0].error}</label>
                                <input onChange={form.onChangePhone} className="form-control" id="exampleInputEmail1" placeholder="Phone" />
                            </div> 
                            <div id='c-wrapper-product-name'  className="form-group">
                                <label >Password</label>
                                <label className='c_error'>{state[0].error}</label>
                                <input onChange={form.onChangePassword} className="form-control" id="exampleInputEmail1" placeholder="Password" />
                            </div> 
                            <div id='c-wrapper-submit' className="d-flex justify-content-center ">
                                <button onClick={change.validateInput} type="submit" className="btn btn-primary">Add</button>
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
