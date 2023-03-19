/*===================
  SearchPriestsContainer.unit.test.tsx
 ===================*/
import React from "react";

import IPriestMin from "../../../data/priest/PriestMin";
import { NewTestPriestMin } from "../../../util/test/data/test-data";
import { createComponentWithIntlAndRouter } from "../../../util/test/test-wrapper";
import SearchPriestsContainer from "../SearchPriestsContainer";

const handlers = {
    setCurrentPage: jest.fn()
};

const priests: IPriestMin[] = [NewTestPriestMin];

describe("SearchPriestsContainer element", () => {
    afterEach(() => {
        handlers.setCurrentPage.mockClear();
    });

    it("should render a card group when the priests array is not empty", () => {
        const container = createComponentWithIntlAndRouter(
            <SearchPriestsContainer priests={priests} loading={false} showError={false} currentPage={1} {...handlers} />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render a placeholder card and a message when the priests array is empty", () => {
        const emptyPriests: IPriestMin[] = [];
        const container = createComponentWithIntlAndRouter(
            <SearchPriestsContainer priests={emptyPriests} loading={false} showError={false} currentPage={1} {...handlers} />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render an error message when showError is true", () => {
        const container = createComponentWithIntlAndRouter(
            <SearchPriestsContainer priests={priests} loading={false} showError currentPage={1} {...handlers} />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render an error message when showError and loading are both true", () => {
        const container = createComponentWithIntlAndRouter(
            <SearchPriestsContainer priests={priests} loading showError currentPage={1} {...handlers} />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render a placeholder card when only loading is true", () => {
        const container = createComponentWithIntlAndRouter(
            <SearchPriestsContainer priests={priests} loading showError={false} currentPage={1} {...handlers} />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });
});
