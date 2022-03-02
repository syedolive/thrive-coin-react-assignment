import { userStore } from './../stores/user.store';
import Axios from 'axios';
import dayjs from "dayjs";

export const instance = Axios.create({baseURL: 'https://thc-ui-api.thrivecoin.com/v1/'});

let store = userStore;
let tokenTimeout: any;

function refreshToken(timeout: number){
    console.log("token timer set");
    tokenTimeout = setTimeout(() => {
        store.refreshToken().then(res => {
            if(!res){
                window.location.href = '/login';
            }else{
                refreshToken(res);
            }

            console.log('new token', res, dayjs().toDate(), tokenTimeout);
        });
    }, timeout * 0.4);
}

instance.interceptors.request.use((config) => {
    if(config.url === 'users/recent_connections'){
        clearTimeout(tokenTimeout);
        refreshToken(dayjs(store.tokenExpiry).diff(dayjs()))
    }
    return {
        ...config,
        headers: config.url !== 'users/sign_in' && {Authorization: `Bearer ${store.token}`},
    };
},function(error) {
    clearTimeout(tokenTimeout);
    return Promise.reject("error");
});

instance.interceptors.response.use((response) => {
    return response;
}, function (error) {
    return Promise.reject(`interceptor error => ${error}`);
});

