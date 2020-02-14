import NotificationService from "../notification-service";
import {HTTP_METHOD_DELETE, HTTP_METHOD_POST, HTTP_METHOD_PUT} from "../../utils/request-method";
import {BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND} from "../../utils/response-status";

export default class ExceptionHandlerService {
    static catchApiErrors(response, requestType) {

        if (!response || !response.status) {
            ExceptionHandlerService.handleInternalError("Response or it's status is null", response.url);
        } else if (response.status >= INTERNAL_SERVER_ERROR) {
            ExceptionHandlerService.handleServerError(response, response.url);
        } else if (response.status === BAD_REQUEST) {
            ExceptionHandlerService.handleBadRequest(response, response.url);
        } else if (response.status === NOT_FOUND) {
            ExceptionHandlerService.handleBadRequest(response, response.url);
        }

        if (!response.ok) {
            const responseText = response.clone().text();
            throw new Error(responseText);
        } else {
            if (requestType === HTTP_METHOD_POST) {
                ExceptionHandlerService.dispatchSuccessMessage('Request proceeded', response.url);
            } else if (requestType === HTTP_METHOD_PUT) {
                ExceptionHandlerService.dispatchSuccessMessage('Updated', response.url);
            } else if (requestType === HTTP_METHOD_DELETE) {
                ExceptionHandlerService.dispatchSuccessMessage('Deleted', response.url);
            }
        }
    }

    static dispatchSuccessMessage(message, key = '') {
        NotificationService.notifyAfterResponse(`${message} successfully!`, {
            type: 'success',
            key: key
        });
    }

    static dispatchErrorMessage(errorMessage = 'Something went wrong', key = '') {
        NotificationService.notifyAfterResponse(errorMessage, {
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
