/*===================
  PriestPlacementContainer.unit.test.tsx
 ===================*/
import React from "react";

import IPriestProfileData from "../../../../data/priest/PriestProfileData";
import { NewTestPriestProfileData } from "../../../../util/test/data/test-data";
import { createComponentWithIntlAndRouter, mountWithIntlAndRouter } from "../../../../util/test/test-wrapper";
import PriestPlacementContainer from "../PriestPlacementContainer";

const handlers = {
    setPriest: jest.fn(),
    setEditMode: jest.fn()
};

const priest: IPriestProfileData = NewTestPriestProfileData;

describe("PriestPlacementContainer element", () => {
    afterEach(() => {
        handlers.setPriest.mockClear();
        handlers.setEditMode.mockClear();
    });

    it("should render a placement container when the priest is not empty", () => {
        const container = createComponentWithIntlAndRouter(
            <PriestPlacementContainer priest={priest} loading={false} showError={false} editMode={false} {...handlers} />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render a placeholder when the priest is empty", () => {
        const emptyPriestFamily: IPriestProfileData[] = [];
        const container = createComponentWithIntlAndRouter(
            <PriestPlacementContainer priest={emptyPriestFamily[0]} loading={false} showError={false} editMode={false} {...handlers} />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render an error message when showError is true", () => {
        const container = createComponentWithIntlAndRouter(
            <PriestPlacementContainer priest={priest} loading={false} showError editMode={false} {...handlers} />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render an error message when showError and loading are both true", () => {
        const container = createComponentWithIntlAndRouter(
            <PriestPlacementContainer priest={priest} loading showError editMode={false} {...handlers} />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render a placeholder card when only loading is true", () => {
        const container = createComponentWithIntlAndRouter(
            <PriestPlacementContainer priest={priest} loading showError={false} editMode={false} {...handlers} />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should call setPriest if add new main placement Button pressed", () => {
        const container = mountWithIntlAndRouter(
            <PriestPlacementContainer priest={priest} loading={false} showError={false} editMode {...handlers} />
        );
        container.find("#addNewMainPlacement").at(0).simulate("click");
        expect(handlers.setPriest).toHaveBeenCalledTimes(1);
    });

    it("should call setPriest if add new assistant placement Button pressed", () => {
        const container = mountWithIntlAndRouter(
            <PriestPlacementContainer priest={priest} loading={false} showError={false} editMode {...handlers} />
        );
        container.find("#addNewAssistantPlacement").at(0).simulate("click");
        expect(handlers.setPriest).toHaveBeenCalledTimes(1);
    });
});
