import IDate, { NewDate } from "../Date";

interface IParishPastName {
    name: string;
    startDate: IDate;
    endDate: IDate;
}

export let NewParishPastName: IParishPastName = {
    name: "",
    startDate: NewDate,
    endDate: NewDate
};

export default IParishPastName;
