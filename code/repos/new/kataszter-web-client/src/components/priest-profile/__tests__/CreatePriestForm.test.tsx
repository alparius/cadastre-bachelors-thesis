/*===================
  CreatePriestForm.unit.test.tsx
 ===================*/
import React from "react";

import ICreatePriestData from "../../../data/priest/CreatePriestData";
import ILabelResponse from "../../../requests/response/LabelResponse";
import { NewTestCreatePriestData, NewTestCreateResponse, NewTestLabelResponseError } from "../../../util/test/data/test-data";
import { createComponentWithIntlAndRouter, mountWithIntlAndRouter } from "../../../util/test/test-wrapper";
import CreatePriestForm from "../CreatePriestForm";

const handlers = {
    setPriest: jest.fn(),
    asyncPost: jest.fn()
};

const priest: ICreatePriestData = NewTestCreatePriestData;

describe("CreatePriestForm element", () => {
    afterEach(() => {
        handlers.setPriest.mockClear();
    });

    it("should render a form", () => {
        const container = createComponentWithIntlAndRouter(<CreatePriestForm priest={priest} response={undefined} {...handlers} />).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render a message too when there is a response", () => {
        const container = createComponentWithIntlAndRouter(
            <CreatePriestForm priest={priest} response={NewTestCreateResponse} {...handlers} />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should call the setPriest function when the form gets input", () => {
        const container = mountWithIntlAndRouter(<CreatePriestForm priest={priest} response={undefined} {...handlers} />);
        container.find('input[name="name"]').simulate("change", { target: { value: "test" } });
        container.find('input[name="birthCountry"]').simulate("change", { target: { value: "test" } });
        container.find('input[name="birthCounty"]').simulate("change", { target: { value: "test" } });
        container.find('input[name="birthTown"]').simulate("change", { target: { value: "test" } });
        container.find('input[name="diocese"]').simulate("change", { target: { value: "test" } });
        expect(handlers.setPriest).toHaveBeenCalledTimes(5);
    });
});
