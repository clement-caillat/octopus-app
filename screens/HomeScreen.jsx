import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import Auth from '../src/libraries/Auth';
import { LinearGradient } from 'expo-linear-gradient';
import * as SecureStore from 'expo-secure-store';
import Api from '../src/libraries/Api';
import HomeStyle from '../src/css/HomeStyle';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class HomeScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: '',
            username: '',
            loading: false,
        }

        this.ajax = new Api;


        this.logOut = this.logOut.bind(this);
    }

    componentDidMount() {
        Auth.checkLoggedIn(res => {
            if (!res) {
                this.props.navigation.navigate('LoginScreen');
            }
        });

        Auth.getUserInfos(infos => {
            this.setState({
                id: infos.user_id,
                username: infos.user_name
            })
        })



        // this.ajax.get({
        //     route: '/message',
        //     params: {
        //         username: '',
        //     },
        //     success: resp => {
        //         console.log(resp);
        //     },
        //     error: error => {
        //         if (error == 417) {
        //             Auth.logOut(() => {
        //                 this.props.navigation.navigate('LoginScreen');
        //             });
        //         }
        //         console.error(error);
        //     }
        // })
    }

    logOut() {
        Auth.logOut(() => {
            this.props.navigation.navigate('LoginScreen');
        });
    }

    getRooms() {
        this.ajax.get({
            
        })
    }

    render () {
        return (
            <View style={HomeStyle.container}>
                <LinearGradient colors={['#A647FF', '#5B75FF']} start={{x: 0, y: 0.75}} end={{x: .5, y: 0.25}} style={HomeStyle.header}>
                    <Image style={HomeStyle.logo}  source={require('../assets/logos/icon-white.png')} />
                    <Text style={HomeStyle.username}>{this.state.username}</Text>
                    <Icon style={HomeStyle.icon} onPress={this.logOut} name='sign-out' color="#FF4848" />
                </LinearGradient>
                <View style={HomeStyle.searchContainer}>
                    
                </View>
                <View style={this.state.loading ? HomeStyle.loadingContainer : HomeStyle.roomContainer}>
                    { this.state.loading ? <ActivityIndicator size="large" color="black" /> : <Text>Hoo</Text>}
                </View>
            </View>
        )
    }
}
