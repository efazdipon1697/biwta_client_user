import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from "react-redux";
import {changeResourceTab} from '../../../redux/actions';
import HydrographicSurveyChartScreen from './resources_pageview/hydrographic_survey_chart_screen';
import RiverMilageScreen from './resources_pageview/river_milage_screen';
import TidalDataScreen from './resources_pageview/tidal_data_screen';
import TidalTableBookScreen from './resources_pageview/tidal_table_book_screen';
import MapScreen from './resources_pageview/map_screen';

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



const Resources = () => {

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
                myTab === "Hydrographic Survey Chart" ? <HydrographicSurveyChartScreen /> 
                    : myTab === "Tidal Data" ? <TidalDataScreen />
                        : myTab === "Tide Table Book" ? <TidalTableBookScreen />
                            : myTab === "River Milage" ? <RiverMilageScreen />
                                : myTab === "Map" ? <MapScreen />
                                    : <HydrographicSurveyChartScreen />

            }

        </div>
    );
}

export default Resources;


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