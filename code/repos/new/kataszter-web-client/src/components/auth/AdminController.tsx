import React from "react";
import { FormattedMessage as FM } from "react-intl";
import { Header, Menu } from "semantic-ui-react";

interface IAdminControllerProps {
    activeMenu: string;
    setActiveMenu(newActiveMenu: string): void;
}

const AdminController: React.FC<IAdminControllerProps> = (props: IAdminControllerProps) => {
    const { activeMenu, setActiveMenu } = props;

    const handleMenuChange = (e: any, { name }: any) => {
        setActiveMenu(name);
    };

    return (
        <>
            <Header as="h1">
                <FM id="menu.admin" />
            </Header>
            <Menu vertical fluid secondary color="violet" size="huge">
                <Menu.Item name="all" active={activeMenu === "all"} onClick={handleMenuChange}>
                    <FM id="auth.roles.all" />
                </Menu.Item>
                <Menu.Item name="admin" active={activeMenu === "admin"} onClick={handleMenuChange}>
                    <FM id="auth.roles.admin" />
                </Menu.Item>
                <Menu.Item name="editor" active={activeMenu === "editor"} onClick={handleMenuChange}>
                    <FM id="auth.roles.editor" />
                </Menu.Item>
                <Menu.Item name="reader" active={activeMenu === "reader"} onClick={handleMenuChange}>
                    <FM id="auth.roles.reader" />
                </Menu.Item>
                <Menu.Item name="guest" active={activeMenu === "guest"} onClick={handleMenuChange}>
                    <FM id="auth.roles.guest" />
                </Menu.Item>
                <Menu.Item name="pending" active={activeMenu === "pending"} onClick={handleMenuChange}>
                    <FM id="auth.roles.pending" />
                </Menu.Item>
                <Menu.Item name="refused" active={activeMenu === "refused"} onClick={handleMenuChange}>
                    <FM id="auth.roles.refused" />
                </Menu.Item>
            </Menu>
        </>
    );
};

export default AdminController;
