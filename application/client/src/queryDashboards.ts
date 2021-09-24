import {Data} from "./dataShapes";
import axios from "axios";

// Fetch data asynchronously
// Don't throw so that a fetch fail doesn't crash the site
export async function queryDashboards(): Promise<Data[] | undefined> {
    try {
        console.log("DEBUG: Trying axios get /dashboards");
        const res = await axios.get("/dashboards");
        console.log(res.data);
        return res.data;
    } catch (e) {
        console.error("DEBUG: " + e);
    }
}
