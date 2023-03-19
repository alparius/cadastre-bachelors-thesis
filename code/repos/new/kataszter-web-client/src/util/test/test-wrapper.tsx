import { mount } from "enzyme";
import React from "react";
import { IntlProvider } from "react-intl";
import { BrowserRouter } from "react-router-dom";
import renderer, { TestRendererOptions } from "react-test-renderer";

import allLanguagesConfig from "../../translation/allLanguagesConfig";
const languageConfig = allLanguagesConfig[0];

export const createComponentWithIntl = (children: JSX.Element, options?: TestRendererOptions) => {
    return renderer.create(
        // tslint:disable-next-line: jsx-wrap-multiline
        <IntlProvider key={languageConfig.locale} locale={languageConfig.locale} messages={languageConfig.messages}>
            {children}
        </IntlProvider>,
        options
    );
};

export const createComponentWithRouter = (children: JSX.Element, options?: TestRendererOptions) => {
    return renderer.create(<BrowserRouter>{children}</BrowserRouter>, options);
};

export const createComponentWithIntlAndRouter = (children: JSX.Element, options?: TestRendererOptions) => {
    return renderer.create(
        // tslint:disable-next-line: jsx-wrap-multiline
        <BrowserRouter>
            <IntlProvider key={languageConfig.locale} locale={languageConfig.locale} messages={languageConfig.messages}>
                {children}
            </IntlProvider>
        </BrowserRouter>,
        options
    );
};

export const mountWithIntl = (children: JSX.Element) => {
    return mount(
        <IntlProvider key={languageConfig.locale} locale={languageConfig.locale} messages={languageConfig.messages}>
            {children}
        </IntlProvider>
    );
};

export const mountWithIntlAndRouter = (children: JSX.Element) => {
    return mount(
        // tslint:disable-next-line: jsx-wrap-multiline
        <BrowserRouter>
            <IntlProvider key={languageConfig.locale} locale={languageConfig.locale} messages={languageConfig.messages}>
                {children}
            </IntlProvider>
        </BrowserRouter>
    );
};
