/*===================
  PriestProfileContainer.unit.test.tsx
 ===================*/
import React from "react";

import UserRole from "../../../data/enums/UserRole";
import IPriestProfileData from "../../../data/priest/PriestProfileData";
import { NewTestPriestProfileData } from "../../../util/test/data/test-data";
import { createComponentWithIntlAndRouter, mountWithIntl } from "../../../util/test/test-wrapper";
import PriestProfileContainer from "../PriestProfileContainer";

const handlers = {
    setPriest: jest.fn(),
    setEditMode: jest.fn(),
    setFiles: jest.fn(),
    setFileType: jest.fn(),
    asyncPostFile: jest.fn()
};

const priest: IPriestProfileData = NewTestPriestProfileData;

describe("PriestProfileContainer element", () => {
    afterEach(() => {
        handlers.setPriest.mockClear();
        handlers.setEditMode.mockClear();
        handlers.setFiles.mockClear();
        handlers.setFileType.mockClear();
        handlers.asyncPostFile.mockClear();
    });

    it("should render a profile container when the priest is not empty", () => {
        const container = createComponentWithIntlAndRouter(
            <PriestProfileContainer
                responsePostFile={undefined}
                currentTab={"general"}
                priest={priest}
                loading={false}
                showError={false}
                userRole={undefined}
                editMode={false}
                errorStatusPostFile={200}
                {...handlers}
            />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render a placeholder when the priest is empty", () => {
        const emptyPriestProfile: IPriestProfileData[] = [];
        const container = createComponentWithIntlAndRouter(
            <PriestProfileContainer
                responsePostFile={undefined}
                currentTab={"general"}
                priest={emptyPriestProfile[0]}
                loading={false}
                showError={false}
                userRole={undefined}
                editMode={false}
                errorStatusPostFile={200}
                {...handlers}
            />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render an error message when showError is true", () => {
        const container = createComponentWithIntlAndRouter(
            <PriestProfileContainer
                responsePostFile={undefined}
                currentTab={"general"}
                priest={priest}
                loading={false}
                showError
                userRole={undefined}
                editMode={false}
                errorStatusPostFile={200}
                {...handlers}
            />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render an error message when showError and loading are both true", () => {
        const container = createComponentWithIntlAndRouter(
            <PriestProfileContainer
                responsePostFile={undefined}
                currentTab={"general"}
                priest={priest}
                loading
                showError
                errorStatusPostFile={200}
                userRole={undefined}
                editMode={false}
                {...handlers}
            />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render a placeholder card when only loading is true", () => {
        const container = createComponentWithIntlAndRouter(
            <PriestProfileContainer
                responsePostFile={undefined}
                currentTab={"general"}
                priest={priest}
                loading
                showError={false}
                errorStatusPostFile={200}
                userRole={undefined}
                editMode={false}
                {...handlers}
            />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    //
    it("should render a profile container when the priest is not empty while editMode=true", () => {
        const container = createComponentWithIntlAndRouter(
            <PriestProfileContainer
                responsePostFile={undefined}
                currentTab={"general"}
                priest={priest}
                loading={false}
                showError={false}
                errorStatusPostFile={200}
                userRole={undefined}
                editMode
                {...handlers}
            />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render a placeholder when the priest is empty while editMode=true", () => {
        const emptyPriestProfile: IPriestProfileData[] = [];
        const container = createComponentWithIntlAndRouter(
            <PriestProfileContainer
                responsePostFile={undefined}
                currentTab={"general"}
                priest={emptyPriestProfile[0]}
                loading={false}
                showError={false}
                errorStatusPostFile={200}
                userRole={undefined}
                editMode
                {...handlers}
            />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render an error message when showError is true and editMode=true", () => {
        const container = createComponentWithIntlAndRouter(
            <PriestProfileContainer
                responsePostFile={undefined}
                currentTab={"general"}
                priest={priest}
                loading={false}
                showError
                errorStatusPostFile={200}
                userRole={undefined}
                editMode
                {...handlers}
            />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should call setEditMode if edit Button pressed", () => {
        const container = mountWithIntl(
            <PriestProfileContainer
                responsePostFile={undefined}
                currentTab={"general"}
                priest={priest}
                loading={false}
                showError={false}
                errorStatusPostFile={200}
                userRole={UserRole.ADMIN}
                editMode={false}
                {...handlers}
            />
        );
        container.find("#editModeButton").at(0).simulate("click");
        expect(handlers.setEditMode).toHaveBeenCalledTimes(1);
    });

    it("should call setPriest, setEditMode if saveChangeButton pressed", () => {
        const container = mountWithIntl(
            <PriestProfileContainer
                responsePostFile={undefined}
                currentTab={"general"}
                priest={priest}
                loading={false}
                showError={false}
                errorStatusPostFile={200}
                userRole={UserRole.ADMIN}
                editMode
                {...handlers}
            />
        );

        container.find("#saveChanges").at(0).simulate("click");
        expect(handlers.setPriest).toHaveBeenCalledTimes(1);
        expect(handlers.setEditMode).toHaveBeenCalledTimes(1);
    });

    it("should call setEditMode if revertChangesButton pressed", () => {
        const container = mountWithIntl(
            <PriestProfileContainer
                responsePostFile={undefined}
                currentTab={"general"}
                priest={priest}
                loading={false}
                showError={false}
                errorStatusPostFile={200}
                userRole={UserRole.ADMIN}
                editMode
                {...handlers}
            />
        );

        container.find("#revertChanges").at(0).simulate("click");
        expect(handlers.setEditMode).toHaveBeenCalledTimes(1);
    });
});
