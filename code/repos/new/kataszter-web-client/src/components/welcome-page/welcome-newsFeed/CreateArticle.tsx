import React, { useState } from "react";
import { FormattedMessage as FM, useIntl } from "react-intl";
import { Button, Form, Message, Modal } from "semantic-ui-react";

import ICreateArticleData, { NewCreateArticleData } from "../../../data/newsFeed/CreateArticleData";

interface ICreateArticleProps {
    article: ICreateArticleData;
    setArticle(article: ICreateArticleData): void;
    asyncPost(): Promise<void>;
}

const CreateArticle: React.FC<ICreateArticleProps> = (props: ICreateArticleProps) => {
    const { article, setArticle, asyncPost } = props;
    const { formatMessage: fm } = useIntl();

    const [errorMsg, setErrorMsg] = useState(false);
    const [open, setOpen] = useState(false);

    const handleModalChange = (_: any) => {
        if (open) {
            setOpen(false);
        } else {
            setArticle(NewCreateArticleData);
            setOpen(true);
        }
    };

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setArticle({ ...article, [name]: value });
    };

    const handleSubmit = () => {
        if (article.title === "" || article.content === "") {
            setErrorMsg(true);
        } else {
            setErrorMsg(false);
            setOpen(false);
            asyncPost();
        }
    };

    return (
        <>
            <Button color="violet" onClick={handleModalChange}>
                <FM id="news.createPost" />
            </Button>
            <Modal open={open}>
                <Modal.Header>
                    <FM id="news.createPost" />
                </Modal.Header>
                <Modal.Content>
                    <Form onSubmit={handleSubmit}>
                        {errorMsg && (
                            <Message negative>
                                <FM id="formError.invalidOrEmpty" />
                            </Message>
                        )}
                        <Form.Input type="text" name="title" label={fm({ id: "news.title" }) + " *"} onChange={handleChange} />
                        <Form.TextArea type="text" name="content" label={fm({ id: "news.content" }) + " *"} onChange={handleChange} />
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button type="reset" className="ui button" onClick={handleModalChange}>
                        <FM id="news.cancel" />
                    </Button>
                    <Button type="submit" className="ui violet button" onClick={handleSubmit}>
                        <FM id="news.post" />
                    </Button>
                </Modal.Actions>
            </Modal>
        </>
    );
};

export default CreateArticle;
