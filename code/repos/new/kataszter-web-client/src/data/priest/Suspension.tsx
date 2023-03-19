import IDate, { NewDate } from "../Date";

interface ISuspension {
    startDate: IDate;
    endDate: IDate;
    punishment: string;
}

export let NewSuspension: ISuspension = {
    startDate: NewDate,
    endDate: NewDate,
    punishment: ""
};

export default ISuspension;
