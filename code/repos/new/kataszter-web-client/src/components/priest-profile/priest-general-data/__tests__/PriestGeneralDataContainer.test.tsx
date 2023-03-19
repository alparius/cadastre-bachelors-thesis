/*===================
  PriestGeneralDataContainer.unit.test.tsx
 ===================*/
import React from "react";

import IPriestProfileData from "../../../../data/priest/PriestProfileData";
import { NewTestPriestProfileData } from "../../../../util/test/data/test-data";
import { createComponentWithIntl, createComponentWithIntlAndRouter, mountWithIntl } from "../../../../util/test/test-wrapper";
import PriestGeneralDataContainer from "../PriestGeneralDataContainer";

const handlers = {
    setEditMode: jest.fn(),
    setPriest: jest.fn()
};

const priest: IPriestProfileData = NewTestPriestProfileData;

describe("PriestGeneralDataContainer element", () => {
    afterEach(() => {
        handlers.setEditMode.mockClear();
        handlers.setPriest.mockClear();
    });

    it("should render an error message when the showError is true", () => {
        const container = createComponentWithIntlAndRouter(
            <PriestGeneralDataContainer priest={priest} loading={false} showError editMode={false} {...handlers} />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render an error message when the showError is true", () => {
        const container = createComponentWithIntlAndRouter(
            <PriestGeneralDataContainer priest={priest} loading={false} showError editMode {...handlers} />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render the grid with priest profile data when priest is provided without aviability to change", () => {
        const container = createComponentWithIntl(
            <PriestGeneralDataContainer priest={priest} loading={false} showError={false} editMode={false} {...handlers} />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render the grid with priest profile data when priest is provided with aviability to change", () => {
        const container = createComponentWithIntl(
            <PriestGeneralDataContainer priest={priest} loading={false} showError={false} editMode {...handlers} />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render the grid with placeholders when the loading is true", () => {
        const container = createComponentWithIntl(
            <PriestGeneralDataContainer priest={priest} loading showError={false} editMode={false} {...handlers} />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render the grid with placeholders when the loading is true", () => {
        const container = createComponentWithIntl(
            <PriestGeneralDataContainer priest={priest} loading showError={false} editMode {...handlers} />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it.each([
        [0, "2", "3"],
        [1, "2", "3"],
        [2, "2", "3"],
        [3, "2", "3"],
        [4, "2", "3"],
        [5, "2", "3"],
        [6, "2", "3"],
        [7, "2", "3"],
        [8, "2", "3"],
        [9, "2", "3"]
    ])(
        "should  call handleChangeOnGeneralData on %d. input. After first change: %s, After second change: %s",
        (inputNr, firstChange, secondChange) => {
            const container = mountWithIntl(<PriestGeneralDataContainer priest={priest} loading={false} showError={false} editMode {...handlers} />);
            const input = container.find("input").at(Number(inputNr));
            input.simulate("change", { target: { value: firstChange } });
            input.simulate("change", { target: { value: secondChange } });
            expect(handlers.setPriest).toHaveBeenCalledTimes(2);
        }
    );
});
