/*===================
  PriestQualificationList.unit.test.tsx
 ===================*/
import React from "react";

import IPriestProfileData from "../../../../data/priest/PriestProfileData";
import IQualification from "../../../../data/priest/Qualification";
import { NewTestPriestProfileData, NewTestQualification } from "../../../../util/test/data/test-data";
import { createComponentWithIntlAndRouter, mountWithIntl } from "../../../../util/test/test-wrapper";
import PriestQualificationList from "../PriestQualificationList";

const handlers = {
    setPriest: jest.fn()
};

describe("PriestQualificationList element", () => {
    afterEach(() => {
        handlers.setPriest.mockClear();
    });
    it("should render a family child list container when the qualification is not empty", () => {
        const priest: IPriestProfileData = NewTestPriestProfileData;
        const container = createComponentWithIntlAndRouter(<PriestQualificationList priest={priest} editMode={false} {...handlers} />).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render a `no data` when the qualification is empty", () => {
        const priest: IPriestProfileData = NewTestPriestProfileData;
        const emptyQualification: IQualification[] = [];
        priest.qualifications = emptyQualification;

        const container = createComponentWithIntlAndRouter(<PriestQualificationList priest={priest} editMode={false} {...handlers} />).toJSON();
        expect(container).toMatchSnapshot();
    });
    it("should call setPriest if delete button pressed", () => {
        const priest: IPriestProfileData = NewTestPriestProfileData;
        priest.qualifications = [NewTestQualification];
        const container = mountWithIntl(<PriestQualificationList priest={priest} editMode {...handlers} />);

        container
            .find("#deleteButton")
            .at(0)
            .simulate("click");
        expect(handlers.setPriest).toHaveBeenCalledTimes(1);
    });

    it.each([
        [0, "2", "3"],
        [1, "2", "3"],
        [2, "2", "3"]
    ])(
        "should  call handleChangeOnQualification on %d. input. After first change: %s, After second change: %s",
        (inputNr, firstChange, secondChange) => {
            const priest: IPriestProfileData = NewTestPriestProfileData;
            priest.qualifications = [NewTestQualification];
            const container = mountWithIntl(<PriestQualificationList priest={priest} editMode {...handlers} />);
            const input = container.find("input").at(Number(inputNr));
            input.simulate("change", { target: { value: firstChange } });
            input.simulate("change", { target: { value: secondChange } });
            expect(handlers.setPriest).toHaveBeenCalledTimes(2);
        }
    );
});
