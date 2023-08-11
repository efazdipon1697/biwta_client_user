import { Button, Grid } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { Link } from "react-router-dom";
import Sidebar from "./components/sidebar";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useSelector } from "react-redux";
import Resources from "./pageviews/resources";
import MyInfo from "./pageviews/my_info";
import PurchaseHistory from "./pageviews/purchase_history";
import BiwtaReply from "./pageviews/biwta_reply";
import DataTariff from "./pageviews/data_tariff";
import MyRequest from "./pageviews/my_request";


const usesStyle = makeStyles((theme)=>({
    sidebarContainer: {
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
    toolbar: {
        backgroundColor: "#F1FDFF",
    }
}));


const DashboardScreen = () => {

    const classes = usesStyle();

    const myTab = useSelector((state) => state.changeAppTab);


    return (
        <Grid container>


            <Grid item  xs={0} sm={3}  lg={3} xl={2.5}  className={classes.sidebarContainer}>
                <Sidebar />
            </Grid>
            
            <Grid item  xs={12} sm={9}  lg={9} xl={9.5}>
                
                <div>

                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" elevation={0}>
                        <Toolbar className={classes.toolbar}>
                            <Typography style={{color: "#1e1e1e", fontSize: "16px", fontWeight: "500"}}>
                                Welcome  to BIWTA Hydrographic resources.
                            </Typography>

                        </Toolbar>
                    </AppBar>
                </Box>

                {
                    myTab == "RESOURCES" ? <Resources />
                        : myTab == "MY INFO" ? <MyInfo />
                            : myTab == "PURCHASE HISTORY" ? <PurchaseHistory />
                                : myTab == "BIWTA REPLY" ? <BiwtaReply />
                                    : myTab == "DATA TARIFF" ? <DataTariff />
                                        : myTab == "MY REQUEST" ? <MyRequest />
                                            : <Resources />
                    }

                </div>

            </Grid>
            
        </Grid>
    );
}

export default DashboardScreen;