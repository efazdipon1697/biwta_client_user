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



const TidalDataScreen = () => {

    const classes = usesStyle();

    const [tidalDataType, setTidalDataType] = useState('');

    var districtList = [
        "Dhaka",
        "Faridpur",
        "Gazipur",
        "Gopalganj",
        "Jamalpur",
        "Kishoreganj",
        "Madaripur",
        "Manikganj",
        "Munshiganj",
        "Mymensingh",
        "Narayanganj",
        "Narsingdi",
        "Netrokona",
        "Rajbari",
        "Shariatpur",
        "Sherpur",
        "Tangail",                      
        "Bogra",                         
        "Joypurhat",
        "Naogaon",
        "Natore",
        "Nawabganj",
        "Pabna",                       
        "Rajshahi",
        "Sirajgonj", 
        "Dinajpur",
        "Gaibandha",
        "Kurigram",
        "Lalmonirhat",
        "Nilphamari",
        "Panchagarh",
        "Rangpur",
        "Thakurgaon",
        "Barguna",
        "Barisal",
        "Bhola",
        "Jhalokati",
        "Patuakhali",
        "Pirojpur",
        "Bandarban",
        "Brahmanbaria",
        "Chandpur",
        "Chittagong",
        "Comilla",
        "Cox's Bazar",
        "Feni",
        "Khagrachari",
        "Lakshmipur",
        "Noakhali",
        "Rangamati",
        "Habiganj",
        "Maulvibazar",
        "Sunamganj",
        "Sylhet",
        "Bagerhat",
        "Chuadanga",
        "Jessore",
        "Jhenaidah",
        "Khulna",
        "Kushtia",
        "Magura",
        "Meherpur",
        "Narail",
        "Satkhira"
    ];


    const [district, setDistrict] = useState('');
    const [river, setRiver] = useState('');
    const [station, setStation] = useState('');
    const [purpose, setPurpose] = useState('');
    const [tidalDataFromYear, setTidalDataFromYear] = useState('');
    const [tidalDataToYear, setTidalDataToYear] = useState('');

    const [fromYear, setFromYear] = useState('');
    const [toYear, setToYear] = useState('');


    function addToRequest() {
        if(tidalDataType === ""){
            alert("Please select the tidal data type to continue");
            return;
        } if(district === ""){
            alert("Please select the district to continue");
            return;
        } if(river === ""){
            alert("Please select the river to continue");
            return;
        } if(station === ""){
            alert("Please select the station to continue");
            return;
        } if(fromYear === ""){
            alert("Please select the start time to continue");
            return;    
        } if(toYear === ""){
            alert("Please select the end time to continue");
            return;    
        } if(purpose === ""){
            alert("Please provide the purpose to continue");
            return;
        } 


        const fd = new FormData();
        fd.append('email', window.localStorage.getItem("currentEmail"));
        fd.append('tidalDataType', tidalDataType);
        fd.append('district', district);
        fd.append('river', river);
        fd.append('station', station);
        fd.append('fromDate', tidalDataFromYear);
        fd.append('toDate', tidalDataToYear);
        fd.append('purpose', purpose);

        axios.post('https://biwta-db.000webhostapp.com/user/request_tidal_data.php', fd)
        .then(res=> {
            console.log("Data:" + res.data);

            setTidalDataType("");
            setDistrict("");
            setRiver("");
            setStation("");
            setFromYear("");
            setToYear("");
            setPurpose("");

            setTidalDataFromYear("");
            setTidalDataToYear("");
                
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

                <div className={classes.tidalDataTypeHolder}>

                    <div className={tidalDataType == "Monthly Extremes" ? classes.activeTidalDataType : classes.inactiveTidalDataType} onClick={()=>{setTidalDataType("Monthly Extremes")}}>
                        Monthly Extremes
                    </div>

                    <div className={tidalDataType == "Hourly Heights" ? classes.activeTidalDataType : classes.inactiveTidalDataType} onClick={()=>{setTidalDataType("Hourly Heights")}}>
                        Hourly Heights
                    </div>

                    <div className={tidalDataType == "Daily High-Low" ? classes.activeTidalDataType : classes.inactiveTidalDataType} onClick={()=>{setTidalDataType("Daily High-Low")}}>
                        Daily High-Low
                    </div>

                    <div className={tidalDataType == "Monthly Mean" ? classes.activeTidalDataType : classes.inactiveTidalDataType} onClick={()=>{setTidalDataType("Monthly Mean")}}>
                        Monthly Mean
                    </div>

                </div>

                <div className={classes.surveyFormHolder}>
                    <Typography className={classes.labelText}>Location</Typography>

                    <div className={classes.spacer} />
                    <Grid container spacing={2}>

                        <Grid item xs={2} sm={3} style={{display: "flex", alignItems: "center"}}>
                            <Typography className={classes.labelText}>District</Typography>
                        </Grid>

                        <Grid item xs={10} sm={9}>
                            <FormControl fullWidth  size="small">
                                <InputLabel id="demo-simple-select-label">District</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={district}
                                    label="District"
                                    onChange={(e)=> setDistrict(e.target.value)}
                                    size="small"
                                >
                                    {
                                        districtList.map((element)=>{
                                            return <MenuItem value={element}>{element}</MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>

                    </Grid>


                    <div className={classes.spacer} />
                    <Grid container spacing={2}>

                        <Grid item xs={2} sm={3} style={{display: "flex", alignItems: "center"}}>
                            <Typography className={classes.labelText}>River</Typography>
                        </Grid>

                        <Grid item xs={10} sm={9}>
                            <FormControl fullWidth  size="small">
                                <InputLabel id="demo-simple-select-label">River</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={river}
                                    label="River"
                                    onChange={(e)=> setRiver(e.target.value)}
                                    size="small"
                                >
                                    <MenuItem value={"River 1"}>River 1</MenuItem>
                                    <MenuItem value={"River 2"}>River 2</MenuItem>
                                    <MenuItem value={"River 3"}>River 3</MenuItem>
                                    <MenuItem value={"River 4"}>River 4</MenuItem>
                                    <MenuItem value={"River 5"}>River 5</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                    </Grid>


                    <div className={classes.spacer} />
                    <Grid container spacing={2}>

                        <Grid item xs={2} sm={3} style={{display: "flex", alignItems: "center"}}>
                            <Typography className={classes.labelText}>Station</Typography>
                        </Grid>

                        <Grid item xs={10} sm={9}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="demo-simple-select-label">Station</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={station}
                                    label="Station"
                                    onChange={(e)=> setStation(e.target.value)}
                                    size="small"
                                >
                                    <MenuItem value={"Station 1"}>Station 1</MenuItem>
                                    <MenuItem value={"Station 2"}>Station 2</MenuItem>
                                    <MenuItem value={"Station 3"}>Station 3</MenuItem>
                                    <MenuItem value={"Station 4"}>Station 4</MenuItem>
                                    <MenuItem value={"Station 5"}>Station 5</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                    </Grid>


                </div>

                <div className={classes.surveyFormHolder}>
                    
                    <Typography className={classes.labelText}>Period : </Typography>
                    <div className={classes.spacer} />

                    <Grid container spacing={2}>

                        <Grid item xs={6} sm={6}>
                            <Typography className={classes.labelText}>From</Typography>
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <Typography className={classes.labelText}>To</Typography>
                        </Grid>

                        <Grid item xs={6} sm={6}>
                            <DatePicker 
                                placeholderText="Year"
                                className={classes.inputField}
                                selected={fromYear}
                                onChange={(date)=> {
                                    setFromYear(date);
                                    var tempDate = date.getDate().toString() + "/" + date.getMonth().toString() + "/" + date.getFullYear().toString();
                                    setTidalDataFromYear(tempDate);
                                }}
                            />
                        </Grid>


                        <Grid item xs={6} sm={6}>
                            <DatePicker 
                                placeholderText="Year"
                                className={classes.inputField}
                                selected={toYear}
                                onChange={(date)=> {
                                    setToYear(date);
                                    var tempDate = date.getDate().toString() + "/" + date.getMonth().toString() + "/" + date.getFullYear().toString();
                                    setTidalDataToYear(tempDate);
                                }}
                            />
                        </Grid>

                    </Grid>


                </div>

                <div className={classes.surveyFormHolder}>
                    <Typography>Purpose of Chart</Typography>
                    <div className={classes.spacer} />
                    <TextField
                        id="outlined-textarea"
                        placeholder="Describe your purpose"
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

export default TidalDataScreen;