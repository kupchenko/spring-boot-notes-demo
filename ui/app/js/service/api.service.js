import ExceptionHandlerService from './exception-handler-service';
import NotificationService from "./notification-service";
import {HTTP_METHOD_GET, HTTP_METHOD_POST, HTTP_METHOD_PUT} from "../utils/request-method";
import {APPLICATION_JSON_VALUE} from "../utils/request-header";

export default class ApiService {
    static fetch(url, payload = {}) {
        const options = {
            method: HTTP_METHOD_GET
        };

        return fetch(ApiService.buildUrl(url, payload), options)
            .then((response) => {
                return ApiService.parseResponse(response, HTTP_METHOD_GET);
            });
    }

    static async update(url, payload) {
        NotificationService.loading('Updating ...', url);
        const options = {
            method: HTTP_METHOD_PUT,
            headers: {
                'Content-Type': APPLICATION_JSON_VALUE
            },
            body: JSON.stringify(payload),
        };

        return fetch(url, options)
            .then((response) => {
                return ApiService.parseResponse(response, HTTP_METHOD_PUT);
            });
    }

    static async create(url, payload) {
        NotificationService.loading('Creating ...', url);
        const options = {
            method: HTTP_METHOD_POST,
            headers: {
                'Content-Type': APPLICATION_JSON_VALUE
            },
            body: JSON.stringify(payload),
        };
        return fetch(url, options)
            .then((response) => {
                return ApiService.parseResponse(response, HTTP_METHOD_POST);
            });
    }

    static buildUrl(url, params = {}) {
        if (!params) return url;
        const uri = url.indexOf('?') === -1 ? `${url}?` : url;

        return uri + ApiService.buildParams(params);
    }

    static buildParams(params) {
        let paramsArray = ['text=' + params.text, 'page=' + params.page, 'rows=' + params.rows];
        return paramsArray.join('&');
    }

    static parseResponse(response, requestType) {
        ExceptionHandlerService.catchApiErrors(response, requestType);

        if (response.status === 204) return null;
        return response.json();
    }

}
