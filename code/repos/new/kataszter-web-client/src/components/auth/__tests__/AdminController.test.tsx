/*===================
  AdminController.unit.test.tsx
 ===================*/
import React from "react";

import { createComponentWithIntl, mountWithIntl } from "../../../util/test/test-wrapper";
import AdminController from "../AdminController";

describe("AdminController element", () => {
    it("should render a menu", () => {
        const container = createComponentWithIntl(<AdminController activeMenu="all" setActiveMenu={jest.fn()} />).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should call the setActiveMenu function when it gets clicked", () => {
        const setMenu = jest.fn();
        const container = mountWithIntl(<AdminController activeMenu="all" setActiveMenu={setMenu} />);
        const input = container.find('[name="admin"]');
        input.simulate("click");
        expect(setMenu).toHaveBeenCalledTimes(1);
    });
});
