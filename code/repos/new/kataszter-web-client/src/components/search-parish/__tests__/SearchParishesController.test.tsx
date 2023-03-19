/*===================
  SearchParishesController.unit.test.tsx
 ===================*/
import React from "react";

import { NewParishFilters } from "../../../data/parish/ParishFilters";
import { createComponentWithIntl, mountWithIntl } from "../../../util/test/test-wrapper";
import SearchParishesController from "../SearchParishesController";

const handlers = {
    setFilters: jest.fn(),
    resetPagination: jest.fn(),
    toggleMap: jest.fn()
};

describe("SearchParishesController element", () => {
    afterEach(() => {
        handlers.setFilters.mockClear();
        handlers.resetPagination.mockClear();
    });

    it("should render the form with search input fields", () => {
        const container = createComponentWithIntl(<SearchParishesController filters={NewParishFilters} {...handlers} isListView />).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should call the handlePriestNameChange function when the #name input field changes", () => {
        const container = mountWithIntl(<SearchParishesController filters={NewParishFilters} {...handlers} isListView />);
        const input = container.find("input#name");
        input.simulate("change", { target: { value: "te" } });
        input.simulate("change", { target: { value: "st" } });
        expect(handlers.setFilters).toHaveBeenCalledTimes(2);
    });
});
