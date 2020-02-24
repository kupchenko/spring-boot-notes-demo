import ExceptionHandlerService from './exception-handler-service';
import NotificationService from "./notification-service";
import {HTTP_METHOD_GET, HTTP_METHOD_POST, HTTP_METHOD_PUT} from "../utils/request-method";
import {APPLICATION_JSON_VALUE, AUTH_TOKEN} from "../utils/request-header";
import appConfig from "../config/config-app";

export default class ApiService {
    static fetch(url, payload = {}) {
        const options = {
            method: HTTP_METHOD_GET,
            headers: {
                'Authorization': ApiService.getToken(AUTH_TOKEN),
                'Content-Type': APPLICATION_JSON_VALUE
            },
        };

        return fetch(ApiService.buildUri(url, payload), options)
            .then((response) => {
                return ApiService.parseResponse(response, HTTP_METHOD_GET);
            });
    }

    static async update(url, payload) {
        NotificationService.loading('Updating ...', url);
        const options = {
            method: HTTP_METHOD_PUT,
            headers: {
                'Authorization': ApiService.getToken(AUTH_TOKEN),
                'Content-Type': APPLICATION_JSON_VALUE
            },
            body: JSON.stringify(payload),
        };

        return fetch(this.getFullUrl(url), options)
            .then((response) => {
                return ApiService.parseResponse(response, HTTP_METHOD_PUT);
            });
    }

    static async create(url, payload) {
        NotificationService.loading('Creating ...', url);
        const options = {
            method: HTTP_METHOD_POST,
            headers: {
                'Authorization': ApiService.getToken(AUTH_TOKEN),
                'Content-Type': APPLICATION_JSON_VALUE
            },
            body: JSON.stringify(payload),
        };
        return fetch(this.getFullUrl(url), options)
            .then((response) => {
                return ApiService.parseResponse(response, HTTP_METHOD_POST);
            });
    }

    static async retrieveToken(code) {
        const username = appConfig.APP_OAUTH2_USERNAME;
        const password = appConfig.APP_OAUTH2_PASSWORD;

        let formdata = new FormData();
        let headers = new Headers();

        formdata.append('grant_type', 'authorization_code');
        formdata.append('code', code);
        headers.append('Authorization', 'Basic ' + Buffer.from(username + ":" + password).toString('base64'));

        const options = {
            method: HTTP_METHOD_POST,
            headers: headers,
            body: formdata
        };
        return fetch(appConfig.API_URL_BASE + '/oauth/token', options)
            .then((response) => response.json());
    }

    static buildUri(url, params = {}) {
        const fullUrl = this.getFullUrl(url);
        if (!params || Object.entries(params).length === 0) return fullUrl;
        const uri = fullUrl.indexOf('?') === -1 ? `${fullUrl}?` : fullUrl;

        return uri + ApiService.buildParams(params);
    }

    static getFullUrl(url) {
        return appConfig.API_URL_BASE + appConfig.API_CONTEXT_PATH + url;
    }

    static buildParams(params) {
        let paramsArray = ['text=' + params.text, 'page=' + params.page, 'rows=' + params.rows];
        return paramsArray.join('&');
    }

    static parseResponse(response, requestType) {
        console.log(`Parsing response with status: ${response.status}`);
        ExceptionHandlerService.catchApiErrors(response, requestType);

        if (response.status === 204) return null;
        return response.json();
    }

    static getToken(tokenName) {
        return localStorage.getItem(tokenName);
    }
}
