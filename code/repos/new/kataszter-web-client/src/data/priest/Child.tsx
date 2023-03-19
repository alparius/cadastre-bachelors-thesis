import IDate, { NewDate } from "../Date";

interface IChild {
    name: string;
    birthPlace: string;
    birthDate: IDate;
}

export let NewChild: IChild = {
    name: "",
    birthPlace: "",
    birthDate: NewDate
};

export default IChild;
