/*===================
  LanguageCard.unit.test.tsx
 ===================*/
import React from "react";
import ILanguageSkills, { NewLanguageSkills } from "../../../../data/priest/LanguageSkills";
import { NewTestWritingSkills } from "../../../../util/test/data/test-data";
import { createComponentWithIntlAndRouter, mountWithIntl } from "../../../../util/test/test-wrapper";
import LanguageCard from "../LanguageCard";

const handlers = {
    handleChangeOnLanguageSkills: jest.fn()
};

describe("PriestCard element", () => {
    afterEach(() => {
        handlers.handleChangeOnLanguageSkills.mockClear();
    });
    it("should render a card with the language data", () => {
        const languageSkills: ILanguageSkills = NewTestWritingSkills;
        const container = createComponentWithIntlAndRouter(
            <LanguageCard languageSkills={languageSkills} editMode label={"writingSkills"} {...handlers} />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it("should render a card with noData label when the language is empty", () => {
        const emptyLanguageSkills: ILanguageSkills = NewLanguageSkills;
        const container = createComponentWithIntlAndRouter(
            <LanguageCard languageSkills={emptyLanguageSkills} editMode label={"writingSkills"} {...handlers} />
        ).toJSON();
        expect(container).toMatchSnapshot();
    });

    it.each([
        [0, "testText", "textTest"],
        [1, "testText", "textTest"],
        [2, "testText", "textTest"]
    ])(
        "should  call handleChangeOnLanguageSkills on %d. input. After first change: %s, After second change: %s",
        (inputNr, firstChange, secondChange) => {
            const languageSkills: ILanguageSkills = NewTestWritingSkills;
            const container = mountWithIntl(<LanguageCard languageSkills={languageSkills} editMode label={"writingSkills"} {...handlers} />);
            const input = container.find("input").at(Number(inputNr));
            input.simulate("change", { target: { value: firstChange } });
            input.simulate("change", { target: { value: secondChange } });
            expect(handlers.handleChangeOnLanguageSkills).toHaveBeenCalledTimes(2);
        }
    );
});
