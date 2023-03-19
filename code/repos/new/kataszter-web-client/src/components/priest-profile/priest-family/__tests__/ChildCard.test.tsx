/*===================
  ChildCard.unit.test.tsx
 ===================*/
import React from "react";

import IChild from "../../../../data/priest/Child";
import { NewTestChild } from "../../../../util/test/data/test-data";
import { createComponentWithIntlAndRouter, mountWithIntl } from "../../../../util/test/test-wrapper";
import ChildCard from "../ChildCard";

const handlers = {
    handleDelete: jest.fn(),
    handleChangeOnChild: jest.fn()
};

describe("ChildCard element", () => {
    afterEach(() => {
        handlers.handleDelete.mockClear();
        handlers.handleChangeOnChild.mockClear();
    });

    it("should render a card with the child data", () => {
        const child: IChild = NewTestChild;
        const container = createComponentWithIntlAndRouter(<ChildCard child={child} index={0} editMode={false} {...handlers} />).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should call handleDelete if deleteButton pressed", () => {
        const child: IChild = NewTestChild;
        const container = mountWithIntl(<ChildCard child={child} index={0} editMode {...handlers} />);
        container
            .find("#deleteButton")
            .at(0)
            .simulate("click");

        expect(handlers.handleDelete).toHaveBeenCalledTimes(1);
    });

    it.each([
        [0, "1", "2"],
        [1, "1", "2"],
        [2, "1", "2"]
    ])("should  call handleChangeOnChild on %d. input. After first change: %s, After second change: %s", (inputNr, firstChange, secondChange) => {
        const child: IChild = NewTestChild;
        const container = mountWithIntl(<ChildCard child={child} index={0} editMode {...handlers} />);
        const input = container.find("input").at(Number(inputNr));
        input.simulate("change", { target: { value: firstChange } });
        input.simulate("change", { target: { value: secondChange } });
        expect(handlers.handleChangeOnChild).toHaveBeenCalledTimes(2);
    });
});
