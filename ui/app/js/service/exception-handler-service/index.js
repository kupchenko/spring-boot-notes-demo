import {message} from "antd";

export default class ExceptionHandlerService {
    static catchApiErrors(response, requestType) {

        if (!response || !response.status) {
            ExceptionHandlerService.handleInternalError(
                "Response or it's status is null", requestType
            );
        } else if (response.status >= 500) {
            ExceptionHandlerService.handleServerError(response, requestType);
        } else if (response.status === 400) {
            ExceptionHandlerService.handleBadRequest(response, requestType);
        } else if (response.status === 404) {
            ExceptionHandlerService.handleBadRequest(response, requestType);
        } else if (response.status === 409) {
            const data = response.json();
            ExceptionHandlerService.dispatchErrorMessage(data.message, requestType);
        }

        if (!response.ok) {
            const responseText = response.clone().text();
            throw new Error(responseText);
        } else {
            if (requestType === 'POST') {
                ExceptionHandlerService.dispatchSuccessMessage('Request proceeded', requestType);
            } else if (requestType === 'PUT') {
                ExceptionHandlerService.dispatchSuccessMessage('Updated', requestType);
            } else if (requestType === 'DELETE') {
                ExceptionHandlerService.dispatchSuccessMessage('Deleted', requestType);
            }
        }
    }

    static dispatchMessage(messageContent, notification) {
        const key = notification.key;
        switch (notification.type) {
            case 'success': {
                message.success({content: messageContent, key, duration: 2});
                break;
            }
            case 'error': {
                message.error({content: messageContent, key, duration: 2});
                break;
            }
            case 'loading': {
                message.loading({content: messageContent, key});
                break;
            }
        }
    }

    static dispatchSuccessMessage(message, key = '') {
        ExceptionHandlerService.dispatchMessage(`${message} successfully!`, {
            type: 'success',
            key: key
        });
    }

    static dispatchErrorMessage(errorMessage = 'Something went wrong', key = '') {
        ExceptionHandlerService.dispatchMessage(errorMessage, {
            type: 'error',
            key: key
        });
    }

    static handleBadRequest(response, key) {
        ExceptionHandlerService.dispatchErrorMessage('Sent data is invalid!', key);
    }

    static handleServerError(response, key) {
        ExceptionHandlerService.dispatchErrorMessage(key);
    }

    static handleInternalError(responseOrItSStatusIsNull, key) {
        ExceptionHandlerService.dispatchErrorMessage(responseOrItSStatusIsNull, key);
    }
}
