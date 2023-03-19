import IDate from "../../data/Date";

const checkDate = (date: IDate): boolean => {
    if (date.year && (date.year === 0 || date.year < 1000 || date.year > 9999)) {
        return false;
    } else if (date.month && (date.month < 0 || date.month > 12)) {
        return false;
    } else if (date.day && (date.day < 0 || date.day > 31)) {
        return false;
    }

    if (date.day && date.month && date.year) {
        const d = new Date(date.year, date.month - 1, date.day);
        if (d.getFullYear() !== date.year || d.getMonth() !== date.month - 1 || d.getDate() !== date.day) {
            return false;
        }
    }

    return true;
};

export default checkDate;
