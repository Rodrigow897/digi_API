import { Image } from "expo-image";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";


export function index() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('./assets/images/logo.png')}/>
            </View>
        </SafeAreaView>
    )
}

export default index;