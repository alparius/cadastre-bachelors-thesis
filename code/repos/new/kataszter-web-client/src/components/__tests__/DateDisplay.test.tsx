/*===================
  DateDisplay.unit.test.tsx
 ===================*/
import React from "react";

import { NewTestDate } from "../../util/test/data/test-data";
import { createComponentWithIntl } from "../../util/test/test-wrapper";
import DateDisplay from "../DateDisplay";

describe("DateDisplay element", () => {
    it("should render a popup with a span, full date given", () => {
        const container = createComponentWithIntl(<DateDisplay date={NewTestDate} />).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render just a span, no comment given", () => {
        const testDate = NewTestDate;
        testDate.comment = "";
        const container = createComponentWithIntl(<DateDisplay date={testDate} />).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render just a span with a comment, no date given", () => {
        const testDate = NewTestDate;
        testDate.year = 0;
        testDate.comment = "test";
        const container = createComponentWithIntl(<DateDisplay date={testDate} />).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render a noData label, nothing given", () => {
        const testDate = NewTestDate;
        testDate.year = 0;
        testDate.comment = "";
        const container = createComponentWithIntl(<DateDisplay date={testDate} />).toJSON();
        expect(container).toMatchSnapshot();
    });
});
