import React, {PureComponent, Fragment} from 'react';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import { LOGIN_ROUTE, ADMIN_ROUTE } from "./constant";
import Login from './pages/Login'
import Admin from './pages/Admin'
import './App.less'

class App extends PureComponent {
    render() {
        return (
            <Fragment>
                <BrowserRouter>
                    <Switch>
                        <Route path={ LOGIN_ROUTE } component={Login}/>
                        <Route path={ ADMIN_ROUTE } component={Admin}/>
                        <Redirect to={ LOGIN_ROUTE }/>
                    </Switch>
                </BrowserRouter>
            </Fragment>
        );
    }
}

export default App;
