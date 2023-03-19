/*===================
  PriestProfileHeader.unit.test.tsx
 ===================*/
import React from "react";

import IPriestProfileData from "../../../data/priest/PriestProfileData";
import { NewTestPriestProfileData } from "../../../util/test/data/test-data";
import { createComponentWithIntlAndRouter, mountWithIntl } from "../../../util/test/test-wrapper";
import PriestProfileHeader from "../PriestProfileHeader";

const handlers = {
    handleEditModeChange: jest.fn(),
    asyncDelete: jest.fn()
};

const priest: IPriestProfileData = NewTestPriestProfileData;

describe("PriestProfileHeader element", () => {
    afterEach(() => {
        handlers.handleEditModeChange.mockClear();
    });

    it("should render a priestName when editMode=false and isAdmin=false", () => {
        const container = createComponentWithIntlAndRouter(
            <PriestProfileHeader priest={priest} editMode={false} isAdmin={false} {...handlers} />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render a priestName when editMode=true and isAdmin=false", () => {
        const container = createComponentWithIntlAndRouter(<PriestProfileHeader priest={priest} editMode isAdmin={false} {...handlers} />).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render a priestName and editButton  when editMode=false and isAdmin=true", () => {
        const container = createComponentWithIntlAndRouter(<PriestProfileHeader priest={priest} editMode={false} isAdmin {...handlers} />).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render a priest name when editMode=true and isAdmin=true", () => {
        const container = createComponentWithIntlAndRouter(<PriestProfileHeader priest={priest} editMode isAdmin {...handlers} />).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should call the handleEditModeChange function when clicked on button", () => {
        const container = mountWithIntl(<PriestProfileHeader priest={priest} editMode={false} isAdmin {...handlers} />);
        container.find("#editModeButton").at(0).simulate("click");
        expect(handlers.handleEditModeChange).toHaveBeenCalledTimes(1);
    });
});
