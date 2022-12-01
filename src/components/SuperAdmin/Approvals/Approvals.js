import useApprovalsLogic from "./useApprovalsLogic";
import Table from "./Table";

export default function ViewProducts() {

    const {tableState, setTableState, change } = useApprovalsLogic();


    return (
        
        <div className='content-wrapper '> 
            <div className="content-header">
                <h1 className='ml-3'>Products</h1>
            </div>
            <div className="content">
                <div className="card-6 m-1">
                    <div className="card-body">


                        <Table data={tableState} change={change} />

                    </div>
                </div>
            </div>
        </div>
        
    )


}
