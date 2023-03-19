/*===================
  RegisterForm.unit.test.tsx
 ===================*/
import React from "react";

import { NewRegisterUserData } from "../../../data/user/RegisterUserData";
import { NewTestLabelResponseError, NewTestRegisterUserData } from "../../../util/test/data/test-data";
import { createComponentWithIntlAndRouter, mountWithIntlAndRouter } from "../../../util/test/test-wrapper";
import RegisterForm from "../RegisterForm";

const handlers = {
    setUser: jest.fn(),
    asyncPost: jest.fn()
};

describe("RegisterForm element", () => {
    it("should render the register form with input fields", () => {
        const container = createComponentWithIntlAndRouter(
            <RegisterForm user={NewTestRegisterUserData} response={undefined} {...handlers} />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render a message too when there is a response", () => {
        const container = createComponentWithIntlAndRouter(
            <RegisterForm user={NewTestRegisterUserData} response={NewTestLabelResponseError} {...handlers} />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should call the setUser function when the form gets input", () => {
        const container = mountWithIntlAndRouter(<RegisterForm user={NewTestRegisterUserData} response={undefined} {...handlers} />);
        let input = container.find('input[name="name"]');
        input.simulate("change", { target: { value: "test" } });
        input = container.find('input[name="email"]');
        input.simulate("change", { target: { value: "test" } });
        input = container.find('input[name="password"]');
        input.simulate("change", { target: { value: "test" } });
        input = container.find('input[name="password2"]');
        input.simulate("change", { target: { value: "test" } });
        input = container.find('textarea[name="message"]');
        input.simulate("change", { target: { value: "test" } });
        expect(handlers.setUser).toHaveBeenCalledTimes(5);
    });
});
