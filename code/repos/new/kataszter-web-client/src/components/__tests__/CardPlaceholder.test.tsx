/*===================
  CardPlaceholder.unit.test.tsx
 ===================*/
import React from "react";
import renderer from "react-test-renderer";

import CardPlaceholder from "../CardPlaceholder";

describe("CardPlaceholder element", () => {
    it("should render a card with placeholder lines in it", () => {
        const container = renderer.create(<CardPlaceholder />).toJSON();
        expect(container).toMatchSnapshot();
    });
});
