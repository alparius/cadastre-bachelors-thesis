/*===================
  ErrorMsg.unit.test.tsx
 ===================*/
import React from "react";

import { createComponentWithIntlAndRouter } from "../../util/test/test-wrapper";
import ErrorMsg from "../ErrorMsg";

describe("ErrorMsg element", () => {
    it("should render a container with a header containing the error message", () => {
        const container = createComponentWithIntlAndRouter(<ErrorMsg errorMessage="test" />).toJSON();
        expect(container).toMatchSnapshot();
    });
});
