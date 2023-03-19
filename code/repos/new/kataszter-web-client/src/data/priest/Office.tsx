import IDate, { NewDate } from "../Date";

interface IOffice {
    name: string;
    startDate: IDate;
    endDate: IDate;
    comment: string;
}

export let NewOffice: IOffice = {
    name: "",
    startDate: NewDate,
    endDate: NewDate,
    comment: ""
};

export default IOffice;
