import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import FormStyle from '../src/css/FormStyle';
import { LinearGradient } from 'expo-linear-gradient';
import Input from '../src/components/Input';
import Auth from '../src/libraries/Auth';
import Api from '../src/libraries/Api';

export default class LoginScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            loading: false,
        }

        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        // Vérification si l'utilisateur est connecté ou non sur l'Application
        Auth.checkLoggedIn(res => {
            if (res) {
                this.setState({
                    loading: true
                })

                setTimeout(() => {
                    // S'il est connecté, nous le renvoyons sur la page d'accueil
                    this.props.navigation.navigate('HomeScreen', this.state.username);
                }, 1000)
            }
        })
    }

    submit() {
        this.setState({loading: true})
        Auth.login(this.state).then(res => {
            let token = res.data.tokens.token;
            let authtoken = res.data.tokens.authtoken;
            let id = res.data.id_user;
            this.setState({
                loading: false
            })
            Auth.saveCredentials(token, authtoken, id, () =>{
                this.props.navigation.navigate('HomeScreen');
            } );
            
        }).catch(error => {
            this.setState({loading: false})
            alert(error.response.data.messages.message);

        });
    }

    render () {
        return (
            <View style={FormStyle.container}>
                <LinearGradient colors={['#A647FF', '#5B75FF']} start={{x: 0, y: 0.75}} end={{x: .5, y: 0.25}} style={FormStyle.topContainer}>
                    <Image style={FormStyle.logo}  source={require('../assets/logos/icon-white.png')} />
                    <Text style={FormStyle.title}>CONNEXION</Text>
                    <Input icon="user" placeholder="Nom d'utilisateur" value={this.state.username} onChangeText={(value) => {
                        this.setState({
                            username: value
                        })
                    }}/>
                    <Input icon="lock" secureTextEntry={true} placeholder="Mot de passe" value={this.state.password} onChangeText={(value) => {
                        this.setState({
                            password: value
                        })
                    }}/>
                </LinearGradient>
                <View style={FormStyle.bottomContainer}>
                    <TouchableOpacity onPress={this.submit}>
                        <LinearGradient colors={['#A647FF', '#5B75FF']} start={{x: 0, y: 1}} end={{x: .5, y: 2}} style={FormStyle.button}>
                            { this.state.loading ? <ActivityIndicator size="small" color="white" /> : <Text style={FormStyle.text}>Connexion</Text>}
                        </LinearGradient>
                    </TouchableOpacity>

                    <Text>Pas encore de compte ? <Text style={FormStyle.link} onPress={() => { this.props.navigation.navigate('RegisterScreen')} }>Inscription</Text></Text>
                </View>
            </View>
        )
    }
}
