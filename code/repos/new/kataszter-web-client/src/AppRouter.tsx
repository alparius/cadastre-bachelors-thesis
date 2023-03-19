import React from "react";
import { IntlProvider } from "react-intl";
import { Route, Switch, withRouter } from "react-router-dom";
import { Grid } from "semantic-ui-react";

import CookieNotification from "./components/CookieNotification";
import TopNavbarComputer from "./components/top-navbar/TopNavbarComputer";
import TopNavbarMobile from "./components/top-navbar/TopNavbarMobile";
import UserRole from "./data/enums/UserRole";
import GuardedRoute from "./GuardedRoute";
import AdminPage from "./pages/AdminPage";
import ChartPage from "./pages/ChartPage";
import CreateParishPage from "./pages/CreateParishPage";
import CreatePriestPage from "./pages/CreatePriestPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NewPasswordPage from "./pages/NewPasswordPage";
import UnderConstruction from "./pages/NotFoundPage";
import ParishProfilePage from "./pages/ParishProfilePage";
import PriestProfilePage from "./pages/PriestProfilePage";
import RegisterPage from "./pages/RegisterPage";
import SearchParishesPage from "./pages/SearchParishesPage";
import SearchPriestsPage from "./pages/SearchPriestsPage";
import allLanguagesConfig from "./translation/allLanguagesConfig";
import useLanguage from "./translation/useLanguage";
import useSession from "./util/useSession/useSession";

const AppRouter: React.FC = () => {
    const { languageConfig, handleLanguageChange } = useLanguage();
    const { user, setUser, handleLogout } = useSession();

    return (
        <IntlProvider key={languageConfig.locale} locale={languageConfig.locale} messages={languageConfig.messages}>
            <main>
                <Grid className="ui computer only computerMenu">
                    <TopNavbarComputer
                        language={languageConfig.key}
                        allLanguagesConfig={allLanguagesConfig}
                        handleLanguageChange={handleLanguageChange}
                        handleLogout={handleLogout}
                        user={user}
                        currentURL={window.location.href}
                    />
                </Grid>

                <Grid className="ui mobile tablet only">
                    <TopNavbarMobile
                        language={languageConfig.key}
                        allLanguagesConfig={allLanguagesConfig}
                        handleLanguageChange={handleLanguageChange}
                        handleLogout={handleLogout}
                        user={user}
                        currentURL={window.location.href}
                    />
                </Grid>

                <Switch>
                    <Route exact path="/" render={() => <HomePage user={user} />} />
                    <Route path="/login" render={() => <LoginPage user={user} setUser={setUser} />} />
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/forgotPassword" component={ForgotPasswordPage} />
                    <Route path="/newPassword" component={NewPasswordPage} />
                    <GuardedRoute
                        path="/administration"
                        render={() => <AdminPage selfID={user ? user.ID : undefined} />}
                        user={user}
                        roles={[UserRole.ADMIN, UserRole.OWNER]}
                    />

                    <GuardedRoute
                        path="/priests/search"
                        component={SearchPriestsPage}
                        user={user}
                        roles={[UserRole.GUEST, UserRole.READER, UserRole.EDITOR, UserRole.ADMIN, UserRole.OWNER]}
                    />
                    <GuardedRoute
                        path="/parishes/search"
                        component={SearchParishesPage}
                        user={user}
                        roles={[UserRole.GUEST, UserRole.READER, UserRole.EDITOR, UserRole.ADMIN, UserRole.OWNER]}
                    />

                    <GuardedRoute
                        path="/priests/profile/:id"
                        render={({ match }) => <PriestProfilePage priestID={match.params.id} userRole={user ? user.role : undefined} />}
                        user={user}
                        roles={[UserRole.READER, UserRole.EDITOR, UserRole.ADMIN, UserRole.OWNER]}
                    />
                    <GuardedRoute
                        path="/parishes/profile/:id"
                        render={({ match }) => <ParishProfilePage parishID={match.params.id} userRole={user ? user.role : undefined} />}
                        user={user}
                        roles={[UserRole.GUEST, UserRole.READER, UserRole.EDITOR, UserRole.ADMIN, UserRole.OWNER]}
                    />

                    <GuardedRoute path="/priests/create" component={CreatePriestPage} user={user} roles={[UserRole.EDITOR, UserRole.ADMIN]} />
                    <GuardedRoute
                        path="/parishes/create"
                        component={CreateParishPage}
                        user={user}
                        roles={[UserRole.EDITOR, UserRole.ADMIN, UserRole.OWNER]}
                    />

                    <GuardedRoute
                        path="/charts"
                        component={ChartPage}
                        user={user}
                        roles={[UserRole.GUEST, UserRole.READER, UserRole.EDITOR, UserRole.ADMIN, UserRole.OWNER]}
                    />

                    <Route component={UnderConstruction} />
                </Switch>

                <CookieNotification />
            </main>
        </IntlProvider>
    );
};

export default withRouter(AppRouter);
