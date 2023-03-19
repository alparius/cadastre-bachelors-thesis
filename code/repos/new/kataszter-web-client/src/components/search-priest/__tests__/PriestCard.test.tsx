/*===================
  PriestCard.unit.test.tsx
 ===================*/
import React from "react";

import IPriestMin from "../../../data/priest/PriestMin";
import { NewTestDate, NewTestPriestMin } from "../../../util/test/data/test-data";
import { createComponentWithIntlAndRouter } from "../../../util/test/test-wrapper";
import PriestCard from "../PriestCard";

describe("PriestCard element", () => {
    it("should render a card with the priest data", () => {
        const regularPriest: IPriestMin = NewTestPriestMin;
        const container = createComponentWithIntlAndRouter(<PriestCard priest={regularPriest} />).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render a card with with the priest data and 'no data' labels for missing fields", () => {
        const priestWithMissingFields: IPriestMin = {
            id: 1,
            name: "name",
            birthDate: NewTestDate,
            deathDate: NewTestDate,
            graduationDate: NewTestDate,
            retirementDate: NewTestDate,
            subscriptionDate: NewTestDate
        } as any;
        const container = createComponentWithIntlAndRouter(<PriestCard priest={priestWithMissingFields} />).toJSON();
        expect(container).toMatchSnapshot();
    });
});
