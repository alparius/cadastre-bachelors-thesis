import React from "react";
import { Popup } from "semantic-ui-react";

import IDate from "../data/Date";
import dateIntoString from "../util/dateConverts/dateIntoString";
import ItalicFM from "../util/styledMessages/ItalicFM";

interface IDateDisplayProps {
    date: IDate;
}

const DateDisplay: React.FC<IDateDisplayProps> = (props: IDateDisplayProps) => {
    const { date } = props;

    const dateText = dateIntoString(date);

    if (dateText) {
        if (date.comment) {
            return <Popup content={date.comment} key={date.comment} trigger={<span>{dateText}</span>} />;
        } else {
            return <>{dateText}</>;
        }
    } else {
        if (date.comment) {
            return <i style={{ color: "gray" }}>{date.comment}</i>;
        } else {
            return <ItalicFM id="general.noData" />;
        }
    }
};

export default DateDisplay;
