import React, { useState } from "react";
import { FormattedMessage as FM } from "react-intl";
import { Button, Form, Icon, Label } from "semantic-ui-react";

import "../../../static/priestProfile.css";

interface IFileUpload {
    fileType: string;
    acceptType: string;
    setFiles(newFiles: FileList): void;
    setFileType(newFileType: string): void;
    asyncPostFile(): void;
}

const FileUpload: React.FC<IFileUpload> = (props: IFileUpload) => {
    const { setFiles, setFileType, asyncPostFile, fileType, acceptType } = props;

    const [numberOfFiles, setNumberOfFiles] = useState(0);

    const handleFileSelect = (event: any) => {
        setNumberOfFiles(event.target.files.length);
        setFiles(event.target.files);
        setFileType(fileType);
    };

    const handleSubmit = () => {
        if (numberOfFiles > 0) {
            asyncPostFile();
            setNumberOfFiles(0);
        }
    };

    return (
        <Form>
            <Form.Field>
                <Button as="label" htmlFor="file" type="button" attached="left" color="blue">
                    <Button.Content>
                        <FM id={"profile.chooseFile"} />
                        <Icon name="file" />
                        {numberOfFiles && numberOfFiles > 0 ? (
                            <Label>
                                {`${numberOfFiles} `}
                                <FM id={"profile.fileSelected"} />
                            </Label>
                        ) : (
                            <></>
                        )}
                    </Button.Content>
                </Button>
                <input
                    type="file"
                    id="file"
                    accept={acceptType}
                    multiple
                    hidden
                    onChange={handleFileSelect}
                    onClick={(event: any) => {
                        event.target.value = null;
                    }}
                />
            </Form.Field>
            <Button type="submit" onClick={handleSubmit}>
                <FM id={"profile.upload"} />
            </Button>
        </Form>
    );
};

export default FileUpload;
