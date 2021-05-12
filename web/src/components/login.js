import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { apiHost, apiBase } from "../App";
import { Button } from "@material-ui/core";
import { alertStyle, searchFormsAlignment, bg } from "../App";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import { connect } from 'react-redux';
import { userdataAction, tokenAction } from '../Redux/Actions/StateContainer'
import _ from "lodash";
import Loader from '../dynamicComponent/Loader'

export class login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            refreshRedirect: null,
            errorHolder: null,
            Isloader: false
        };
    }
    onchange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };
    componentDidMount() {
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event) {
            window.history.pushState(null, document.title, window.location.href);
        });

    }
    componentDidUpdate() {
        if (this.state.errorHolder) {
            setTimeout(() => this.setState({ errorHolder: null }), 3000);
        }
    }
    submitForm = (e) => {
        const { dispatch } = this.props;
        const { email, password } = this.state;
        e.preventDefault();
        if (!email || !password) {
            this.setState({
                errorHolder: "Both fields are mandatory",
            });
            return;
        }
        this.setState({
            Isloader: true
        })
        Axios.post(`${apiBase}/api/login/user`, this.state)
            .then((response) => {
                this.setState({
                    Isloader: false
                })
                if (response.data.message == "Success") {
                    debugger
                    dispatch(userdataAction(response.data.data.email))
                    dispatch(tokenAction(response.data.data.token))

                    this.props.history.push('/index');
                }
            })
            .catch((err) => {

                console.log("errr", err);
                this.setState({
                    Isloader: false,
                    errorHolder: err.response.data.data || "not found",
                });
            });
    };


    render() {
        const { email, password, errorHolder } = this.state;
        return (
            <>
                <Loader loader={this.state.Isloader} />
                {errorHolder ? (
                    <div style={alertStyle}>
                        <Alert severity="error">
                            <AlertTitle>Error!</AlertTitle>
                            {errorHolder}
                        </Alert>
                    </div>
                ) : (
                    ""
                )}
                <div className="centering-form">
                    <h2 className="text-center">Login Form</h2>

                    <form
                        method="post"
                        noValidate
                        className="form-horizontal"
                        onSubmit={this.submitForm}
                    >
                        <div className="imgcontainer form-group">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSN6PSb90rGnT4WTxYC7HBxNWs2Ig-mSP2b0g&usqp=CAU"
                                alt="Avatar"
                                className="avatar"
                            />
                        </div>

                        <div className="form-group">
                            <div className="form-group">
                                <label
                                    htmlFor="uname"
                                    className="col-sm-4 control-label text-center"
                                >
                                    <b>Email</b>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Username"
                                    name="email"
                                    value={email}
                                    required
                                    className="col-sm-4"
                                    onChange={this.onchange}
                                />
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor="psw"
                                    className="col-sm-4 control-label text-center"
                                >
                                    <b>Password</b>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Enter Password"
                                    name="password"
                                    value={password}
                                    required
                                    className="col-sm-4"
                                    onChange={this.onchange}
                                />
                            </div>

                            <div className="form-group">
                                <Button className="btn btn-success" type="submit">
                                    Login
                </Button>
                            </div>
                        </div>
                    </form>
                    <div className="text-center col-md-12 form-group">
                        <p>New user?</p>
                        <span>
                            <Link to="/signup/form" className="">
                                Sign Up
              </Link>
                        </span>
                    </div>
                </div>

            </>
        );
    }
}
const mapStateToProps = state => {
    return {
        userData: state.StateReducer.userdata,
        tokenData: state.StateReducer.token,

    }
}

export default connect(mapStateToProps)(login)