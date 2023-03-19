import React, { useState } from "react";
import { FormattedMessage as FM, useIntl } from "react-intl";
import { Button, Form, Message } from "semantic-ui-react";

import ICreateParishData, { NewCreateParishData } from "../../data/parish/CreateParishData";
import ICreateParishResponse from "../../requests/response/CreateParishResponse";

interface ICreateParishFormProps {
    parish: ICreateParishData;
    response: ICreateParishResponse | undefined;
    setParish(parish: ICreateParishData): void;
    asyncPost(): Promise<void>;
}

const CreateParishForm: React.FC<ICreateParishFormProps> = (props: ICreateParishFormProps) => {
    const { parish, setParish, response, asyncPost } = props;
    const { formatMessage } = useIntl();

    const [showErrorMsg, setShowErrorMsg] = useState(false);

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setParish({ ...parish, [name]: value });
    };

    const handleSubmit = () => {
        if (parish.name === "" || parish.cityName === "") {
            setShowErrorMsg(true);
        } else {
            setShowErrorMsg(false);
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
            {showErrorMsg && (
                <Message negative>
                    <FM id="formError.invalidOrEmpty" />
                </Message>
            )}
            <Form.Input type="text" name="name" label={formatMessage({ id: "parish.name" }) + " *"} onChange={handleChange} />
            <Form.Input type="text" name="cityName" label={formatMessage({ id: "parish.cityName" }) + " *"} onChange={handleChange} />
            <Button type="submit" className="ui violet button">
                <FM id="insert.parish" />
            </Button>
            <Button type="reset" className="ui button" onClick={() => setParish(NewCreateParishData)}>
                <FM id="general.reset" />
            </Button>
        </Form>
    );
};

export default CreateParishForm;
