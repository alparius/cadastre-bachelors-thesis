import IDate, { NewDate } from "../Date";

interface IConsecration {
    place: string;
    date: IDate;
}

export let NewConsecration: IConsecration = {
    place: "",
    date: NewDate
};

export default IConsecration;
