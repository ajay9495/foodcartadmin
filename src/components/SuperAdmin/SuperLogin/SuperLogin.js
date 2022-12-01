import React from 'react'
import useSuperLoginLogic from './useSuperLoginLogic'


 
export default function SuperLogin() {

    const {state,change} = useSuperLoginLogic();


  return (

    <div className="hold-transition login-page">
        <div className="login-box">
            <div className="register-logo">
                <b>SUPER SIGN IN</b>
            </div>     

            <div className="card p-3">
                <div className="card-body login-card-body P-3">
                
                    <form action="../../index3.html" method="post">

                        <div className='row'>
                            <label className='ap_error'>{state[1].error}</label>
                            <div className="input-group mb-3">
                                <input onChange={(e)=>{ change.phoneChange(e) }}  className="form-control" placeholder="Phone" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='row'>
                            <label className='ap_error'>{state[0].error}</label>
                            <div className="input-group mb-3">
                                <input onChange={(e)=>{ change.passwordChange(e) }} type="password" className="form-control" placeholder="Password" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <button onClick={(e)=>{ change.validate(e)}}  className="btn btn-primary btn-block">Sign In</button>
                        </div>

                    </form>

                </div>
            </div>

        </div>
    </div>




  )
}
