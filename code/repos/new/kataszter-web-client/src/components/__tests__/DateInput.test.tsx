/*===================
  DateInput.unit.test.tsx
 ===================*/
import React from "react";

import { NewTestDate } from "../../util/test/data/test-data";
import { createComponentWithIntl, mountWithIntl } from "../../util/test/test-wrapper";
import DateInput from "../DateInput";

const changeDate = jest.fn();

describe("DateInput element", () => {
    afterEach(() => {
        changeDate.mockClear();
    });

    it("should render a form", () => {
        const container = createComponentWithIntl(<DateInput date={NewTestDate} changeDate={jest.fn()} />).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render an error message too on bad input", () => {
        const container = mountWithIntl(<DateInput date={NewTestDate} changeDate={jest.fn()} />);
        const input = container.find("input").at(1);
        input.simulate("change", { target: { value: 13 } });
        expect(container).toMatchSnapshot();
    });

    it.each([
        [0, "2", "3"],
        [1, "2", "3"],
        [2, "2", "3"],
        [3, "2", "3"]
    ])("should  call changeDate on %d. input. After first change: %s, After second change: %s", (inputNr, firstChange, secondChange) => {
        const container = mountWithIntl(<DateInput date={NewTestDate} changeDate={changeDate} />);
        const input = container.find("input").at(Number(inputNr));
        input.simulate("change", { target: { value: firstChange } });
        input.simulate("change", { target: { value: secondChange } });
        expect(changeDate).toHaveBeenCalledTimes(2);
    });
});
