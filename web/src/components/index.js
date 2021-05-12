import React, { Component } from "react";
// import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import Axios from "axios";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { apiBase, apiHost } from "../App";
import { Redirect } from "react-router";
import { connect } from 'react-redux';
import _ from "lodash";
import { Button, Input } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Menu from "@material-ui/core/Menu";
import Menus from "./menu";
import MenuItem from "@material-ui/core/MenuItem";
import { alertStyle, searchFormsAlignment, bg } from "../App";
import { userdataAction, tokenAction, projectNameAction } from '../Redux/Actions/StateContainer'
import {
    dotButton,

} from "./menu";
import VinComponent from './VinComponent'
import PastRecords from "./PastRecords";
import moment from 'moment'


class index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
            errorHolder: null,
            usersData: [],
            loggedUser: null,
            token: null,
            logout: false,
        };
        this.childRef = React.createRef();
        this.handleClickMenu = this.handleClickMenu.bind(this);
    }



    logOut = () => {
        const { dispatch } = this.props;
        dispatch(userdataAction(null))
        dispatch(tokenAction(null))

        this.setState({
            logout: true,
        });
    };




    componentDidMount() {
        const { dispatch } = this.props
        const currentRoute = window.location.pathname
        const pName = currentRoute.split('/')[1]
        if (pName == 'index') {
            dispatch(projectNameAction('indexPageVIN'))
        }
        else if (pName == 'past') {
            dispatch(projectNameAction('pastRecords'))
        }
        if (this.props.userData) {
            this.setState({
                loggedUser: this.props.userData
            })
        }
        if (this.props.tokenData) {
            const headers = {
                "auth-token": this.props.tokenData,
            };
            Axios.get(`${apiBase}/api/users`, { headers })
                .then((response) => {
                    this.setState({
                        usersData: response.data.data,
                    });
                })
                .catch((err) => {
                    this.setState({
                        errorHolder: err.response.data.data,
                    });
                });
        }
    }



    handleClickMenu = (event) => {
        this.setState({
            anchorEl: event.target,
        });
    };
    handleCloseMenu = () => {
        this.setState({
            anchorEl: null,
        });
    };

    componentDidUpdate() {
        if (this.state.errorHolder) {
            setTimeout(() => this.setState({ errorHolder: null }), 3000);
        }
    }
    render() {
        const {
            loggedUser,
            logout,
            errorHolder,
            anchorEl,
        } = this.state;
        if (logout) {
            this.props.history.push('/');
        }

        return (
            loggedUser ?
                <>
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

                    <div className="entire-container container-fluid">
                        <nav
                            className="navbar navbar-default col-md-12"
                            style={{ marginBottom: "0px", backgroundColor: "white" }}
                        >
                            <div>
                                <div className="navbar-header">
                                    <h1>HackathonA</h1>
                                </div>

                                <div style={{ textAlign: "right" }}>
                                    <span style={{ display: "inline-block", marginTop: "14px" }}>
                                        <i className="fa fa-user-o" aria-hidden="true"></i>{" "}
                                        <Button
                                            style={dotButton}
                                            aria-controls="customized-menu"
                                            aria-haspopup="true"
                                            variant="contained"
                                            color="primary"
                                            onClick={this.handleClickMenu}
                                            ref={this.childRef}
                                        >
                                            {loggedUser ? loggedUser : "Explore"}
                                            <span className="caret"></span>
                                        </Button>
                                        <Menu
                                            id="simple-menu"
                                            className="wwww"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={this.handleCloseMenu}
                                        >
                                            {loggedUser ? (
                                                <MenuItem onClose={this.handleCloseMenu}>
                                                    <Link to="/user/logout" onClick={this.logOut}>
                                                        <i className="fa fa-power-off" aria-hidden="true"></i>
                          Logout
                        </Link>
                                                </MenuItem>
                                            ) : (
                                                <MenuItem onClose={this.handleCloseMenu}>
                                                    {" "}
                                                    <Link to="login/form">Login</Link>
                                                </MenuItem>
                                            )}
                                        </Menu>
                                    </span>

                                </div>
                            </div>
                        </nav>
                    </div>

                </> :
                <>
                    <div className="col-md-3 col-sm-3 col-lg-3 col-12"></div>

                    <div className="col-md-9 col-sm-9 col-lg-9 col-12">
                        <h3 style={{ float: 'left', padding: '1opx' }}>Your session expired. please login to continue</h3>
                        <Link to="/" className="btn btn-danger" style={{ float: 'left', margin: '12px' }}>Home</Link>
                    </div>
                </>
        );
    }
}

const mapStateToProps = state => {
    return {
        userData: state.StateReducer.userdata,
        tokenData: state.StateReducer.token,
        projectName: state.StateReducer.projectName
    }
}
export default connect(mapStateToProps)(index)