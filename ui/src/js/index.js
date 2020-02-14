import "url-search-params-polyfill";
import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import configureStore from "./store/configure-store";
import Main from "./component/main";
import 'antd/dist/antd.css';
import '@styles/custom.min.css'

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Main/>
    </Provider>,

    document.getElementById('src')
);