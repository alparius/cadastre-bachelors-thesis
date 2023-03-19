import IDate, { NewDate } from "../Date";

interface ICreatePriestData {
    name: string;
    birthDate: IDate;
    birthCountry: string;
    birthCounty: string;
    birthTown: string;
    diocese: string;
}

export let NewCreatePriestData: ICreatePriestData = {
    name: "",
    birthDate: NewDate,
    birthCountry: "",
    birthCounty: "",
    birthTown: "",
    diocese: ""
};

export default ICreatePriestData;
