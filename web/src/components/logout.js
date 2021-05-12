import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Login from './login'

class logout extends Component {

    render() {

        return (
            <div className="container" style={{ padding: '25px' }}>

                <h3>Thanks for using our App.</h3>
                <p>want to login again. please <Link to="/">click here</Link></p>
            </div>
        )
    }
}

export default logout