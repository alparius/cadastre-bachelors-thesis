import IDate, { NewDate } from "../Date";

interface IChangedCareer {
    name: string;
    date: IDate;
}

export let NewChangedCareer: IChangedCareer = {
    name: "",
    date: NewDate
};

export default IChangedCareer;
