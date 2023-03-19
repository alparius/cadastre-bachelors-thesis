/*===================
  PriestMainPriestPlaceList.unit.test.tsx
 ===================*/
import React from "react";

import IPriestProfileData from "../../../../data/priest/PriestProfileData";
import ISpouse from "../../../../data/priest/Spouse";
import { NewTestPriestProfileData } from "../../../../util/test/data/test-data";
import { createComponentWithIntlAndRouter } from "../../../../util/test/test-wrapper";
import PriestMainPriestPlaceList from "../PriestMainPriestPlaceList";

const handlers = {
    setPriest: jest.fn(),
    parishResponse: undefined,
    parishLoading: false,
    parishShowError: false
};

const priest: IPriestProfileData = NewTestPriestProfileData;

describe("PriestMainPriestPlaceList element", () => {
    it("should render a placement list container when the placement list is not empty", () => {
        const container = createComponentWithIntlAndRouter(<PriestMainPriestPlaceList priest={priest} editMode={false} {...handlers} />).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render a `no data` when the placement list is empty", () => {
        const emptySpouses: ISpouse[] = [];
        priest.spouses = emptySpouses;

        const container = createComponentWithIntlAndRouter(<PriestMainPriestPlaceList priest={priest} editMode={false} {...handlers} />).toJSON();
        expect(container).toMatchSnapshot();
    });
});
