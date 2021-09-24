import React, {useEffect, useState} from "react";
import {Typography} from "@mui/material";
import axios, {AxiosResponse} from "axios";
import "./DashboardBoxList.css";

export interface DashboardData {
    "id": number,
    "createdAt": Date,
    "updatedAt": Date,
    "title": string
}

function DashboardBoxList() {
    const [queryResponse, setQueryResponse] = useState<AxiosResponse<DashboardData[]>>();
    const [failure, setFailure] = useState<boolean>();
    const [loading, setLoading] = useState<boolean>();

    // Wait for data and feed it into the state
    useEffect(() => {
        setLoading(true);
        axios.get<DashboardData[]>("/dashboards").then((data) => {
            setLoading(false);
            setQueryResponse(data);
        }).catch((error) => {
            setFailure(true);
            if (error.response) {
                // Request made and server responded
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
        });
    }, []); // [] At the end prevents this re-running on component reload. It only runs on initial mount.

    return (
        <>
            {(() => {
                if (failure) {
                    return (<Typography variant={"body1"}>Fetching dashboards failed :(</Typography>);
                } else if (loading) {
                    return (<Typography variant={"body1"}>Loading dashboards...</Typography>);
                } else if (queryResponse) {
                    if (queryResponse.status === 200) {
                        return queryResponse.data.map((data: DashboardData) => {
                            return (
                                <div key={data.id} className={"Dashboard-box"}>
                                    <Typography variant={"body1"} style={{marginBottom: "1em"}}>{data.title}</Typography>
                                    <Typography variant={"body1"}>Created at:</Typography>
                                    <Typography variant={"body1"}>{data.createdAt}</Typography>
                                </div>
                            )
                        })
                    } else {
                        return (
                            <div className={"Dashboard-box"}>
                                <Typography variant={"body1"}>{queryResponse.status}</Typography>
                                <Typography variant={"body1"}>{queryResponse.statusText}</Typography>
                            </div>
                        )
                    }
                }
            })()}
        </>
    );
}

export default DashboardBoxList;
