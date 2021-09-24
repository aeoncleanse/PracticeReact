import {DashboardData} from "./DashboardBoxList";

export function getTestData(date: Date): DashboardData[] {
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
