/*===================
  MainPlacementCard.unit.test.tsx
 ===================*/
import React from "react";

import { NewTestMainPlacement } from "../../../../util/test/data/test-data";
import { createComponentWithIntlAndRouter, mountWithIntlAndRouter } from "../../../../util/test/test-wrapper";
import MainPlacementCard from "../MainPlacementCard";

const handlers = {
    handleDeletePlacement: jest.fn(),
    handleChangeOnPlacementField: jest.fn(),
    handlePlacementChange: jest.fn(),
    parishResponse: undefined,
    parishLoading: false,
    parishShowError: false
};

describe("MainPlacementCard element", () => {
    afterEach(() => {
        handlers.handleDeletePlacement.mockClear();
        handlers.handleChangeOnPlacementField.mockClear();
        handlers.handlePlacementChange.mockClear();
    });

    it("should render a card with the placement data", () => {
        const container = createComponentWithIntlAndRouter(
            <MainPlacementCard placement={NewTestMainPlacement} index={0} editMode={false} {...handlers} />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should call handleDeletePlacement if deleteButton pressed", () => {
        const container = mountWithIntlAndRouter(<MainPlacementCard placement={NewTestMainPlacement} index={0} editMode {...handlers} />);
        container
            .find("#deleteButton")
            .at(0)
            .simulate("click");

        expect(handlers.handleDeletePlacement).toHaveBeenCalledTimes(1);
    });

    it.each([
        [1, "1", "2"],
        [2, "1", "2"],
        [3, "1", "2"],
        [4, "1", "2"],
        [5, "1", "2"],
        [6, "1", "2"],
        [7, "1", "2"]
    ])(
        "should  call handleChangeOnPlacementField on %d. input. After first change: %s, After second change: %s",
        (inputNr, firstChange, secondChange) => {
            const container = mountWithIntlAndRouter(<MainPlacementCard placement={NewTestMainPlacement} index={0} editMode {...handlers} />);
            const input = container.find("input").at(Number(inputNr));
            input.simulate("change", { target: { value: firstChange } });
            input.simulate("change", { target: { value: secondChange } });
            expect(handlers.handleChangeOnPlacementField).toHaveBeenCalledTimes(2);
        }
    );
});
