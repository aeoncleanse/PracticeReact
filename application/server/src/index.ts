import express from "express";
import {connectToDatabase} from "./connection";
import {runQuery} from "./query";

const PORT = process.env.PORT || 81;

const app = express();

// Use wrapped async to simulate top-level async
(async () => {
    try {
        const conn = await connectToDatabase();

        app.get("/dashboards", async (_req, res) => {
            console.log("HTTP get command received. Fetching data...");
            const data = await runQuery(conn, "SELECT * FROM dashboards");
            console.log("Returning fetched data:");
            console.log(data);

            await res.json(data);
        })

        app.listen(PORT, async () => {
            console.log(`API server listening on port ${PORT}`);
            console.log("DB content found at startup:");
            console.log(await runQuery(conn, "SELECT * FROM dashboards"));
        });
    } catch (e) {
        console.log("Fatal error" + e);
    }
})();
