import IDate from "../../data/Date";

const dateIntoString = (date: IDate) => {
    let shownDateInString = "";
    let month;
    let day;
    if (date.month === 0) {
        month = "";
    } else {
        if (date.month < 10) {
            month = "0" + date.month;
        } else {
            month = date.month;
        }
    }
    if (date.day === 0) {
        day = "";
    } else {
        if (date.day < 10) {
            day = "0" + date.day;
        } else {
            day = date.day;
        }
    }

    if (date.year) {
        shownDateInString = shownDateInString + date.year;
        if (month) {
            shownDateInString = shownDateInString + "." + month;
            if (day) {
                shownDateInString = shownDateInString + "." + day;
            }
        }
    }

    return shownDateInString;
};

export default dateIntoString;
