import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import configureStore from "./store/configure-store";
import Main from "./component/notes";
import 'antd/dist/antd.css';
import '@styles/custom.min.css'
import Index from "@/js/component/login";
import {BrowserRouter, Route} from 'react-router-dom'

const store = configureStore();
// import createBrowserHistory from 'history/createBrowserHistory'
//
// const newHistory = createBrowserHistory();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            {/*<Route path="/" component={<Main/>}/>*/}
            <Route path="/notes" component={Main}/>
            <Route path="/login" component={Index}/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('container')
);