import axios from "axios";
import * as QueryDashboards from "./queryDashboards";
import {queryDashboards} from "./queryDashboards";
import {getTestData} from "./testData";

test("fetches data from /dashboards", async() => {
    const date = new Date;
    const data = getTestData(date);
    const getSpy = jest.spyOn(axios, "get").mockResolvedValueOnce({data: data});

    const fetched = await queryDashboards();

    expect(getSpy).toHaveBeenCalledTimes(1);
    expect(getSpy).toHaveBeenCalledWith("/dashboards");
    expect(fetched).toStrictEqual(data);
});

test("prints an error on failure", async() => {
    const getSpy = jest.spyOn(axios, "get").mockRejectedValueOnce("This is an axios get rejection");

    const dataSpy = jest.spyOn(QueryDashboards, "queryDashboards");
    const fetched = await queryDashboards();

    expect(getSpy).toHaveBeenCalledTimes(1);
    expect(getSpy).toHaveBeenCalledWith("/dashboards");
    expect(dataSpy).not.toThrow();
    expect(fetched).toStrictEqual(undefined);
});
