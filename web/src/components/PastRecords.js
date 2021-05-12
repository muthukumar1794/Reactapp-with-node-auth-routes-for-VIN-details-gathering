import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { projectNameAction } from '../Redux/Actions/StateContainer';

function PastRecords() {
    const dispatch = useDispatch()
    const SelectorPastTransaction = useSelector(state => state.StateReducer.PastTransactions)

    //events
    const VINEntryPage = () => {
        dispatch(projectNameAction('indexPageVIN'))
    }
    console.log("yyyyyyyyyyyy", SelectorPastTransaction)
    return (
        <div className="col-lg-9 col-md-9 col-sm-12 col-12 ">
            <h3>Past Records</h3>

            <table className="table table-striped" style={{ border: '1px solid' }}>
                <thead className="bg-head">
                    <tr>
                        <th className="border-right">S.No</th>
                        <th className="border-right">Vehicle ID</th>
                        <th className="border-right"> Manufacturer</th>
                        <th className="border-right"> Make</th>
                        <th className="border-right">Model</th>
                        <th className="border-right">Year of Mfg</th>
                    </tr>
                </thead>
                <tbody >
                    {SelectorPastTransaction.length > 0 ?
                        SelectorPastTransaction.map((vin, index) =>
                            <tr key={index}>
                                <td className="border-right">{index + 1}</td>
                                <td className="border-right">{vin.VIN}</td>
                                <td className="border-right">{vin.manufacturer}</td>
                                <td className="border-right">{vin.make}</td>
                                <td className="border-right">{vin.model}</td>

                                <td className="border-right">{vin.yearofmfg}</td>


                            </tr>) :
                        <tr><td colspan="6"> No records found.</td></tr>}
                </tbody>
            </table>
            <a onClick={VINEntryPage} className="show_10">Back To Home</a>
        </div>
    )
}

export default PastRecords
