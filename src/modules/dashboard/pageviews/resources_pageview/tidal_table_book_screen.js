import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import Select from '@mui/material/Select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, FormControl, Grid, InputLabel, MenuItem, TextField, Typography } from '@mui/material';
import axios from 'axios';

const usesStyle = makeStyles((theme)=>({
    holder: {
        backgroundColor: "#F6F9FB",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
    },
    formHolder: {
        margin: "20px",
        backgroundColor: "#FAFDFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
    },
    tidalDataTypeHolder: {
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    activeTidalDataType : {
        backgroundColor: "#015D8D",
        color: "white",
        fontWeight: "bold",
        padding: "10px 20px",
        borderRadius: "7px",
        cursor: "pointer",
        textAlign: "center",
        margin: "0px 10px",
    },
    inactiveTidalDataType : {
        backgroundColor: "#0092DF10",
        color: "#5E5E5E",
        padding: "10px 20px",
        borderRadius: "7px",
        cursor: "pointer",
        textAlign: "center",
        margin: "0px 10px",
    },
    surveyFormHolder: {
        backgroundColor: "white",
        borderRadius: "10px",
        border: "1px solid #F2EEEE",
        margin: "10px",
        padding: "20px",
        [theme.breakpoints.down("md")]: {
            width: "90%",
        },        
        [theme.breakpoints.up("md")]: {
            width: "90%",
        },
    },
    spacer: {
        width: "15px",
        height: "15px",
    },
    labelText: {
        color: "#1e1e1e", 
        fontSize: "16", 
        fontWeight: "400"
    },
    inputField: {
        display: "flex",
        width:"100%",
        padding: "10px 5px",
        border: "1px solid #cdcdcd",
        borderRadius: "5px",
        backgroundColor: "transparent"
    },
    selectTag: {
        display: "flex",
        backgroundColor: "transparent",
        zIndex: 100,
    },
    submitButton: {
        display:"flex", 
        justifyContent: "center", 
        border: "1px solid #0077B6", 
        borderRadius: "25px", 
        padding: "10px 20px", 
        color: "#0077B6", 
        fontWeight: "bold", 
        cursor: "pointer"
    }
}));


const TidalTableBookScreen = () => {

    const classes = usesStyle();

    const [year, setYear] = useState('');
    const [qty, setQty] = useState('');

    const [tidalTableBookYear, setTidalTableBookYear] = useState("");

    const addToRequest = () => {
        if(year === ""){
            alert("Please select the date to continue");
            return;
        } if(qty === ""){
            alert("Please provide a quantity to continue");
            return;
        } 


        const fd = new FormData();
        fd.append('email', window.localStorage.getItem("currentEmail"));
        fd.append('year', tidalTableBookYear);
        fd.append('quantity', qty);

        axios.post('http://biwta-db.000webhostapp.com/user/request_tidal_table_book.php', fd)
        .then(res=> {
            console.log("Data:" + res.data);

            setQty("");
            setYear("");

            setTidalTableBookYear("");
                
            if(res.data === "success"){
                alert("Request added successfully. Please check your request tab to confirm.");
            } else {
                alert("Not able to sign up. PLease try again latter.");
            }

        })
        .catch(error => {
            console.log("Error:" + error.response);
            alert("Error:" + error.response);
        });

    }


    return (
        <div className={classes.holder}>
            <div className={classes.formHolder}>

                <div className={classes.surveyFormHolder}>
                    
                    <Typography className={classes.labelText}>Period of Table: </Typography>
                    <div className={classes.spacer} />

                    <Grid container spacing={2}>

                        <Grid item xs={3} sm={3}  style={{display: "flex", alignItems: "center"}}>
                            <Typography className={classes.labelText}>Year</Typography>
                        </Grid>

                        <Grid item xs={8} sm={8}>
                            <DatePicker 
                                placeholderText="Year"
                                className={classes.inputField}
                                selected={year}
                                onChange={(date)=> {
                                    setYear(date);
                                    var tempDate = date.getDate().toString() + "/" + date.getMonth().toString() + "/" + date.getFullYear().toString();
                                    setTidalTableBookYear(tempDate);
                                }}
                            />
                        </Grid>

                    </Grid>
                    <div className={classes.spacer} />

                    <Grid container spacing={2} >

                        <Grid item xs={3} sm={3} style={{display: "flex", alignItems: "center"}}>
                            <Typography className={classes.labelText}>Quantity</Typography>
                        </Grid>

                        <Grid item xs={8} sm={8}>
                            <input
                                type="text"
                                label="Quantity"
                                name="qty"
                                value={qty}
                                placeholder="Quantity"
                                className={classes.inputField}
                                onChange={(e)=>setQty(e.target.value)}
                            />
                        </Grid>

                    </Grid>
                    <div className={classes.spacer} />


                </div>

            </div>

            <div className={classes.submitButton} onClick={addToRequest}>
                ADD TO MY REQUEST
            </div>

            <div className={classes.spacer} />
            <div className={classes.spacer} />


        </div>
    );
}

export default TidalTableBookScreen;