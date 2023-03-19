import React from "react";
import { FormattedMessage as FM } from "react-intl";

interface IUnderlineFMProps {
    id: string;
    showColon?: boolean;
}

const UnderlineFM = (props: IUnderlineFMProps) => {
    const { id, showColon } = props;
    return (
        <FM id={id}>
            {(txt) => (
                <u>
                    {txt}
                    {showColon && ":"}
                </u>
            )}
        </FM>
    );
};

export default UnderlineFM;
