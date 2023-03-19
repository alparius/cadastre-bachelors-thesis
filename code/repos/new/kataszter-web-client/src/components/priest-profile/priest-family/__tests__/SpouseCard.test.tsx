/*===================
  SpouseCard.unit.test.tsx
 ===================*/
import React from "react";

import ISpouse from "../../../../data/priest/Spouse";
import { NewTestSpouse } from "../../../../util/test/data/test-data";
import { createComponentWithIntlAndRouter, mountWithIntl } from "../../../../util/test/test-wrapper";
import SpouseCard from "../SpouseCard";

const handlers = {
    handleDelete: jest.fn(),
    handleChangeOnSpouse: jest.fn()
};

describe("SpouseCard element", () => {
    afterEach(() => {
        handlers.handleDelete.mockClear();
        handlers.handleChangeOnSpouse.mockClear();
    });
    it("should render a card with the spouse data", () => {
        const spouse: ISpouse = NewTestSpouse;
        const container = createComponentWithIntlAndRouter(<SpouseCard spouse={spouse} index={0} editMode={false} {...handlers} />).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render a card with the spouse data editable", () => {
        const spouse: ISpouse = NewTestSpouse;
        const container = createComponentWithIntlAndRouter(<SpouseCard spouse={spouse} index={0} editMode {...handlers} />).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render a card with with the spouse data and NO labels for missing fields", () => {
        const spouse: ISpouse = NewTestSpouse;
        spouse.job = "";
        const container = createComponentWithIntlAndRouter(<SpouseCard spouse={spouse} index={0} editMode={false} {...handlers} />).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render a card with with the spouse data and `empty edit field` for missing fields", () => {
        const spouse: ISpouse = NewTestSpouse;
        spouse.job = "";
        const container = createComponentWithIntlAndRouter(<SpouseCard spouse={spouse} index={0} editMode {...handlers} />).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should call handleDelete if deleteButton pressed", () => {
        const spouse: ISpouse = NewTestSpouse;
        const container = mountWithIntl(<SpouseCard spouse={spouse} index={0} editMode {...handlers} />);
        container
            .find("#deleteButton")
            .at(0)
            .simulate("click");

        expect(handlers.handleDelete).toHaveBeenCalledTimes(1);
    });

    it.each([
        [0, "2", "3"],
        [1, "2", "3"],
        [2, "2", "3"],
        [3, "2", "3"],
        [4, "2", "3"],
        [5, "2", "3"]
    ])("should  call handleChangeOnSpouse on %d. input. After first change: %s, After second change: %s", (inputNr, firstChange, secondChange) => {
        const spouse: ISpouse = NewTestSpouse;
        const container = mountWithIntl(<SpouseCard spouse={spouse} index={0} editMode {...handlers} />);
        const input = container.find("input").at(Number(inputNr));
        input.simulate("change", { target: { value: firstChange } });
        input.simulate("change", { target: { value: secondChange } });
        expect(handlers.handleChangeOnSpouse).toHaveBeenCalledTimes(2);
    });
});
