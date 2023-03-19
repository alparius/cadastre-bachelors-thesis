import IDate, { NewDate } from "../Date";

interface IMainPlacement {
    ID?: number;
    placeID: number;
    place: string;
    startDate: IDate;
    endDate: IDate;
    munimentGenesisDate: IDate;
    munimentNumber: string;
    munimentIssuingAuthority: string;
    income: string;
    numberOfPeople: string;
}

export let NewMainPlacement: IMainPlacement = {
    placeID: 0,
    place: "",
    startDate: NewDate,
    endDate: NewDate,
    munimentGenesisDate: NewDate,
    munimentNumber: "",
    munimentIssuingAuthority: "",
    income: "",
    numberOfPeople: ""
};

export default IMainPlacement;
