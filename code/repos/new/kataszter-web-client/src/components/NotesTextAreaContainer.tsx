import React from "react";
import { Form, TextArea } from "semantic-ui-react";

import "../static/priestProfile.css";

interface INotesTextAreaContainerProps {
    labelName: string;
    data: string;
    editMode: boolean;
    textAreaSize: number;
    setData(labelName: string, value: any): any;
}

const NotesTextAreaContainer: React.FC<INotesTextAreaContainerProps> = (props: INotesTextAreaContainerProps) => {
    const { labelName, textAreaSize, data, editMode, setData } = props;

    const handleChange = (event: any) => {
        setData(labelName, event.target.value);
    };

    return (
        <Form>
            <TextArea value={data} style={{ minHeight: textAreaSize }} onChange={handleChange} disabled={!editMode} />
        </Form>
    );
};

export default NotesTextAreaContainer;
