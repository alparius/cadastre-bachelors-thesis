/*===================
  QualificationCard.unit.test.tsx
 ===================*/
import React from "react";
import IQualification, { NewQualification } from "../../../../data/priest/Qualification";
import { NewTestQualification } from "../../../../util/test/data/test-data";
import { createComponentWithIntlAndRouter, mountWithIntl } from "../../../../util/test/test-wrapper";
import QualificationCard from "../QualificationCard";

const handlers = {
    handleDelete: jest.fn(),
    handleChangeOnQualification: jest.fn()
};

describe("PriestCard element", () => {
    afterEach(() => {
        handlers.handleDelete.mockClear();
        handlers.handleChangeOnQualification.mockClear();
    });
    it("should render a card with the qualification data", () => {
        const qualification: IQualification = NewTestQualification;
        const container = createComponentWithIntlAndRouter(
            <QualificationCard qualification={qualification} index={1} editMode {...handlers} />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render a card with noData label when the qualification is empty", () => {
        const emptyQualification = NewQualification;
        const container = createComponentWithIntlAndRouter(
            <QualificationCard qualification={emptyQualification} index={1} editMode {...handlers} />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should call the delete function when delete button pressed", () => {
        const qualification: IQualification = NewTestQualification;
        const container = mountWithIntl(<QualificationCard qualification={qualification} index={1} editMode {...handlers} />);
        container
            .find("#deleteButton")
            .at(0)
            .simulate("click");
        expect(handlers.handleDelete).toHaveBeenCalledTimes(1);
    });

    it.each([
        [0, "2", "3"],
        [1, "2", "3"],
        [2, "2", "3"]
    ])(
        "should  call handleChangeOnQualification on %d. input. After first change: %s, After second change: %s",
        (inputNr, firstChange, secondChange) => {
            const qualification: IQualification = NewTestQualification;
            const container = mountWithIntl(<QualificationCard qualification={qualification} index={1} editMode {...handlers} />);
            const input = container.find("input").at(Number(inputNr));
            input.simulate("change", { target: { value: firstChange } });
            input.simulate("change", { target: { value: secondChange } });
            expect(handlers.handleChangeOnQualification).toHaveBeenCalledTimes(2);
        }
    );
});
