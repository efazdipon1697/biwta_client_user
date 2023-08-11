import { Delete } from "@mui/icons-material";
import { Button, Checkbox, Divider, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeAppTab } from "../../../../redux/actions";

const useStyle = makeStyles((theme)=>({
    holder: {
        padding: theme.spacing(2),
    },
    spacer: {
        width: "15px",
        height: "15px",
    },
    buttonHolder: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    calculationBox: {
        padding: theme.spacing(2),
        border: "1px solid red",
        borderRadius: "7px",
    },
}))


const columns = [
    {
        field: 'area',
        headerName: 'AREA',
        flex: 1
    },
    {
        field: 'latitude',
        headerName: 'LATITUDE',
        flex: 1,
        renderCell: (props) => LatitudeComponent(props),
    },
    {
        field: 'longitude',
        headerName: 'LONGITUDE',
        flex: 1,
        renderCell: (props) => LongitudeComponent(props),
    },
    {
        field: 'riverMilageYear',
        headerName: 'YEAR',
    },
    {
        field: 'qty',
        headerName: 'QUANTITY',
    },
    {
        field: 'purpose',
        headerName: "PURPOSE",
    },
    {
        field: 'status',
        headerName: "STATUS",
    },
    {
        field: 'action',
        headerName: "",
        renderCell: (props) => ActionComponent(props),
    }
];


const selectedColumns = [
    {
        field: 'area',
        headerName: 'AREA',
        flex: 1
    },
    {
        field: 'latitude',
        headerName: 'LATITUDE',
        flex: 1,
        renderCell: (props) => LatitudeComponent(props),
    },
    {
        field: 'longitude',
        headerName: 'LONGITUDE',
        flex: 1,
        renderCell: (props) => LongitudeComponent(props),
    },
    {
        field: 'riverMilageYear',
        headerName: 'YEAR',
    },
    {
        field: 'qty',
        headerName: 'QUANTITY',
    },
    {
        field: 'purpose',
        headerName: "PURPOSE",
    }
];


const RiverMilageReply = () => {
    
    const classes = useStyle();
    
    const [rows, setRows] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    const deliveryCharge = 100;
    const unitCharge = 100;
    
    const [totalCharge, setTotalCharge] = useState(0);

    const myTab = useSelector((state) => state.changeAppTab);
    const dispatch = useDispatch();


    useEffect(() => {
        getMyRiverMilageRequest();
    })

    const onRowsSelectionHandler = (ids) => {
        var tempRows = new Array();
        tempRows = ids.map((id) => rows.find((row) => row.id.toString() === id.toString()));
        setSelectedRows(tempRows);
        setTotalCharge(deliveryCharge + (unitCharge*tempRows.length));
    };

    
    function getMyRiverMilageRequest() {

        var currentEmail = window.localStorage.getItem("currentEmail");

        var url = "http://biwta-db.000webhostapp.com/user/biwta_reply/river_milage.php?email=" + currentEmail;

        axios.get(url)
            .then((response) => {
                console.log(response);
                var tempRows = new Array();
                response.data.map((data, index) => (
                    tempRows.push({ id: data.id, area: data.area, latitude: data, longitude: data, riverMilageYear: data.riverMilageYear, qty: data.riverMilageQty, purpose: data.purpose, status: data.status, action: data})
                ));
                setRows(tempRows);
            });
        }


    function displayData () {

        if (rows.length === 0)
            return <div style={{ width: "100%", display: "flex", justifyContent: "center", padding:"20px" }}>
                <h3>No reply in the server</h3>
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
                checkboxSelection  
                onRowSelectionModelChange={(ids) => {
                    onRowsSelectionHandler(ids);
                }}
            />
        );

    };


    function order() {

        var idList = new Array();
        selectedRows.map((data, index)=> (
            idList.push(data.id)
        ));

        // console.log(idList.toString());

        const fd = new FormData();
        fd.append('id', idList.toString());
        
        axios.post('http://biwta-db.000webhostapp.com/user/biwta_reply/purchase_river_milage.php', fd)
        .then(res=> {
            console.log("Data:" + res.data);
        
            if(res.data === "success"){
                alert("Order placed successfully");

                dispatch(changeAppTab("PURCHASE HISTORY"));

            } else {
                alert("Could not place order. PLease try again.");
            }

        })
        .catch(error => {
            console.log("Error:" + error.response);
            alert("Error:" + error.response);
        });


    }

    function displaySelectedData () {

        if (selectedRows.length === 0)
            return <div />;
        
        return (
            <div>

                <div className={classes.spacer} />
                <div className={classes.spacer} />
                <div style={{fontSize: "24px", fontWeight: "600"}}>Selected Items</div>
                <div className={classes.spacer} />
                
                <DataGrid
                    rows={selectedRows}
                    columns={selectedColumns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 5 } },
                    }}
                    pageSizeOptions={[5, 10, 25]}
                    autoHeight
                />

                <div className={classes.spacer} />
                <div className={classes.spacer} />

                <div className={classes.calculationBox}>
                    
                    <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
                        <div>Cost of demanded item: </div>
                        <div>{unitCharge * selectedRows.length}</div>
                    </div>
                    <div className={classes.spacer} />  
                    <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
                        <div>Delivery Charge: </div>
                        <div>{deliveryCharge}</div>
                    </div>
                    <div className={classes.spacer} />
                    <Divider />

                    <div className={classes.spacer} />
                    <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
                        <div>Total Cost: </div>
                        <div>{totalCharge}</div>
                    </div>
                </div>

                <div className={classes.spacer} />
                <div className={classes.spacer} />
                <div className={classes.buttonHolder}>
                    <Button variant="contained" onClick={order}>Order</Button>
                </div>
                
            </div>
        );

    };

    

    return <div style={{ overflow: "auto" }} className={classes.holder}>
        {displayData()}
        {displaySelectedData()}
    </div>;

}

export default RiverMilageReply;


const LatitudeComponent = (props) => {

    const classes = useStyle();

    return (
        <div className={classes.tabTitle}>{props.value['fromLat'] + " - " + props.value['toLat']}</div>
    );
}


const LongitudeComponent = (props) => {

    const classes = useStyle();

    return (
        <div className={classes.tabTitle}>{props.value.fromLong + " - " + props.value.toLong}</div>
    );
}

const ActionComponent = (props) => {

    function deleteData() {

        const fd = new FormData();
        fd.append('id', props.value.id);
        
        axios.post('http://biwta-db.000webhostapp.com/user/my_request_river_milage_delete.php', fd)
        .then(res=> {
            console.log("Data:" + res.data);
        
            if(res.data === "success"){
                alert("Data deleted successfully.");
            } else {
                alert("Error deleting data. PLease try again latter.");
            }

        })
        .catch(error => {
            console.log("Error:" + error.response);
            alert("Error:" + error.response);
        });


    }


    return (
        <div>
            <IconButton onClick={()=>{
                deleteData();
            }}>
                <Delete style={{color: "red"}}/>
            </IconButton>
        </div>
    );
}
