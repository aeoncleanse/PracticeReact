// Create a set of <div> elements from a given array of Data
import {Data} from "./dataShapes";
import {Typography} from "@mui/material";

export function getDashboardBoxes(input: Data[]): JSX.Element[] {
    return input.map((data: Data) => {
        return (
            <div key={data.id} style={{padding: "2em", backgroundColor: "#adf0ff", margin: "1em", width: "30%"}}>
                <Typography style={{fontSize: "2em"}}>{data.title}</Typography>
                <br/>
                <Typography style={{fontSize: "2em"}}>Created at:</Typography>
                <Typography style={{fontSize: "2em"}}>{data.createdAt}</Typography>
            </div>
        )
    })
}
