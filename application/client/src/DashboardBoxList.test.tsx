import {cleanup, render, screen} from '@testing-library/react';
import {getDashboardBoxes} from "./getDashboardBoxes";
import {getTestData} from "./testData";

test('renders list of boxes with title and creation date', () => {
    const date = new Date;
    const list: JSX.Element[] = getDashboardBoxes(getTestData(date));

    expect(list.length).toStrictEqual(2);
    
    // Test each div separately so we can be sure that the text outputs are grouped
    for (const elt of list) {
        // Render the div
        const asElt = <div>{elt}</div>;
        render(asElt);

        const title = screen.getByText(/Test\d/);
        expect(title).toBeInTheDocument();

        const createdAt = screen.getByText("Created at:");
        expect(createdAt).toBeInTheDocument();

        const creationDate = screen.getByText(date.toDateString());
        expect(creationDate).toBeInTheDocument();

        cleanup();
    }
});