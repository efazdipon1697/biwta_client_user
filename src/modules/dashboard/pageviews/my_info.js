import { Grid, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Component, useState } from 'react';
import { Container } from '@mui/system';

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


class MyInfo extends Component {

    state = {
        user: null,
    };


    componentDidMount = () => {
        this.getCurrentUser();
    }

    getCurrentUser() {

        var currentEmail = window.localStorage.getItem("currentEmail");

        var url = "http://biwta-db.000webhostapp.com/user/getUserByEmail.php?email=" + currentEmail;

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((data) => {
                console.log(data);
                data.map((userData) => (
                    this.setState({user : userData})
                ));
            });
    }


    displayMyInfo = () => {

        if (this.state.user == null)
            return <div style={{ width: "100%", display: "flex", justifyContent: "center", padding:"20px" }}>
                <h3>Please Wait</h3>
            </div>;
        
        return (
            <MyInfoHolder
                user = {this.state.user} 
            />
        );

    }

    render () {
        return <div style={{ overflow: "auto" }}>
            {this.displayMyInfo()}
        </div>;
    };



}

const MyInfoHolder = (props) => {

    const classes = usesStyle();


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [org, setOrg] = useState('');
    const [deliveryAdds, setDeliveryAdds] = useState('');

    const submitButton = () => {

    }


    return (
        <div className={classes.holder}>

                <Container style={{backgroundColor: "white", fontSize:"32px", color: "#1e1e1e", width: "100%", padding: "10px" }}>
                    ACCOUNT INFORMATION
                </Container>

                <div className={classes.surveyFormHolder}>

                    <Grid container spacing={2}>

                        <Grid item xs={6} sm={6}>
                            <Container style={{width: "100%"}}>
                                <input
                                    type="text"
                                    label="name"
                                    name="name"
                                    value={name}
                                    placeholder="Name"
                                    className={classes.inputField}
                                    onChange={(e)=>setName(e.target.value)}
                                />
                            </Container>
                        </Grid>

                        <Grid item xs={6} sm={6}>
                            <Container style={{width: "100%"}}>
                                <input
                                    type="text"
                                    label="email"
                                    name="email"
                                    value={email}
                                    placeholder="Email"
                                    className={classes.inputField}
                                    onChange={(e)=>setEmail(e.target.value)}
                                />
                            </Container>
                        </Grid>


                        <Grid item xs={6} sm={6}>
                            <Container style={{width: "100%"}}>
                                <input
                                    type="text"
                                    label="phone"
                                    name="phone"
                                    value={phone}
                                    placeholder="Phone"
                                    className={classes.inputField}
                                    onChange={(e)=>setPhone(e.target.value)}
                                />
                            </Container>
                        </Grid>

                        
                        <Grid item xs={6} sm={6}>
                            <Container style={{width : "100%"}}>
                                <input
                                    type="text"
                                    label="org"
                                    name="org"
                                    value={org}
                                    placeholder="Organization/ Profession"
                                    className={classes.inputField}
                                    onChange={(e)=>setOrg(e.target.value)}
                                />
                            </Container>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Container style={{width: "100%"}}>
                                <TextField
                                    id="outlined-textarea"
                                    placeholder="Delivery Address"
                                    multiline
                                    name="deliveryAdds"
                                    value={deliveryAdds}
                                    className={classes.inputField}
                                    onChange={(e)=>setDeliveryAdds(e.target.value)}
                                />
                            </Container>

                        </Grid>



                    </Grid>

                    <div className={classes.spacer} />


                </div>

                <div className={classes.submitButton} onClick={submitButton}>
                    OK
                </div>

                <div className={classes.spacer} />
                <div className={classes.spacer} />



        </div>
    );
}

export default MyInfo;