import React, { useEffect, useState } from "react";
import CustomInput from '../dynamicComponent/CustomInput'
import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Axios from 'axios'
import { getApiCall, postApiCall } from "../utils/utility";
import Loader from '../dynamicComponent/Loader'
import { PastTransactionsAction, projectNameAction, TokenErrorAction } from '../Redux/Actions/StateContainer'


const useStyles = makeStyles((theme) => ({

    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    root: {
        width: '100%',
    },
    toolTip: {
        background: "#e7f3fe",
        color: "inherit",
        boxShadow: theme.shadows[3],
        fontSize: "12px",
    },


    cardText: {
        marginTop: "1rem",
    },
    label: {
        color: " #000 !important",
        fontSize: "21px",
        marginBottom: ".1em",
        width: "max-content",
        fontFamily: "sofia_proregular",
    },



    selectList: {
        "& li": {
            padding: "7px 15px",
            fontSize: "14px",
        },
        "&$selected ": {
            background: theme.palette.primary.light,
        },
        "& hover": {
            background: theme.palette.primary.light,
        },
    },
    inputRoot: {
        fontWeight: 100,
    },
    rootAccordion: {
        boxShadow: 'none',
        // '&:not(:last-child)': {
        //   borderBottom: 0,
        // },
        '&:before': {
            display: 'none'
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    rootAccordionSummary: {
        // backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '0',
        // marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    rootAccordionDetails: {
        display: "block",
        padding: 0,
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    menuItemRoot: {
        "&$selected": {
            background: `${theme.palette.primary.light} !important`,
        },
        "&$selected:hover": {
            background: `${theme.palette.primary.light} !important`,
        },
        "&:hover": {
            background: `${theme.palette.primary.main} !important`,
        },
    },
    menuSelected: { background: `${theme.palette.primary.light} !important` },
    rootDialogAction: { justifyContent: "center" },
    rootDialogButton: { marginLeft: "15px" }
}));
function VinComponent() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory();

    const SelectorPastTransaction = useSelector(state => state.StateReducer.PastTransactions)
    const SelectorToken = useSelector(state => state.StateReducer.token)

    // initialising states
    const [vehicleInfoAccordion, setVehicleInfoAccordion] = useState(false);
    const [VehicleNo, setVehicleNo] = useState(null);
    const [manufacturer, setManufacturer] = useState(null);
    const [make, setMake] = useState(null);
    const [isLoader, setIsLoader] = useState(false);
    const [model, setModel] = useState(null);
    const [yearOfMfg, setYearOfMfg] = useState(null);
    const [VehicleDetails, setVehicleDetails] = useState(null);
    const [VehicleNoError, setVehicleNoError] = useState(false);

    //events
    const handleAccrodionChange = () => {
        vehicleInfoAccordion == true ? setVehicleInfoAccordion(false) : setVehicleInfoAccordion(true)
    }
    const handleChange = (e) => {
        const value = e.target.value
        stateEmptier()
        setVehicleNoError(null)
        if (value.length < 2) {
            setVehicleNoError('Please enter a valid VIN no.')
        }


    }
    const handleBlur = async (e) => {
        const name = e.target.name
        const value = e.target.value
        if (value.length < 2) {
            setVehicleNoError('Please enter a valid VIN no.')
        }
        else {


            const configHeader = {

                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            };


            setIsLoader(true)
            getApiCall(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${value}?format=json&modelyear=`, configHeader)
                .then(response => {

                    console.log("response", response)
                    const VNDetails = response.data.Results
                    setIsLoader(false)
                    setVehicleDetails(VNDetails)
                    const VNmake = VNDetails.find(v => v.Variable == "Make")
                    const VNmodel = VNDetails.find(v => v.Variable == "Model")
                    const VNmfg = VNDetails.find(v => v.Variable == "Manufacturer Name")
                    const VNmodelYear = VNDetails.find(v => v.Variable == "Model Year")
                    setMake(VNmake.Value)
                    setManufacturer(VNmfg.Value)
                    setModel(VNmodel.Value)
                    setYearOfMfg(VNmodelYear.Value)
                    const currentVINdetails = {
                        VIN: value,
                        make: VNmake.Value ? VNmake.Value : '-',
                        model: VNmodel.Value ? VNmodel.Value : '-',
                        manufacturer: VNmfg.Value ? VNmfg.Value : '-',
                        yearofmfg: VNmodelYear.Value ? VNmodelYear.Value : '-'
                    }
                    const lastTransaction = SelectorPastTransaction

                    if (lastTransaction.length > 9) { lastTransaction.shift() }

                    lastTransaction.push(currentVINdetails)
                    dispatch(PastTransactionsAction(lastTransaction))

                    if (VNmake.Value != null && VNmfg.Value != null && VNmodel.Value != null && VNmodelYear.Value != null) {

                        setVehicleInfoAccordion(true)
                    }
                    else {
                        setVehicleNoError("Please enter a valid VIN no.")
                        setVehicleInfoAccordion(false)
                    }

                })
                .catch(err => {
                    console.log("vin api error", err)
                    throw err
                })

        }
    }
    const stateEmptier = () => {
        setVehicleInfoAccordion(null)
        setManufacturer(null)
        setMake(null)
        setModel(null)
        setYearOfMfg(null)
        setVehicleDetails(null)
        setVehicleNoError(null)
    }
    const PastRecordsEvent = () => {

        dispatch(projectNameAction('pastRecords'))
    }
    console.log("qqqqqqqqqq", SelectorPastTransaction.model)
    return (
        <div>
            <Loader loader={isLoader} />
            <>
                <div className="col-lg-8 col-md-8 col-sm-12 col-12 ">
                    <div className="width_100 rows ">

                        <div >

                            <div className="width_100 heading2">Vehicle ID No.</div>

                            <div className="width_100">
                                <CustomInput
                                    name="vehicleNumber"
                                    placeholder="Enter Vehicle Reg No."
                                    margin="zeroMargin"
                                    helperText={VehicleNoError && VehicleNoError}
                                    isError={VehicleNoError && VehicleNoError}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required={true}
                                    inputProps={{ maxLength: 15 }}
                                    value={VehicleNo}
                                />
                            </div>
                            <p></p>
                            <div className="policyholder_bg margin_top_20" style={{ display: 'inline-block', backgroundColor: 'white', padding: '0px 10px 0px 10px', margin: '0px 7px' }}>

                                <Accordion style={{ backgroundColor: 'white', paddingBottom: '10px' }}
                                    expanded={vehicleInfoAccordion}
                                    onChange={handleAccrodionChange}
                                    classes={{ root: classes.rootAccordion }}
                                    disabled={(make && model && yearOfMfg && manufacturer) ? false : true}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon fontSize="large" />}
                                        aria-controls="mainpanelbh-content"
                                        id="mainpanelbh-header"
                                        style={{ padding: '0px' }}
                                        classes={{ root: classes.rootAccordionSummary }}
                                    >
                                        <Typography style={{ color: '#0071B1', fontWeight: 'bold', fontSize: '14px', marginTop: '6px' }} className={classes.heading}>Vehicle Information</Typography>
                                    </AccordionSummary>


                                    <AccordionDetails classes={{ root: classes.rootAccordionDetails }}>
                                        <>
                                            <div className="row">

                                                <div className="col-lg-6 col-md-6 col-sm-12 col-12 margin_top_20">
                                                    <CustomInput
                                                        name="Manufacturer"
                                                        placeholder=""
                                                        margin="zeroMargin"
                                                        label="Manufacturer"
                                                        required={true}
                                                        inputProps={{ maxLength: 20 }}
                                                        value={manufacturer}
                                                        inputProps={{
                                                            // readOnly: selectorprpVehicleDetails.policyNo ? true : false
                                                        }}
                                                    />

                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-12 margin_top_20">
                                                    <CustomInput
                                                        name="Make"
                                                        placeholder=""
                                                        margin="zeroMargin"
                                                        label="Make"
                                                        required={true}
                                                        inputProps={{ maxLength: 20 }}
                                                        value={make}
                                                        inputProps={{
                                                            // readOnly: selectorprpVehicleDetails.policyNo ? true : false
                                                        }}
                                                    />

                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-12 margin_top_20">
                                                    <CustomInput
                                                        name="Model"
                                                        placeholder=""
                                                        margin="zeroMargin"

                                                        label="Model"
                                                        required={true}
                                                        inputProps={{ maxLength: 20 }}
                                                        value={model}
                                                        inputProps={{
                                                            // readOnly: selectorprpVehicleDetails.policyNo ? true : false
                                                        }}
                                                    />

                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-12 margin_top_20">
                                                    <CustomInput
                                                        name="Year of manufacture "
                                                        placeholder=""
                                                        margin="zeroMargin"
                                                        label="Year of manufacture "
                                                        required={true}
                                                        inputProps={{ maxLength: 20 }}
                                                        value={yearOfMfg}
                                                        inputProps={{
                                                            // readOnly: selectorprpVehicleDetails.policyNo ? true : false
                                                        }}
                                                    />

                                                </div>




                                            </div>
                                        </>
                                    </AccordionDetails>
                                </Accordion>
                            </div>


                        </div>

                    </div>
                    <a onClick={PastRecordsEvent} className="show_10">Show past 10 Records</a>
                </div>

            </>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        userData: state.StateReducer.userdata,
        tokenData: state.StateReducer.token,
        projectName: state.StateReducer.projectName
    }
}

export default connect(mapStateToProps)(VinComponent)

