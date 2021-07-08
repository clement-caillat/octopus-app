import React from 'react';

import { View, TextInput, StyleSheet } from 'react-native';
import FormStyle from '../css/FormStyle';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Input(props) {
    return (
        <View style={FormStyle.inputContainer}>
            <Icon style={FormStyle.icon} name={props.icon} color="#333" />
            <TextInput autoCapitalize='none' onChangeText={props.onChangeText} style={FormStyle.input} secureTextEntry={props.secureTextEntry} placeholder={props.placeholder}>{props.value}</TextInput>
        </View>
    )
}