import React from 'react'
import './TopNavigation.css'
import useTopNavigationLogic from './useTopNavigationLogic'

export default function TopNavigation() {


  const {logout,isModalVisible,openModal,closeModal} = useTopNavigationLogic();

  return (

        
            <nav className="tn-wrapper main-header navbar navbar-expand navbar-white navbar-light">
              <div>

                {(isModalVisible)&&
                    <div className='tn-modal'  onClick={(e)=>{ closeModal() }} >
                      <div className='tn-modal-card'>
                        <div className="modal-content">
                        <div className="modal-header">
                          <h4 className="modal-title">Logout Alert</h4>
                          <button onClick={(e)=>{ closeModal() }} type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <p>Do you want to logout ?</p>
                        </div>
                        <div className="modal-footer justify-content-between">
                          <button onClick={(e)=>{ closeModal() }} type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                          <button onClick={(e)=>{ logout() }}  type="button" className="btn btn-primary">Logout</button>
                        </div>
                        </div>
                      </div>
                    </div>
                }
          
              </div>
              <div className='tn-pull-right'>
                <a onClick={openModal} className='btn btn-default'>logout</a>
              </div>
            </nav>    

  )
}


