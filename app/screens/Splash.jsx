import { View, Image, StyleSheet } from 'react-native';

export default function SplashScreen() {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/logo.png')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 100,
    },
});