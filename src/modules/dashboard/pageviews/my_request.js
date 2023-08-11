import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import {changeResourceTab} from '../../../redux/actions';
import HydrographicSurveyChartRequest from "./my_request_pageview/hydrographic_survey_chart_request";
import MapRequest from "./my_request_pageview/map_request";
import RiverMilageRequest from "./my_request_pageview/river_milage_request";
import TidalDataRequest from "./my_request_pageview/tidal_data_request";
import TidalTableBookRequest from "./my_request_pageview/tidal_table_book_request";

const usesStyle = makeStyles((theme)=>({
    tabHolder: {
        display: "flex",
        justifyContent: "space-evenly"
    },
    activeTopbarMenu: {
        padding: "10px",
        margin: "5px 10px",
        borderRadius: "10px",
        backgroundColor: "#2D3653",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        cursor: "pointer",
        textAlign: "center",
        textTransform: "uppercase"
    },
    inactiveTopbarMenu: {
        padding: "10px",
        margin: "5px 10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#5E5E5E",
        cursor: "pointer",
        textAlign: "center",
        textTransform: "uppercase"
    }
}));



const MyRequest = () => {

    const classes = usesStyle();
    const myTab = useSelector((state) => state.changeResourceTab);

    return (
        <div>
            
            <div className={classes.tabHolder}>

                <TopbarMenu
                    title= "Hydrographic Survey Chart" 
                />

                <TopbarMenu
                    title= "Tidal Data" 
                />

                <TopbarMenu
                    title= "Tide Table Book" 
                />

                <TopbarMenu
                    title= "River Milage" 
                />

                <TopbarMenu
                    title= "Map" 
                />

            </div>

            {
                myTab === "Hydrographic Survey Chart" ? <HydrographicSurveyChartRequest /> 
                    : myTab === "Tidal Data" ? <TidalDataRequest />
                        : myTab === "Tide Table Book" ? <TidalTableBookRequest />
                            : myTab === "River Milage" ? <RiverMilageRequest />
                                : myTab === "Map" ? <MapRequest />
                                    : <HydrographicSurveyChartRequest />

            }

        </div>
    );
}

export default MyRequest;


const TopbarMenu = (props) => {

    const classes = usesStyle();
    const myTab = useSelector((state) => state.changeResourceTab);

    const dispatch = useDispatch();

    return (
        <div 
            className={myTab === props.title ? classes.activeTopbarMenu : classes.inactiveTopbarMenu}
            onClick={()=>{
                dispatch(changeResourceTab(props.title));
                console.log(props.title);
            }}
        >
            {props.title}
        </div>
    );
}