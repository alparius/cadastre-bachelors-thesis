import React, { SyntheticEvent } from "react";
import { NavLink } from "react-router-dom";
import { Dropdown, DropdownItemProps, Icon, Menu } from "semantic-ui-react";

import UserRole from "../../data/enums/UserRole";
import IUser from "../../data/user/User";
import { ReactComponent as AppLogo } from "../../static/favicon.svg";

interface ITopNavbarMobileProps {
    language: string;
    allLanguagesConfig: DropdownItemProps[] | undefined;
    handleLanguageChange: (_: SyntheticEvent<HTMLElement, Event>, { value }: any) => void;
    handleLogout: () => void;
    user: IUser | undefined;
    currentURL: string;
}

const TopNavbarMobile: React.FC<ITopNavbarMobileProps> = (props: ITopNavbarMobileProps) => {
    const { language, allLanguagesConfig, handleLanguageChange, handleLogout, user, currentURL } = props;

    return (
        <Menu color="grey" fixed="top" fluid borderless inverted={false} compact style={{ paddingLeft: "-3px", paddingRight: "-3px" }}>
            <Menu.Item header style={{ paddingBottom: "0px", paddingTop: "0px" }}>
                <AppLogo style={{ height: "28px", width: "28px" }} />
            </Menu.Item>
            <Menu.Item as={NavLink} exact to="/">
                <Icon name="home" exact color="violet" />
            </Menu.Item>
            {user && (
                <>
                    <Menu.Item
                        as={Dropdown}
                        className={currentURL.includes("/search") ? "selected" : ""}
                        trigger={<Icon name="search" color="violet" />}
                        simple
                    >
                        <Dropdown.Menu>
                            <Dropdown.Item as={NavLink} to="/priests/search">
                                <Icon name="user" color="violet" />
                            </Dropdown.Item>
                            <Dropdown.Item as={NavLink} to="/parishes/search">
                                <Icon name="users" color="violet" />
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Menu.Item>

                    <Menu.Item as={NavLink} to="/charts">
                        <Icon name="pie graph" color="violet" />
                    </Menu.Item>

                    {[UserRole.OWNER, UserRole.ADMIN, UserRole.EDITOR].includes(user.role) && (
                        <Menu.Item
                            as={Dropdown}
                            className={currentURL.includes("/create") ? "selected" : ""}
                            trigger={<Icon name="add" color="violet" />}
                            simple
                        >
                            <Dropdown.Menu>
                                <Dropdown.Item as={NavLink} to="/priests/create">
                                    <Icon name="add user" color="violet" />
                                </Dropdown.Item>
                                <Dropdown.Item as={NavLink} to="/parishes/create">
                                    <Icon name="users" color="violet" />
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Menu.Item>
                    )}

                    {[UserRole.OWNER, UserRole.ADMIN].includes(user.role) && (
                        <Menu.Item as={NavLink} to="/administration">
                            <Icon name="user secret" color="violet" />
                        </Menu.Item>
                    )}
                </>
            )}

            {!user ? (
                <>
                    <Menu.Item as={NavLink} to="/login" position="right">
                        <Icon name="sign in" color="violet" />
                    </Menu.Item>

                    <Menu.Item as={NavLink} to="/register">
                        <Icon name="signup" color="violet" />
                    </Menu.Item>
                </>
            ) : (
                <Menu.Item onClick={handleLogout} position="right">
                    <Icon name="log out" color="violet" />
                </Menu.Item>
            )}

            <Menu.Item>
                <Dropdown value={language} onChange={handleLanguageChange} options={allLanguagesConfig} />
            </Menu.Item>
        </Menu>
    );
};

export default TopNavbarMobile;
