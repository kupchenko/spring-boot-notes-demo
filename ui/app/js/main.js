import "url-search-params-polyfill";
import "whatwg-fetch";
import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import configureStore from "./store/configureStore";
import Main from "./component/Main";
import 'antd/dist/antd.css';
import '../css/bootstrap.css'
import '../css/custom.min.css'
const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Main/>
    </Provider>,

    document.getElementById('app')
);