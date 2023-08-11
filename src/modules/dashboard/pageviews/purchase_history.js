import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import {changeResourceTab} from '../../../redux/actions';
import HydrographicSurveyChartPurchaseScreen from "./purchase_history_pageview/hydrographic_survey_chart_purchase_screen";
import MapPurchaseScreen from "./purchase_history_pageview/map_purchase_screen";
import RiverMilagePurchaseScreen from "./purchase_history_pageview/river_milage_purchase_screen";
import TidalDataPurchaseScreen from "./purchase_history_pageview/tidal_data_purchase_screen";
import TidalTableBookPurchaseScreen from "./purchase_history_pageview/tidal_table_book_purchase_screen";

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


const PurchaseHistory = () => {

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
                myTab === "Hydrographic Survey Chart" ? <HydrographicSurveyChartPurchaseScreen /> 
                    : myTab === "Tidal Data" ? <TidalDataPurchaseScreen />
                        : myTab === "Tide Table Book" ? <TidalTableBookPurchaseScreen />
                            : myTab === "River Milage" ? <RiverMilagePurchaseScreen />
                                : myTab === "Map" ? <MapPurchaseScreen />
                                    : <HydrographicSurveyChartPurchaseScreen />

            }

        </div>
    );
}

export default PurchaseHistory;


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