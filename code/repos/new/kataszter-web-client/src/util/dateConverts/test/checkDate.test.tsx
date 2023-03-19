/*===================
  checkDate.unit.test.tsx
 ===================*/
import IDate from "../../../data/Date";
import { NewTestDate } from "../../test/data/test-data";
import checkDate from "../checkDate";

describe("checkDate function", () => {
    it.each([
        [NewTestDate],
        [{ year: 0, month: 1, day: 1, comment: "1" } as IDate],
        [{ month: 1, day: 1, comment: "" } as any],
        [{ year: 2001, month: 0, day: 1, comment: "1" } as IDate],
        [{ year: 2001, day: 1, comment: "" } as any],
        [{ year: 2001, month: 1, day: 0, comment: "" } as IDate],
        [{ year: 2001, month: 1, comment: "" } as any]
    ])("the date '%s' should be valid ", (date: IDate) => {
        expect(checkDate(date)).toEqual(true);
    });

    it.each([[{ year: -1, month: 1, day: 1, comment: "1" } as IDate], [{ year: 10000, month: 1, day: 1, comment: "1" } as IDate]])(
        "the date '%s' should not be valid because of the year",
        (date: IDate) => {
            expect(checkDate(date)).toEqual(false);
        }
    );

    it.each([[{ year: 2001, month: -1, day: 1, comment: "1" } as IDate], [{ year: 2001, month: 13, day: 1, comment: "1" } as IDate]])(
        "the date '%s' should not be valid because of the month",
        (date: IDate) => {
            expect(checkDate(date)).toEqual(false);
        }
    );

    it.each([
        [{ year: 2001, month: 1, day: 31, comment: "1" } as IDate, true],
        [{ year: 2001, month: 1, day: 32, comment: "1" } as IDate, false],
        [{ year: 2001, month: 2, day: 29, comment: "1" } as IDate, false],
        [{ year: 2016, month: 2, day: 29, comment: "1" } as IDate, true],
        [{ year: 2001, month: 4, day: 30, comment: "1" } as IDate, true],
        [{ year: 2016, month: 4, day: 31, comment: "1" } as IDate, false],
        [{ year: 2001, month: 13, day: 1, comment: "1" } as IDate, false]
    ])("the validation of the date '%s' should return %s (month-day checking)", (date, expecting) => {
        expect(checkDate(date as IDate)).toEqual(expecting);
    });
});
