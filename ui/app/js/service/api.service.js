import ExceptionHandlerService from './exception-handler-service';

export default class ApiService {
    static fetch(url, payload = {}) {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (!url) return;
        return fetch(ApiService.buildUrl(url, payload), options)
            .then((response) => {
                return ApiService.parseResponse(response, 'GET');
            });
    }

    static async update(url, payload) {
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        };

        if (!url) return;
        return fetch(url, options)
            .then((response) => {
                return ApiService.parseResponse(response, 'GET');
            });
    }

    static async create(url, payload) {
        const options = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        };
        if (!url) return;
        return fetch(url, options)
            .then((response) => {
                return ApiService.parseResponse(response, 'GET');
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
