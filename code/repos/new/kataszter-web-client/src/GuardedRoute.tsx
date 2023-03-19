import React from "react";
import { StaticContext } from "react-router";
import { Redirect, Route, RouteComponentProps } from "react-router-dom";

import ErrorMsg from "./components/ErrorMsg";
import UserRole from "./data/enums/UserRole";
import IUser from "./data/user/User";

interface IGuardedRouteProps {
    user: IUser | undefined;
    roles: UserRole[];
    path: string;
    component?: React.FunctionComponent<{}>;
    exact?: boolean;
    render?: ({ match }: RouteComponentProps<any, StaticContext, any>) => JSX.Element;
}

const GuardedRoute: React.FC<IGuardedRouteProps> = (props: IGuardedRouteProps) => {
    const { user, roles, ...rest } = props;

    if (!user) {
        return <Route path={rest.path} render={() => <Redirect to="/login" />} />;
    } else if (!roles.includes(user.role)) {
        return <Route path={rest.path} render={() => <ErrorMsg errorMessage="error.clearance" />} />;
    } else {
        return <Route {...rest} />;
    }
};

export default GuardedRoute;
