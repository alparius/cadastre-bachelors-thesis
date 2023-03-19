import IDate, { NewDate } from "../Date";

interface ILiteraryWork {
    title: string;
    published: IDate;
    publisher: string;
}

export let NewLiteraryWork: ILiteraryWork = {
    title: "",
    published: NewDate,
    publisher: ""
};

export default ILiteraryWork;
