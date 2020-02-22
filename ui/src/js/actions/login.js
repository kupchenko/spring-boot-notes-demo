import ApiService from "../service/api.service";
import {AUTH_TOKEN} from "../utils/request-header";
import NotificationService from "../service/notification-service";

export const actionDoLogin = (username, password) => {

    return (dispatch) => {
        console.log('Authenticating ...');
        ApiService.login(username, password).then((data) => {
            localStorage.setItem(AUTH_TOKEN, 'Bearer ' + data.access_token);
            window.location.href = '/notes';
        }).catch((e) => {
            console.error(e);
            NotificationService.loginFail('Fail to login ...');
        });
    }
};

