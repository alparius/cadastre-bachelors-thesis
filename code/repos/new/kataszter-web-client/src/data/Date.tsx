interface IDate {
    year: number;
    month: number;
    day: number;
    comment: string;
}

export let NewDate: IDate = {
    year: 0,
    month: 0,
    day: 0,
    comment: ""
};

export default IDate;
