import React from "react";
import { Form } from "semantic-ui-react";

import { isNumber } from "util";
import IDate from "../../data/Date";
import "../../static/priestProfile.css";
import BoldFM from "../../util/styledMessages/BoldFM";
import DateDisplay from "../DateDisplay";
import DateInput from "../DateInput";

interface ICardRowForDateProps {
    labelName: string;
    dataName?: string;
    index?: number;
    data: IDate;
    editMode: boolean;
    setValue(labelName: string, value: any, index?: number): any;
}

const CardRowForDate: React.FC<ICardRowForDateProps> = (props: ICardRowForDateProps) => {
    const { labelName, dataName, data, editMode, setValue, index } = props;

    const handleChange = (newDate: IDate) => {
        if (dataName) {
            if (isNumber(index)) {
                setValue(dataName, newDate, index);
            } else {
                setValue(dataName, newDate);
            }
        } else {
            if (isNumber(index)) {
                setValue(labelName, newDate, index);
            } else {
                setValue(labelName, newDate);
            }
        }
    };

    return (
        <Form>
            <Form.Field inline>
                <BoldFM id={"profile." + labelName} showColon />{" "}
                {editMode ? <DateInput date={data} changeDate={handleChange} /> : <DateDisplay date={data} />}
            </Form.Field>
        </Form>
    );
};

export default CardRowForDate;
