import React from "react";
import { Grid } from "semantic-ui-react";

interface IPageWrapperTwoColumnsProps {
    children: JSX.Element[];
}

const PageWrapperTwoColumns: React.FC<IPageWrapperTwoColumnsProps> = (props: IPageWrapperTwoColumnsProps) => {
    const { children } = props;

    return (
        <Grid relaxed="very" columns={2} centered divided stackable className="wrapperGrid">
            <Grid.Column textAlign="left" verticalAlign="top" computer={4} className="controlColumn" stretched tablet={4}>
                {children[0]}
            </Grid.Column>
            <Grid.Column textAlign="left" computer={10} className="contentColumnScroll" tablet={12}>
                {children[1]}
            </Grid.Column>
        </Grid>
    );
};

export default PageWrapperTwoColumns;
