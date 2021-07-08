import axios from 'axios';
import qs from 'qs';
import * as SecureStore from 'expo-secure-store';
import jwt_decode from "jwt-decode";

export default class Auth { 

    static register = async function(data) {
        
        const resp = await axios({
            method: 'post',
            url: 'https://api.clementcaillat.codes/auth/register',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: qs.stringify(data)
          });
        return resp;
    }

    static login = async function(data) {
        const resp = await axios({
            method: 'post',
            url: 'https://api.clementcaillat.codes/auth',
            headers: {'Content-type': 'application/x-www-form-urlencoded'},
            data: qs.stringify(data)
        });
        return resp;
    }

    static checkLoggedIn = async function(callback) {
        // On récupère les tokens
        Auth.getAuthToken().then(auth => {
            if (auth != null) {
                let now = Date.now().toString().slice(0, -3);
                now = parseInt(now);

                if (jwt_decode(auth).iat + 604800 <= now) {
                    Auth.logOut(() => {
                        callback(false);
                    });
                } else {
                    callback(true)
                }
            } else {
                callback(false);
            }
        })
    }

    static logOut = async function(callback) {
        SecureStore.deleteItemAsync('token').then(() => {
            SecureStore.deleteItemAsync('auth').then(() => {
                SecureStore.deleteItemAsync('id').then(res => {
                    callback(res);
                });
            })
        });
    }

    static saveCredentials = async function(token, authtoken, id, callback) {
        SecureStore.setItemAsync('token', token).then(() => {
            SecureStore.setItemAsync('auth', authtoken).then(() => {
                SecureStore.setItemAsync('id', id).then(res => {
                    callback(res);
                })
            })
        });
    }

    static refreshToken = async function(token) {
        SecureStore.setItemAsync('token', token);
    }

    static getToken = async function() {
        return await SecureStore.getItemAsync('token');
    }
    static getAuthToken = async function() {
        return await SecureStore.getItemAsync('auth');
    }
    
    static getUserInfos = async function(callback) {
        Auth.getToken().then(token => {
            callback(jwt_decode(token));
        })

    }
}