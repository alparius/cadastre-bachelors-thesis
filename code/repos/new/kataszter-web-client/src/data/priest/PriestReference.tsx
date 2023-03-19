import IDate, { NewDate } from "../Date";

interface IPriestReference {
    place: string;
    date: IDate;
}

export let NewPriestReference: IPriestReference = {
    place: "",
    date: NewDate
};

export default IPriestReference;
