/*===================
  PriestProfileController.unit.test.tsx
 ===================*/
import React from "react";

import { createComponentWithIntl, mountWithIntl } from "../../../util/test/test-wrapper";
import PriestProfileController from "../PriestProfileController";

const { ...handlers } = {
    setCurrentTab: jest.fn()
};

describe("PriestProfileController element", () => {
    afterEach(() => {
        handlers.setCurrentTab.mockClear();
    });

    it("should render the form with menu without upper shifting when editMode=false", () => {
        const container = createComponentWithIntl(<PriestProfileController editMode={false} currentTab="general" {...handlers} />).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render the form with menu with upper shifting when editMode=ture", () => {
        const container = createComponentWithIntl(<PriestProfileController editMode currentTab="general" {...handlers} />).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should call the handleCurrentTabChange function when clicked on menu tabs", () => {
        const container = mountWithIntl(<PriestProfileController editMode={false} currentTab="general" {...handlers} />);
        container
            .find("#family")
            .at(0)
            .simulate("click");
        expect(handlers.setCurrentTab).toHaveBeenCalledTimes(1);
        expect(handlers.setCurrentTab).toHaveBeenCalledWith("family");
    });
});
