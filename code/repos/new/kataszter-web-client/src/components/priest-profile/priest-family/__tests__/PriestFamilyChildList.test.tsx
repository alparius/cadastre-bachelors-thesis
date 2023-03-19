/*===================
  PriestFamilyChildList.unit.test.tsx
 ===================*/
import React from "react";

import IChild from "../../../../data/priest/Child";
import IPriestProfileData from "../../../../data/priest/PriestProfileData";
import { NewTestPriestProfileData } from "../../../../util/test/data/test-data";
import { createComponentWithIntlAndRouter } from "../../../../util/test/test-wrapper";
import PriestFamilyChildList from "../PriestFamilyChildList";

const handlers = {
    setPriest: jest.fn()
};

const priest: IPriestProfileData = NewTestPriestProfileData;

describe("PriestFamilyChildList element", () => {
    it("should render a family child list container when the children is not empty", () => {
        const container = createComponentWithIntlAndRouter(<PriestFamilyChildList priest={priest} editMode={false} {...handlers} />).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render a `no data` when the children is empty", () => {
        const emptyChildren: IChild[] = [];
        priest.children = emptyChildren;

        const container = createComponentWithIntlAndRouter(<PriestFamilyChildList priest={priest} editMode={false} {...handlers} />).toJSON();
        expect(container).toMatchSnapshot();
    });
});
