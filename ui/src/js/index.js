import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import configureStore from "./store/configure-store";
import Main from "./component/notes";
import 'antd/dist/antd.css';
import '@styles/custom.min.css'
import 'ant-design-pro/dist/ant-design-pro.css';
import LoginPage from "./component/login";
import {BrowserRouter, Route} from 'react-router-dom'

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            {/*<Route path="/" component={<Main/>}/>*/}
            <Route path="/notes" component={Main}/>
            <Route path="/login" component={LoginPage}/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('container')
);