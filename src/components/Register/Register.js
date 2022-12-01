import React from 'react'
import useRegisterLogic from './useRegisterLogic'

export default function Registerd() {

    const {state, change, form} = useRegisterLogic();



  return (

        <div className="hold-transition login-page">
            <div className="login-box">
                <div className="register-logo">
                    <b>REGISTER</b>
                </div>    

                <div className="card p-3">
                    <div className="card-body login-card-body P-3">

                        <div className='form-group'>
                            <label >Name</label>
                            <label className='ap_error'>{state[0].error}</label>
                            <div className="input-group mb-3">
                                <input onChange={(e)=>{ form.nameChange(e) }} type="email" className="form-control" placeholder="Name" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                        <div className='form-group'>
                            <label >Email</label>
                            <label className='ap_error'>{state[1].error}</label>
                            <div className="input-group mb-3">
                                <input onChange={(e)=>{ form.emailChange(e) }} type="email" className="form-control" placeholder="Email" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='form-group'>
                            <label >Phone</label>
                            <label className='ap_error'>{state[2].error}</label>
                            <div className="input-group mb-3">
                                <input  onChange={(e)=>{ form.phoneChange(e) }}  type="password" className="form-control" placeholder="Phone" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className='form-group'>
                            <label >Password</label>
                            <label className='ap_error'>{state[3].error}</label>
                            <div className="input-group mb-3">
                                <input   onChange={(e)=>{ form.passwordChange(e) }} type="password" className="form-control" placeholder="Password" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>  
                        </div>

                          

                            <div className="row">
                                <button onClick={(e)=>{ change.validate(e) }} type="submit" className="btn btn-primary btn-block">Register</button>
                            </div>

                       

                    </div>
                </div>

            </div>
        </div>

  )
}
