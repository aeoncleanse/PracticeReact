import React, {useEffect, useState} from 'react';
import './App.css';
import {Typography} from "@mui/material";
import {Data} from "./dataShapes";
import {getDashboardBoxes} from "./getDashboardBoxes";
import {queryDashboards} from "./queryDashboards";

function App() {
    const [data, setData] = useState<Data[]>();

    // Wait for data and feed it into the state
    useEffect(() => {
        queryDashboards().then((data: Data[] | undefined) => {
            if (data) {
                setData(data);
            }
        });
    }, []); // [] At the end prevents this re-running on component reload. It only runs on initial mount.

    return (
        <div style={{textAlign: "center", backgroundColor: "#13304d", display: "flex", flexDirection: "column", alignItems: "center"}}>
            <Typography style={{fontSize: "5em", color: "#57a1eb"}}>
                Magidash Corp Dashboard Menu
            </Typography>
            <Typography style={{fontSize: "3em", color: "#57a1eb"}}>
                So many delicious Dashboards. Om nom.
            </Typography>
            {
                data ? getDashboardBoxes(data) : <Typography style={{fontSize: "3em"}}>No Data Found...</Typography>
            }
        </div>
    );
}

export default App;
