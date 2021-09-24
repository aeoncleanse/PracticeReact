import {Connection} from "mysql";
import {promisify} from "util";
import {Data} from "./dataShapes";
import {is} from "typescript-is";

// Wrap query to print rather than throw, and use promisify to simplify the process
// We don't want a bad query request to break the server
export async function runQuery(conn: Connection, q: string): Promise<Data[]> {
    try {
        const queryFn = promisify(conn.query).bind(conn);
        const result = await queryFn(q);

        if (is<Data[]>(result)) {
            return result;
        }

        console.error("DEBUG: runQuery() result not of type Data[]");
    } catch (e) {
        console.error(e);
    }
    return [];
}
