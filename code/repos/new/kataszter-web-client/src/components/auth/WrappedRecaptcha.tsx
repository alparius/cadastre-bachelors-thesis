import React from "react";
import Recaptcha from "react-recaptcha";

interface IWrappedRecaptchaProps {
    domkey: number;
    handleRecaptcha(value: string): void;
}

const WrappedRecaptcha: React.FC<IWrappedRecaptchaProps> = (props: IWrappedRecaptchaProps) => {
    const { domkey, handleRecaptcha } = props;

    return (
        <div style={{ marginTop: "1em", marginBottom: "3em" }}>
            <Recaptcha
                sitekey={process.env.REACT_APP_RECAPTCHA_SITEKEY}
                hl={localStorage.getItem("languageKey") || "hu"}
                verifyCallback={handleRecaptcha}
                expiredCallback={() => handleRecaptcha("")}
                key={domkey}
            />
        </div>
    );
};

export default WrappedRecaptcha;
