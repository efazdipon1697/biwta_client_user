import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";

const useStyle = makeStyles((theme)=>({
    holder: {
        padding: theme.spacing(2),
    }
}))


const columns = [
    {
        field: 'tidalDataType',
        headerName: 'DATA TYPE',
        flex: 1
    },
    {
        field: 'district',
        headerName: 'DISTRICT',
    },
    {
        field: 'river',
        headerName: 'RIVER',
    },
    {
        field: 'station',
        headerName: 'STATION',
    },
    {
        field: 'from',
        headerName: 'FROM',
    },
    {
        field: 'to',
        headerName: "TO",
    },
    {
        field: 'purpose',
        headerName: "PURPOSE",
    }
];

const TidalDataPurchaseScreen = () => {
    const classes = useStyle();
    
    const [rows, setRows] = useState([]);

    useEffect(() => {
        getMyTidalDataRequest();
    })

    
    function getMyTidalDataRequest() {

        var currentEmail = window.localStorage.getItem("currentEmail");

        var url = "https://biwta-db.000webhostapp.com/user/purchase_history/tidal_data.php?email=" + currentEmail;

        axios.get(url)
            .then((response) => {
                console.log(response);
                var tempRows = new Array();
                response.data.map((data, index) => (
                    tempRows.push({ id: index, tidalDataType: data.tidalDataType, district: data.district, river: data.river, station: data.station, from: data.fromDate, to: data.toDate, purpose: data.purpose})
                ));
                setRows(tempRows);

            });

        }


    function displayData () {

        if (rows.length === 0)
            return <div style={{ width: "100%", display: "flex", justifyContent: "center", padding:"20px" }}>
                <h3>No Request in the server</h3>
            </div>;
        
        return (
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                initialState={{
                    pagination: { paginationModel: { pageSize: 5 } },
                  }}
                pageSizeOptions={[5, 10, 25]}
                autoHeight
            />
        );

    };

    return <div style={{ overflow: "auto" }} className={classes.holder}>
        {displayData()}
    </div>;

}

export default TidalDataPurchaseScreen; 
