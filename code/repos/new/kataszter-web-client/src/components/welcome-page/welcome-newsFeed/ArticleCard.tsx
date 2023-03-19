import React, { useState } from "react";
import { FormattedMessage as FM } from "react-intl";
import { useIntl } from "react-intl";
import { Button, Card, Confirm, Form, Message, Modal } from "semantic-ui-react";

import UserRole from "../../../data/enums/UserRole";
import IArticleData from "../../../data/newsFeed/ArticleData";
import IUser from "../../../data/user/User";

interface IArticleCardProps {
    article: IArticleData;
    editArticle: IArticleData;
    user: IUser | undefined;
    setEditArticle(article: IArticleData): void;
    asyncPut(): Promise<void>;
    asyncDelete(): Promise<void>;
}

const ArticleCard: React.FC<IArticleCardProps> = (props: IArticleCardProps) => {
    const { article, editArticle, user, setEditArticle, asyncPut, asyncDelete } = props;
    const { formatMessage: fm } = useIntl();

    const [errorMsg, setErrorMsg] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setEditArticle({ ...editArticle, [name]: value });
    };

    const handleEditSubmit = () => {
        if (editArticle.title === "" || editArticle.content === "") {
            setErrorMsg(true);
        } else {
            setErrorMsg(false);
            setEditModalOpen(false);
            asyncPut();
        }
    };

    const handleDeleteSubmit = () => {
        setDeleteConfirmOpen(false);
        asyncDelete();
    };

    const handleEditModalChange = (_: any) => {
        if (editModalOpen) {
            setEditModalOpen(false);
        } else {
            setEditArticle(article);
            setEditModalOpen(true);
        }
    };

    const handleDeleteModalChange = (_: any) => {
        if (deleteConfirmOpen) {
            setDeleteConfirmOpen(false);
        } else {
            setEditArticle(article);
            setDeleteConfirmOpen(true);
        }
    };

    return (
        <>
            <Card key={article.ID} fluid>
                <Card.Content header>
                    {article.title}
                    {user && [UserRole.OWNER, UserRole.ADMIN].includes(user.role) && (
                        <>
                            <Button id="deleteButton" floated="right" icon="trash" color="red" inverted onClick={handleDeleteModalChange} />
                            <Button id="editButton" color="violet" floated="right" icon="edit outline" inverted onClick={handleEditModalChange} />
                        </>
                    )}
                </Card.Content>
                <Card.Content description style={{ "white-space": "pre-wrap" }}>
                    {article.content}
                </Card.Content>
                <Card.Content extra>
                    {fm({ id: "news.postedOn" })}{" "}
                    {new Date(article.date).toLocaleString(localStorage.getItem("languageKey") || "hu", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric"
                    })}
                </Card.Content>
            </Card>

            <Modal open={editModalOpen}>
                <Modal.Header>
                    <FM id="news.editPost" />
                </Modal.Header>
                <Modal.Content>
                    <Form onSubmit={handleEditSubmit}>
                        {errorMsg && (
                            <Message negative>
                                <FM id="formError.invalidOrEmpty" />
                            </Message>
                        )}
                        <Form.Input
                            type="text"
                            value={editArticle.title}
                            name="title"
                            label={fm({ id: "news.title" }) + " *"}
                            onChange={handleChange}
                        />
                        <Form.TextArea
                            type="text"
                            value={editArticle.content}
                            name="content"
                            label={fm({ id: "news.content" }) + " *"}
                            onChange={handleChange}
                        />
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button type="reset" className="ui button" onClick={handleEditModalChange}>
                        <FM id="news.cancel" />
                    </Button>
                    <Button type="submit" className="ui violet button" onClick={handleEditSubmit}>
                        <FM id="news.save" />
                    </Button>
                </Modal.Actions>
            </Modal>

            <Confirm
                content={fm({ id: "confirm.delete.message.article" })}
                open={deleteConfirmOpen}
                confirmButton={fm({ id: "confirm.delete.confirm" })}
                onConfirm={handleDeleteSubmit}
                cancelButton={fm({ id: "confirm.delete.cancel" })}
                onCancel={() => setDeleteConfirmOpen(false)}
            />
        </>
    );
};

export default ArticleCard;
