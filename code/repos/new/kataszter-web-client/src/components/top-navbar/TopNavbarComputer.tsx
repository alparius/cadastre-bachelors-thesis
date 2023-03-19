import React, { SyntheticEvent } from "react";
import { NavLink } from "react-router-dom";
import { Dropdown, DropdownItemProps, Icon, Menu } from "semantic-ui-react";

import UserRole from "../../data/enums/UserRole";
import IUser from "../../data/user/User";
import { ReactComponent as AppLogo } from "../../static/favicon.svg";
import BoldFM from "../../util/styledMessages/BoldFM";

interface ITopNavbarComputerProps {
    language: string;
    allLanguagesConfig: DropdownItemProps[] | undefined;
    handleLanguageChange: (_: SyntheticEvent<HTMLElement, Event>, { value }: any) => void;
    handleLogout: () => void;
    user: IUser | undefined;
    currentURL: string;
}

const TopNavbarComputer: React.FC<ITopNavbarComputerProps> = (props: ITopNavbarComputerProps) => {
    const { language, allLanguagesConfig, handleLanguageChange, handleLogout, user, currentURL } = props;

    return (
        <Menu color="grey" fixed="top" fluid borderless inverted={false} stackable compact>
            <Menu.Item header style={{ paddingBottom: "0px", paddingTop: "0px" }}>
                <AppLogo style={{ height: "32px", width: "32px", marginRight: "4px" }} />
                <span style={{ color: "#6435c9" }}>
                    <BoldFM id="menu.title" />
                </span>
            </Menu.Item>
            <Menu.Item as={NavLink} exact to="/">
                <Icon name="home" exact color="violet" />
                <BoldFM id="menu.home" />
            </Menu.Item>
            {user && (
                <>
                    <Menu.Item
                        as={Dropdown}
                        className={currentURL.includes("/search") ? "selected" : ""}
                        trigger={
                            <>
                                <Icon name="search" color="violet" />
                                <BoldFM id="menu.search" />
                            </>
                        }
                        simple
                    >
                        <Dropdown.Menu>
                            <Dropdown.Item as={NavLink} to="/priests/search">
                                <Icon name="user" color="violet" />
                                <BoldFM id="menu.searchPriests" />
                            </Dropdown.Item>
                            <Dropdown.Item as={NavLink} to="/parishes/search">
                                <Icon name="users" color="violet" />
                                <BoldFM id="menu.searchParishes" />
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Menu.Item>

                    <Menu.Item as={NavLink} to="/charts">
                        <Icon name="pie graph" color="violet" />
                        <BoldFM id="menu.charts" />
                    </Menu.Item>

                    {[UserRole.OWNER, UserRole.ADMIN, UserRole.EDITOR].includes(user.role) && (
                        <Menu.Item
                            as={Dropdown}
                            className={currentURL.includes("/create") ? "selected" : ""}
                            trigger={
                                <>
                                    <Icon name="add" color="violet" />
                                    <BoldFM id="menu.add" />
                                </>
                            }
                            simple
                        >
                            <Dropdown.Menu>
                                <Dropdown.Item as={NavLink} to="/priests/create">
                                    <Icon name="user" color="violet" />
                                    <BoldFM id="menu.addPriest" />
                                </Dropdown.Item>
                                <Dropdown.Item as={NavLink} to="/parishes/create">
                                    <Icon name="users" color="violet" />
                                    <BoldFM id="menu.addParish" />
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Menu.Item>
                    )}

                    {[UserRole.OWNER, UserRole.ADMIN].includes(user.role) && (
                        <Menu.Item as={NavLink} to="/administration">
                            <Icon name="user secret" color="violet" />
                            <BoldFM id="menu.admin" />
                        </Menu.Item>
                    )}
                </>
            )}
            {!user ? (
                <>
                    <Menu.Item as={NavLink} to="/login" position="right">
                        <Icon name="sign in" color="violet" />
                        <BoldFM id="menu.login" />
                    </Menu.Item>

                    <Menu.Item as={NavLink} to="/register">
                        <Icon name="signup" color="violet" />
                        <BoldFM id="menu.register" />
                    </Menu.Item>
                </>
            ) : (
                <>
                    <Menu.Item position="right">{user.name}</Menu.Item>

                    <Menu.Item onClick={handleLogout}>
                        <Icon name="log out" color="violet" />
                        <BoldFM id="menu.logout" />
                    </Menu.Item>
                </>
            )}
            <Menu.Item style={{ marginLeft: "2vw" }} link>
                <Dropdown value={language} onChange={handleLanguageChange} options={allLanguagesConfig} />
            </Menu.Item>
        </Menu>
    );
};

export default TopNavbarComputer;
