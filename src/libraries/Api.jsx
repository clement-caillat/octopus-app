import axios from 'axios';
import Auth from './Auth';
import qs from 'qs';

export default class Api{

    constructor() {
        this.route = 'https://api.clementcaillat.codes';
        this.call = this.call.bind(this);
    }

    get = async function(params) {
        let url = this.route + params.route;
        this.call('get', url, params);
    }
    post = async function(params) {
        let url = this.route + params.route;
        this.call('post', url, params);
    }
    put = async function(params) {
        let url = this.route + params.route;
        this.call('put', url, params);
    }
    delete = async function(params) {
        let url = this.route + params.route;
        this.call('delete', url, params);
    }

    call = async function(method, url, params) {
        Auth.getToken().then(token => {
            Auth.getAuthToken().then(auth => {

                if (token === null || auth === null) {
                    params.error(417);
                }
                else {
                    axios({
                        url: url,
                        method: method,
                        headers: {
                            token: token,
                            authtoken: auth
                        },
                        data: qs.stringify(params.data),
                        params: params.params
                    })
                    .then(resp => { params.success(resp); })
                    .catch(error => {
                        if (error.response.status == 417) {
                            Auth.refreshToken(error.response.data.messages.token).then(() => {
                                this.call(method, url, params);
                            });
                        }
                    })
                }

            })
        })
    }
}

