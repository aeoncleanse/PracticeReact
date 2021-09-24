import {runQuery} from "./query";
import {createConnection} from "mysql";
import {getTestData} from "./testData";
import {promisify} from "util";
import {mocked} from "ts-jest/utils";

jest.mock("util");
const mockedPromisify = mocked(promisify);

describe("the mysql query wrapper", () => {
    beforeEach(() => {
        mockedPromisify.mockClear();
    });

    test("does not throw when the query throws, returns empty array", async () => {
        mockedPromisify.mockImplementation((_p: any) => async () => {
            throw Error("This is a mock rejection");
        });

        // If it resolves, we know it did not throw
        await expect(runQuery(createConnection({}), "SELECT * FROM dashboards")).resolves.toStrictEqual([]);
        expect(mockedPromisify).toHaveBeenCalledTimes(1);
    });

    test("returns empty array if the query result is the wrong type", async () => {
        mockedPromisify.mockImplementation((_p: any) => async () => "This is wrong");

        await expect(runQuery(createConnection({}), "SELECT * FROM dashboards")).resolves.toStrictEqual([]);
        expect(mockedPromisify).toHaveBeenCalledTimes(1);
    });

    test("correctly returns Data[]", async () => {
        const data = getTestData(new Date());
        mockedPromisify.mockImplementation((_p: any) => async () => data);

        await expect(runQuery(createConnection({}), "SELECT * FROM dashboards")).resolves.toStrictEqual(data);
        expect(mockedPromisify).toHaveBeenCalledTimes(1);
    });
})
