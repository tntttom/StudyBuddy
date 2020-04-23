
import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class LoadingScreen extends React.Component{
    render() {
        return (
            <LinearGradient colors={['#F43BD0','#F02323']} style={{flex:1}}>            
                <View style={styles.container}>
                    <View style={styles.loadingContainer}>
                        <Text style={styles.loadingText}>Loading...</Text>
                    </View>
                </View>
            </LinearGradient>
        );
    } 
}

const styles = StyleSheet.create({

    container: {
        flex: 1
    },

    loadingText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 170,
        fontFamily: 'Montserrat-Medium',
        fontSize: 48,
        color: 'white',
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
})