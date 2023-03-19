/*===================
  LoginForm.unit.test.tsx
 ===================*/
import React from "react";

import { NewTestLabelResponseError, NewTestLoginUserData } from "../../../util/test/data/test-data";
import { createComponentWithIntlAndRouter, mountWithIntlAndRouter } from "../../../util/test/test-wrapper";
import LoginForm from "../LoginForm";

const handlers = {
    setLoginUserData: jest.fn(),
    postLogin: jest.fn(),
    setRecaptchaToken: jest.fn()
};

describe("LoginForm element", () => {
    it("should render the login form with input fields", () => {
        const container = createComponentWithIntlAndRouter(
            <LoginForm loginUserData={NewTestLoginUserData} recaptchaToken="" response={undefined} {...handlers} />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render a message too when there is a response", () => {
        const container = createComponentWithIntlAndRouter(
            <LoginForm loginUserData={NewTestLoginUserData} recaptchaToken="" response={NewTestLabelResponseError} {...handlers} />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should call the setLoginUserData function when the form gets input", () => {
        const container = mountWithIntlAndRouter(
            <LoginForm loginUserData={NewTestLoginUserData} recaptchaToken="" response={undefined} {...handlers} />
        );
        let input = container.find('input[name="email"]');
        input.simulate("change", { target: { value: "test" } });
        input = container.find('input[name="password"]');
        input.simulate("change", { target: { value: "test" } });
        expect(handlers.setLoginUserData).toHaveBeenCalledTimes(2);
    });

    it("should not call the postLogin function when the login gets clicked but the recaptchaToken is not valid", () => {
        const container = mountWithIntlAndRouter(
            <LoginForm loginUserData={NewTestLoginUserData} recaptchaToken="" response={undefined} {...handlers} />
        );
        const input = container.find("button");
        input.simulate("click");
        expect(handlers.postLogin).toHaveBeenCalledTimes(0);
    });
});
