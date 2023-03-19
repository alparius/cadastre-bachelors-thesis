import IDate, { NewDate } from "../Date";

interface IPlacement {
    ID?: number;
    placeID: number;
    place: string;
    startDate: IDate;
    endDate: IDate;
}

export let NewPlacement: IPlacement = {
    placeID: 0,
    place: "",
    startDate: NewDate,
    endDate: NewDate
};

export default IPlacement;
