/*===================
  SearchParishesContainer.unit.test.tsx
 ===================*/
import React from "react";

import IParishMin from "../../../data/parish/ParishMin";
import { NewTestParishMin } from "../../../util/test/data/test-data";
import { createComponentWithIntlAndRouter } from "../../../util/test/test-wrapper";
import SearchParishesContainer from "../SearchParishesContainer";

const handlers = {
    setCurrentPage: jest.fn()
};

const parishes: IParishMin[] = [NewTestParishMin];

describe("SearchParishesContainer element", () => {
    afterEach(() => {
        handlers.setCurrentPage.mockClear();
    });

    it("should render a card group when the parishes array is not empty", () => {
        const container = createComponentWithIntlAndRouter(
            <SearchParishesContainer parishes={parishes} isListView loading={false} showError={false} currentPage={1} {...handlers} />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render a placeholder card and a message when the parishes array is empty", () => {
        const emptyParishes: IParishMin[] = [];
        const container = createComponentWithIntlAndRouter(
            <SearchParishesContainer parishes={emptyParishes} isListView loading={false} showError={false} currentPage={1} {...handlers} />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render an error message when showError is true", () => {
        const container = createComponentWithIntlAndRouter(
            <SearchParishesContainer parishes={parishes} isListView loading={false} showError currentPage={1} {...handlers} />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render an error message when showError is true, for map view", () => {
        const container = createComponentWithIntlAndRouter(
            <SearchParishesContainer parishes={parishes} isListView={false} loading={false} showError currentPage={1} {...handlers} />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render an error message when showError and loading are both true", () => {
        const container = createComponentWithIntlAndRouter(
            <SearchParishesContainer parishes={parishes} isListView loading showError currentPage={1} {...handlers} />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render an error message when showError and loading are both true, for map view", () => {
        const container = createComponentWithIntlAndRouter(
            <SearchParishesContainer parishes={parishes} isListView={false} loading showError currentPage={1} {...handlers} />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render a placeholder card when only loading is true", () => {
        const container = createComponentWithIntlAndRouter(
            <SearchParishesContainer parishes={parishes} isListView loading showError={false} currentPage={1} {...handlers} />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render a placeholder card when only loading is true, for map view", () => {
        const container = createComponentWithIntlAndRouter(
            <SearchParishesContainer parishes={parishes} isListView={false} loading showError={false} currentPage={1} {...handlers} />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });
});
