import IDate, { NewDate } from "../Date";
import IPlacement, { NewPlacement } from "./Placement";

interface IPriestMin {
    ID: number;
    name: string;
    verified: boolean;
    birthDate: IDate;
    deathDate: IDate;
    birthTown: string;
    subscriptionDate: IDate;
    graduationDate: IDate;
    birthCountry: string;
    birthCounty: string;
    diocese: string;
    assistantPriestPlaces: IPlacement[];
    mainPriestPlaces: IPlacement[];
}

export let NewPriestMin: IPriestMin = {
    ID: 0,
    name: "",
    verified: false,
    birthDate: NewDate,
    deathDate: NewDate,
    subscriptionDate: NewDate,
    graduationDate: NewDate,
    birthTown: "",
    birthCountry: "",
    birthCounty: "",
    diocese: "",
    assistantPriestPlaces: [NewPlacement],
    mainPriestPlaces: [NewPlacement]
};

export default IPriestMin;
