import React from "react";
import "./App.css";
import {Typography} from "@mui/material";
import DashboardBoxList from "./DashboardBoxList";

function App() {
    return (
        <div className={"App"}>
            <Typography variant={"h1"}>
                Magidash Corp Dashboard Menu
            </Typography>
            <Typography variant={"h2"}>
                So many delicious Dashboards. Om nom.
            </Typography>
            <DashboardBoxList/>
        </div>
    );
}

export default App;
