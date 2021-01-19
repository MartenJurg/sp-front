import React, {useEffect, useState} from 'react';
import './App.scss';

import Navigation from './components/Navigation';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import IdleTimer from 'react-idle-timer'
import {useInterval} from './shared/hooks/hooks';
import {useStoreActions} from "easy-peasy";
import {UserRoute, NonUserRoute, AdminRoute} from "./Auth";

import Home from './pages/Home';
import Intern from "./pages/Intern";
import InternshipProvider from "./pages/InternshipProvider";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Advertisement from "./pages/Advertisement";
import NotFound from "./pages/NotFound";
import Deals from "./pages/admin/Deals";
import Invoices from "./pages/admin/Invoices";
import Categories from "./pages/admin/Categories";

const App = () => {

    const [userActive, setUserActive] = useState(true);
    const {fetchToken, checkToken} = useStoreActions(actions => actions.token);
    const {fetchAllCategories} = useStoreActions(actions => actions.category);

    const onAction = () => setUserActive(true);

    useEffect(() => {
        checkToken();
        fetchAllCategories();
    }, )

    useInterval(() => {
        if (userActive) {
            fetchToken();
            setUserActive(false);
        }
    }, 100000);

    return (
        <div className="App">
            <IdleTimer onAction={() => onAction()}/>
            <Router>
                <Navigation/>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <UserRoute path="/praktikapakkujale/kuulutus" component={Advertisement}/>
                    <Route path="/praktikapakkujale" component={InternshipProvider}/>
                    <Route path="/praktikandile" component={Intern}/>
                    <UserRoute path="/profiil" component={Profile}/>
                    <NonUserRoute path="/login" component={Login}/>
                    <NonUserRoute path="/signup" component={Register}/>
                    <AdminRoute path="/admin/deals" component={Deals}/>
                    <AdminRoute path="/admin/categories" component={Categories}/>
                    <AdminRoute path="/admin/invoices" component={Invoices}/>
                    <Route path="/404" component={NotFound}/>
                    {/*<Route path="*" render={() => <Redirect to="/404"/>}/>*/}
                </Switch>
            </Router>
        </div>

    );
}


export default App;
