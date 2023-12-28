import { FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
// import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
        backgroundColor: "#FAFDFF"
    },
    purposeFormHolder: {
        margin: "20px",
        backgroundColor: "white",
        borderRadius: "10px",
        border: "1px solid #F2EEEE",
        margin: "20px",
        padding: "20px"
    },
    surveyFormHolder: {
        backgroundColor: "white",
        borderRadius: "10px",
        border: "1px solid #F2EEEE",
        margin: "20px",
        padding: "20px",
        [theme.breakpoints.down("md")]: {
            width: "90%",
        },        
        [theme.breakpoints.up("md")]: {
            width: "70%",
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

const RiverMilageScreen = () => {

    const classes = usesStyle();

    const [area, setArea] = useState('');
    const [fromLat, setFromLat] = useState('');
    const [toLat, setToLat] = useState('');
    const [fromLong, setFromLong] = useState('');
    const [toLong, setToLong] = useState('');
    const [purpose, setPurpose] = useState('');
    const [riverMilageYear, setRiverMilageYear] = useState('');
    const [qty, setQty] = useState('');

    const [year, setYear] = useState('');

    function addToRequest (){
        if(area === ""){
            alert("Please provide the area for which information is needed to continue");
            return;
        } if(fromLat === "" || fromLong === "" || toLat === "" || toLong === ""){
            alert("Please provide all the information regarding the location for which data is needed to continue");
            return;
        } if(purpose === ""){
            alert("Please provide the purpose to continue");
            return;
        }  if(year === ""){
            alert("Please provide the date for river milage to continue");
            return;
        }  if(qty === ""){
            alert("Please provide the quantity for river milage to continue");
            return;
        } 


        const fd = new FormData();
        fd.append('email', window.localStorage.getItem("currentEmail"));
        fd.append('area', area);
        fd.append('fromLat', fromLat);
        fd.append('fromLong', fromLong);
        fd.append('toLat', toLat);
        fd.append('toLong', toLong);
        fd.append('purpose', purpose);
        fd.append('riverMilageYear', riverMilageYear);
        fd.append('riverMilageQty', qty);

        axios.post('https://biwta-db.000webhostapp.com/user/request_river_milage.php', fd)
        .then(res=> {
            console.log("Data:" + res.data);

            setArea("");
            setFromLat("");
            setToLat("");
            setFromLong("");
            setToLong("");
            setYear("");
            setQty("");
            setPurpose("");

            setRiverMilageYear("");
                
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
                
                    <Typography className={classes.labelText}>Survey Location</Typography>
                    <div className={classes.spacer} />

                    <div style={{border: "1px solid black", borderColor: "#D9D9D9", borderRadius: "5px", padding: "10px 20px"}}>

                        <Grid container spacing={2}>

                            <Grid item xs={2} sm={3} style={{display: "flex", alignItems: "center"}}>
                                <Typography className={classes.labelText}>Area</Typography>
                            </Grid>

                            <Grid item xs={10} sm={9}>
                                <input
                                    type="text"
                                    label="Area"
                                    name="area"
                                    value={area}
                                    placeholder="Area to Area"
                                    className={classes.inputField}
                                    onChange={(e)=>setArea(e.target.value)}
                                />
                            </Grid>

                        </Grid>

                    </div>

                    <div className={classes.spacer} />
                    <Typography className={classes.labelText}>Station Position (Optional)</Typography>
                    <div className={classes.spacer} />

                    <Grid container spacing={2} style={{padding: "0px 20px"}}>

                        <Grid item xs={6} sm={6}>
                            <Typography className={classes.labelText}>From</Typography>
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <Typography className={classes.labelText}>To</Typography>
                        </Grid>


                        <Grid item xs={6} sm={6}>
                            <input
                                type="text"
                                label="Latitude"
                                name="fromLat"
                                value={fromLat}
                                placeholder="Latitude"
                                className={classes.inputField}
                                onChange={(e)=>setFromLat(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={6} sm={6}>
                            <input
                                type="text"
                                label="Latitude"
                                name="toLat"
                                value={toLat}
                                placeholder="Latitude"
                                className={classes.inputField}
                                onChange={(e)=>setToLat(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={6} sm={6}>
                            <input
                                type="text"
                                label="Longitude"
                                name="fromLat"
                                value={fromLong}
                                placeholder="Longitude"
                                className={classes.inputField}
                                onChange={(e)=>setFromLong(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={6} sm={6}>
                            <input
                                type="text"
                                label="Longitude"
                                name="toLong"
                                value={toLong}
                                placeholder="Longitude"
                                className={classes.inputField}
                                onChange={(e)=>setToLong(e.target.value)}
                            />
                        </Grid>

                    </Grid>


                </div>


                <div className={classes.surveyFormHolder}>
                    
                    <Typography className={classes.labelText}>River Milage </Typography>
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
                                    setRiverMilageYear(tempDate);

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


                </div>




                <div className={classes.surveyFormHolder}>
                    <Typography className={classes.labelText}>Description of Purpose</Typography>
                    <div className={classes.spacer} />
                    <TextField
                        id="outlined-textarea"
                        placeholder="My purpose is..."
                        multiline
                        name="purpose"
                        value={purpose}
                        className={classes.inputField}
                        onChange={(e)=>setPurpose(e.target.value)}
                    />
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

export default RiverMilageScreen;