/*===================
  CardRowPlacementDropDown.unit.test.tsx
 ===================*/
import React from "react";

import { NewTestParishMin } from "../../../../util/test/data/test-data";
import { createComponentWithIntlAndRouter } from "../../../../util/test/test-wrapper";
import CardRowPlacementDropDown from "../CardRowPlacementDropDown";

const handlers = {
    index: 0,
    placeID: 0,
    placeName: "test",
    handlePlacementChange: jest.fn()
};

describe("CardRowPlacementDropDown element", () => {
    it("should render a dropdown list if there is no error and data is available", () => {
        const container = createComponentWithIntlAndRouter(
            <CardRowPlacementDropDown editMode parishLoading={false} parishShowError={false} parishResponse={[NewTestParishMin]} {...handlers} />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render a label if the data is loading", () => {
        const container = createComponentWithIntlAndRouter(
            <CardRowPlacementDropDown editMode parishLoading parishShowError={false} parishResponse={[NewTestParishMin]} {...handlers} />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render a label if there is a (connection) error", () => {
        const container = createComponentWithIntlAndRouter(
            <CardRowPlacementDropDown editMode parishLoading={false} parishShowError parishResponse={[NewTestParishMin]} {...handlers} />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render a label if the response is empty", () => {
        const container = createComponentWithIntlAndRouter(
            <CardRowPlacementDropDown editMode parishLoading={false} parishShowError={false} parishResponse={[]} {...handlers} />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render a label if its not in editmode", () => {
        const container = createComponentWithIntlAndRouter(
            <CardRowPlacementDropDown
                editMode={false}
                parishLoading={false}
                parishShowError={false}
                parishResponse={[NewTestParishMin]}
                {...handlers}
            />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });
});
