/*===================
  ParishGeneralPlacementList.unit.test.tsx
 ===================*/
import React from "react";

import IParishPlacement from "../../../data/parish/ParishPlacement";
import { NewTestDate, NewTestParishPlacement } from "../../../util/test/data/test-data";
import { createComponentWithIntlAndRouter } from "../../../util/test/test-wrapper";
import ParishGeneralPlacementList from "../parish-general-data/ParishGeneralPlacementList";

describe("ParishGeneralPlacementList element", () => {
    it("should render a parish placement list", () => {
        const regularPlacements: IParishPlacement[] = [NewTestParishPlacement];
        const container = createComponentWithIntlAndRouter(<ParishGeneralPlacementList placements={regularPlacements} headerKey="test" />).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render a parish placement list with 'no data' and '-' labels for missing fields", () => {
        const placementWithMissingFields: IParishPlacement = { priestID: 2222, startDate: NewTestDate, endDate: NewTestDate } as any;
        const placementsWithMissingFields: IParishPlacement[] = [placementWithMissingFields];
        const container = createComponentWithIntlAndRouter(
            <ParishGeneralPlacementList placements={placementsWithMissingFields} headerKey="test" />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render an empty list", () => {
        const emptyPlacements: IParishPlacement[] = [];
        const container = createComponentWithIntlAndRouter(<ParishGeneralPlacementList placements={emptyPlacements} headerKey="test" />).toJSON();
        expect(container).toMatchSnapshot();
    });
});
