/*===================
  PriestQualificationContainer.unit.test.tsx
 ===================*/
import React from "react";

import IPriestProfileData from "../../../../data/priest/PriestProfileData";
import { NewTestPriestProfileData } from "../../../../util/test/data/test-data";
import { createComponentWithIntlAndRouter, mountWithIntl } from "../../../../util/test/test-wrapper";
import PriestQualificationContainer from "../PriestQualificationContainer";

const handlers = {
    setPriest: jest.fn(),
    setEditMode: jest.fn()
};

const priest: IPriestProfileData = NewTestPriestProfileData;

describe("PriestQualificationContainer element", () => {
    afterEach(() => {
        handlers.setPriest.mockClear();
        handlers.setEditMode.mockClear();
    });

    it("should render a qualification container when the priest is not empty", () => {
        const container = createComponentWithIntlAndRouter(
            <PriestQualificationContainer priest={priest} loading={false} showError={false} editMode={false} {...handlers} />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render a placeholder when the priest is empty", () => {
        const emptyPriestFamily: IPriestProfileData[] = [];
        const container = createComponentWithIntlAndRouter(
            <PriestQualificationContainer priest={emptyPriestFamily[0]} loading={false} showError={false} editMode={false} {...handlers} />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render an error message when showError is true", () => {
        const container = createComponentWithIntlAndRouter(
            <PriestQualificationContainer priest={priest} loading={false} showError editMode={false} {...handlers} />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render an error message when showError and loading are both true", () => {
        const container = createComponentWithIntlAndRouter(
            <PriestQualificationContainer priest={priest} loading showError editMode={false} {...handlers} />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render a placeholder card when only loading is true", () => {
        const container = createComponentWithIntlAndRouter(
            <PriestQualificationContainer priest={priest} loading showError={false} editMode={false} {...handlers} />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should call setPriest if add new Button pressed", () => {
        const container = mountWithIntl(<PriestQualificationContainer priest={priest} loading={false} showError={false} editMode {...handlers} />);
        container.find("#addNew").at(0).simulate("click");
        expect(handlers.setPriest).toHaveBeenCalledTimes(1);
    });
});
