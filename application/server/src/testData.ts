import {Data} from "./dataShapes";

export function getTestData(date: Date): Data[] {
    return [
        {
            id: 1,
            createdAt: date,
            updatedAt: date,
            title: "Test1"
        },
        {
            id: 2,
            createdAt: date,
            updatedAt: date,
            title: "Test2"
        }
    ]
}
