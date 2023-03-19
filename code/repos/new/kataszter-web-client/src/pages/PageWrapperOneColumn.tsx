import React from "react";
import { Grid } from "semantic-ui-react";

interface IPageWrapperOneColumnProps {
    children: JSX.Element;
}

const PageWrapperOneColumn: React.FC<IPageWrapperOneColumnProps> = (props: IPageWrapperOneColumnProps) => {
    const { children } = props;

    return (
        <Grid relaxed="very" centered divided stackable className="wrapperGrid">
            <Grid.Column textAlign="center" className="contentColumn">
                {children}
            </Grid.Column>
        </Grid>
    );
};

export default PageWrapperOneColumn;
