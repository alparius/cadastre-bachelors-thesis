import React, { useState } from "react";
import { FormattedMessage as FM, useIntl } from "react-intl";
import { Button, Form, Message } from "semantic-ui-react";

import IDate from "../../data/Date";
import ICreatePriestData, { NewCreatePriestData } from "../../data/priest/CreatePriestData";
import ICreatePriestResponse from "../../requests/response/CreatePriestResponse";
import BoldFM from "../../util/styledMessages/BoldFM";
import DateInput from "../DateInput";

interface ICreatePriestFormProps {
    priest: ICreatePriestData;
    response: ICreatePriestResponse | undefined;
    setPriest(priest: ICreatePriestData): void;
    asyncPost(): Promise<void>;
}

const CreatePriestForm: React.FC<ICreatePriestFormProps> = (props: ICreatePriestFormProps) => {
    const { priest, setPriest, response, asyncPost } = props;
    const { formatMessage } = useIntl();

    const [errorMsg, setErrorMsg] = useState(false);

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setPriest({ ...priest, [name]: value });
    };

    const dateChange = (newDate: IDate) => {
        setPriest({ ...priest, birthDate: newDate });
    };

    const handleSubmit = () => {
        if (priest.name === "" || priest.birthTown === "" || priest.birthDate.year) {
            setErrorMsg(true);
        } else {
            setErrorMsg(false);
            asyncPost();
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            {response && (
                <Message negative>
                    <FM id={response.label} />
                </Message>
            )}
            {errorMsg && (
                <Message negative>
                    <FM id="formError.invalidOrEmpty" />
                </Message>
            )}
            <Form.Input type="text" name="name" label={formatMessage({ id: "profile.name" }) + " *"} onChange={handleChange} />
            <Form.Field>
                <BoldFM id="profile.birthDate" />
                <b> *</b>
                <DateInput date={priest.birthDate} changeDate={dateChange} />
            </Form.Field>
            <Form.Input type="text" name="birthTown" label={formatMessage({ id: "profile.birthTown" }) + " *"} onChange={handleChange} />
            <Form.Input type="text" name="birthCounty" label={formatMessage({ id: "profile.birthCounty" })} onChange={handleChange} />
            <Form.Input type="text" name="diocese" label={formatMessage({ id: "profile.diocese" })} onChange={handleChange} />
            <Form.Input type="text" name="birthCountry" label={formatMessage({ id: "profile.birthCountry" })} onChange={handleChange} />

            <Button type="submit" className="ui violet button">
                <FM id="insert.priest" />
            </Button>
            <Button type="reset" className="ui button" onClick={() => setPriest(NewCreatePriestData)}>
                <FM id="general.reset" />
            </Button>
        </Form>
    );
};

export default CreatePriestForm;
