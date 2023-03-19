/*===================
  PriestCardPlacementList.unit.test.tsx
 ===================*/
import React from "react";

import IPlacement from "../../../data/priest/Placement";
import { NewTestDate, NewTestPlacement } from "../../../util/test/data/test-data";
import { createComponentWithIntlAndRouter } from "../../../util/test/test-wrapper";
import PriestCardPlacementList from "../PriestCardPlacementList";

describe("PriestCardPlacementList element", () => {
    it("should render a priest placement list", () => {
        const regularPlacements: IPlacement[] = [NewTestPlacement];
        const container = createComponentWithIntlAndRouter(<PriestCardPlacementList places={regularPlacements} headerKey="test" />).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render a priest placement list with 'no data' labels for missing fields", () => {
        const placementWithMissingFields: IPlacement = { place: "place", startDate: NewTestDate, endDate: NewTestDate } as any;
        const placementsWithMissingFields: IPlacement[] = [placementWithMissingFields];
        const container = createComponentWithIntlAndRouter(
            <PriestCardPlacementList places={placementsWithMissingFields} headerKey="test" />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render an empty list", () => {
        const emptyPlacements: IPlacement[] = [];
        const container = createComponentWithIntlAndRouter(<PriestCardPlacementList places={emptyPlacements} headerKey="test" />).toJSON();
        expect(container).toMatchSnapshot();
    });
});
