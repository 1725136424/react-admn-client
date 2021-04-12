import React, { PureComponent } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom'
import Home from './Home'
import AddUpdate from './AddUpdate'
import Detail from './Detail'
import {
    ADMIN_PRODUCT_ADD_ADN_UPDATE_ROUTE,
    ADMIN_PRODUCT_DETAIL_ROUTE,
    ADMIN_PRODUCT_HOME_ROUTE
} from "../../../constant";

class Product extends PureComponent {

    render() {
        return (
            <>
                <Switch>
                    <Route path={ ADMIN_PRODUCT_HOME_ROUTE } component={ Home }/>
                    <Route path={ ADMIN_PRODUCT_ADD_ADN_UPDATE_ROUTE } component={ AddUpdate }/>
                    <Route path={ ADMIN_PRODUCT_DETAIL_ROUTE } component={ Detail }/>
                    <Redirect to={ ADMIN_PRODUCT_HOME_ROUTE }/>
                </Switch>
            </>
        );
    }
}

export default Product;
