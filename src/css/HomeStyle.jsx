import { StyleSheet } from "react-native";

let HomeStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1F1F1',
    },
    header: {
        flex: .7,
        borderBottomLeftRadius: 27,
        borderBottomRightRadius: 27,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: 10,
    },
    searchContainer: {
        flex: .5,
    },
    roomContainer: {
        flex: 4.8,
    },
    logo: {
        width: 50,
        height: 50
    },
    icon: {
        fontSize: 30,
    },
    username: {
        color: 'white',
        fontSize: 20
    },
    loadingContainer: {
        flex: 4.8,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default HomeStyle;