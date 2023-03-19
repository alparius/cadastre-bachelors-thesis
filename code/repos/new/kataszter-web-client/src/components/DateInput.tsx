import React, { useState } from "react";
import { FormattedMessage as FM } from "react-intl";
import { Form, Message } from "semantic-ui-react";

import IDate from "../data/Date";
import checkDate from "../util/dateConverts/checkDate";
import BoldFM from "../util/styledMessages/BoldFM";
import ItalicFM from "../util/styledMessages/ItalicFM";

const regexp = /^[0-9\b]+$/;

interface IDateInputProps {
    date: IDate;
    isGrey?: boolean;
    changeDate(newDate: IDate): void;
}

const DateInput: React.FC<IDateInputProps> = (props: IDateInputProps) => {
    const { date, changeDate, isGrey } = props;

    const [dateIsValid, setDateIsValid] = useState(checkDate(date));

    const handleChange = (event: any) => {
        const { name, value } = event.target;

        if (name === "comment") {
            changeDate({ ...date, comment: value });
        } else if (value === "" || regexp.test(value)) {
            setDateIsValid(checkDate({ ...date, [name]: Number(value) }));
            changeDate({ ...date, [name]: Number(value) });
        }
    };

    return (
        <Form>
            <Form.Group inline unstackable style={{ marginBottom: "-2px" }}>
                <Form.Input
                    style={{ width: "6em" }}
                    fluid
                    id={isGrey ? "grey" : ""}
                    label={<BoldFM id="label.date.year" style={isGrey ? { color: "gray" } : {}} />}
                    type="number"
                    name="year"
                    value={date.year === 0 ? "" : date.year}
                    onChange={handleChange}
                />
                <Form.Input
                    style={{ width: "5em" }}
                    fluid
                    id={isGrey ? "grey" : ""}
                    label={<BoldFM id="label.date.month" style={isGrey ? { color: "gray" } : {}} />}
                    type="number"
                    name="month"
                    value={date.month === 0 ? "" : date.month}
                    onChange={handleChange}
                />
                <Form.Input
                    style={{ width: "5em" }}
                    fluid
                    id={isGrey ? "grey" : ""}
                    label={<BoldFM id="label.date.day" style={isGrey ? { color: "gray" } : {}} />}
                    type="number"
                    name="day"
                    value={date.day === 0 ? "" : date.day}
                    onChange={handleChange}
                />
                {!dateIsValid && (
                    <Form.Field
                        label={
                            <Message negative size="mini">
                                <FM id="formError.invalidDate" />
                            </Message>
                        }
                    />
                )}
            </Form.Group>
            <Form.Input
                fluid
                id={"grey"}
                label={<ItalicFM id="label.date.comment" style={{ color: "gray" }} />}
                name="comment"
                value={date.comment}
                onChange={handleChange}
            />
        </Form>
    );
};

export default DateInput;
