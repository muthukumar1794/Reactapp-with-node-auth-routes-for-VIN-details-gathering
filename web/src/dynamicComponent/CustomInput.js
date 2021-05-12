import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        marginLeft: 0,
        marginRight: 0,
        minWidth: 120,
        width: "100%",
    },
    inputRoot: {
        "&::placeholder": {
            textTransform: "none !important",
            // color: "#A1A5A6"
        },
        "&::-ms-input-placeholder": {
            textTransform: "none !important",
            // color: "#A1A5A6"
        },
        // fontWeight: 600,
        color: "#000",
        padding: "5px 0",
        fontSize: "16px",
        lineHeight: 1.5,
        fontWeight: "600",
        "&.Mui-disabled::before": {
            borderBottom: "1px solid rgba(0, 0, 0, 0.42)"
        }
    },
    // inputRootEdit: {
    //   "&::placeholder": { textTransform: "none !important" },
    //   "&::-ms-input-placeholder": { textTransform: "none !important" },
    //   fontWeight: 700,
    //   color: "#313131",
    //   padding: "5px 0",
    //   fontSize: "17.5px",
    //   textTransform: "uppercase",
    //   lineHeight: 1.5,
    // },
    label: {
        //fontSize: "21px",
        marginBottom: ".5rem",
        width: "max-content",
        color: "#909090",
        //fontWeight: 600,
        fontFamily: "sofia_proregular",
    },
    textTransformLower: {
        "& input": {
            textTransform: "lowercase",
        },
    },
    textTransformUpper: {
        "& input": {
            textTransform: "uppercase",
        },
    }
}));

const onPrevent = (e) => {
    e.preventDefault();
}

export default function CustomInput(props) {
    const classes = useStyles();
    const {
        name,
        label,
        placeholder,
        value,
        helperText,
        isError,
        onClick,
        onChange = () => { },
        onBlur = () => { },
        required,
        inputProps,
        InputProps,
        auto,
        defaultValue,
        onKeyDown,
        autoComplete,
        id,
        style,
        isAddressField,
        margin,
        disabled,
        isLowercase,
    } = props;
    return (
        <FormControl style={margin === "zeroMargin" ? { margin: 0 } : null} className={classes.formControl}>
            <InputLabel id="customInput" classes={{ root: classes.label }}>
                {label}
            </InputLabel>
            <TextField
                onPaste={e => onPrevent(e)}
                onCopy={e => onPrevent(e)}
                onKeyDown={onKeyDown}
                name={name}
                defaultValue={defaultValue}
                value={value}
                onClick={onClick}
                onChange={onChange}
                style={{ width: "100%", marginTop: "25px", ...style }}
                labelId="customInput"
                id={id ? id : "customInput"}
                className={isLowercase ? classes.textTransformLower : classes.textTransformUpper}
                InputProps={{
                    ...{
                        classes: {
                            root: classes.inputRoot,
                            input: classes.inputRoot,
                        },
                    },
                    ...InputProps,
                }}
                placeholder={placeholder}
                helperText={helperText}
                onChange={(e) => onChange(e)}
                onBlur={(e) => onBlur(e)}
                required={required}
                inputProps={inputProps}
                error={isError}
                autoFocus={auto}
                autoComplete="off"
                // autoComplete={isAddressField ? "chrome-off" : "off"}
                disabled={disabled}
            />
        </FormControl>
    );
}
