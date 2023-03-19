/*===================
  PriestCard.unit.test.tsx
 ===================*/
import React from "react";

import IParishMin from "../../../data/parish/ParishMin";
import { NewTestParishMin } from "../../../util/test/data/test-data";
import { createComponentWithIntlAndRouter } from "../../../util/test/test-wrapper";
import ParishCard from "../ParishCard";

describe("ParishCard element", () => {
    it("should render a card with the parish data", () => {
        const regularParish: IParishMin = NewTestParishMin;
        const container = createComponentWithIntlAndRouter(<ParishCard parish={regularParish} />).toJSON();
        expect(container).toMatchSnapshot();
    });
});
