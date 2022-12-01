import React from 'react'
import './SearchProducts.css'
import useSearchProductsLogic from './useSearchProductsLogic';
import Results from './Results/Results';

export default function SearchProducts() {


    const {state,resultState,change, config} = useSearchProductsLogic();

  return (

    <div className='content-wrapper '> 
        <div className="container-fluid  pt-4">
            <div className="text-center display-4 ">
                Search
            </div>
            <div id='sp-search-bar' className="row mt-2">
                <div className="col-md-8 offset-md-2">
                    <form action="simple-results.html">
                        <div className="input-group input-group-lg">
                            <input onChange={(e)=>{ change.setKeyWord(e) }} type="search" className="form-control form-control-lg" placeholder="Enter product name"  />
                            <div className="input-group-append">
                                <button onClick={(e)=>{ change.search(e) }} className="btn btn-lg btn-default">
                                    <i className="fa fa-search"></i>
                                </button>
                            </div>
                            
                        </div>
                        <div className='sp_error'>{state.error}</div>
                    </form>
                </div>
            </div>

            <Results config={config} change={change} data={resultState} />

        </div>
    </div>



  )
}
