import React, { Component } from 'react';
import { View, Button} from 'react-native';

import axios from 'axios';
import qs from 'qs';

export default class TestScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: 'test',
            password: 'test',
        }

        this.submit = this.submit.bind(this);
    }

    submit() {
        // fetch('https://api.clementcaillat.codes/test', {method: 'post', headers: {'Content-Type' : 'application/x-www-form-urlencoded'}, body: {username: 'Hello', password: 'Toto'}}).then(response => response.text()).then(response => {
        //     console.log(JSON.stringify(response));
        // }).catch(error => {
        //     console.error(error);
        // });

        axios({
            method: 'POST',
            url: 'https://api.clementcaillat.codes/test',
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8' 
            },
            data: qs.stringify({username: 'toto', password: 'test'})
        })
        .then(resp => { console.log(resp) })
        .catch(error => {
            console.error(error);
        })
    }

    render () {
        return (
            <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
                <Button title="Send" onPress={this.submit}/>
            </View>
        )
    }
}
