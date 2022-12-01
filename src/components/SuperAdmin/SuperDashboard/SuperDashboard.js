
import Overview from './Overview/Overview'
import useSuperDashboardLogic from './useSuperDashboardLogic';
import SalesStats from './SalesStats/SalesStats';
import VisitorsStats from './VisitorsStats/VisitorsStats';


export default function SuperDashboard(){

    const {state} = useSuperDashboardLogic(); 

    return(

        <div className='content-wrapper '> 

            <div className="content-header">
            <h1 className="m-0">Super Dashboard</h1>
            </div>

            <div className="content">
                <div className="container-fluid">
                    <Overview data={state} />
                    
                  <div className="row">
                    <div className="col-lg-6">
                      <VisitorsStats data={state}  />
                    </div>
                    <div className="col-lg-6">
                      <SalesStats data={state}  />
                    </div>
                  </div>

                </div>
            </div>
        </div>



    )

}