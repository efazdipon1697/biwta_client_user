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
        field: 'year',
        headerName: 'YEAR',
        flex: 1
    },
    {
        field: 'qty',
        headerName: 'QUANTITY',
        flex: 1
    },
    {
        field: 'action',
        headerName: "",
        renderCell: (props) => ActionComponent(props),
    }
];

const TidalTableBookRequest = () => {
    const classes = useStyle();
    
    const [rows, setRows] = useState([]);

    useEffect(() => {
        getMyTidalTableBookRequest();
    })

    
    function getMyTidalTableBookRequest() {

        var currentEmail = window.localStorage.getItem("currentEmail");

        var url = "https://biwta-db.000webhostapp.com/user/my_request_tidal_table_book.php?email=" + currentEmail;

        axios.get(url)
            .then((response) => {
                console.log(response);
                var tempRows = new Array();
                response.data.map((data, index) => (
                    tempRows.push({ id: index, year: data.year, qty: data.quantity, action: data})
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

export default TidalTableBookRequest;


const ActionComponent = (props) => {

    function deleteData() {

        const fd = new FormData();
        fd.append('id', props.value.id);
        
        axios.post('https://biwta-db.000webhostapp.com/user/my_request_tidal_table_book_delete.php', fd)
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
