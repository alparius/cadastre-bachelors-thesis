import React from "react";
import { Card, Placeholder } from "semantic-ui-react";

const CardPlaceholder: React.FC = () => {
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>
                    <Placeholder>
                        <Placeholder.Header>
                            <Placeholder.Line />
                        </Placeholder.Header>
                    </Placeholder>
                </Card.Header>
                <Card.Description>
                    <Placeholder>
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                    </Placeholder>
                </Card.Description>
            </Card.Content>
        </Card>
    );
};

export default CardPlaceholder;
