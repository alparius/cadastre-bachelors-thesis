/*===================
  PriestFamilySpouseList.unit.test.tsx
 ===================*/
import React from "react";

import IPriestProfileData from "../../../../data/priest/PriestProfileData";
import ISpouse from "../../../../data/priest/Spouse";
import { NewTestPriestProfileData } from "../../../../util/test/data/test-data";
import { createComponentWithIntlAndRouter } from "../../../../util/test/test-wrapper";
import PriestFamilySpouseList from "../PriestFamilySpouseList";

const handlers = {
    setPriest: jest.fn()
};

const priest: IPriestProfileData = NewTestPriestProfileData;

describe("PriestFamilySpouseList element", () => {
    it("should render a family spouse list container when the spouses is not empty", () => {
        const container = createComponentWithIntlAndRouter(<PriestFamilySpouseList priest={priest} editMode={false} {...handlers} />).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render a `no data` when the spouses is empty", () => {
        const emptySpouses: ISpouse[] = [];
        priest.spouses = emptySpouses;

        const container = createComponentWithIntlAndRouter(<PriestFamilySpouseList priest={priest} editMode={false} {...handlers} />).toJSON();
        expect(container).toMatchSnapshot();
    });
});
