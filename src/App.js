import React, {Component, Fragment} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Login from './pages/Login/Login'
import Admin from './pages/Admin/Admin'
import './App.less'

class App extends Component {
    render() {
        return (
            <Fragment>
                <BrowserRouter>
                    <Switch>
                        <Route path='/login' component={Login}/>
                        <Route path='/admin' component={Admin}/>
                        <Redirect to='/login'/>
                    </Switch>
                </BrowserRouter>
            </Fragment>
        );
    }
}

export default App;
