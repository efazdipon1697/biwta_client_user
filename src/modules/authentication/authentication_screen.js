import { Button, Grid, TextField, Typography, Modal, FormControl, MenuItem } from '@mui/material';
import { makeStyles } from '@mui/styles';
import "./authentication_screen.css";
import logo from "../../assets/logo1.png";
import { useState } from 'react';
import axios from 'axios';
import biwta_guideline from "../../assets/biwta_guideline.pdf";


const usesStyle = makeStyles((theme)=>({
    authenticationFormHolder: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        // border: "2px solid black",
        boxShadow: "2px 2px 2px 2px black",
        borderRadius: "25px",
        height: "90%",
        width: "90%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    infoHolder: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
        height: "90%"
    },
    inputField: {
        display: "flex",
        width:"100%",
        padding: "10px 5px",
        border: "1px solid #cdcdcd",
        borderRadius: "5px",
        backgroundColor: "transparent"
    },
    spacer: {
        height: "10px",
        width: "10px",
    },

    formContainer: {
        margin: "25px",
        padding: "20px",
        borderRadius: "15px",
        border: "1px solid grey",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        overflow: "scroll",
    },

    form: {
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center",
        width: "100%"
    },

    input: {
        display: "flex",
        width: "100%",
    },

    selectTag: {
        display: "flex",
        width: "100%",
        backgroundColor: "transparent",
        zIndex: 100,
    },

    signUpForm: {
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },

    loginContainer: {
        width: "600px",
        height: "600px",
        padding: theme.spacing(2),
        backgroundColor: "white",
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        overflow: "auto",
        margin: "auto",
        [theme.breakpoints.down("sm")]: {
            width: "100vw",
            height: "100vh",
        },
    },

    submitButton: {
        backgroundColor: "#2D3653",
        color: "white",
        fontSize: "18px",
        padding: "10px",
        border: "0px",
        borderRadius: "5px",
        cursor: "pointer",
    },
}));

const AuthenticationScreen = () => {

    const classes = usesStyle();

    const [signUpOpen, setSignUpOpen] = useState(false);


    return (

        <>

            <div className="background">
                    
                <div className={classes.authenticationFormHolder}>

                    <Grid container spacing={2} style={{display: "flex", alignItems: "center"}}>
                        <Grid item xs={0} sm={5}  lg={5} xl={6}  className={classes.signUpForm}>
                            <InformationScreen />
                        </Grid>
                        <Grid item xs={12} sm={7}  lg={7} xl={6} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>        
                            

                            <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "80%"}}>

                                { signUpOpen ? <SignUpFormHolder /> : <LoginFormHolder /> }

                                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>

                                    <Typography>
                                        { signUpOpen ? "Already have an account?" : "Don't have an account?" }
                                    </Typography>

                                    <div className={classes.spacer} />

                                    <Button variant={signUpOpen ? "contained" : "outlined"} onClick={ ()=> { signUpOpen ? setSignUpOpen(false) : setSignUpOpen(true) }} size="small">
                                        { signUpOpen ? "Login" : "Sign Up" }
                                    </Button>

                                </div>

                            </div>


                        </Grid>
                    </Grid>

                </div>

            </div>

        </>


);
}

export default AuthenticationScreen;


const InformationScreen = () => {

    const classes = usesStyle();

    return (
        <>
            <div className={classes.infoHolder}>
                <img src={logo} style={{width: "100px",}}/>
                <div className={classes.spacer} />
                <div className={classes.spacer} />
                <div className={classes.spacer} />
                <strong style={{fontSize: "20px", textAlign: "center"}}>WELCOME to BIWTA Hydrographic Resources</strong>
                <div className={classes.spacer} />
                <div className={classes.spacer} />
                <div className={classes.spacer} />
                <Typography style={{color: "black", fontSize: "16", fontWeight: "400", marginBottom: "10px", textAlign: "center"}}>
                    Please read BIWTA guidelines  from here
                </Typography>
                <a href={biwta_guideline} target="_blank"  style={{textDecoration: "none", color: "#2D3653", fontWeight: "700"}}>
                    BIWTA Guidelines.pdf
                </a>
                <div className={classes.spacer} />
                <div className={classes.spacer} />
                <div className={classes.spacer} />
                <Typography style={{color: "black", fontSize: "24", fontWeight: "400", marginBottom: "10px", textAlign: "center"}}>
                    Registration fee 200 TK
                </Typography>
                <div className={classes.spacer} />
                <Typography style={{color: "black", fontSize: "16", fontWeight: "400", marginBottom: "10px", textAlign: "center"}}>
                    For any help, please contact us:
                </Typography>
                <div className={classes.spacer} />
                <Typography style={{color: "black", fontSize: "16", fontWeight: "400", textAlign: "center"}}>
                    Email: biwta@email.com
                </Typography>
                <Typography style={{color: "black", fontSize: "16", fontWeight: "400", textAlign: "center"}}>
                    Telephone: 01000000000
                </Typography>
            </div>
        </>
    );
}


const SignUpFormHolder = () => {

    const classes = usesStyle();

    const [confirmPassword, setConfirmPassword] = useState('');

    const [newUser, setNewUser] = useState(
        {
            email: '',
            name: '',
            deliveryAdds: '',
            idNumber: '',
            idType: '',
            profession: '',
            contactNumber: '',
            pass: '',
            photo: '',
        }
    );

    const handleChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    }

    const handlePhoto = (e) => {
        setNewUser({ ...newUser, photo: e.target.files[0] });
    }
    

    function registerUser(event) {

        event.preventDefault();

        if (newUser.email === "") {
            alert("Please type your email to continue");
            return;
        }
        if (newUser.idNumber === "") {
            alert("Please type your ID number to continue");
            return;
        }
        if (newUser.profession === "") {
            alert("Please type your profession to continue");
            return;
        }
        if (newUser.contactNumber === "") {
            alert("Please type your contact number to continue");
            return;
        }
        if (newUser.idType === "") {
            alert("Password select type of id card to continue");
            return;
        }
        if (newUser.password === "") {
            alert("Password can not be empty");
            return;
        }
        if (newUser.pass != confirmPassword) {
            alert("Both passwords must match");
            return;
        }
        if (newUser.photo === "") {
            alert("Please add a soft copy of your ID card to continue");
            return;
        }


        const fd = new FormData();
        fd.append('photo', newUser.photo);
        fd.append('email', newUser.email);
        fd.append('name', newUser.name);
        fd.append('deliveryAdds', newUser.deliveryAdds);
        fd.append('idNumber', newUser.idNumber);
        fd.append('profession', newUser.profession);
        fd.append('contactNumber', newUser.contactNumber);
        fd.append('pass', newUser.pass); 
        fd.append('idType', newUser.idType);
        
        axios.post('https://biwta-db.000webhostapp.com/user/registration.php', fd)
        .then(res=> {
            console.log("Data:" + res.data);

            setNewUser({
                email: '',
                name: '',
                deliveryAdds: '',
                idNumber: '',
                idType: '',
                profession: '',
                contactNumber: '',
                pass: '',
                photo: '',
            }); 

            setConfirmPassword("");
        
            if(res.data === "success"){
                alert("User added successfully. Please follow the link sent to your email for verification. If you do not find the any mail related verification in inbox, please check SPAM folder as well.");
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
        
            <div className={classes.formContainer}>

                <Typography style={{color: "#2D3653", fontSize: "32px", fontWeight: "400", textAlign: "center"}}>
                    Sign up for a new account?
                </Typography>

                <form className={classes.form}  onSubmit={registerUser} encType='multipart/form-data'>

                    <input
                        type="text"
                        label="Your Email"
                        name="email"
                        value={newUser.email}
                        placeholder="Your Email"
                        className={classes.inputField}
                        onChange={handleChange}
                    />
                    <div className={classes.spacer} />
                    
                    <div style={{display:"flex", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
                        
                        <FormControl fullWidth style={{marginRight: "16px"}}>
                            <TextField
                                select
                                id="demo-simple-select"
                                value={newUser.idType}
                                label="ID Type"
                                size="small"
                                onChange={(e)=>{setNewUser({ ...newUser, idType: e.target.value })}}
                            >
                                <MenuItem value="National ID">National ID</MenuItem>
                                <MenuItem value="Passport">Passport</MenuItem>
                                <MenuItem value="Student ID">Student ID</MenuItem>
                                <MenuItem value="Institution ID">Institution ID</MenuItem>
                            </TextField>
                        </FormControl>
                        
                        <input 
                            type="file"
                            accept=".png, .jpg, .jpeg, .pdf"
                            name="photo"
                            onChange={handlePhoto}
                        />
                    </div>
                    <div className={classes.spacer} />

                    <input
                        type="text"
                        label="ID Number"
                        name="idNumber"
                        value={newUser.idNumber}
                        placeholder="ID Number"
                        className={classes.inputField}
                        onChange={handleChange}
                    />
                    <div className={classes.spacer} />

                    <input
                        type="text"
                        label="Profession"
                        name="profession"
                        value={newUser.profession}
                        placeholder="Profession"
                        className={classes.inputField}
                        onChange={handleChange}
                    />
                    <div className={classes.spacer} />

                    <input
                        type="text"
                        label="Contact Number"
                        name="contactNumber"
                        value={newUser.contactNumber}
                        placeholder="Contact Number"
                        className={classes.inputField}
                        onChange={handleChange}
                    />
                    <div className={classes.spacer} />

                    <input
                        type="password"
                        label="Password"
                        name="pass"
                        value={newUser.pass} 
                        placeholder="Password"
                        className={classes.inputField}
                        onChange={handleChange}
                    />
                    <div className={classes.spacer} />

                    <input
                        type="password"
                        label="Confirm Password"
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        className={classes.inputField}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                    />


                    <div className={classes.spacer} />

                    
                    <div className={classes.spacer} />
                    <div className={classes.spacer} />

                    <input
                        type="submit"
                        value="Register"
                        className={classes.submitButton}
                    />

                </form>

            </div>

    );
}


const LoginFormHolder = () => {

    const classes = usesStyle();

    const [newUser, setNewUser] = useState(
        {
            email: '',
            pass: '',
        }
    );

    const handleChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    }

    function loginUser(event) {

        event.preventDefault();

        if (newUser.email === "") {
            alert("Please type your email to continue");
            return;
        }
        if (newUser.pass === "") {
            alert("Password can not be empty");
            return;
        }

        const fd = new FormData();
        fd.append('email', newUser.email);
        fd.append('pass', newUser.pass); 
        
        axios.post('https://biwta-db.000webhostapp.com/user/login.php', fd)
        .then(res=> {
            console.log("Data:" + res.data);

            setNewUser({
                email: '',
                pass: '',
            }); 
        
            if(res.data === "success"){
                alert("Login successfully.");
                window.localStorage.setItem("currentEmail", newUser.email);
                window.localStorage.setItem("isLoggedIn", true);
                window.location.href= "/";
            } else if (res.data === "unverified"){
                alert("This email is not verified yet. Please go to the link sent to your email for verification. If you do not find the any mail related verification in inbox, please check SPAM folder as well.");
            } else {
                alert("Error logging in. Please try again");
            }

        })
        .catch(error => {
            console.log("Error:" + error.response);
            alert("Error:" + error.response);
        });

    }

    return (
            <div className={classes.formContainer}>

                <Typography style={{color: "#2D3653", fontSize: "32px", fontWeight: "400"}}>
                    LOGIN
                </Typography>

                <form className={classes.form}>

                    <input
                        type="text"
                        label="Your Email"
                        name="email"
                        value={newUser.email}
                        placeholder="Your Email"
                        className={classes.inputField}
                        onChange={handleChange}
                    />
                    <div className={classes.spacer} />


                    <input
                        type="password"
                        label="Password"
                        name="pass"
                        value={newUser.pass} 
                        placeholder="Password"
                        className={classes.inputField}
                        onChange={handleChange}
                    />
                    <div className={classes.spacer} />
                    <div className={classes.spacer} />
                    <div className={classes.spacer} />

                    <Button variant="contained" style={{ backgroundColor: "#2D3653", color: "white" }} onClick={loginUser}>
                        Login
                    </Button>
                
                </form>

            </div>

    );
}
