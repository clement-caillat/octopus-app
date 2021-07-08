import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import FormStyle from '../src/css/FormStyle';
import { LinearGradient } from 'expo-linear-gradient';
import Input from '../src/components/Input';
import Auth from '../src/libraries/Auth';

export default class RegisterScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            mail: '',
            password: '',
            cpassword: '',
            loading: false
        }

        this.submit = this.submit.bind(this);
    }

    submit() {
        this.setState({loading: true})
        Auth.register(this.state).then(res => {
            this.setState({
                username: '',
                mail: '',
                password: '',
                cpassword: '',
                loading: false
            })
            alert('Votre compte a bien été créé');
            this.props.navigation.navigate('LoginScreen');
        }).catch(error => {
            this.setState({loading: false})
            alert(error.response.data.messages.message);

        });
    }

    render () {
        return (
            <View style={FormStyle.container}>
                <LinearGradient colors={['#A647FF', '#5B75FF']} start={{x: 0, y: 0.75}} end={{x: .5, y: 0.25}} style={FormStyle.topRegisterContainer}>
                    <Image style={FormStyle.logo}  source={require('../assets/logos/icon-white.png')} />
                    <Text style={FormStyle.title}>INSCRIPTION</Text>
                    <Input icon="user" placeholder="Nom d'utilisateur" value={this.state.username} onChangeText={(value) => {
                        this.setState({
                            username: value
                        })
                    }}/>
                    <Input icon="envelope" placeholder="Email" value={this.state.mail} onChangeText={(value) => {
                        this.setState({
                            mail: value
                        })
                    }} />
                    <Input icon="lock" secureTextEntry={true} placeholder="Mot de passe" value={this.state.password} onChangeText={(value) => {
                        this.setState({
                            password: value
                        })
                    }}/>
                    <Input icon="lock" secureTextEntry={true} placeholder="Confirmer le mot de passe" value={this.state.cpassword} onChangeText={(value) => {
                        this.setState({
                            cpassword: value
                        })
                    }}/>
                </LinearGradient>
                <View style={FormStyle.bottomContainer}>
                    <TouchableOpacity onPress={this.submit}>
                        <LinearGradient colors={['#A647FF', '#5B75FF']} start={{x: 0, y: 1}} end={{x: .5, y: 2}} style={FormStyle.button}>
                            { this.state.loading ? <ActivityIndicator size="small" color="white" /> : <Text style={FormStyle.text}>Inscription</Text> }
                        </LinearGradient>
                    </TouchableOpacity>

                    <Text>Déjà un compte ? <Text style={FormStyle.link} onPress={() => { this.props.navigation.navigate('LoginScreen')} }>Connexion</Text></Text>
                </View>
            </View>
        )
    }
}
