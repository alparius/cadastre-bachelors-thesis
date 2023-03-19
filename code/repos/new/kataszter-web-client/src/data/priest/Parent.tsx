import IDate, { NewDate } from "../Date";

interface IParent {
    name: string;
    job: string;
    birthDate: IDate;
    deathDate: IDate;
}

export let NewParent: IParent = {
    name: "",
    job: "",
    birthDate: NewDate,
    deathDate: NewDate
};

export default IParent;
