import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import configureStore from "./store/configure-store";
import Notes from "./component/notes";
import 'antd/dist/antd.css';
import '@styles/custom.min.css'
import 'ant-design-pro/dist/ant-design-pro.css';
import AuthSuccess from "./component/auth/success";
import {BrowserRouter, Route} from 'react-router-dom'

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            {/*<Route path="/" component={<Main/>}/>*/}
            <Route exact path="/" component={Notes}/>
            <Route exact path="/notes" component={Notes}/>
            <Route path="/auth/success" component={AuthSuccess}/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('container')
);