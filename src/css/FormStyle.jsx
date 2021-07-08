import { StyleSheet } from "react-native";

let FormStyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    topContainer: {
        flex: 2,
        borderBottomLeftRadius: 70,
        borderBottomRightRadius: 70,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    topRegisterContainer: {
        flex: 4,
        borderBottomLeftRadius: 70,
        borderBottomRightRadius: 70,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    bottomContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    button: {
        alignItems: "center",
        padding: 20,
        borderRadius: 100,
        width: 250
    },
    text: {
        color: 'white',
        fontSize: 18
    },
    link: {
        color: 'blue'
    },
    logo: {
        width: 91,
        height: 91
    },
    title: {
        color: 'white',
        fontSize: 27
    },
    inputContainer: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 100,
        width: '70%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        width: '85%'
    },
    icon: {
        marginRight: 15,
        fontSize: 25,
    }


})

export default FormStyle;