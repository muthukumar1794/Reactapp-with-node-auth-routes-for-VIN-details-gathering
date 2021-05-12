import React, { useEffect } from 'react'
import Index from './index'
import { useDispatch, useSelector } from "react-redux";
import { projectNameAction } from '../Redux/Actions/StateContainer'
import VinComponent from './VinComponent'
import PastRecords from './PastRecords'
import Axios from 'axios'
import { apiBase } from "../App";



function Home() {
    const dispatch = useDispatch()

    const SelectorProjectName = useSelector(state => state.StateReducer.projectName)
    const SelectorUserdata = useSelector(state => state.StateReducer.userdata)
    const SelectorToken = useSelector(state => state.StateReducer.token)

    useEffect(() => {
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event) {
            window.history.pushState(null, document.title, window.location.href);
        });
    }, [])

    return (
        <div>
            <Index />
            <div className="container bg">
                {(SelectorProjectName == 'indexPageVIN' && SelectorUserdata) &&
                    <VinComponent />
                }
                {(SelectorProjectName == 'pastRecords' && SelectorUserdata) &&
                    <PastRecords />
                }
            </div>
        </div>
    )
}

export default Home


