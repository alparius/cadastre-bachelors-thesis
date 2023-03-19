/*===================
  SearchPriestsController.unit.test.tsx
 ===================*/
import React from "react";

import { NewTestPriestFilters } from "../../../util/test/data/test-data";
import { createComponentWithIntl, mountWithIntl } from "../../../util/test/test-wrapper";
import SearchPriestsController from "../SearchPriestsController";

const handlers = {
    setFilters: jest.fn(),
    resetPagination: jest.fn()
};

describe("SearchPriestsController element", () => {
    afterEach(() => {
        handlers.setFilters.mockClear();
        handlers.resetPagination.mockClear();
    });

    it("should render the form with search input fields", () => {
        const container = createComponentWithIntl(<SearchPriestsController filters={NewTestPriestFilters} {...handlers} />).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should call the setFilters function when the #name input field changes", () => {
        const container = mountWithIntl(<SearchPriestsController filters={NewTestPriestFilters} {...handlers} />);
        const input = container.find("input#name");
        input.simulate("change", { target: { value: "te" } });
        input.simulate("change", { target: { value: "st" } });
        expect(handlers.setFilters).toHaveBeenCalledTimes(2);
    });

    it("should call the setFilters function when the #birthTown input field changes", () => {
        const container = mountWithIntl(<SearchPriestsController filters={NewTestPriestFilters} {...handlers} />);
        const input = container.find("input#birthTown");
        input.simulate("change", { target: { value: "te" } });
        input.simulate("change", { target: { value: "st" } });
        expect(handlers.setFilters).toHaveBeenCalledTimes(2);
    });

    it("should call the setFilters function when the #placement input field changes", () => {
        const container = mountWithIntl(<SearchPriestsController filters={NewTestPriestFilters} {...handlers} />);
        const input = container.find("input#placement");
        input.simulate("change", { target: { value: "te" } });
        input.simulate("change", { target: { value: "st" } });
        expect(handlers.setFilters).toHaveBeenCalledTimes(2);
    });

    it("should call the setFilters function when the #area input field changes", () => {
        const container = mountWithIntl(<SearchPriestsController filters={NewTestPriestFilters} {...handlers} />);
        const input = container.find("input#area");
        input.simulate("change", { target: { value: "te" } });
        input.simulate("change", { target: { value: "st" } });
        expect(handlers.setFilters).toHaveBeenCalledTimes(2);
    });

    it("should call the resetPagination function when any input field changes", () => {
        const container = mountWithIntl(<SearchPriestsController filters={NewTestPriestFilters} {...handlers} />);
        let input = container.find("input#name");
        input.simulate("change", { target: { value: "te" } });
        input.simulate("change", { target: { value: "st" } });
        input = container.find("input#birthTown");
        input.simulate("change", { target: { value: "te" } });
        input.simulate("change", { target: { value: "st" } });
        input = container.find("input#placement");
        input.simulate("change", { target: { value: "te" } });
        input.simulate("change", { target: { value: "st" } });
        input = container.find("input#area");
        input.simulate("change", { target: { value: "te" } });
        input.simulate("change", { target: { value: "st" } });
        expect(handlers.resetPagination).toHaveBeenCalledTimes(8);
    });
});
