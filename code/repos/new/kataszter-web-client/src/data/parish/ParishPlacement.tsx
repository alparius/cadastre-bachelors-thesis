import IDate, { NewDate } from "../Date";

interface IParishPlacement {
    ID?: number;
    priestID: number;
    priestName: string;
    startDate: IDate;
    endDate: IDate;
    numberOfPeople: string;
}

export let NewParishPlacement: IParishPlacement = {
    priestID: 0,
    priestName: "",
    startDate: NewDate,
    endDate: NewDate,
    numberOfPeople: ""
};

export default IParishPlacement;
