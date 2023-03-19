import IDate, { NewDate } from "../Date";

interface ISpouse {
    name: string;
    birthDate: IDate;
    job: string;
    marriageDate: IDate;
    fatherName: string;
    motherName: string;
}

export let NewSpouse: ISpouse = {
    name: "",
    birthDate: NewDate,
    job: "",
    marriageDate: NewDate,
    fatherName: "",
    motherName: ""
};

export default ISpouse;
