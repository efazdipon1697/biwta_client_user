import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import {changeResourceTab} from '../../../redux/actions';
import HydrographicSurveyChartReply from "./biwta_reply_pageviews/hydrographic_survey_chart_reply";
import MapReply from "./biwta_reply_pageviews/map_reply";
import RiverMilageReply from "./biwta_reply_pageviews/river_milage_reply";
import TidalDataReply from "./biwta_reply_pageviews/tidal_data_reply";
import TidalTableBookReply from "./biwta_reply_pageviews/tidal_table_book_reply";

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


const BiwtaReply = () => {

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
                myTab === "Hydrographic Survey Chart" ? <HydrographicSurveyChartReply /> 
                    : myTab === "Tidal Data" ? <TidalDataReply />
                        : myTab === "Tide Table Book" ? <TidalTableBookReply />
                            : myTab === "River Milage" ? <RiverMilageReply />
                                : myTab === "Map" ? <MapReply />
                                    : <HydrographicSurveyChartReply />

            }

        </div>
    );
}

export default BiwtaReply;


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