// The connection magic lives here...
import {Connection, createConnection} from "mysql";
import {snooze} from "./time";
import {promisify} from "util";

function makeConnection(): Connection {
    return createConnection({
        host: "mysql",
        port: 3306,
        user: "root",
        password: "test123",
        database: "definitions"
    });
}

// We want to keep trying to connect until it's done
// This is an almighty pain in the butt
export async function connectToDatabase(): Promise<Connection> {
    const timeout = 2000;
    while (true) {
        console.log("Attempting connection...");
        let conn = makeConnection();
        const connect = promisify(conn.connect).bind(conn);
        await connect().catch((e: any) => {
            console.error(e);
            console.log(`Retrying connection in ${timeout}ms`);
        });

        if (conn.state == "authenticated") {
            console.log("Connection successful")
            return conn;
        }

        await snooze(timeout);
    }
}

/*
Connection succeeds, return a Connection instance which is authenticated
Connection unsuccessful, does not throw, continues until test timeout X.
 */
