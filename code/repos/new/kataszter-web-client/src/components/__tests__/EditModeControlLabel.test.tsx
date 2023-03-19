/*===================
  EditModeControlLabel.unit.test.tsx
 ===================*/
import React from "react";

import { createComponentWithIntlAndRouter, mountWithIntl } from "../../util/test/test-wrapper";
import EditModeControlLabel from "../EditModeControlLabel";

const handlers = {
    onSave: jest.fn(),
    onRevertChanges: jest.fn()
};

describe("EditModeControlLabel element", () => {
    it("should render a EditModeControlLabel container", () => {
        const container = createComponentWithIntlAndRouter(<EditModeControlLabel text="profile.editModeText" {...handlers} />).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should call the onSave function when clicked on saveChanges tabs", () => {
        const container = mountWithIntl(<EditModeControlLabel text="profile.editModeText" {...handlers} />);
        container.find("#saveChanges").at(0).simulate("click");
        expect(handlers.onSave).toHaveBeenCalledTimes(1);
    });

    it("should call the onRevertChanges function when clicked on revertChanges button", () => {
        const container = mountWithIntl(<EditModeControlLabel text="profile.editModeText" {...handlers} />);
        container.find("#revertChanges").at(0).simulate("click");
        expect(handlers.onRevertChanges).toHaveBeenCalledTimes(1);
    });
});
