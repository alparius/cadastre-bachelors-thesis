/*===================
  AdminContainer.unit.test.tsx
 ===================*/
import React from "react";

import IUser from "../../../data/user/User";
import { NewTestLabelResponseError, NewTestLabelResponseInfo, NewTestUser, NewTestUserUnderDecisionData } from "../../../util/test/data/test-data";
import { createComponentWithIntl, createComponentWithIntlAndRouter } from "../../../util/test/test-wrapper";
import AdminContainer from "../AdminContainer";

const users: IUser[] = [NewTestUser];

const handlers = {
    userUnderDecision: NewTestUserUnderDecisionData,
    activeMenu: "",
    selfID: 678,
    setUserUnderDecision: jest.fn(),
    asyncPost: jest.fn(),
    asyncDelete: jest.fn()
};

describe("AdminContainer element", () => {
    it("should render a segment group when the users array is not empty", () => {
        const container = createComponentWithIntl(
            <AdminContainer
                users={users}
                loading={false}
                fetchShowError={false}
                postShowError={false}
                deleteShowError={false}
                deleteResponse={undefined}
                postResponse={undefined}
                {...handlers}
            />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render a placeholder card and a message when the users array is empty", () => {
        const emptyUsers: IUser[] = [];
        const container = createComponentWithIntl(
            <AdminContainer
                users={emptyUsers}
                loading={false}
                fetchShowError={false}
                postShowError={false}
                deleteShowError={false}
                deleteResponse={undefined}
                postResponse={undefined}
                {...handlers}
            />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render an error message when fetchShowError is true", () => {
        const container = createComponentWithIntlAndRouter(
            <AdminContainer
                users={users}
                loading={false}
                fetchShowError
                postShowError={false}
                deleteShowError={false}
                deleteResponse={undefined}
                postResponse={undefined}
                {...handlers}
            />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should also render an error message when postShowError is true", () => {
        const container = createComponentWithIntl(
            <AdminContainer
                users={users}
                loading={false}
                fetchShowError={false}
                postShowError
                deleteShowError={false}
                deleteResponse={undefined}
                postResponse={undefined}
                {...handlers}
            />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should also render an error message when deleteShowError is true", () => {
        const container = createComponentWithIntl(
            <AdminContainer
                users={users}
                loading={false}
                fetchShowError={false}
                postShowError={false}
                deleteShowError
                deleteResponse={undefined}
                postResponse={undefined}
                {...handlers}
            />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render an error message when showError and loading are both true", () => {
        const container = createComponentWithIntlAndRouter(
            <AdminContainer
                users={users}
                loading
                fetchShowError
                postShowError
                deleteShowError
                deleteResponse={undefined}
                postResponse={undefined}
                {...handlers}
            />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render a placeholder card when only loading is true", () => {
        const container = createComponentWithIntl(
            <AdminContainer
                users={users}
                loading
                fetchShowError={false}
                postShowError={false}
                deleteShowError={false}
                deleteResponse={undefined}
                postResponse={undefined}
                {...handlers}
            />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should also render a message when response exists", () => {
        const container = createComponentWithIntl(
            <AdminContainer
                users={users}
                loading
                fetchShowError={false}
                postShowError={false}
                deleteShowError={false}
                deleteResponse={NewTestLabelResponseInfo}
                postResponse={undefined}
                {...handlers}
            />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should also render an error when a bad response exists", () => {
        const container = createComponentWithIntl(
            <AdminContainer
                users={users}
                loading
                fetchShowError={false}
                postShowError={false}
                deleteShowError={false}
                deleteResponse={undefined}
                postResponse={NewTestLabelResponseError}
                {...handlers}
            />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });
});
