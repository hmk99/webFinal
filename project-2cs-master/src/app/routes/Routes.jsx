import React, { useState } from "react";
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { CrudService } from '../../services'
import { actions } from '../../modules'
import Abonne from '../pages/Abonne/Abonne'
import Facture from '../pages/Facture/Facture'
import Promo from '../pages/Promo/Promo'
export const Routes = () => {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch();
    /*** To ensure authentication the token must be verified before access to the private routes */
    const { isAuthorized, user, authToken } = useSelector(
        ({ auth }) => ({
            isAuthorized: auth.authToken && auth.user && typeof auth.user === "object",
            authToken: auth.authToken,
            user: auth.user
        })
    );
    if (isAuthorized) {
        CrudService.setAuthHeader(isAuthorized)
    } else {
        /***** Check the current token if valid and get the athentified user ****/
        if (authToken && !user && loading) {
            setLoading(false)
            dispatch(actions.requestUser("Laoding"))
        }
    }
    return (
        /*
            isAuthorized ? <>
                /* Write all routes need an authentified user *//*
                {user.userType === "decision_maker" && <Route path="/" component={DecideurLayout} />}
                {user.userType === "agent_admin" && <Route path="/" component={MaintenancePage} />}
                {user.userType === "account_admin" && <Route path="/" component={AccountLayout} />}
                {
                   user.userType === "technical_admin" &&


    
                }
                {user.userType === "tenant" && <Route path="/" component={TheLayout} />}
                {user.userType === "agent" && <Route path="/" component={TheLayout} />}
            </> : <>
                /* Write all routes for the authentification */
                /*
                <Route path="/login" component={Login} />

            </>
            */
        <Switch>
            <Route path="/abonne" component={Abonne} />
            <Route path="/facture" component={Facture} />
            <Route path="/promo" component={Promo} />
        </Switch>
    )
}